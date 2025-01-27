'use client'

import { useEffect, useState } from "react";
import '../app/globals.css'
import { useHover } from "@/contexts/HoverContext";


const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(true)
    const {isHovered} = useHover();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="mouse-cursor"
        style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            display: isVisible ? 'block' : 'none',
        }}>  
            <div className={`custom-cursor ${isHovered ? 'hovered' : ''}`}></div>
            <svg className="custom-cursor-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C5BAFF" />
                    <stop offset="50%" stopColor="#C4D9FF" />
                    <stop offset="100%" stopColor="#E8F9FF" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="47" stroke="url(#gradient)" strokeWidth="4" fill="none" transform='rotate(90 50 50)'/>
            </svg>
        </div>
        
    );
}

export default CustomCursor;
