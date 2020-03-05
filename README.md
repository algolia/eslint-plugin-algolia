# eslint-plugin-algolia

Specific rules that were made by Algolia, mostly for Algolia's project

## Usage

```js
npm install --dev eslint-plugin-algolia

yarn add -D eslint-plugin-algolia
```

## Eslint

If you are looking for our shared config, check out [`eslint-config-algolia`](https://yarn.pm/eslint-config-algolia) instead.

## Rules

### `func-style-toplevel`

> Will enforce function declaration at the top level of a file.

```json
{
  "rules": {
    "func-style-toplevel": "error"
  }
}
```

#### Valid

```js
function bar() {}

if (any) {
  // no longer at top level
  const foo = () => {};
}
```

#### Invalid

```js
const foo = () => {};

const foo = function() {};

const foo = function bar() {};
```
