@echo off
echo ==========================================
echo      Aditya Campaign Site Server
echo ==========================================

echo [1/3] Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please download and install it from: https://nodejs.org/
    echo After installing, restart this script.
    echo.
    pause
    exit /b
)

echo Node.js found.

echo.
echo [2/3] Installing dependencies...
if not exist "node_modules" (
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo [3/3] Starting server...
echo Server will run at: http://localhost:5000
echo (Keep this window open to keep the server running)
echo.

npm start
pause
