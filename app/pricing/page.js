'use client' 

import Topic from "@/components/Topic"
import styles from "./pricing.module.css"
import stylesAni from "../../components/Animation.module.css"
import { useEffect, useState, useRef } from "react"

function Page() {  
  const servicesData = [
    {
      scale: "Full-Body",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: "$300 - $500"
    },
    {
      scale: "Half-Body",
      description: "Detailed half-body illustration with vibrant colors",
      price: "$200 - $400"
    },
    {
      scale: "Bust-Up",
      description: "High-quality bust-up illustration for avatars and icons",
      price: "$150 - $250"
    },
    {
      scale: "Chibi",
      description: "Cute chibi-style illustration with expressive details",
      price: "$100 - $200"
    },
    {
      scale: "Illustration",
      description: "Custom digital illustration with full artistic freedom",
      price: "$250 - $600"
    }
  ];

  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const priceRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === priceRef.current && entry.isIntersecting) {
            setIsPriceVisible(true);
            observer.unobserve(priceRef.current);
          }
          if (entry.target === processRef.current && entry.isIntersecting) {
            setVisibleSteps([]);
            entry.target.querySelectorAll(".process-step").forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index + 1]);
              }, index * 150); // ✅ Delay each step by 300ms
            });
            observer.unobserve(processRef.current);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (priceRef.current) observer.observe(priceRef.current);
    if (processRef.current) observer.observe(processRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <Topic title="SERVICES & PRICE"/>

      <div ref={priceRef} className={`${styles.tableContainer} ${stylesAni.delay1} ${isPriceVisible ? stylesAni.fadeIn : ''}`}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={styles.tableCell}>Scale</div>
          <div className={styles.tableCell}>Description</div>
          <div className={styles.tableCell}>Price</div>
        </div>

        {/* Table Rows */}
        {servicesData.map((service, index) => (
          <div key={index} className={styles.tableRow}>
            <div className={styles.tableCell}>{service.scale}</div>
            <div className={styles.tableCell}>{service.description}</div>
            <div className={styles.tableCell}>{service.price}</div>
          </div>
        ))}
      </div>

      {/* Additional Charge Section */}
      <div className={`${styles.note} ${stylesAni.delay2} ${isPriceVisible ? stylesAni.fadeIn : ''} `}>
        <p className={styles.note_topic}>Additional Charge</p>
        <li>Backgrounds: Starting at $20 (depending on complexity).</li>
        <li>Additional Characters: +50% of base price per character.</li>
        <li>Rush Orders: +25% of total cost.</li>
      </div>

      <Topic title="PROCESS"/>
      <div ref={processRef} className={`${styles.process_section}`}>
        <div className={styles.process_container}>
          <div className={styles.process_number}>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(1) ? stylesAni.fadeIn : ''}`}>1</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(2) ? stylesAni.fadeIn : ''}`}>2</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(3) ? stylesAni.fadeIn : ''}`}>3</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(4) ? stylesAni.fadeIn : ''}`}>4</div>
          </div>
          <div className={styles.process_image}>
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(1) ? stylesAni.fadeIn : ''}`} src="/process/1.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(2) ? stylesAni.fadeIn : ''}`} src="/process/2.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(3) ? stylesAni.fadeIn : ''}`} src="/process/3.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(4) ? stylesAni.fadeIn : ''}`} src="/process/4.png" alt="Process" />
          </div>
          <div className={styles.process_description}>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(1) ? stylesAni.fadeIn : ''}`}>Idea Submission</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(2) ? stylesAni.fadeIn : ''}`}>Quote and Agreement</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(3) ? stylesAni.fadeIn : ''}`}>Deposit and Payment</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(4) ? stylesAni.fadeIn : ''}`}>Sketch Phase</div>
          </div>
        </div>

        <div className={styles.process_container}>
          <div className={styles.process_number}>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(5) ? stylesAni.fadeIn : ''}`}>5</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(6) ? stylesAni.fadeIn : ''}`}>6</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(7) ? stylesAni.fadeIn : ''}`}>7</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_number_text} ${visibleSteps.includes(8) ? stylesAni.fadeIn : ''}`}>8</div>
          </div>
          <div className={styles.process_image}>
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(5) ? stylesAni.fadeIn : ''}`} src="/process/5.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(6) ? stylesAni.fadeIn : ''}`} src="/process/6.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(7) ? stylesAni.fadeIn : ''}`} src="/process/7.png" alt="Process" />
            <img className={styles.process_line} src="/process/Line.png" alt="Line" />
            <img className={`process-step ${styles.process_image_item} ${visibleSteps.includes(8) ? stylesAni.fadeIn : ''}`} src="/process/8.png" alt="Process" />
          </div>
          <div className={styles.process_description}>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(5) ? stylesAni.fadeIn : ''}`}>Coloring Phase</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(6) ? stylesAni.fadeIn : ''}`}>Final Review</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(7) ? stylesAni.fadeIn : ''}`}>Final Payment</div>
            <div className={styles.space_gap}></div>
            <div className={`process-step ${styles.process_description_text} ${visibleSteps.includes(8) ? stylesAni.fadeIn : ''}`}>Delivery</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page 
