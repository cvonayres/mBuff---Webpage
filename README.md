# mBuff Robot Control Interface ??

A beautiful, kid-friendly web interface for controlling the mBuff robot. Built with React, TypeScript, and Tailwind CSS.

![mBuff Robot Control](https://via.placeholder.com/800x400/gradient/ffffff?text=mBuff+Robot+Control+Interface)

## ? Features

- **?? Intuitive Controls**: Kid-friendly joystick interface with colorful buttons
- **?? Dance Moves**: Pre-programmed dance routines with fun animations  
- **?? Songs & Sounds**: Play music and robot sayings
- **?? Live Camera Feed**: Real-time video from the robot's camera
- **?? Spin Controls**: Corner buttons for spinning movements
- **? Speed Control**: Adjustable movement speed (1-10)
- **?? Responsive Design**: Works on tablets, phones, and computers

## ?? Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- mBuff robot with API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mbuff-robot-control.git
   cd mbuff-robot-control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # IMPORTANT: Edit .env with your robot's actual settings
   nano .env  # or use your preferred editor
   ```
   
   **🔒 SECURITY NOTE**: Never commit your `.env` file to version control!
   
   Update the `.env` file with your robot's actual settings:
   ```
   VITE_ROBOT_API_URL=http://your-robot-ip:5000
   MBOT_HOST=your-robot-ip
   MBOT_PORT=9000
   ```
   
4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

## ?? Usage

### Basic Controls
- **Direction Pad**: Click the blue circle areas to move forward/backward/left/right
- **STOP Button**: Red center button for emergency stop
- **Corner Spins**: Pink/cyan/yellow/orange corner buttons for spinning
- **Speed**: Use +/- buttons to adjust movement speed

### Entertainment
- **Dance Moves**: Choose from 4 fun dance routines
- **Songs**: Play 4 different robot songs  
- **Sayings**: Make mBuff speak 6 different phrases

### Camera
- **Live Feed**: View real-time camera feed from the robot
- **Connection Status**: See robot connection and battery level

## ??? Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Project Structure
```
src/
+-- components/          # React components
�   +-- RobotHeader.tsx     # Header with status
�   +-- ControlsSection.tsx # Main control interface  
�   +-- DanceSection.tsx    # Dance moves
�   +-- SayingsSection.tsx  # Robot sayings
�   +-- CameraFeed.tsx      # Live camera
�   +-- RobotFooter.tsx     # Footer
+-- services/            # API services
�   +-- robotApi.ts         # Robot API client
+-- config/              # Configuration
�   +-- robot.ts            # Robot settings
+-- types/               # TypeScript types
�   +-- robot.ts            # Type definitions
+-- hooks/               # Custom hooks
    +-- useRobotStatus.ts   # Status monitoring
```

### API Endpoints
The interface communicates with these robot API endpoints:

#### Movement Controls
- `POST /api/move/forward` - Move forward
- `POST /api/move/backward` - Move backward  
- `POST /api/move/left` - Move left
- `POST /api/move/right` - Move right
- `POST /api/move/stop` - Stop movement

#### Spinning Controls
- `POST /api/spin/left` - Spin left
- `POST /api/spin/right` - Spin right
- `POST /api/spin/back-left` - Spin back-left
- `POST /api/spin/back-right` - Spin back-right

#### Entertainment Controls
- `POST /api/dance` - Execute dance move
  ```json
  { "dance_id": 1 }  // 1=Wiggle Dance, 2=Spin Move, 3=Happy Bounce, 4=Robot Shuffle
  ```
- `POST /api/song` - Play song
  ```json
  { "song_id": 2 }   // 1=Happy Song, 2=Robot Beeps, 3=Fun Tune, 4=Dance Beat
  ```
- `POST /api/speak` - Robot sayings
  ```json
  { "saying_id": 3 } // 1=Hello Friend, 2=I am mBuff, 3=Let's play, 4=You are awesome, 5=Time to dance, 6=Beep boop
  ```

#### Status & Camera
- `GET /api/status` - Robot connection status and battery level
- `GET /api/camera/feed` - Camera stream URL

## ?? Customization

### Adding New Dance Moves
Edit `src/config/robot.ts` and add to the `DANCE_MOVES` array:
```typescript
{ id: 5, name: 'New Dance', emoji: '??', color: 'bg-purple-200 hover:bg-purple-300' }
```

### Changing Colors
The interface uses Tailwind CSS classes. Modify colors in component files or extend the theme in `tailwind.config.js`.

### Adding New Controls
1. Add new endpoints to `src/config/robot.ts`
2. Add API methods to `src/services/robotApi.ts`  
3. Create UI components and wire up the functionality

## ?? Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ?? License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ?? Acknowledgments

- Built for kids to have fun with robotics
- Inspired by kid-friendly design principles
- Thanks to the mBuff robot community

## ?? Support

If you have questions or need help:
- Open an issue on GitHub
- Check the robot's API documentation
- Make sure your robot is connected to the same network

---

**Made with ?? for amazing kids and their robots!** ???