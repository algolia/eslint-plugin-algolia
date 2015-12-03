import rule from '../relative-require.js';
import {RuleTester} from 'eslint';

// Tests
let ruleTester = new RuleTester();
ruleTester.run('relative-require', rule, {
  valid: [
    // Works only if run in the root folder and these files exists
    "var name = './not_existing_file.ext'; require(name);",
    "require('a.ext')",
    "require('a_module_name')"
  ],
  invalid: [{
    code: "require('./index')",
    errors: [{message: 'Relative require without extension: ./index'}]
  }, {
    code: "require('./not_existing_file.ext')",
    errors: [{message: 'Relative require not existing file: ./not_existing_file.ext'}]
  }]
});
