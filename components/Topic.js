"use client"

import React, {useState, useEffect, useRef} from 'react'

import styles from './Topic.module.css'
import stylesAni from './Animation.module.css'

function Topic({ title }) {
    const topicRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.2 }
        )
        if (topicRef.current) {
            observer.observe(topicRef.current)
        }

        return () => {
            if (topicRef.current) {
                observer.unobserve(topicRef.current)
            }
        }
    }, [])
  return (
    <div className={`${styles.topicText}`}>
        <img src='/blobTopic2.png' alt="blob2" />
        <div ref={topicRef} className={` ${isVisible ? stylesAni.fadeIn : ''}`}>{title}</div>
    </div>
  )
}

export default Topic