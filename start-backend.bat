@echo off
REM CodeMart - Start Backend
REM Make sure MySQL is running before starting the backend

cd /d "%~dp0backend"
echo.
echo ========================================
echo Starting CodeMart Backend (Spring Boot)
echo ========================================
echo.
echo Backend will run on: http://localhost:8080
echo.

mvn spring-boot:run

pause
