'use client'
import React from 'react'
import Image from 'next/image'
import { useHover } from '@/contexts/HoverContext'
import { useState } from 'react'
import Link from 'next/link'

import '../globals.css'
import styles from './header.module.css'

function header() {
  const { setIsHovered } = useHover()

  const [showSideMenu, setShowSideMenu] = useState(false)
  return (
    <>
        <div className={styles.container}>
          <Link href='/'><Image className={styles.logo} src='/logo.png' alt='logo' width={200} height={40}
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          /></Link>
          <ul className={styles.menu}>
            <Link href="/" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>HOME</li></Link>
            <Link href="/portfolio" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PORTFOLIO</li></Link>
            <Link href="/pricing" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PRICING</li></Link>
            <Link href="/tos" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>TOS</li></Link>
            <Link href="/faq" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>FAQS</li></Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}><li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>CONTACT</li></Link>
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
            <Link href="/" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>HOME<div className={styles.bar}></div></li></Link>
            <Link href="/portfolio" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PORTFOLIO<div className={styles.bar}></div></li></Link>
            <Link href="/pricing" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>PRICING<div className={styles.bar}></div></li></Link>
            <Link href="/tos" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>TOS<div className={styles.bar}></div></li></Link>
            <Link href="/faq" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>FAQS<div className={styles.bar}></div></li></Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}><li onClick={() => setShowSideMenu(false)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>CONTACT<div className={styles.bar}></div></li></Link>
          </ul>
        </div>

        <div className={styles.ghost}></div>
    </>
  )
}

export default header