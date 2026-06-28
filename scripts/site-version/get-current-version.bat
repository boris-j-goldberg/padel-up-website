@echo off
set "SCRIPT_DIR=%~dp0"
REM cd /d "%SCRIPT_DIR%"..\..\mobile\padel-up
echo current-dir="%CD%"
echo npm run version --silent
call npm run version --silent
REM npm run bump minor
REM npm run bump major
REM npm run bump 2.3.1          # explicit version
REM npm run bump patch -- --commit
rem npm run version 
rem npm run version --silent
pause
