/**
 * @file Tests for func-style-toplevel rule.
 * @author Samuel Bodin
 */

// Requirements
const path = require('path');

const { RuleTester } = require('eslint');

const rule = require('../func-style-toplevel');

const BABEL_ESLINT = path.join(__dirname, '../../node_modules', 'babel-eslint');

// Tests

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
});

ruleTester.run('func-style-toplevel', rule, {
  valid: [
    {
      code: `
      function foo(){};
      `,
    },
    {
      code: `
      {
        var foo = () => {};
      }
      `,
    },
    {
      code: `
      function foo() {
        var foo = () => {};
      };
      `,
      parser: BABEL_ESLINT,
    },
    {
      code: `
      function foo() {
        function bar() {};
      };
      `,
      parser: BABEL_ESLINT,
    },
  ],

  invalid: [
    {
      code: `
        var foo = () => {};
      `,
      errors: [
        {
          messageId: 'declaration',
        },
      ],
    },
    {
      code: `
        const foo = () => {};
      `,
      errors: [
        {
          messageId: 'declaration',
        },
      ],
    },
    {
      code: 'var foo = function(){};',
      errors: [
        {
          messageId: 'declaration',
        },
      ],
    },
    {
      code: 'var foo = function bar(){};',
      errors: [
        {
          messageId: 'declaration',
        },
      ],
    },
  ],
});
