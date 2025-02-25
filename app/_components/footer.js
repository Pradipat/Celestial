'use client'

import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import { useHover } from '@/contexts/HoverContext'
import { useRouter } from "next/navigation";

function footer() {
    const { setIsHovered } = useHover()
    const router = useRouter();

  return (
    <div className= {styles.container}>
        <div className={styles.left}>
            <ul className={styles.menu}>
                <div onClick={() => router.push("/")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>HOME</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onClick={() => router.push("/portfolio")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>PORTFOLIO</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onClick={() => router.push("/pricing")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>PRICING</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
            </ul>
            <ul className={styles.menu}>
                <div onClick={() => router.push("/tos")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>TOS</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onClick={() => router.push("/faq")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>FAQS</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
                <div onClick={() => router.push("/contact")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.item}><li>CONTACT</li><Image src='/right-normal.png' alt='logo' width={18} height={18} /></div>
            </ul>
        </div>
        <div className={styles.star}>
            <Image className={styles.big} src='/Star.png' alt='star' width={119} height={148}/>
            <Image className={styles.tiny} src='/Star.png' alt='star' width={21} height={27}/>
        </div>
        <div className={styles.right}>
            <div className={styles.social}>
                <Image onClick={() => window.open("https://x.com/PatChan_26", "_blank")}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/facebook.png' alt='facebook' width={40} height={40} />
                <Image onClick={() => window.open("https://x.com/PatChan_26", "_blank")}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/X.png' alt='facebook' width={40} height={40} />
                <Image onClick={() => window.open("https://x.com/PatChan_26", "_blank")}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.icon} src='/IG.png' alt='facebook' width={40} height={40} quality={100} />
            </div>
            <div>© 2025 Celestial. All Rights Reserved.</div>
        </div>
    </div>
  )
}

export default footer