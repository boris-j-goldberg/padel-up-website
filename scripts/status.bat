@echo off
echo cheeking  status...
tasklist | findstr /i "   node   java "
pause