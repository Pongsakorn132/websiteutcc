@echo off
title UTCC-TP Server
cd /d "%~dp0"
"C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot\bin\java.exe" -jar target\utcctp-0.0.1-SNAPSHOT.jar
pause
