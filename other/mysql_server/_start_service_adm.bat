@echo off
rem Run as administrator

exit

echo #                                                       >my_MySQL_service.ini
echo [mysqld]                                               >>my_MySQL_service.ini
echo # set basedir to your installation path                >>my_MySQL_service.ini
echo basedir=C:\\111\\SQL\\mysql-5.7.16-winx64              >>my_MySQL_service.ini
echo # set datadir to the location of your data directory   >>my_MySQL_service.ini
echo datadir=C:\\111\\SQL\\db1                              >>my_MySQL_service.ini
echo port=1233                                              >>my_MySQL_service.ini
echo bind-address=127.0.0.1                                 >>my_MySQL_service.ini


rem %MYAPPSROOT%\mysql-5.7.16-winx64\bin\mysqld --install-manual my_MySQL --defaults-file=%CD%\my_MySQL_service.ini --local-service
rem net start my_MySQL
rem net stop  my_MySQL
rem sc delete my_MySQL
rem %MYAPPSROOT%\mysql-5.7.16-winx64\bin\mysqld --remove my_MySQL

set /p id=press_Enter
