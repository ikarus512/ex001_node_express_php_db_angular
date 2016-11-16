@echo off
cls
set d=%CD%
cd ..\..

node_modules\.bin\karma start %d%\karma.conf.js --single-run


exit
set PATH=%CD%\node_modules\.bin;%PATH%
start /MIN node src_server/index.js
start /MIN webdriver-manager start --standalone
rem timeout 4
rem exit
call protractor %d%\conf.js          &rem >%d%\1.1 2>&1
taskkill /IM cmd.exe  >NUL 2>&1
taskkill /IM node.exe >NUL 2>&1
