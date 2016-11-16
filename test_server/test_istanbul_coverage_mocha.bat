@echo off
cd ..
start /MIN node src_server/index.js
call ./node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha -- test_server/*/*.js
taskkill /IM node.exe
