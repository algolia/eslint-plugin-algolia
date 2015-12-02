#! /bin/sh

rm -rf dist && mkdir -p dist/rules
for file in `echo rules/*.js`; do
  babel $file -o dist/${file}
done
