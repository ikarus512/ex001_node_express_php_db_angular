@echo off
rem exit

call stop.bat
timeout 4
call clean.bat
call init.bat

start /MIN %MYAPPSROOT%\mysql\bin\mysqld --console --bind-address=127.0.0.1 --port=1233 --datadir=%CD%\db1 --basedir=%MYAPPSROOT%\mysql
