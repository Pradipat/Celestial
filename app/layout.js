'use client';

import { Arimo } from 'next/font/google'
import './globals.css'
import { useState } from 'react';
import { HoverProvider } from '@/contexts/HoverContext';

import Header from './_components/header'
import Footer from './_components/footer'
import CustomCursor from '../components/CustomCursor'

const arimo = Arimo({
  subsets: ['latin'],
  weight: '400',
})

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
