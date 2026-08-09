@echo off
set "SCRIPT_DIR=%~dp0"
echo git push
cd ../..
call git push 
pause
