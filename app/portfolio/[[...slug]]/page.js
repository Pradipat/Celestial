'use client'


import styles from './portfolio.module.css'
import stylesAni from '@/components/Animation.module.css'
import { use, useEffect, useState, useRef } from 'react'

import Topic from '@/components/Topic'
import ImageGridContainer from '@/components/ImageGridContainer'

export default function Page({ params }) {
    const resolvedParams = use(params);

    const [isVisible, setIsVisible] = useState(false);
    const [slug, setSlug] = useState(resolvedParams?.slug?.[0] || '');
    const [selectedCategory, setSelectedCategory] = useState("All");

    const sectionRef = useRef(null);
    const categories = ["All", "Full-Body", "Half-Body", "Burst-Up", "Chibi"];

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

    return (
        <>
            <Topic title={"Portfolio"}/>
            <div className={`${styles.type_container} ${stylesAni.delay1} ${stylesAni.fadeIn}`}>
                {categories.map((category) => (
                    <div 
                        key={category} 
                        className={`${styles.type_item} ${selectedCategory === category ? styles.type_item_active : ''}`}
                        onClick={() => setSelectedCategory(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category.replace("-", " ")}
                    </div>
                ))}
            </div>

            {selectedCategory === "Full-Body" && <ImageGridContainer title="Full-Body"/>}
            {selectedCategory === "Half-Body" && <ImageGridContainer title="Half-Body"/>}
            {selectedCategory === "Burst-Up" && <ImageGridContainer title="Burst-Up"/>}
            {selectedCategory === "Chibi" && <ImageGridContainer title="Chibi"/>}
            {selectedCategory === "All" && (
                <>
                    <ImageGridContainer title="Full-Body"/>
                    <ImageGridContainer title="Half-Body"/>
                    <ImageGridContainer title="Burst-Up"/>
                    <ImageGridContainer title="Chibi"/>
                </>
            )}
        </>
    )
}