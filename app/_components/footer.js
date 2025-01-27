'use client'

import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import { useHover } from '@/contexts/HoverContext'

function footer() {
    const { setIsHovered } = useHover()
  return (
    <div className= {styles.container}>
        <div className={styles.left}>
            <ul className={styles.menu}>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>HOME</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>PORTFOLIO</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>PRICING</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
            </ul>
            <ul className={styles.menu}>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>TOS</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>FAQS</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>CONTACT</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
            </ul>
        </div>
        <div className={styles.star}>
            <Image className={styles.big} src='/Star.png' alt='star' width={119} height={148}/>
            <Image className={styles.tiny} src='/Star.png' alt='star' width={21} height={27}/>
        </div>
        <div className={styles.right}>
            <div className={styles.social}>
                <Image onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/facebook.png' alt='facebook' width={40} height={40} />
                <Image onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/X.png' alt='facebook' width={40} height={40} />
                <Image onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/IG.png' alt='facebook' width={40} height={40} quality={100} />
                {/* <img onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='IG.png'/> */}
            </div>
            <div>© 2025 Celestial. All Rights Reserved.</div>
        </div>
    </div>
  )
}

export default footer