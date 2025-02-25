"use client"

import Topic from "@/components/Topic"
import styles from "./queue.module.css"
import stylesAni from "../../components/Animation.module.css"
import React from 'react'
import { useEffect, useState, useRef } from "react"

function page() {

    const queuesData = [
        {
          name: "FREE",
          detail: "-",
          status: "-"
        },
        {
          name: "Half-Body",
          detail: "Detailed half-body illustration with vibrant colors",
          status: "$200 - $400"
        },
        {
          name: "Bust-Up",
          detail: "High-quality bust-up illustration for avatars and icons",
          status: "$150 - $250"
        },
        {
          name: "Chibi",
          detail: "Cute chibi-style illustration with expressive details",
          status: "$100 - $200"
        },
        {
          name: "Illustration",
          detail: "Custom digital illustration with full artistic freedom",
          status: "$250 - $600"
        }
      ];

  const [isQueueVisible, setisQueueVisible] = useState(false);
  const queueRef = useRef(null);

  const [isMonthVisible, setIsMonthVisible] = useState(false);
  const monthRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === queueRef.current && entry.isIntersecting) {
            setisQueueVisible(true);
            observer.unobserve(queueRef.current);
          }
          if (entry.target === monthRef.current && entry.isIntersecting) {
            setIsMonthVisible(true);
            observer.unobserve(monthRef.current);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (queueRef.current) observer.observe(queueRef.current);
    if (monthRef.current) observer.observe(monthRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
        <Topic title="QUEUE"/>
        <div className={`${styles.queue_container}`}>
            <div ref={monthRef} className={`${styles.month} ${isMonthVisible ? stylesAni.fadeIn : ''}`}>DECEMBER</div>

            <div ref={queueRef} className={`${styles.tableContainer} ${stylesAni.delay1} ${isQueueVisible ? stylesAni.fadeIn : ''}`}>
                {/* Table Header */}
                <div className={styles.tableHeader}>
                    <div className={styles.tableCell}>Name</div>
                    <div className={styles.tableCell}>Detail</div>
                    <div className={styles.tableCell}>Status</div>
                </div>

                {/* Table Rows */}
                {queuesData.map((queue, index) => (
                <div key={index} className={styles.tableRow}>
                    <div className={styles.tableCell}>{queue.name}</div>
                    <div className={`${styles.tableCell} ${styles.detail}`}>{queue.detail}</div>
                    <div className={styles.tableCell}>{queue.status}</div>
                </div>
                ))}
            </div>
        </div>

        <div className={styles.month}>DECEMBER<span> - BREAK</span></div>
        <div className={styles.month_detail}>Do not accept any commission</div>
    </>
  )
}

export default page