"use client"

import Topic from "@/components/Topic"
import styles from "./queue.module.css"
import stylesAni from "../../components/Animation.module.css"
import React from 'react'
import { useEffect, useState, useRef } from "react"
import axios from "axios"

function page() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Visibility state
  const [isMonthVisible, setIsMonthVisible] = useState({});
  const [isQueueVisible, setIsQueueVisible] = useState({});

  // ✅ Refs for IntersectionObserver
  const monthRefs = useRef({});
  const queueRefs = useRef({});
  const observerInitialized = useRef(false);

  // ✅ fetch queue
  useEffect(()  => {
    const fetchQueue = async() => {
      try{
        setLoading(true)
        const res = await axios.get("/api/queue/get-all") 
        setQueues(res.data.queues)
      } catch(error) {
        console.error("Error fetching portfolios:", error.response?.data || error.message);
      } finally{
        setLoading(false);
      }
    }

    if (queues.length > 0) {
      const initialVisibility = {};
      queues.forEach((item) => {
        initialVisibility[item.month] = false; // ✅ Prevents undefined issues
      });

      setIsMonthVisible(initialVisibility);
      setIsQueueVisible(initialVisibility);
    }

    fetchQueue()
  }, []);

  // ✅ IntersectionObserver for Animations
  useEffect(() => {
    if (queues.length === 0 || observerInitialized.current) return;

    observerInitialized.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const month = entry.target.getAttribute("data-month");
          if (entry.isIntersecting) {
            if (entry.target.classList.contains(styles.month)) {
              setIsMonthVisible((prev) => ({ ...prev, [month]: true }));
            } else {
              setIsQueueVisible((prev) => ({ ...prev, [month]: true }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // ✅ Observe each month and table container
    Object.values(monthRefs.current).forEach((ref) => observer.observe(ref));
    Object.values(queueRefs.current).forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, [queues]);

  const testlog = () => {
    console.log("test:",queues[0].orders[0])
  }

  return (
    <>
        <Topic title="QUEUE"/>
          {loading ? (
            <div className={`${styles.container}`}>
              <div className="text-center p-5">Loading...</div>
            </div>
          ) : (
            <div className={`${styles.container}`}>
            {queues.map((item, index) => (
                <div key={index} className={styles.queue_container}>
                {item.isOpen 
                ? <div>
                    {/* Month Name */}
                    <div 
                    ref={(el) => (monthRefs.current[item.month] = el)}
                    data-month={item.month}
                    className={`${styles.month} ${isMonthVisible[item.month] ? stylesAni.fadeIn : ""}`}
                    >
                    {item.month}
                    </div>

                    {/* Table */}
                    <div 
                    ref={(el) => (queueRefs.current[item.month] = el)}
                    data-month={item.month}
                    className={`${styles.tableContainer} ${stylesAni.delay1} ${isQueueVisible[item.month] ? stylesAni.fadeIn : ""}`}
                    >
                        {/* Table Header */}
                        <div className={styles.tableHeader}>
                            <div className={styles.tableCell}>Name</div>
                            <div className={styles.tableCell}>Detail</div>
                            <div className={styles.tableCell}>Status</div>
                        </div>
                        {/* Table Rows */}
                        {item.orders?.length > 0 ? (
                        item.orders.map((order, oindex) => (
                            <div key={oindex} className={styles.tableRow}>
                            <div className={styles.tableCell}>{order.name}</div>
                            <div className={`${styles.tableCell} ${styles.detail}`}>{order.details}</div>
                            <div className={styles.tableCell}>{order.status}</div>
                            </div>
                        ))
                        ) : (
                        <div className={styles.tableRow}>No orders available</div>
                        )}
                    </div>
                </div> 

                : (
                <div>
                    {/* Month Name with BREAK Mode */}
                    <div 
                    ref={(el) => (monthRefs.current[item.month] = el)} 
                    data-month={item.month}
                    className={`${styles.month} ${isMonthVisible[item.month] ? stylesAni.fadeIn : ''}`}
                    > 
                    {item.month}
                    <span> - BREAK</span>
                    </div>
                    {/* Description */}
                    <div 
                    ref={(el) => (queueRefs.current[item.month] = el)}
                    data-month={item.month}
                    className={`${styles.month_detail} ${stylesAni.delay1} ${isQueueVisible[item.month] ? stylesAni.fadeIn : ''} `}>Do not accept any commission</div>
                </div>
                )}
                </div>
            ))}
            </div>
        )}
    </>
  );
}

export default page