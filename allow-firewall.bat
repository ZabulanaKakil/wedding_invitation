@echo off
:: Adds a Windows Firewall allow rule for Vite port 5173 (phones on same Wi-Fi).
:: Requests Administrator once via UAC.

net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Requesting Administrator permission...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

cd /d "%~dp0"

netsh advfirewall firewall delete rule name="Wedding Invite Vite 5173" >nul 2>&1
netsh advfirewall firewall add rule name="Wedding Invite Vite 5173" dir=in action=allow protocol=TCP localport=5173 profile=private,domain description="Allow Vite wedding invite dev server for phones on the same network"

if %errorlevel% equ 0 (
  echo.
  echo Done. Port 5173 is allowed on Private/Domain networks.
  echo Restart start-server.bat if it is already running, then open the Network URL on your phone.
) else (
  echo.
  echo Failed to add the firewall rule.
)

echo.
pause
