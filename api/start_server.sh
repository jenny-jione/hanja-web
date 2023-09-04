#!/bin/bash
if [ ! -d ./venv/bin/ ]; then
    echo -e "\n[INFO] >> Initiating server, please wait...\n"
	python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    echo -e "\n[INFO] >> Server lunching, please wait...\n"
    uvicorn server.main:app --host 0.0.0.0 --port 3001 --reload # 테스트용
else
    echo 'hi'
    echo -e "\n[INFO] >> Ready to lunch server, checking new dependencies...\n"
    ls
    source venv/bin/activate
    pip install -r requirements.txt
    uvicorn server.main:app --host 0.0.0.0 --port 3001 --reload # 테스트용
fi