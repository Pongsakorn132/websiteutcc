@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one or more
@REM contributor license agreements.  See the NOTICE file distributed with
@REM this work for additional information regarding copyright ownership.
@REM The ASF licenses this file to You under the Apache License, Version 2.0
@REM (the "License"); you may not use this file except in compliance with
@REM the License.  You may obtain a copy of the License at
@REM
@REM      https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing, software
@REM distributed under the License is distributed on an "AS IS" BASIS,
@REM WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM See the License for the specific language governing permissions and
@REM limitations under the License.
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set MAVEN_PROJECT_DIR=%~dp0
if "%MAVEN_PROJECT_DIR:~-1%"=="\" set MAVEN_PROJECT_DIR=%MAVEN_PROJECT_DIR:~0,-1%
set MAVEN_WRAPPER_JAR=%MAVEN_PROJECT_DIR%\.mvn\wrapper\maven-wrapper.jar
set MAVEN_WRAPPER_PROPERTIES=%MAVEN_PROJECT_DIR%\.mvn\wrapper\maven-wrapper.properties

if not exist "%MAVEN_WRAPPER_PROPERTIES%" (
  echo Missing %MAVEN_WRAPPER_PROPERTIES%
  exit /b 1
)

if not exist "%MAVEN_WRAPPER_JAR%" (
  echo Downloading Maven Wrapper...
  powershell -NoProfile -Command ^
    "Invoke-WebRequest -Uri https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar -OutFile '%MAVEN_WRAPPER_JAR%'" || exit /b 1
)

if defined JAVA_HOME (
  for /f "delims=" %%i in ('powershell -NoProfile -Command "$j=$env:JAVA_HOME; if ($j) { if (Test-Path (Join-Path $j 'bin\java.exe')) { Join-Path $j 'bin\java.exe' } elseif (Test-Path (Join-Path $j 'java.exe')) { Join-Path $j 'java.exe' } else { 'java' } } else { 'java' }"') do set "JAVA_CMD=%%i"
  if not defined JAVA_CMD set JAVA_CMD=java
) else (
  set JAVA_CMD=java
)

"%JAVA_CMD%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECT_DIR%" -classpath "%MAVEN_WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
