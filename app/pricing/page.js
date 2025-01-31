'use client' 

import Topic from "@/components/Topic"
import styles from "./pricing.module.css"

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

  return (
    <div>
      <Topic title="SERVICES & PRICE"/>

      <div className={styles.tableContainer}>
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
      <div className={styles.note}>
        <p className={styles.note_topic}>Additional Charge</p>
        <li>Backgrounds: Starting at $20 (depending on complexity).</li>
        <li>Additional Characters: +50% of base price per character.</li>
        <li>Rush Orders: +25% of total cost.</li>
      </div>

      <Topic title="PROCESS"/>
      <div className={styles.process_section}>
        <div className={styles.process_container}>
          <div className={styles.process_number}>
            <div className={styles.process_number_text}>1</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>2</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>3</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>4</div>
          </div>
          <div className={styles.process_image}>
            <img className={styles.process_image_item} src="/process/1.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/2.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/3.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/4.png" alt="Process" />
          </div>
          <div className={styles.process_description}>
            <div className={styles.process_description_text}>Idea Submission</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Quote and Agreement</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Deposit and Payment</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Sketch Phase</div>
          </div>
        </div>

        <div className={styles.process_container}>
          <div className={styles.process_number}>
            <div className={styles.process_number_text}>5</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>6</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>7</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_number_text}>8</div>
          </div>
          <div className={styles.process_image}>
            <img className={styles.process_image_item} src="/process/5.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/6.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/7.png" alt="Process" />
            <img className={styles.process_line} src="/process/line.png" alt="Line" />
            <img className={styles.process_image_item} src="/process/8.png" alt="Process" />
          </div>
          <div className={styles.process_description}>
            <div className={styles.process_description_text}>Coloring Phase</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Final Review</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Final Payment</div>
            <div className={styles.space_gap}></div>
            <div className={styles.process_description_text}>Delivery</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page 
