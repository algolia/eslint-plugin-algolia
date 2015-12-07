import fs from 'fs';
import path from 'path';

// Rule Definition
export default (context) => {
  const currentCheckedFolder = path.dirname(context.getFilename());
  return {
    CallExpression: (node) => {
      let required;

      // Only check requires
      if (node.callee.name !== 'require') return;
      // Only check literals
      if (node.arguments[0].type !== 'Literal') return;

      required = node.arguments[0].value;
      // Only check non-local files
      if (required[0] !== '.') return;

      // No error if the file/folder exists
      try {
        fs.statSync(path.join(currentCheckedFolder, required));
      } catch (err) {
        const subMessage = (path.extname(required) === '') ? 'without extension' : 'not existing file';
        context.report({
          node: node,
          message: 'Relative require {{subMessage}}: {{required}}',
          data: {
            required: required,
            subMessage
          }
        });
      }
    }
  };
};

