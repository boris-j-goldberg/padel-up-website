@echo off
set "SCRIPT_DIR=%~dp0"
echo npm run bump major
call npm run bump major
pause
