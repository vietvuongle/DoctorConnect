import React from 'react'
import { HeroSection } from '../components/HeroSection'
import { ServicesSection } from '../components/ServicesSection'
import { BookingSteps } from '../components/BookingSteps'
import { DoctorsSection } from '../components/DoctorsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { ContactSection } from '../components/ContactSection'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ServicesSection />
      <BookingSteps />
      <DoctorsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Home