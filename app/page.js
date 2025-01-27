'use client'

import { useHover } from "@/contexts/HoverContext";
import styles from './home.module.css'
import ImageSlider from "@/components/ImageSlider";
import { useState, useRef } from "react";

export default function Home() {
  const { setIsHovered } = useHover();
  const [ isAnimating, setIsAnimating ] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const contactRef = useRef(null);

  const handleMouseEnter = () => {
    setContactHovered(true); 
  };

  const handleMouseLeave = () => {
    setContactHovered(false); 
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false); 
  };

  return (
    <>
      <div className={styles.hero}>
        <img src="/LogoWhite.png" />
        <div className={styles.bar}></div>
        <div className={styles.text}><p>"Transforming ideas into captivating artwork</p>
        <p>Let’s bring your vision to life!"</p></div>
      </div>

      <ImageSlider />

      <div className={styles.services}>
        <div className={styles.topicText}>
          <img src='/blobTopic.png' alt="blob2" />
          <div>services</div>
        </div>
        {/* contentlist */}
        <div className={`${styles.content} ${styles.left}`}>
          <div className={styles.imageContainer}>
            <div className={styles.image}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} src="/blob1.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={styles.topic}>Vtuber Model</div>
                <div className={styles.price}>100 USD / 3500 THB</div>
              </div>
              <div className={styles.number}>01</div>
            </div>
            <div className={styles.bottom}>
              <div>Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.</div>
              <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.more}><span>see more</span><img src='/small-right.png'/></div>
            </div>
          </div>
        </div>

        <div className={`${styles.content} ${styles.right}`}>
          <div className={styles.imageContainer}>
            <div className={styles.image}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} src="/blob2.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={styles.topic}>Vtuber Model</div>
                <div className={styles.price}>100 USD / 3500 THB</div>
              </div>
              <div className={styles.number}>01</div>
            </div>
            <div className={styles.bottom}>
              <div>Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.</div>
              <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.more}><span>see more</span><img src='/small-right.png'/></div>
            </div>
          </div>
        </div>

        <div className={`${styles.content} ${styles.left}`}>
          <div className={styles.imageContainer}>
            <div className={styles.image}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} src="/blob3.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={styles.topic}>Vtuber Model</div>
                <div className={styles.price}>100 USD / 3500 THB</div>
              </div>
              <div className={styles.number}>01</div>
            </div>
            <div className={styles.bottom}>
              <div>Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.</div>
              <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.more}><span>see more</span><img src='/small-right.png'/></div>
            </div>
          </div>
        </div>

      </div>

      <div ref={contactRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onAnimationEnd={handleAnimationEnd}
      className={`${styles.contact} ${contactHovered ? styles.slideIn : styles.slideOut}`}>
        <span>CONTACT</span>
        <svg className={styles.contactArrow} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1C1 1 18 9.80488 18 10.2683C18 10.7317 1 20 1 20"  strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  );
}
