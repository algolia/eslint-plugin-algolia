#! /bin/sh

if test -n "$(git status --porcelain)"; then
  echo "Your git directory is unclean"
  exit
fi

npm version
npm run build
git push
git push --tags
npm publish
