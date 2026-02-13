@echo off
REM CodeMart - Complete Setup Script

echo.
echo ========================================
echo CodeMart - Complete Setup
echo ========================================
echo.

REM Check if Maven is installed
mvn -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven and add it to PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js and npm
    pause
    exit /b 1
)

echo.
echo 1. Building Backend...
cd /d "%~dp0backend"
call mvn clean install
if errorlevel 1 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)

echo.
echo 2. Installing Frontend Dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MySQL is running
echo 2. Execute database\setup.sql in MySQL
echo 3. Run 'start-backend.bat' in a new terminal
echo 4. Run 'start-frontend.bat' in another new terminal
echo.
pause
