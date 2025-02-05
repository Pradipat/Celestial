'use client'

import React from 'react'
import Topic from '@/components/Topic'
import styles from './faq.module.css'
import { useState } from 'react'

function page() {
  const questions = [
    "What is the purpose of this website?",
    "How can I contact support?",
    "Do you offer refunds?",
    "What is the purpose of this website?",
    "How can I contact support?",
  ];

  const answers = [
    "This website is designed to provide users with useful information.",
    "You can contact support through our email or social media channels.",
    "Refunds are available under certain conditions. Please check our policy.",
    "Refunds are available under certain conditions. Please check our policy.",
    "Refunds are available under certain conditions. Please check our policy.",
  ];

  const [openIndexes, setOpenIndexes] = useState([]);


  const toggleQuestion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };


  return (
    <div>
        <Topic title="FAQs" />
        {questions.map((question, index) => (
          <div key={index} className={`${styles.question_container} ${openIndexes.includes(index) ? styles.question_container_open : ''}`}>
            <div onClick={() => toggleQuestion(index)} className={styles.question_topic_container}>
              <div className={styles.question_topic}>
                <img src='/Q.png' alt="Q Icon" />
                <span>{question}</span>
              </div>
              <div className={styles.arrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.06 5.53L8 8.58333L4.94 5.53L4 6.47L8 10.47L12 6.47L11.06 5.53Z" fill="#8F81DD" />
                </svg>
              </div>
            </div>
            <div className={`${styles.question_text} ${openIndexes.includes(index) ? styles.question_text_open : ''}`}>
              <div className={styles.question_text2}>{answers[index]}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default page