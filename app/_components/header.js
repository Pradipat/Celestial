'use client'
import React from 'react'
import Image from 'next/image'
import { useHover } from '@/contexts/HoverContext'
import { useState } from 'react'

import styles from './header.module.css'
import '../globals.css'

function header() {
  const { setIsHovered } = useHover()

  const [showSideMenu, setShowSideMenu] = useState(false)
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
          <div onClick={() => setShowSideMenu(true)} className={styles.hambergerMenu}>
            <div className={styles.hambergerMenuLine1}></div>
            <div className={styles.hambergerMenuLine2}></div>
            <div className={styles.hambergerMenuLine3}></div>
          </div>
        </div>

        <div className={`${styles.side_menu} ${showSideMenu ? styles.show : ''}`}>
          <div onClick={() => setShowSideMenu(false)} className={styles.side_menu_close}></div>
          <ul>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>HOME<div className={styles.bar}></div></li>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PORTFOLIO<div className={styles.bar}></div></li>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PRICING<div className={styles.bar}></div></li>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>TOS<div className={styles.bar}></div></li>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>FAQS<div className={styles.bar}></div></li>
            <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>CONTACT<div className={styles.bar}></div></li>
          </ul>
        </div>

        <div className={styles.ghost}></div>
    </>
  )
}

export default header