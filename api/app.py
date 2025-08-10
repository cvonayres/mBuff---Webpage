from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

MBOT_HOST = os.getenv("MBOT_HOST", "robot-mbot")
MBOT_PORT = int(os.getenv("MBOT_PORT", 9000))

def send_robot_command(command):
    """Send command to robot and return response"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(5)  # 5 second timeout
            s.connect((MBOT_HOST, MBOT_PORT))
            s.sendall(f"{command}\n".encode())
            
            # Try to receive response (optional)
            try:
                response = s.recv(1024).decode().strip()
                return {"success": True, "response": response, "command": command}
            except:
                return {"success": True, "response": "Command sent", "command": command}
                
    except Exception as e:
        return {"success": False, "error": str(e), "command": command}

# Movement Controls
@app.route('/api/move/forward', methods=['POST'])
def move_forward():
    return jsonify(send_robot_command("FORWARD"))

@app.route('/api/move/backward', methods=['POST'])
def move_backward():
    return jsonify(send_robot_command("BACKWARD"))

@app.route('/api/move/left', methods=['POST'])
def move_left():
    return jsonify(send_robot_command("LEFT"))

@app.route('/api/move/right', methods=['POST'])
def move_right():
    return jsonify(send_robot_command("RIGHT"))

@app.route('/api/move/stop', methods=['POST'])
def stop():
    return jsonify(send_robot_command("STOP"))

# Spin Controls
@app.route('/api/spin/left', methods=['POST'])
def spin_left():
    return jsonify(send_robot_command("SPIN_LEFT"))

@app.route('/api/spin/right', methods=['POST'])
def spin_right():
    return jsonify(send_robot_command("SPIN_RIGHT"))

@app.route('/api/spin/back-left', methods=['POST'])
def spin_back_left():
    return jsonify(send_robot_command("SPIN_BACK_LEFT"))

@app.route('/api/spin/back-right', methods=['POST'])
def spin_back_right():
    return jsonify(send_robot_command("SPIN_BACK_RIGHT"))

# Dance Controls
@app.route('/api/dance', methods=['POST'])
def dance():
    data = request.get_json() or {}
    dance_id = data.get('dance_id', 1)
    return jsonify(send_robot_command(f"DANCE_{dance_id}"))

# Song Controls
@app.route('/api/song', methods=['POST'])
def play_song():
    data = request.get_json() or {}
    song_id = data.get('song_id', 1)
    return jsonify(send_robot_command(f"SONG_{song_id}"))

# Speaking Controls
@app.route('/api/speak', methods=['POST'])
def speak():
    data = request.get_json() or {}
    saying_id = data.get('saying_id', 1)
    return jsonify(send_robot_command(f"SPEAK_{saying_id}"))

# Status Check
@app.route('/api/status', methods=['GET'])
def get_status():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(2)
            s.connect((MBOT_HOST, MBOT_PORT))
            s.sendall(b"STATUS\n")
            
            return jsonify({
                "connected": True,
                "battery": 85,  # Mock battery level - replace with actual if available
                "status": "connected",
                "host": MBOT_HOST,
                "port": MBOT_PORT
            })
    except Exception as e:
        return jsonify({
            "connected": False,
            "battery": 0,
            "status": "disconnected",
            "error": str(e),
            "host": MBOT_HOST,
            "port": MBOT_PORT
        })

# Camera Feed (placeholder - implement based on your robot's camera setup)
@app.route('/api/camera/feed', methods=['GET'])
def camera_feed():
    # Return placeholder or implement actual camera stream
    return jsonify({"message": "Camera feed not implemented yet"})

# Health Check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "mBuff Robot API"})

if __name__ == "__main__":
    print(f"[mBuff API] Starting server...")
    print(f"[mBuff API] Robot connection: {MBOT_HOST}:{MBOT_PORT}")
    app.run(host="0.0.0.0", port=5000, debug=False)