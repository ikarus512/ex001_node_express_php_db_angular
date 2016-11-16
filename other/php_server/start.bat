@echo off
cls
start chrome "http://localhost:8000/public/index.htm"
rem set MYAPPSROOT="C:\Program Files"
set PATH=%MYAPPSROOT%\PHP5;%PATH%

copy /Y %MYAPPSROOT%\PHP5\php.ini-development php.ini
echo extension=php_mysql.dll      >>php.ini
echo extension=php_mongo.dll      >>php.ini
echo extension=php_pdo_mysql.dll  >>php.ini
echo extension_dir = "ext"        >>php.ini

start php -S localhost:8000 -t .    -c %CD%\php.ini    router.php
