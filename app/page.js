'use client'

import { useHover } from "@/contexts/HoverContext";
import styles from './home.module.css'
import ImageSlider from "@/components/ImageSlider";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { setIsHovered } = useHover();
  
  const [contactHovered, setContactHovered] = useState(false);
  const [logoVisibile, setLogoVisible] = useState(false);
  const [heroText1Visible, setHeroText1Visible] = useState(false);
  const [heroText2Visible, setHeroText2Visible] = useState(false);
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [blob3Pos, setBlob3Pos] = useState({ x: 0, y: 0 });

  const contactRef = useRef(null);
  const logoRef = useRef(null);
  const heroText1Ref = useRef(null);
  const heroText2Ref = useRef(null);

  const handleMouseEnter = () => {
    setContactHovered(true); 
  };

  const handleMouseLeave = () => {
    setContactHovered(false); 
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
  
      const offsetX = (innerWidth / 2 - clientX) * 0.025;
      const offsetY = (innerHeight / 2 - clientY) * 0.025;

      const offsetXreverse = (clientX - innerWidth / 2) * 0.025;
      const offsetYreverse = (clientY - innerHeight / 2) * 0.025;
  
      setBlob1Pos({ x: offsetX , y: offsetY });
      setBlob2Pos({ x: offsetXreverse * 0.2, y: offsetYreverse * 0.2 });
      setBlob3Pos({ x: offsetX * 0.4, y: offsetY * 0.4 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  },[]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === logoRef.current && !logoVisibile){
            setLogoVisible(true);
          }
          if (entry.target === heroText1Ref.current && !heroText1Visible){
            setHeroText1Visible(true);
          }
          if (entry.target === heroText2Ref.current && !heroText2Visible){
            setHeroText2Visible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (logoRef.current) observer.observe(logoRef.current)
    if (heroText1Ref.current) observer.observe(heroText1Ref.current)
    if (heroText2Ref.current) observer.observe(heroText2Ref.current)

    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current)
      if (heroText1Ref.current) observer.unobserve(heroText1Ref.current)
      if (heroText2Ref.current) observer.unobserve(heroText2Ref.current)
    }
  }, []);


  return (
    <>
      <div className={styles.hero}>
        <img ref={logoRef} className={`${logoVisibile ? styles.fadeIn : ''}`} src="/LogoWhite.png" />
        <div ref={heroText1Ref} className={`${styles.bar} ${styles.delay1} ${heroText1Visible ? styles.fadeIn : ''}`}></div>
        <div ref={heroText2Ref} className={`${styles.text} ${styles.delay2} ${heroText2Visible ? styles.fadeIn : ''}`}>
        <p>"Transforming ideas into captivating artwork</p>
        <p>Let’s bring your vision to life!"</p></div>
        <div ref={heroText2Ref} className={`${styles.text2} ${styles.delay2} ${heroText2Visible ? styles.fadeIn : ''}`}>
        <p>"Transforming ideas into captivating artwork Let’s bring your vision to life!"</p></div>
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
            <img className={styles.imageBG} style={{transform :`translate(${blob1Pos.x}px, ${blob1Pos.y}px)`}} src="/blob1.png" />
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
            <img className={styles.imageBG} style={{transform : `translate(${blob2Pos.x}px, ${blob2Pos.y}px)`}} src="/blob2.png" />
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
            <img className={styles.imageBG} style={{transform :`translate(${blob3Pos.x}px, ${blob3Pos.y}px)`}} src="/blob3.png" />
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

      <div ref={contactRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      className={`${styles.contact} ${contactHovered ? styles.slideIn : styles.slideOut}`}>
        <span>CONTACT</span>
        <svg className={styles.contactArrow} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1C1 1 18 9.80488 18 10.2683C18 10.7317 1 20 1 20"  strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  );
}
