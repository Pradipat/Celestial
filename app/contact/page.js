'use client'

import React from 'react'
import Topic from '@/components/Topic'
import styles from './contact.module.css'
import stylesAni from '../../components/Animation.module.css'
import { useState, useRef } from 'react'

function page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIntendedUse, setSelectedIntendedUse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [contactHovered, setContactHovered] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const contactRef = useRef(null);

  const handleMouseEnter = () => {
    setContactHovered(true); 
  };

  const handleMouseLeave = () => {
    setContactHovered(false); 
  };
  return (
    <div>
        {/* Form Section */}
        <Topic title="CONTACT"/>
        <form  className={styles.form_container} autoComplete='off' action="#" method="POST">
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Name *</label>
              <input className={styles.form_input} type="text" id="name" name="name" placeholder="name" required/>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Email *</label>
              <input className={styles.form_input} type="text" id="name" name="name" placeholder="name@gmail.com" required/>
            </div>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_topic} >Preferred Contact Method</label>
            <input className={styles.form_input} type="text" id="name" name="name" placeholder="Email: name / Social Media: name / Facebook: name " required/>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Scale of Artwork *</label>
              <select
                className={styles.form_input}
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>Scale of Artwork *</option>
                <option value="full-body">Full-Body</option>
                <option value="half-body">Half-Body</option>
                <option value="bust-up">Bust-Up</option>
                <option value="chibi">Chibi</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Size *</label>
              <input className={styles.form_input} type="text" id="name" name="name" placeholder="A4, 1080x1080 pixels, or custom dimensions" required/>
            </div>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Background *</label>
              <select
                className={styles.form_input}
                id="background"
                name="background"
                value={selectedCategory}
                onChange={(e) => setSelectedackground(e.target.value)}
              >
                <option value="" disabled>Scale of Artwork *</option>
                <option value="full-body">Full-Body</option>
                <option value="half-body">Half-Body</option>
                <option value="bust-up">Bust-Up</option>
                <option value="chibi">Chibi</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Number of Characters *</label>
              <input className={styles.form_input} type='number' id="name" name="name" placeholder={1} required/>
            </div>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Deadline * (if urgent, additional fees may apply)</label>
              <input
                className={styles.form_input}
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Intended use of the artwork *</label>
              <select
                className={styles.form_input}
                id="intendedUse"
                name="intendedUse"
                value={selectedIntendedUse}
                onChange={(e) => setSelectedIntendedUse(e.target.value)}
              >
                <option value="" disabled>Select a Intended use</option>
                <option value="full-body">Personal</option>
                <option value="half-body">Commercial</option>
              </select>
            </div>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_topic} >Description of the Artwork</label>
            <textarea className={`${styles.form_input} ${styles.form_textArea}`} rows={7} type="text" id="name" name="name" placeholder={`The pose(s) and expression(s) of the character(s)\n
              The theme or mood (e.g., cozy, dramatic, whimsical)\n
              Specific details or elements to include (e.g., clothing, props, pets)\n
              Any text or messages to be added (if applicable)`} required/>
          </div>
        </form>

        {/* Agreement Section */}
        <div className={styles.agree_section}>
          <span className={styles.agree_topic}>Agreement:</span>
          <ul>
            <li>A deposit of [50%] is required to confirm your commission.</li>
            <li>The artwork is for [personal/commercial] use only (specify terms).</li>
            <li>No refunds once the work has begun, unless stated otherwise.</li>
          </ul>
          <div className={styles.checkbox}><input type="checkbox" name="subscribe" value="yes"/><span>I confirm that I have <span  className={styles.hight_light}>read</span> and <span  className={styles.hight_light}>accept</span> the <span>terms</span></span></div>
          <div className={styles.copy_container}>
            <span className={styles.copy}>Copy order</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1053 1H4.15789C3.52105 1 3 1.57273 3 2.27273V11.1818H4.15789V2.27273H11.1053V1ZM12.8421 3.54545H6.47368C5.83684 3.54545 5.31579 4.11818 5.31579 4.81818V13.7273C5.31579 14.4273 5.83684 15 6.47368 15H12.8421C13.4789 15 14 14.4273 14 13.7273V4.81818C14 4.11818 13.4789 3.54545 12.8421 3.54545ZM12.8421 13.7273H6.47368V4.81818H12.8421V13.7273Z" fill="#C5BAFF"/></svg>
          </div>
        </div>

        <div ref={contactRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          className={`${styles.contact} ${contactHovered ? styles.slideIn : styles.slideOut} ${contactVisible ? stylesAni.fadeIn : ''}`}>
          <span>SUBMIT</span>
          <svg className={styles.contactArrow} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1C1 1 18 9.80488 18 10.2683C18 10.7317 1 20 1 20"  strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
    </div>
  )
}

export default page