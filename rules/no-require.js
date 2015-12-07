// Rule definition
export default (context) => {
  return {
    CallExpression: (node) => {
      // Only check requires
      if (node.callee.name !== 'require') return;

      context.report({
        node: node,
        message: 'Prefer import over require'
      });
    }
  };
};
