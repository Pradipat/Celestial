'use client'

import React from 'react'
import Topic from '@/components/Topic'
import styles from './contact.module.css'
import stylesAni from '../../components/Animation.module.css'
import { useState, useRef } from 'react'
import axios from 'axios'

function page() {
  const [contactHovered, setContactHovered] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactMethod: "",
    scale: "",
    size: "",
    background: "",
    numCharacters: 1,
    deadline: "",
    intendedUse: "",
    description: "",
    agreement: false, // สำหรับติ๊ก checkbox
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const contactRef = useRef(null);

  // ✅ อัปเดตค่าเมื่อพิมพ์ใน input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // ✅ ถ้าพิมพ์ข้อมูลให้ลบกรอบแดงออก
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    setStatus("")

    // ✅ ตรวจสอบฟิลด์ที่ว่าง
    const newErrors = {};
    if (!formData.agreement) {
      newErrors.agreement = "You must accept the agreement before submitting.";
    }

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" || formData[key] === null) {
        if (key !== "agreement") newErrors[key] = "This field is required.";
      }
    });

    // 📌 ถ้ามีฟิลด์ที่ผิดพลาด → แจ้งเตือนและไม่ส่งฟอร์ม
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("❌ Please fill in all required fields.");
      console.log(status);
      return;
    }

    if (!formData.agreement) {
      setStatus("❌ Please accept the agreement before submitting.");
      console.log(status);
      return;
    }

    setStatus("⏳ Sending order confirmation...");
    console.log(status)

    try {
      const res = await axios.post("/api/contact", formData);
      if (res.status === 200) {
        setStatus("✅ Order confirmed! Check your email.");
        setFormData({
          name: "",
          email: "",
          contactMethod: "",
          scale: "",
          size: "",
          background: "",
          numCharacters: 1,
          deadline: "",
          intendedUse: "",
          description: "",
          agreement: false,
        });
        setErrors({});
      }
    } catch (error) {
      setStatus("❌ Failed to confirm order.");
    }
  };

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
              <input className={`${styles.form_input} ${errors.name ? styles.errorBorder : ""}`} onChange={handleChange} value={formData.name} type="text" id="name" name="name" placeholder="Your-Name" required/>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Email *</label>
              <input className={`${styles.form_input} ${errors.email ? styles.errorBorder : ""}`} onChange={handleChange} value={formData.email} type="email" id="email" name="email" placeholder="your-email@gmail.com" required/>
            </div>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_topic} >Preferred Contact Method</label>
            <input className={`${styles.form_input}`} onChange={handleChange} value={formData.contactMethod} type="text" id="contactMethod" name="contactMethod" placeholder="Email: name / Social Media: name / Facebook: name "/>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Scale of Artwork *</label>
              <select
                className={`${styles.form_input} ${errors.scale ? styles.errorBorder : ""}`}
                id="scale"
                name="scale"
                value={formData.scale}
                onChange={handleChange}
                required
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
              <input className={`${styles.form_input} ${errors.size ? styles.errorBorder : ""}`} onChange={handleChange} value={formData.size} type="text" id="size" name="size" placeholder="A4, 1080x1080 pixels, or custom dimensions" required/>
            </div>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Background *</label>
              <select
                className={`${styles.form_input} ${errors.background ? styles.errorBorder : ""}`}
                id="background"
                name="background"
                value={formData.background}
                onChange={handleChange}
              >
                <option value="" disabled>Background of Artwork *</option>
                <option value="Full-CG">Full-CG</option>
                <option value="Simple-BG">Simple-BG</option>
                <option value="transparent">transparent</option>
                <option value="white-BG">white-BG"</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Number of Characters *</label>
              <input className={`${styles.form_input} ${errors.numCharacters ? styles.errorBorder : ""}`} onChange={handleChange} value={formData.numCharacters} type='number' id="numCharacters" name="numCharacters" min="1" required/>
            </div>
          </div>
          <div className={styles.form_group_two}>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Deadline * (if urgent, additional fees may apply)</label>
              <input
                className={`${styles.form_input} ${errors.deadline ? styles.errorBorder : ""}`}
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_topic} >Intended use of the artwork *</label>
              <select
                className={`${styles.form_input} ${errors.intendedUse ? styles.errorBorder : ""}`}
                id="intendedUse"
                name="intendedUse"
                value={formData.intendedUse}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Intended use</option>
                <option value="Commercial">Personal</option>
                <option value="Personal">Commercial</option>
              </select>
            </div>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_topic} >Description of the Artwork</label>
            <textarea className={`${styles.form_input} ${styles.form_textArea}`} rows={7}value={formData.description} onChange={handleChange} type="text" id="description" name="description" placeholder={`The pose(s) and expression(s) of the character(s)\n
              The theme or mood (e.g., cozy, dramatic, whimsical)\n
              Specific details or elements to include (e.g., clothing, props, pets)\n
              Any text or messages to be added (if applicable)`}/>
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
          <div className={styles.checkbox}><input onChange={handleChange} checked={formData.agreement} type="checkbox" name="agreement" required/><span>I confirm that I have <span  className={styles.hight_light}>read</span> and <span  className={styles.hight_light}>accept</span> the <span>terms</span></span>{errors.agreement && <p className={`${styles.errorText}`}>❌ You must accept the agreement before submitting.</p>}</div>
          <div className={styles.copy_container}>
            <span className={styles.copy}>Copy order</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1053 1H4.15789C3.52105 1 3 1.57273 3 2.27273V11.1818H4.15789V2.27273H11.1053V1ZM12.8421 3.54545H6.47368C5.83684 3.54545 5.31579 4.11818 5.31579 4.81818V13.7273C5.31579 14.4273 5.83684 15 6.47368 15H12.8421C13.4789 15 14 14.4273 14 13.7273V4.81818C14 4.11818 13.4789 3.54545 12.8421 3.54545ZM12.8421 13.7273H6.47368V4.81818H12.8421V13.7273Z" fill="#C5BAFF"/></svg>
          </div>
        </div>

        <div ref={contactRef} onClick={handleSubmit} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          className={`${styles.contact} ${contactHovered ? styles.slideIn : styles.slideOut}`}>
          <span>SUBMIT</span>
          <svg className={styles.contactArrow} width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1C1 1 18 9.80488 18 10.2683C18 10.7317 1 20 1 20"  strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
    </div>
  )
}

export default page