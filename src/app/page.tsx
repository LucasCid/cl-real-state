//page.tsx

"use client"
import { About } from '@/components/About'
import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JoinCommunity } from '@/components/JoinCommunity'
import { Properties } from '@/components/Properties'
import { Services } from '@/components/Services'
import { TransitionPage } from '@/components/TransitionPage'
import dynamic from "next/dynamic"
import WhatsAppFloat from "@/components/WhatsappFloat"
// import AIChatBot from '@/components/AIChatBot'

// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import WhatsAppFloat from '@/components/WhatsAppFloat';
import ChatBot from "@/components/ChatBot"




const LocationMap = dynamic(
  () => import('../components/Location').then(module => module.Location),
  {
    ssr: false
  }
)

export default function Home() {

  return (
    <>
      <TransitionPage />
      <Header />
      
      <main>
        <Banner />
        <Properties />
        <div className="max-w-6xl mx-auto">
          <Services />
          <LocationMap />
          <About />
        </div>
        <JoinCommunity />
        <Footer />
     <WhatsAppFloat />

     <ChatBot/>
   
      </main>
    </>
  )
}
