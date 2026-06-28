@echo off
set "SCRIPT_DIR=%~dp0"
echo npm run bump patch -- --commit
call npm run bump patch -- --commit
pause
