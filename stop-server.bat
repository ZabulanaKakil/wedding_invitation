@echo off
cd /d "%~dp0"

echo Stopping wedding invitation dev server...

set "KILLED=0"

REM Kill whatever is listening on Vite's default port (5173)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  echo Killing process on port 5173 ^(PID %%a^)...
  taskkill /F /PID %%a >nul 2>&1
  set "KILLED=1"
)

REM Also stop a window started with the known title, if any
taskkill /FI "WINDOWTITLE eq Wedding Invite Dev*" /F >nul 2>&1

if "%KILLED%"=="1" (
  echo Server stopped.
) else (
  echo No server found on port 5173. It may already be stopped.
)

echo.
pause
