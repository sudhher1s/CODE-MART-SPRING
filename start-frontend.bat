@echo off
REM CodeMart - Start Frontend
REM Make sure Node.js and npm are installed

cd /d "%~dp0frontend"
echo.
echo ========================================
echo Starting CodeMart Frontend (React)
echo ========================================
echo.
echo Frontend will run on: http://localhost:3000
echo.

npm start

pause
