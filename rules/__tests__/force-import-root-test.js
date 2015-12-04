import rule from '../force-import-root.js';
import {RuleTester} from 'eslint';

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

// Tests
let ruleTester = new RuleTester();
ruleTester.run('force-import-root', rule, {
  valid: [
    "import a from 'a';",
    "import a from './a';",
    "import a from './a.js';",
    "require('a')()",
    "var a = require('a')()",
    "var a = 1; var b = 2; var c = require('a')()",
    "var name = 'a'; require(name);",
    "() => require('a');"
  ],
  invalid: [{
    code: "require('a');",
    errors: [{message: 'Use import instead of require'}]
  }, {
    code: "var a = require('a');",
    errors: [{message: 'Use import instead of require'}]
  }, {
    code: "var {a} = require('a')",
    errors: [{message: 'Use import instead of require'}]
  }]
});
