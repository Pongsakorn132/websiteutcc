@echo off
setlocal enabledelayedexpansion
REM Try to find a JDK that has javac.exe and use it for this run.

set "FOUND="
for %%D in (
  "C:\Program Files\Java\jdk-17"
  "C:\Program Files\Java\jdk-21"
  "C:\Program Files\Microsoft\jdk-17.0.13.11-hotspot"
  "C:\Program Files\Microsoft\jdk-21.0.5.11-hotspot"
  "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot"
  "C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot"
) do (
  if exist "%%~D\bin\javac.exe" set "FOUND=%%~D" & goto :use
)

for /f "delims=" %%i in ('dir /b /ad "C:\Program Files\Java\jdk-*" 2^>nul') do (
  set "cand=C:\Program Files\Java\%%i"
  if exist "!cand!\bin\javac.exe" set "FOUND=!cand!" & goto :use
)
for /f "delims=" %%i in ('dir /b /ad "C:\Program Files\Microsoft\jdk-*" 2^>nul') do (
  set "cand=C:\Program Files\Microsoft\%%i"
  if exist "!cand!\bin\javac.exe" set "FOUND=!cand!" & goto :use
)
for /f "delims=" %%i in ('dir /b /ad "C:\Program Files\Eclipse Adoptium\jdk-*" 2^>nul') do (
  set "cand=C:\Program Files\Eclipse Adoptium\%%i"
  if exist "!cand!\bin\javac.exe" set "FOUND=!cand!" & goto :use
)

echo No JDK found. Please install JDK 17 or 21 from:
echo   https://learn.microsoft.com/en-us/java/openjdk/download
echo   or https://adoptium.net/
echo Then run this script again.
exit /b 1

:use
set "JAVA_HOME=!FOUND!"
echo Using JAVA_HOME=!JAVA_HOME!
"!JAVA_HOME!\bin\javac.exe" -version
echo.
cd /d "%~dp0"
call .\mvnw.cmd -DskipTests spring-boot:run
endlocal
