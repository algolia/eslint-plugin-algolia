// Rule definition
module.exports = (context) => {
  return CallExpression: (node) => {
    // Only check requires
    if (node.callee.name !== 'require') return;

    context.report({
      node: node,
      message: 'Prefer import over require'
    });
  };
};
