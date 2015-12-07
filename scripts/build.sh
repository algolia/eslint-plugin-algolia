#! /bin/sh

rm -rf dist
mkdir dist/
mkdir dist/rules

babel -q index.js -o dist/index.js
for file in `echo rules/*.js`; do
  babel $file -o dist/${file}
done
