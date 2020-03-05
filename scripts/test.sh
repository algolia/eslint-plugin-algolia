#! /bin/sh

files=$(find rules/__tests__/ -type f -name "*.test.js")
for file in $files; do
  echo "Running $file"
  node $file
done

npm run lint
