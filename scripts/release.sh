#! /bin/sh

current=`cat VERSION`
read -p "New version number (current is ${current}): " version
rm -f VERSION && echo $version > VERSION
npm run build
npm version $version
git commit package.json VERSION dist/ -m "v$version"
git tag "v$version"
git push
git push --tags
npm publish
