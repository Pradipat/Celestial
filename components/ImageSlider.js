'use client'

import React from 'react'
import styles from '../app/home.module.css'
import { useHover } from '@/contexts/HoverContext'

import { useEffect, useRef, useState } from 'react'

function ImageSlider() {
    const sliderRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const { setIsHovered } = useHover()

    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            const sliderWidth = slider.scrollWidth;
            const sliderViewport = slider.clientWidth;
            
            slider.style.scrollBehavior = "auto";
            slider.scrollLeft = sliderWidth / 2 - sliderViewport / 2;

            setTimeout(() => {
                slider.style.scrollBehavior = "smooth";
              }, 100);

              setTimeout(() => {
                setIsLoaded(true);
            }, 200); 
        }
    }, []);

  return (
    <div className={`${styles.imgSliderContainer} ${isLoaded ? styles.fadeIn : ''}`}>
        <div className={styles.border}></div>
        <div className={styles.imgSlider} ref={sliderRef}>
          <img onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src="/heroImg.png"/>
          <img src="/heroImg.png"/>
          <img src="/heroImg.png"/>
          <img src="/heroImg.png"/>
          <img src="/heroImg.png"/>
          <img src="/heroImg.png"/>
          <img src="/heroImg.png"/>
        </div>
      </div>
  )
}

export default ImageSlider