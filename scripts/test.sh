#! /bin/sh

for file in `echo **/__tests__/*-test.js`; do
  babel-node $file
done

npm run lint
