# Drone Control UI

A modern, responsive web interface for controlling a flying drone, developed during a defense tech hackathon. This application provides an intuitive dual joystick control system for precise drone maneuvering, following standard UAV control patterns used in military and commercial applications.

![Drone Control UI](https://via.placeholder.com/800x450.png?text=Drone+Control+UI)

## Features

- **Dual Joystick Interface**: Left and right controls for comprehensive drone movement
- **Responsive Design**: Works on both desktop (mouse) and mobile/tablet (touch) devices
- **Real-time Position Feedback**: Visual and numerical position indicators
- **Input Mode Toggle**: Switch between mouse and touch input methods
- **Directional Indicators**: Shows current movement direction (Forward, Left, Right, etc.)
- **Modern UI**: Built with Next.js and Tailwind CSS for a sleek, modern interface
- **Standard Flight Controls**: Implements the popular "Mode 2" control scheme used by professional drone pilots

## Control Scheme Explained

This interface implements the standard "Mode 2" control configuration used in professional drone piloting:

### Left Joystick: Altitude and Rotation
- **Vertical Axis (Y)**: Controls throttle/altitude
  - Up: Increase altitude
  - Center: Maintain current altitude
  - Down: Decrease altitude
- **Horizontal Axis (X)**: Controls yaw (rotation)
  - Left: Rotate drone counterclockwise
  - Center: Maintain current heading
  - Right: Rotate drone clockwise

### Right Joystick: Directional Movement
- **Vertical Axis (Y)**: Controls pitch (forward/backward tilt)
  - Up: Tilt forward (move forward)
  - Center: Level position
  - Down: Tilt backward (move backward)
- **Horizontal Axis (X)**: Controls roll (left/right tilt)
  - Left: Tilt left (move left)
  - Center: Level position
  - Right: Tilt right (move right)

This control scheme allows for precise, intuitive flight control with six degrees of freedom, enabling complex maneuvers while maintaining stability.

## Technical Overview

This project is built with:

- [Next.js](https://nextjs.org) - React framework for the frontend
- [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer experience
- [Tailwind CSS](https://tailwindcss.com/) - For styling and responsive design
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Lodash](https://lodash.com/) - Utility functions, particularly for debouncing

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drone-control-ui.git
cd drone-control-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the interface.

## Usage

The interface provides real-time feedback on joystick positions and drone movement:

- **Position Values**: Monitor the exact X,Y coordinates of each joystick (0-255 range)
- **Movement Description**: Text descriptions of current control actions
- **Quadrant Indicators**: Shows which quadrant of the control grid you're in
- **Mobile Compatibility**: Automatically detects and switches to touch input on mobile devices

## Project Structure

- `src/app/page.tsx` - Main component containing the flight control interface and joystick logic
- `src/components/ui/` - UI components like cards, buttons, and switches
- `src/lib/` - Utility functions

## Design Rationale

The interface was designed with several key principles in mind:

1. **Familiarity**: Follows standard drone control patterns that experienced pilots will recognize
2. **Accessibility**: High contrast visuals and clear feedback for optimal usability
3. **Cross-platform**: Works equally well on desktop and mobile devices
4. **Responsiveness**: Provides immediate visual feedback to control inputs
5. **Simplicity**: Clean, focused interface without unnecessary distractions

The dark theme was chosen for:
- Reduced eye strain during extended flight operations
- Better visibility in various lighting conditions
- Optimal contrast for control elements

## Integration with Drone Hardware

This UI is designed to connect with drone hardware through a backend API (not included in this repository). To integrate with your drone hardware:

1. Implement an API endpoint that accepts joystick position data
2. Modify the position handling functions to send data to your API
3. Add authentication as needed for secure communication

Example integration point in code:
```typescript
// In the joystick position update function
const sendControlsToAPI = async (leftPos: Position, rightPos: Position) => {
  try {
    await fetch('https://your-drone-api.com/controls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        throttle: leftPos.y,
        yaw: leftPos.x,
        pitch: rightPos.y,
        roll: rightPos.x,
        timestamp: Date.now()
      })
    });
  } catch (error) {
    console.error('Failed to send control data:', error);
  }
};
```

## Future Development

- Telemetry display from the drone (altitude, speed, battery, GPS)
- Battery status monitoring with low-battery warnings
- Camera feed integration for FPV (First Person View) flying
- Mission planning capabilities with waypoint setting
- Autonomous flight controls and return-to-home functionality
- Geofencing capabilities for safety restrictions
- Emergency override controls

## License

MIT

## Acknowledgments

- Developed during a defense tech hackathon
- Thanks to all team members who contributed to the project
- Inspired by professional UAV control systems used in defense applications
