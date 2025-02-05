import React from 'react'
import Topic from '@/components/Topic'
import styles from './tos.module.css'

function page() {
  return (
    <div>
        <Topic title="TERMS OF SERVICE"/>
        <div className={styles.tos_section}>
          <div className={styles.tos_container}>
            <ul>Portfolio Use:</ul>
            <li>Use of the portfolio is subject to the following terms of use:</li>
            <li>The content of the pages of this portfolio is for your general information and use only. It is subject to change without notice.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Payment:</ul>
            <li>Payments are accepted through [PayPal, credit card, bank transfer, etc.].</li>
            <li>Full payment must be made before I deliver the final artwork.</li>
            <li>No refunds once the work has begun, unless stated otherwise.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Process:</ul>
            <li>Once I receive your request, I will review the details and provide a final quote and timeline.</li>
            <li>I will share progress updates for your feedback.</li>
            <li>Completed artwork will be delivered digitally in [file formats, e.g., PNG, JPEG].</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Revisions and Edits:</ul>
            <li>Two times of minor revisions are included in the price during the sketch or coloring stage.</li>
            <li>Revisions beyond the included rounds will incur additional charges based on complexity.</li>
            <li>No major edits will be made after the final piece is delivered unless agreed upon, with additional fees.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Cancellations and Refunds:</ul>
            <li>If you wish to cancel your order, please notify me as soon as possible.</li>
            <li>Once work started deposits [first 50%] are non-refundable, unless work is in the early stage.</li>
            <li>No refunds will be given once the artwork is complete.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Usage Rights:</ul>
            <li>Personal Use:</li>
            <li>Commissioned artwork is for personal use only unless otherwise agreed upon.</li>
            <li>Examples of personal use: social media icons, prints for personal display.</li>
            
            <li>Commercial Use:</li>
            <li>Commercial rights must be purchased separately. Usage includes merchandise, advertising, or resale.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Credit and Copyright:</ul>
            <li>You may not claim the artwork as your own.</li>
            <li>Credit (e.g., tagging or mentioning me) is appreciated when sharing the artwork online.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Prohibited Uses:</ul>
            <li>You may not use the artwork to train AI.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Deadlines:</ul>
            <li>Completion time is 2 weeks, depending on complexity and current workload.</li>
            <li>Rush commissions may be available for an additional fee.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Updates to Terms:</ul>
            <li>These terms are subject to change without prior notice. Please review the terms before placing a new order.</li>
          </div>

          <div className={styles.tos_container}>
            <ul>Contact:</ul>
            <li>If you have any questions about these terms, please feel free to contact me via email or social media.</li>
          </div>
        </div>
    </div>
  )
}

export default page