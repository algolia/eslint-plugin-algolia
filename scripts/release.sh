#! /bin/sh

if test -n "$(git status --porcelain)"; then
  echo "Your git directory is unclean"
  exit
fi

yarn publish
git push
git push --tags
