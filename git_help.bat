@echo off
cls

rem First, crete new repo on github site, then:
rem git init ex001_node_express_php_db_angular
rem cd ex001_node_express_php_db_angular
rem git config user.email "ikarus512@site.org"
rem git config user.name "ikarus512"
rem git remote add origin https://github.com/ikarus512/ex001_node_express_php_db_angular.git
rem git add -A
rem git commit -m "First version"
rem git push -u origin master
rem git diff
rem git diff origin/master master

rem git clone git@github.com:ikarus512/test1.git
rem git diff -w
rem git status
rem git add -A && git commit -m "cosmetic" && git push origin master
rem git add -A; git commit -am "cosmetic"; git push origin master

rem git clone https://github.com/ikarus512/test1.git   && cd test1
rem mkdir test1 && cd test1 && git init
rem git init test1   && cd test1
rem git config user.email "ikarus512@site.org"
rem git config user.name "ikarus512"
rem git remote rm origin
rem git remote add origin https://github.com/ikarus512/test1.git
rem git remote add origin git@github.com:ikarus512/test1.git

rem git remote -v    &REM show origins
rem git remote set-url origin https://github.com/ikarus512/test1.git

rem https://help.github.com/articles/error-permission-denied-publickey/#platform-windows
rem https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

rem git checkout master         &rem switch to branch
rem git pull origin master      &rem get last changes
rem  git add src
rem  git rm  src/111
rem  git commit -m "Your message about the commit"
rem  git push -u origin master
rem git merge ver100            &rem merge current br (master) with ver100 br
rem git push -u origin master

rem git branch                  &rem show branches
rem git status
rem git status -s
rem git log
rem git log -p -2              &rem with diffs, only 2 last commits
rem git log --pretty=oneline
rem git log --since=2.weeks
rem git diff                   &rem see what not yet staged
rem git diff origin/master master  &rem local branch vs remote branch

rem git checkout -b ver100      &rem create and switch to new branch
rem git add src/2.js
rem git commit -m "added src/2.js to branch ver100"
rem git push origin ver100
