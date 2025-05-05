import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
	title: "Autonomous Drone Controller",
	description: "A modern, responsive web interface for controlling a flying drone, developed during a defense tech hackathon. This application provides an intuitive dual joystick control system for precise drone maneuvering, following standard UAV control patterns used in military and commercial applications.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	);
}
