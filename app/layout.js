import { Arimo } from 'next/font/google'
import './globals.css'
import { HoverProvider } from '@/contexts/HoverContext';

import Header from './_components/header'
import Footer from './_components/footer'
import CustomCursor from '../components/CustomCursor'

const arimo = Arimo({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: "Celestial",
  description: "Celestial",
  icons: {
    icon: "/favicon.ico", // ✅ สำหรับทุก Browser
    shortcut: "/favicon.ico", // ✅ สำหรับบาง Browser ที่ต้องใช้ shortcut
    apple: "/favicon.ico", // ✅ สำหรับ iPhone & iPad
  },
};

export default function DashboardLayout({ children }) {

  return (
    <html lang="en" className={arimo.className}>
      <body>
        <HoverProvider>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </HoverProvider>
      </body>
    </html>
  )
}
