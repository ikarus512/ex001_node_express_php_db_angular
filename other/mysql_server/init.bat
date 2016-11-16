@echo off
rem exit
rem set PATH=%MYAPPSROOT%\mysql\bin;%PATH%


mkdir db1       |rem Dir for database
%MYAPPSROOT%\mysql\bin\mysqld --initialize --initialize-insecure --console --log_syslog=0 --datadir=%CD%\db1 --basedir=%MYAPPSROOT%\mysql --init-file=%CD%\init.commands
