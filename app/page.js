'use client'

import { useHover } from "@/contexts/HoverContext";
import styles from './home.module.css'
import ImageSlider from "@/components/ImageSlider";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { setIsHovered } = useHover();
  
  const [contactHovered, setContactHovered] = useState(false);
  const [logoVisibile, setLogoVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [content1Visible, setContent1Visible] = useState(false);
  const [content2Visible, setContent2Visible] = useState(false);
  const [content3Visible, setContent3Visible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [blob3Pos, setBlob3Pos] = useState({ x: 0, y: 0 });

  const logoRef = useRef(null);
  const servicesRef = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const content3Ref = useRef(null);
  const contactRef = useRef(null);

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
                if (entry.isIntersecting) {
                    visibilityStates.forEach(({ ref, setState }) => {
                        if (entry.target === ref.current) {
                            setState(true);
                        }
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    // Observe all refs
    visibilityStates.forEach(({ ref }) => {
        if (ref.current) observer.observe(ref.current);
    });

    return () => {
        // Unobserve all refs
        visibilityStates.forEach(({ ref }) => {
            if (ref.current) observer.unobserve(ref.current);
        });
    };
  }, [logoVisibile, servicesVisible, content1Visible, content2Visible, content3Visible, contactVisible]);

  const visibilityStates = [
    { ref: logoRef, setState: setLogoVisible },
    { ref: servicesRef, setState: setServicesVisible },
    { ref: content1Ref, setState: setContent1Visible },
    { ref: content2Ref, setState: setContent2Visible },
    { ref: content3Ref, setState: setContent3Visible },
    { ref: contactRef, setState: setContactVisible },
  ];


  return (
    <>
      <div className={styles.hero}>
        <img ref={logoRef} className={`${logoVisibile ? styles.fadeIn : ''}`} src="/LogoWhite.png" />
        <div className={`${styles.bar} ${styles.delay1} ${logoVisibile ? styles.fadeIn : ''}`}></div>
        <div className={`${styles.text} ${styles.delay2} ${logoVisibile ? styles.fadeIn : ''}`}>
        <p>"Transforming ideas into captivating artwork</p>
        <p>Let’s bring your vision to life!"</p></div>
        <div className={`${styles.text2} ${styles.delay2} ${logoVisibile ? styles.fadeIn : ''}`}>
        <p>"Transforming ideas into captivating artwork Let’s bring your vision to life!"</p></div>
      </div>

      <ImageSlider />

      <div className={styles.services}>
        <div className={`${styles.topicText}`}>
          <img src='/blobTopic.png' alt="blob2" />
          <div ref={servicesRef} className={` ${servicesVisible ? styles.fadeIn : ''}`}>services</div>
        </div>
        {/* contentlist */}
        <div ref={content1Ref} className={`${styles.content} ${styles.left} ${content1Visible ? styles.fadeIn : ''}`}>
          <div className={`${styles.imageContainer} ${content1Visible ? styles.fadeIn : ''}`}>
            <div className={`${styles.image}`}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} style={{transform :`translate(${blob1Pos.x}px, ${blob1Pos.y}px)`}} src="/blob1.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={`${styles.dalay1} ${styles.topic} ${content1Visible ? styles.fadeIn : ''}`}>Vtuber Model</div>
                <div className={`${styles.dalay1} ${styles.price} ${content1Visible ? styles.fadeIn : ''}`}>100 USD / 3500 THB</div>
              </div>
              <div className={`${styles.dalay1} ${styles.number} ${content1Visible ? styles.fadeIn : ''}`}>01</div>
            </div>
            <div className={`${styles.bottom} ${styles.dalay3} ${content1Visible ? styles.fadeIn : ''}`}>
              <div className={`${styles.dalay3} ${content1Visible ? styles.fadeIn : ''}`}>Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.</div>
              <div className={`${styles.dalay3} ${styles.more} ${content1Visible ? styles.fadeIn : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><span>see more</span><img src='/small-right.png'/></div>
            </div>
          </div>
        </div>

        <div ref={content2Ref} className={`${styles.content} ${styles.right} ${content2Visible ? styles.fadeIn : ''}`}>
          <div className={`${styles.imageContainer} ${content2Visible ? styles.fadeIn : ''}`}>
            <div className={`${styles.image}`}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} style={{transform : `translate(${blob2Pos.x}px, ${blob2Pos.y}px)`}} src="/blob2.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={`${styles.delay1} ${styles.topic} ${content2Visible ? styles.fadeIn : ''}`}>Vtuber Model</div>
                <div className={`${styles.delay1} ${styles.price} ${content2Visible ? styles.fadeIn : ''}`}>100 USD / 3500 THB</div>
              </div>
              <div className={`${styles.delay1} ${styles.number} ${content2Visible ? styles.fadeIn : ''}`}>02</div>
            </div>
            <div className={`${styles.bottom} ${styles.delay3} ${content2Visible ? styles.fadeIn : ''}`}>
              <div className={`${styles.delay3} ${content2Visible ? styles.fadeIn : ''}`}>
                Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.
              </div>
              <div className={`${styles.delay3} ${styles.more} ${content2Visible ? styles.fadeIn : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <span>see more</span>
                <img src='/small-right.png'/>
              </div>
            </div>
          </div>
        </div>

        <div ref={content3Ref} className={`${styles.content} ${styles.left} ${content3Visible ? styles.fadeIn : ''}`}>
          <div className={`${styles.imageContainer} ${content3Visible ? styles.fadeIn : ''}`}>
            <div className={`${styles.image}`}><img src="/heroImg.png" /></div>
            <img className={styles.imageBG} style={{transform :`translate(${blob3Pos.x}px, ${blob3Pos.y}px)`}} src="/blob3.png" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.topContainer}>
                <div className={`${styles.delay1} ${styles.topic} ${content3Visible ? styles.fadeIn : ''}`}>Vtuber Model</div>
                <div className={`${styles.delay1} ${styles.price} ${content3Visible ? styles.fadeIn : ''}`}>100 USD / 3500 THB</div>
              </div>
              <div className={`${styles.delay1} ${styles.number} ${content3Visible ? styles.fadeIn : ''}`}>03</div>
            </div>
            <div className={`${styles.bottom} ${styles.delay3} ${content3Visible ? styles.fadeIn : ''}`}>
              <div className={`${styles.delay3} ${content3Visible ? styles.fadeIn : ''}`}>
                Full-CG (Computer Graphics) artwork is a polished, fully rendered piece that combines intricate details, vibrant colors, and stunning lighting effects. This style ensures a professional and high-quality finish suitable for various purposes.
              </div>
              <div className={`${styles.delay3} ${styles.more} ${content3Visible ? styles.fadeIn : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <span>see more</span>
                <img src='/small-right.png'/>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div ref={contactRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      className={`${styles.contact} ${contactHovered ? styles.slideIn : styles.slideOut} ${contactVisible ? styles.fadeIn : ''}`}>
        <span>CONTACT</span>
        <svg className={styles.contactArrow} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1C1 1 18 9.80488 18 10.2683C18 10.7317 1 20 1 20"  strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  );
}
