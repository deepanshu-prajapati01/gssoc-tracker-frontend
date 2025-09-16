import React from 'react'
import HeroSection from './home/HeroSection'
import StatsSection from './home/StatsSection'
import HowItWorksSection from './home/HowItWorksSection'
import CommunitySection from './home/CommunitySection'
import BadgesSection from './home/BadgesSection'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <BadgesSection />
      <CommunitySection />
    </>
  )
}

export default HomePage
