@echo off
cd ..
start /MIN node src_server/index.js
call ./node_modules/.bin/mocha test_server/*/*.js
taskkill /IM node.exe
