import time
import requests
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv("credentials.env")

# CẤU HÌNH
CHANNEL_ID = os.getenv("DISCORD_CHANNEL_ID", "")  # Thay bằng ID kênh
TOKEN = os.getenv("DISCORD_TOKEN", "")  # Thay bằng token
FILE_NAME = "messages.txt"  # File chứa nội dung cần gửi
INTERVAL = 3720  # Thời gian chờ giữa các lần gửi (giây)


def send_message(content):
    """Gửi tin nhắn đến kênh Discord"""

    url = f"https://discord.com/api/v9/channels/{CHANNEL_ID}/messages"
    headers = {"Authorization": TOKEN, "Content-Type": "application/json"}
    data = {"content": content}

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Đã gửi tin nhắn thành công!")
    except requests.exceptions.HTTPError as e:
        if response.status_code == 429:
            retry_after = response.json().get("retry_after", 10)
            print(f"Bị giới hạn tốc độ! Chờ {retry_after} giây...")
            time.sleep(retry_after)
            send_message(content)  # Thử gửi lại
        else:
            print(f"Lỗi khi gửi: {e}")


def read_message_file():
    """Đọc nội dung từ file"""
    try:
        with open(FILE_NAME, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if not content:
                raise ValueError("File rỗng")
            return content
    except FileNotFoundError:
        print(f"Lỗi: Không tìm thấy file {FILE_NAME}")
        sys.exit(1)
    except Exception as e:
        print(f"Lỗi khi đọc file: {e}")
        sys.exit(1)


def countdown(seconds):
    """Hiển thị đếm ngược"""
    for remaining in range(seconds, 0, -1):
        sys.stdout.write(
            f"\rThời gian chờ: {remaining // 60} phút {remaining % 60} giây..."
        )
        sys.stdout.flush()
        time.sleep(1)
    print("\n")


def main():
    print("Bắt đầu chương trình gửi tin nhắn tự động")
    print(f"Cấu hình:")
    print(f"- Kênh: {CHANNEL_ID}")
    print(f"- File nội dung: {FILE_NAME}")
    print(f"- Khoảng cách giữa các lần gửi: {INTERVAL} giây ({INTERVAL//3600} tiếng)")

    message_content = read_message_file()
    print(f"\nNội dung sẽ gửi:\n---\n{message_content}\n---")

    while True:
        send_message(message_content)
        countdown(INTERVAL)


if __name__ == "__main__":
    main()
