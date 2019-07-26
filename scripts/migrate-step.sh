#!/bin/bash

clone="../clone-angular-200"
app=$1
root=$(pwd)

copy_step () {
  name=$1
  echo "copy step $name"

  path=steps/$name

  ng g app $name --minimal || exit 1

  cd $clone
  branch=$(git branch | grep \* | cut -d ' ' -f2)
  cd $root

  rm -r $path/src/app && cp -r $clone/src/app $path/src/app

  rm -r $path/src/environments && cp -r $clone/src/environments $path/src/
  rm -r $path/src/assets && cp -r $clone/src/assets $path/src/assets
  rm -r $path/src/styles.css && cp -r $clone/src/styles.css $path/src/styles.css
  rm -r $path/src/index.html && cp -r $clone/src/index.html $path/src/index.html

  git add .
  git status
  git commit -m "feat($name): create project from branch $branch"
}

if [ -d $clone/src/app ]; then
  echo "generate"

  copy_step "$app"
  cd $clone
  git checkout $(git branch | grep \* | cut -d ' ' -f2)-solution
  cd $root
  copy_step "$app-solution"

  ng serve $app-solution -o
fi
