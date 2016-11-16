@echo off
rem set MYAPPSROOT="C:\Program Files"
set D=%MYAPPSROOT%\MongoDB32\bin
set PATH=%D%;%PATH%

call stop.bat
timeout 3
call clean.bat
rem exit

mkdir databasefiles                           |rem create database dir
start /MIN mongod.exe --dbpath %CD%\databasefiles  |rem start db
timeout 3
call mongo.exe 127.0.0.1:27017/dbtodo  <11.js |rem add users: root/1111, user1/password1
rem add initial data to db:
call mongo.exe 127.0.0.1:27017/dbtodo --username user1 --password password1 <21.js
