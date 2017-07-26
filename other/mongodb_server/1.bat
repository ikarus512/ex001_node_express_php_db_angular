@echo off
rem
 set MYAPPSROOT="C:\Apps"
set D=%MYAPPSROOT%\MongoDB32\bin
set PATH=%D%;%PATH%


call mongo.exe 127.0.0.1:27017/clementinejs
