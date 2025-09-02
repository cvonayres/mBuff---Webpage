# mBuff Robot Control Interface 🤖

A beautiful, kid-friendly web interface for controlling the mBuff robot. Built with React, TypeScript, and Tailwind CSS.

---

## ✨ Features

- 🎮 **Intuitive Controls**: Kid-friendly joystick interface with colorful buttons  
- 💃 **Dance Moves**: Pre-programmed dance routines with fun animations  
- 🎵 **Songs & Sounds**: Play music and robot sayings  
- 📸 **Live Camera Feed**: Real-time video from the robot's camera  
- 🔄 **Rotation Controls**: Corner buttons rotate the robot in all four diagonal directions  
- 🐢 **Speed Controls**: Adjustable movement speed (1–10) via ± buttons  
- 📱 **Responsive Design**: Works on tablets, phones and computers  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- mBuff robot with API server running

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/mbuff-robot-control.git
cd mbuff-robot-control
````

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
cp .env.example .env
# IMPORTANT: Edit .env with your robot's actual settings
nano .env  # or use your preferred editor
```

🔒 **SECURITY NOTE**: Never commit your `.env` file to version control!

Update the `.env` file with your robot's actual settings:

```env
VITE_ROBOT_API_URL=http://your-robot-ip:5000
MBOT_HOST=your-robot-ip
MBOT_PORT=9000
```

Start the development server:

```bash
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173)

---

## 🕹️ Usage

### Basic Controls

* **Direction Pad**: Click the blue circle areas to move forward, backward, left or right.
* **STOP Button**: Red center button for emergency stop.
* **Corner Rotations**: Pink, cyan, yellow and orange corner buttons rotate the robot clockwise or counter-clockwise on the top and bottom corners.
* **Speed**: Use the ± buttons to adjust movement speed (1–10).

### Entertainment

* **Dance Moves**: Choose from 4 fun dance routines.
* **Songs**: Play 4 different robot songs.
* **Sayings**: Make mBuff speak 6 different phrases.

### Camera

* **Live Feed**: View real-time camera feed from the robot.
* **Connection Status**: See robot connection and battery level.

---

## 🛠 Technical Details

### Built With

* React 18 – UI framework
* TypeScript – Type safety
* Tailwind CSS – Styling
* Vite – Build tool
* Lucide React – Icons

### Project Structure

```
src/
├── components/          # React components
│   ├── RobotHeader.tsx     # Header with status
│   ├── ControlsSection.tsx # Main control interface  
│   ├── DanceSection.tsx    # Dance moves
│   ├── SayingsSection.tsx  # Robot sayings
│   ├── CameraFeed.tsx      # Live camera
│   └── RobotFooter.tsx     # Footer
├── services/            # API services
│   └── robotApi.ts         # Robot API client
├── config/              # Configuration
│   └── robot.ts            # Robot settings
├── types/               # TypeScript types
│   └── robot.ts            # Type definitions
└── hooks/               # Custom hooks
    └── useRobotStatus.ts   # Status monitoring
```

### API Endpoints

**Movement Controls**

* `POST /api/move/forward` – Move forward
* `POST /api/move/backward` – Move backward
* `POST /api/move/left` – Move left
* `POST /api/move/right` – Move right
* `POST /api/move/stop` – Stop movement
* `POST /api/move/speedup` – Increase speed
* `POST /api/move/speeddown` – Decrease speed

**Rotation Controls**

* `POST /api/rotate/topleft` – Rotate top-left (counter-clockwise)
* `POST /api/rotate/topright` – Rotate top-right (clockwise)
* `POST /api/rotate/bottomleft` – Rotate bottom-left (clockwise)
* `POST /api/rotate/bottomright` – Rotate bottom-right (counter-clockwise)

**Entertainment Controls**

* `POST /api/dance/{id}` – Execute one of the pre-programmed dance moves.

  * `{id}` should be between 1 and 4 (1=Wiggle Dance, 2=Spin Move, 3=Happy Bounce, 4=Robot Shuffle).

* `POST /api/song/{id}` – Play a song.

  * `{id}` should be between 1 and 4 (1=Happy Song, 2=Robot Beeps, 3=Fun Tune, 4=Dance Beat).

* `POST /api/say/{id}` – Make the robot speak a phrase.

  * `{id}` should be between 1 and 6 (1=Hello Friend!, 2=I am mBuff!, 3=Let’s play!, 4=You are awesome!, 5=Time to dance!, 6=Beep boop!).

**Status & Camera**

* `GET /api/status` – Robot connection status and battery level
* `GET /api/camera/feed` – Camera stream URL

---

## 🎨 Customization

### Adding New Dance Moves

Edit `src/config/robot.ts` and add to the `DANCE_MOVES` array:

```ts
{ id: 5, name: 'New Dance', emoji: '🪩', color: 'bg-purple-200 hover:bg-purple-300' }
```

### Changing Colors

The interface uses Tailwind CSS classes. Modify colors in component files or extend the theme in `tailwind.config.js`.

### Adding New Controls

* Add new endpoints to `src/config/robot.ts`
* Add API methods to `src/services/robotApi.ts`
* Create UI components and wire up the functionality

---

## 🙌 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 💡 Acknowledgments

* Built for kids to have fun with robotics
* Inspired by kid-friendly design principles
* Thanks to the mBuff robot community

---

## 📞 Support

If you have questions or need help:

* Open an issue on GitHub
* Check the robot's API documentation
* Make sure your robot is connected to the same network

```
```
