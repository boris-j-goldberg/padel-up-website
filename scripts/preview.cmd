@echo off
REM Simple local preview script for the Padel-Up static website
REM Usage: double-click scripts\preview.cmd, or run from repo root

setlocal

REM ============================================================
REM CANONICAL LOCAL DEV PORT — change only this value
REM Keep in sync with RELEASE_CHECKLIST.md and other docs.
REM ============================================================
set PORT=8080

echo.
echo Starting local preview for Padel-Up website...
echo.

where npx >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npx not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Move to the folder that contains index.html (sibling of scripts/)
cd /d "%~dp0\.."

echo.
echo Opening browser to http://localhost:%PORT%
echo Press Ctrl+C in this window to stop the server.
echo.

start http://localhost:%PORT%
npx serve . -p %PORT%

pause
