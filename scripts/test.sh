#! /bin/sh

files=$(find rules/__tests__/ -type f)
for file in $files; do
  node $file
done

npm run lint
