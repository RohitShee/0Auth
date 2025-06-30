# utils/api_key.py
import secrets

def generate_api_key():
    return secrets.token_hex(32)  # 64-char secure key
