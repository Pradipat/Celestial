'use client'

import styles from './portfolio.module.css'
import stylesAni from '@/components/Animation.module.css'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Topic from '@/components/Topic'
import ImageGridContainer from '@/components/ImageGridContainer'

export default function Page({ params }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [portfolios, setPortfolios] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef(null);

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
            const res = await axios.get("/api/post")
            setPortfolios(res.data.portfolios);

            // ✅ Add "All" category first
            const uniqueCategories = [
              "All",
              ...[...new Set(res.data.portfolios.map((item) => item.category))].sort()
            ];
            setCategories(uniqueCategories);
          } catch(error) {
            console.error("Error fetching portfolios:", error.response?.data || error.message);
          } finally{
            setLoading(false);
          }
        }

        fetchPortfolios();
      }, [])

    return (
        <>
          <div className={`${styles.container}`}>
            <Topic title={"Portfolio"}/>
            <div className={`${styles.type_container} ${stylesAni.delay1} ${stylesAni.fadeIn}`}>
                {categories.map((category, index) => (
                    <div 
                        key={category ? `category-${category}` : `index-${index}`} 
                        className={`${styles.type_item} ${selectedCategory === category ? styles.type_item_active : ''}`}
                        onClick={() => setSelectedCategory(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {selectedCategory === "All" ? (
              <>
                {categories.filter(c => c !== "All").map((category) => (
                  <ImageGridContainer key={`grid-${category}`} category={category} />
                ))}
              </>
            ) : (
              <ImageGridContainer category={selectedCategory}/>
            )}
          </div>
        </>
    )
}
