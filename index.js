module.exports = {
  rules: {
    'relative-require': require('./dist/rules/relative-require.js'),
    'force-import-root': require('./dist/rules/force-import-root.js')
  },
  rulesConfig: {
    'relative-require': 0,
    'force-import-root': 0
  }
};
