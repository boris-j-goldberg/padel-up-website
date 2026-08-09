@echo off
set "SCRIPT_DIR=%~dp0"
echo git status
cd ../..
call git status 
pause
