@echo off
cd /d "%~dp0"
title Wedding Invite Dev

echo Starting wedding invitation dev server...
echo.
echo On this PC:     http://localhost:5173
echo On your phone:  use the "Network" URL Vite prints below
echo                 (same Wi-Fi as this PC, e.g. http://192.168.x.x:5173)
echo.
echo Close this window or run stop-server.bat to stop.
echo.

npm run dev -- --host

pause
