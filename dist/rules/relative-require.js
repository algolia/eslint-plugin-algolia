'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rule Definition
module.exports = function (context) {
  var currentCheckedFolder = _path2.default.dirname(context.getFilename());
  return {
    CallExpression: function CallExpression(node) {
      var required = undefined;

      // Only check requires
      if (node.callee.name !== 'require') return;
      // Only check literals
      if (node.arguments[0].type !== 'Literal') return;

      required = node.arguments[0].value;
      // Only check non-local files
      if (required[0] !== '.') return;

      // No error if the file/folder exists
      try {
        _fs2.default.statSync(_path2.default.join(currentCheckedFolder, required));
      } catch (err) {
        var subMessage = _path2.default.extname(required) === '' ? 'without extension' : 'not existing file';
        context.report({
          node: node,
          message: 'Relative require {{subMessage}}: {{required}}',
          data: {
            required: required,
            subMessage: subMessage
          }
        });
      }
    }
  };
};
