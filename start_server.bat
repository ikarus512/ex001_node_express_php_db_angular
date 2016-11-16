@echo off
start chrome "http://localhost/will_be_redirected_to_https"
rem npm init
node src_server/index.js
rem node-debug src_server/index.js



rem npm un -g babel-cli express-generator node-inspector
rem npm ls -g
rem npm cache ls -g
rem npm cache clean -g
