module.exports = {
  rules: {
    'relative-require': require('./rules/relative-require.js'),
    'force-import-root': require('./rules/force-import-root.js'),
    'no-require': require('./rules/no-require.js'),
    'no-module-exports': require('./rules/no-module-exports.js')
  },
  rulesConfig: {
    'relative-require': 0,
    'force-import-root': 0,
    'no-require': 0,
    'no-module-exports': 0
  }
};
