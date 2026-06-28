@echo off
set "SCRIPT_DIR=%~dp0"
echo current-dir="%CD%"
echo npm run bump minor
call npm run bump minor
pause
