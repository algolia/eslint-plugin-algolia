// Rule definition
export default (context) => {
  return {
    MemberExpression: (node) => {
      // Only check module.exports
      if (node.object.type !== 'Identifier') return;
      if (node.object.name !== 'module') return;
      if (node.property.type !== 'Identifier') return;
      if (node.property.name !== 'exports') return;

      context.report({
        node,
        message: 'Use export over module.exports'
      });
    }
  };
};
