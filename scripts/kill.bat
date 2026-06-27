@echo off
echo killing all node processes...
taskkill   /IM "node.exe" /F

tasklist | findstr /i " node  "
echo node killed
pause