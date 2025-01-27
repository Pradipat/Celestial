'use client'
import React from 'react'
import Image from 'next/image'
import { useHover } from '@/contexts/HoverContext'

import styles from './header.module.css'
import '../globals.css'

function header() {
  const { setIsHovered } = useHover()
  return (
    <>
        <div className={styles.container}>
            <Image className={styles.logo} src='/logo.png' alt='logo' width={200} height={40}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            />
            <ul className={styles.menu}>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>HOME</li>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PORTFOLIO</li>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PRICING</li>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>TOS</li>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>FAQS</li>
                <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>CONTACT</li>
        </ul>
        </div>

        <div className={styles.ghost}></div>
    </>
  )
}

export default header