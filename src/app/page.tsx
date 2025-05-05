'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState } from 'react';

interface Position {
	x: number;
	y: number;
}
type InputMode = 'mouse' | 'touch';

// Removing unused interface
// interface JoystickState {
// 	position: Position;
// 	isDragging: boolean;
// 	isSpringBack: boolean;
// }

interface JoystickControlProps {
	onPositionChange: (position: Position) => void;
	side: 'Left' | 'Right';
	inputMode: InputMode;
}

const JoystickControl: React.FC<JoystickControlProps> = ({ onPositionChange, side, inputMode }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState<Position>({ x: 127, y: 127 });
	const containerRef = useRef<HTMLDivElement>(null);

	const calculatePosition = (clientX: number, clientY: number): Position => {
		if (!containerRef.current) return position;

		const container = containerRef.current;
		const rect = container.getBoundingClientRect();

		let x = clientX - rect.left;
		let y = rect.bottom - clientY;

		x = Math.max(0, Math.min(x, rect.width));
		y = Math.max(0, Math.min(y, rect.height));

		return {
			x: Math.round((x / rect.width) * 255),
			y: Math.round((y / rect.height) * 255)
		};
	};

	// Mouse event handlers
	const handleMouseStart = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (inputMode !== 'mouse') return;
		e.preventDefault();
		setIsDragging(true);
		const newPosition = calculatePosition(e.clientX, e.clientY);
		setPosition(newPosition);
		onPositionChange(newPosition);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (inputMode !== 'mouse' || !isDragging) return;
		e.preventDefault();
		const newPosition = calculatePosition(e.clientX, e.clientY);
		setPosition(newPosition);
		onPositionChange(newPosition);
	};

	// Global event listeners - moving handlers inside useEffect to fix dependency issues
	useEffect(() => {
		// Define handlers inside useEffect to avoid dependency issues
		const handleMouseEnd = (): void => {
			if (inputMode !== 'mouse') return;
			setIsDragging(false);
		};

		const handleTouchEnd = (): void => {
			if (inputMode !== 'touch') return;
			setIsDragging(false);
		};

		const handleGlobalMouseUp = () => {
			if (inputMode === 'mouse') {
				handleMouseEnd();
			}
		};

		const handleGlobalTouchEnd = () => {
			if (inputMode === 'touch') {
				handleTouchEnd();
			}
		};

		if (inputMode === 'mouse') {
			window.addEventListener('mouseup', handleGlobalMouseUp);
			return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
		} else {
			window.addEventListener('touchend', handleGlobalTouchEnd);
			return () => window.removeEventListener('touchend', handleGlobalTouchEnd);
		}
	}, [inputMode]); // Now we don't need to include the handlers in the dependency array

	// Touch event handlers
	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
		if (inputMode !== 'touch') return;
		e.preventDefault();
		setIsDragging(true);
		const touch = e.touches[0];
		const newPosition = calculatePosition(touch.clientX, touch.clientY);
		setPosition(newPosition);
		onPositionChange(newPosition);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
		if (inputMode !== 'touch' || !isDragging) return;
		e.preventDefault();
		const touch = e.touches[0];
		const newPosition = calculatePosition(touch.clientX, touch.clientY);
		setPosition(newPosition);
		onPositionChange(newPosition);
	};

	const getQuadrantInfo = (pos: Position): string => {
		const xCenter = Math.abs(pos.x - 127) < 20;
		const yCenter = Math.abs(pos.y - 127) < 20;

		if (xCenter && yCenter) return 'Centered';
		if (pos.x > 127 && pos.y > 127) return 'Forward-Right';
		if (pos.x < 127 && pos.y > 127) return 'Forward-Left';
		if (pos.x > 127 && pos.y < 127) return 'Back-Right';
		if (pos.x < 127 && pos.y < 127) return 'Back-Left';
		if (xCenter && pos.y > 127) return 'Forward';
		if (xCenter && pos.y < 127) return 'Back';
		if (pos.x > 127 && yCenter) return 'Right';
		return 'Left';
	};



	return (
		<div className="relative w-full h-full flex flex-col gap-4">
			<div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
				<Badge variant="outline" className="bg-black/50 text-white">
					{side} Control ({inputMode})
				</Badge>
				<Badge variant="outline" className="bg-black/50 text-white">
					{getQuadrantInfo(position)}
				</Badge>
			</div>

			<Card
				ref={containerRef}
				className={`
          w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 
          relative cursor-pointer rounded-xl border-2 
          ${isDragging ? 'border-blue-500' : 'border-gray-700'}
          transition-colors duration-200
        `}
				onMouseDown={handleMouseStart}
				onMouseMove={handleMouseMove}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
			>
				{/* Grid lines */}
				<div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
					{[...Array(16)].map((_, i) => (
						<div
							key={i}
							className="border border-gray-700/30"
						/>
					))}
				</div>

				{/* Center markers */}
				<div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600/50" />
				<div className="absolute top-1/2 left-0 right-0 h-px bg-gray-600/50" />

				{/* Joystick knob */}
				<div
					className={`
            absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2
            rounded-full shadow-lg transition-all duration-100
            ${isDragging
							? 'bg-gradient-to-br from-blue-400 to-blue-600 scale-110'
							: 'bg-gradient-to-br from-blue-500 to-blue-700 scale-100'
						}
          `}
					style={{
						left: `${(position.x / 255) * 100}%`,
						bottom: `${(position.y / 255) * 100}%`,
						boxShadow: isDragging
							? '0 0 20px rgba(59, 130, 246, 0.5)'
							: '0 0 15px rgba(59, 130, 246, 0.3)'
					}}
				/>
			</Card>

			<div className="absolute bottom-4 left-4 right-4">
				<Card className="bg-black/50 text-white p-2 text-sm font-mono">
					<div className="flex justify-between">
						<span>X: {position.x}</span>
						<span>Y: {position.y}</span>
					</div>
				</Card>
			</div>
		</div>
	);
};

const FlightControls: React.FC = () => {
	const [inputMode, setInputMode] = useState<InputMode>('mouse');
	const [leftPosition, setLeftPosition] = useState<Position>({ x: 127, y: 127 });
	const [rightPosition, setRightPosition] = useState<Position>({ x: 127, y: 127 });

	// Auto-detect touch capability and set initial mode
	useEffect(() => {
		const isTouchDevice = 'ontouchstart' in window ||
			navigator.maxTouchPoints > 0;
		setInputMode(isTouchDevice ? 'touch' : 'mouse');
	}, []);

	const getLeftControlDescription = (pos: Position): string => {
		// Vertical axis: throttle (altitude)
		// Horizontal axis: yaw (rotation)
		const verticalText = pos.y > 137 ? "Increase Altitude" : pos.y < 117 ? "Decrease Altitude" : "Hold Altitude";
		const horizontalText = pos.x > 137 ? "Rotate Right" : pos.x < 117 ? "Rotate Left" : "Hold Rotation";

		if (Math.abs(pos.x - 127) < 20 && Math.abs(pos.y - 127) < 20) {
			return "Hovering in place";
		}

		return `${verticalText}, ${horizontalText}`;
	};

	const getRightControlDescription = (pos: Position): string => {
		// Vertical axis: pitch (forward/backward tilt)
		// Horizontal axis: roll (left/right tilt)
		const verticalText = pos.y > 137 ? "Forward" : pos.y < 117 ? "Backward" : "Hold Position";
		const horizontalText = pos.x > 137 ? "Drift Right" : pos.x < 117 ? "Drift Left" : "Center";

		if (Math.abs(pos.x - 127) < 20 && Math.abs(pos.y - 127) < 20) {
			return "Stable Position";
		}

		return `${verticalText}, ${horizontalText}`;
	};

	return (
		<main className="min-h-screen w-screen flex flex-col bg-gray-950 overflow-auto">
			{/* Header */}
			<div className="bg-black/80 text-white p-4 flex flex-col items-center gap-4">
				<div className="w-full max-w-2xl flex justify-between items-center">
					<h1 className="text-xl font-bold tracking-tight">Flight Control System</h1>
					<div className="flex items-center gap-4">
						<Label htmlFor="input-mode" className="text-sm">
							Input Mode: {inputMode === 'mouse' ? 'Mouse' : 'Touch'}
						</Label>
						<Switch
							id="input-mode"
							checked={inputMode === 'touch'}
							onCheckedChange={(checked) => setInputMode(checked ? 'touch' : 'mouse')}
						/>
					</div>
				</div>

				<Card className="w-full max-w-2xl bg-gray-900/50 p-3">
					<div className="grid grid-cols-2 gap-4 text-sm font-mono">
						<div>
							<span className="text-gray-400">Left Control: </span>
							<span className="text-blue-400">({leftPosition.x}, {leftPosition.y})</span>
							<p className="text-xs text-green-400 mt-1">{getLeftControlDescription(leftPosition)}</p>
						</div>
						<div>
							<span className="text-gray-400">Right Control: </span>
							<span className="text-blue-400">({rightPosition.x}, {rightPosition.y})</span>
							<p className="text-xs text-green-400 mt-1">{getRightControlDescription(rightPosition)}</p>
						</div>
					</div>
				</Card>
			</div>

			{/* Main Controls Area - Fixed height to ensure footer visibility */}
			<div className="flex flex-col sm:flex-row flex-1" style={{ minHeight: '450px', maxHeight: 'calc(100vh - 220px)' }}>
				<div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col">
					<div className="mb-4">
						<Card className="bg-black/50 text-white p-3">
							<h2 className="font-bold mb-2">Altitude & Rotation Control</h2>
							<p className="text-sm text-gray-300">This joystick controls the drone&apos;s vertical movement and rotation.</p>
							<ul className="text-xs text-gray-400 mt-2 list-disc pl-4">
								<li>Vertical axis: Throttle (up/down movement)</li>
								<li>Horizontal axis: Yaw (left/right rotation)</li>
							</ul>
						</Card>
					</div>
					<div className="flex-1 relative min-h-[300px]">
						<JoystickControl
							onPositionChange={setLeftPosition}
							side="Left"
							inputMode={inputMode}
						/>
					</div>
				</div>
				<div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col">
					<div className="mb-4">
						<Card className="bg-black/50 text-white p-3">
							<h2 className="font-bold mb-2">Direction Control</h2>
							<p className="text-sm text-gray-300">This joystick controls the drone&apos;s directional movement.</p>
							<ul className="text-xs text-gray-400 mt-2 list-disc pl-4">
								<li>Vertical axis: Pitch (forward/backward tilt)</li>
								<li>Horizontal axis: Roll (left/right tilt)</li>
							</ul>
						</Card>
					</div>
					<div className="flex-1 relative min-h-[300px]">
						<JoystickControl
							onPositionChange={setRightPosition}
							side="Right"
							inputMode={inputMode}
						/>
					</div>
				</div>
			</div>

			{/* Footer - Now positioned below with padding and clear separation */}
			<div className="bg-black/80 text-white p-6 mt-auto">
				<div className="max-w-2xl mx-auto">
					<h2 className="text-sm font-semibold mb-2">About This Control System</h2>
					<p className="text-xs text-gray-300">
						This dual-joystick control system mimics professional drone controllers, using the standard &quot;Mode 2&quot; configuration
						popular in military and commercial UAV applications. Left stick controls altitude and rotation, while right stick
						handles directional movement. This setup provides intuitive and precise control for complex flight maneuvers.
					</p>
				</div>
			</div>
		</main>
	);
};

export default FlightControls;