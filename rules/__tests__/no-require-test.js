import rule from '../force-import-root.js';
import {RuleTester} from 'eslint';

RuleTester.setDefaultConfig({
  parser: 'babel-eslint'
});

function testInvalid(code) {
  return {
    code,
    errors: [{message: 'Prefer import over require'}]
  };
}


// Tests
let ruleTester = new RuleTester();
ruleTester.run('force-import-root', rule, {
  valid: [
    "import a from 'a';",
    "import a from './a';",
    "import a from './a.js';"
  ],
  invalid: [
    testInvalid("require('a');"),
    testInvalid("var a = require('a');"),
    testInvalid("var {a} = require('a')"),
    testInvalid("require('a')()"),
    testInvalid("var a = require('a')()"),
    testInvalid("var a = 1; var b = 2; var c = require('a')()")
    testInvalid("var name = 'a'; require(name);"),
    testInvvalid("() => require('a');"),
  ]
});
