@echo off
title PhotoMagic Studio OS - Local AI Worker
echo ========================================================
echo   PhotoMagic Studio OS - Local CUDA AI Inference Worker
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Checking Python dependencies...
python -m pip install -r requirements.txt --quiet

echo [2/2] Launching Local AI Worker on http://127.0.0.1:8000 ...
python ai_worker.py

pause
