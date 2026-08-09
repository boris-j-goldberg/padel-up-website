@echo off
set "SCRIPT_DIR=%~dp0"
echo git add .
cd ../..
call git add . 
pause
