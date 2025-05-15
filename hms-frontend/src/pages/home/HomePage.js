import React from 'react'
import Navbar from '../../components/home-components/navBar/NavBar'
import Hero from '../../components/home-components/hero/Hero.js'
import About from '../../components/home-components/about/About'
import Facilties from '../../components/home-components/facilities/Facilties.js'
import Success from '../../components/home-components/success/Success'
import Services from '../../components/home-components/services/Services'
import ContactUsAd from '../../components/home-components/contact-ad/ContactUsAd.js'
import Testimonial from '../../components/home-components/testimonials/Testimonial.js'
import Blogs from '../../components/home-components/blogs/Blogs'
import OurTeam from '../../components/home-components/our-team/OurTeam.js'
import Premium from '../../components/home-components/premium/Premium.js'
import Appointment from '../../components/home-components/appointment/Appointment'
import Footer from '../../components/home-components/footer/Footer'




export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Facilties />
      <Success />
      <Services />
      <ContactUsAd />
      <Testimonial />
      <Blogs/>
      <OurTeam />
      <Premium/>
      <Appointment />
      <Footer/>
    </div>
  )
}
