'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import styles from './ImageGridContainer.module.css'
import stylesAni from './Animation.module.css'

function ImageGridContainer({category}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [portfolios, setPortfolios] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try{
        setLoading(true)
        const res = await axios.get("/api/post")
        setPortfolios(res.data.portfolios);

        const ImageLists = [
          ...new Set(res.data.portfolios.map((item) => item.imageURL)),
        ]; // Extract unique categories
        setImages(ImageLists);
      } catch(error) {
        console.error("Error fetching portfolios:", error.response?.data || error.message);
      } finally{
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, [])

  return (
    <div ref={sectionRef} className={`${styles.Image_Conatiner}`}>
        <div className={`${styles.topic} ${isVisible ? stylesAni.fadeIn : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M21.375 11.5155C17.015 10.3915 13.608 6.9845 12.484 2.6245L12 0.747498L11.516 2.6245C10.392 6.9845 6.98505 10.3915 2.62505 11.5155L0.748047 11.9995L2.62505 12.4845C6.98505 13.6085 10.392 17.0155 11.516 21.3745L12 23.2525L12.484 21.3745C13.608 17.0155 17.015 13.6085 21.375 12.4845L23.252 11.9995L21.375 11.5155Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.7511 7.74691C18.7511 6.58491 20.0251 5.24791 21.2501 5.24791C20.0711 5.24791 18.7511 3.89691 18.7511 2.74991C18.7511 3.89691 17.4431 5.24791 16.2531 5.24791C17.3981 5.24791 18.7511 6.57791 18.7511 7.74691Z" fill="white"/>
            </svg>
            <span>{category}</span>
        </div>

        {loading ? (
          <div className={`${styles.Grid_container}`}>
              <img
                src={"https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"}
                alt="loading.."
                className={`${styles.Grid_item}`}/>
        </div>
        ) : (
          <div>
            <div className={`${styles.Grid_container} ${stylesAni.delay2} ${isVisible ? stylesAni.fadeIn : ''}`}>
            {portfolios
              .filter(portfolio => portfolio.category === category)
              .map(filteredImage => (
                <img
                  key={filteredImage._id}
                  src={filteredImage.imageURL}
                  alt={filteredImage.category}
                  className={`${styles.Grid_item}`}/>
            ))}
          </div>

          <div className={`${styles.zoom_image_container}`}>
            <div className={styles.zoom_image_close}></div>
            <img src="/heroImg.png" alt="image" className={`${styles.zoom_image_item}`}/>
          </div>
        </div>
        )}

    </div>
  )
}

export default ImageGridContainer