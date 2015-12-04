function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length && i < arr2.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// Rule definition
module.exports = (context) => {
  return {
    CallExpression: (node) => {
      const ancestors = context.getAncestors().map((ancestor) => ancestor.type);
      // Only check requires
      if (node.callee.name !== 'require') return;

      // Only check requires using a literal argument
      if (!node.arguments[0] || node.arguments[0].type !== 'Literal') return;

      // Only check root level requires
      if (
        !compareArrays(ancestors, ['Program', 'ExpressionStatement']) &&
        !compareArrays(ancestors, ['Program', 'VariableDeclaration', 'VariableDeclarator'])
      ) return;

      context.report({
        node: node,
        message: 'Use import instead of require at the root level'
      });
    }
  };
};
