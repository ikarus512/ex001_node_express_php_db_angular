@echo off
exit
cd ..\..
echo "Also install JDK manually"
npm i -S protractor
call node_modules\.bin\webdriver-manager update
