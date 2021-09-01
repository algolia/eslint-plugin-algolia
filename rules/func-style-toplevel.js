/**
 * @file Rule to enforce a particular function style at top level.
 *
 * Heavily inspired by `func-style` https://eslint.org/docs/rules/func-style.
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description:
        'enforce the consistent use of either `function` declarations at top level',
      category: 'Stylistic Issues',
      recommended: false,
      url: 'https://github.com/algolia/eslint-plugin-algolia',
    },

    schema: [],

    messages: {
      declaration: 'Expected a function declaration.',
    },
  },

  create(context) {
    const stack = [];

    function isVarAssignement(node) {
      return node.parent.type === 'VariableDeclarator';
    }

    function isTopLevel(node) {
      let parent = node.parent;
      for (let index = 0; index < 4; index++) {
        if (parent.type === 'Program') {
          return true;
        }
        if (parent.type === 'BlockStatement') {
          return false;
        }
        parent = parent.parent;
      }
      return false;
    }

    const nodesToCheck = {
      FunctionExpression(node) {
        stack.push(false);

        if (isVarAssignement(node)) {
          context.report({ node: node.parent, messageId: 'declaration' });
        }
      },
      'FunctionExpression:exit'() {
        stack.pop();
      },

      ThisExpression() {
        if (stack.length > 0) {
          stack[stack.length - 1] = true;
        }
      },

      ArrowFunctionExpression() {
        stack.push(false);
      },

      'ArrowFunctionExpression:exit'(node) {
        const hasThisExpr = stack.pop();
        if (!isTopLevel(node)) {
          return;
        }

        if (!hasThisExpr && node.parent.type === 'VariableDeclarator') {
          context.report({ node: node.parent, messageId: 'declaration' });
        }
      },
    };

    return nodesToCheck;
  },
};
