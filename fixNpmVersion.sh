#!/bin/bash
export gitMessage=$(git show -s --format=%s)
yarn --no-git-tag-version version --new-version $TRAVIS_TAG
git config user.name "$(git log -1 --pretty=format:'%an')"
git config user.email "$(git log -1 --pretty=format:'%ae')"
git commit --no-verify -am "$gitMessage" || exit 0
git tag -d $TRAVIS_TAG
git tag $TRAVIS_TAG
git remote add github https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git > /dev/null 2>&1
git push github :$TRAVIS_TAG
git push github $TRAVIS_TAG