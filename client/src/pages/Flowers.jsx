import React from 'react'
import FlowersHero from '../components/flowersHero/FlowersHero'
import FlowersFilter from '../components/flowersFilter/FlowersFilter'
import FlowersProduct from '../components/flowersProduct/FlowersProduct'

function Flowers() {
  return (
    <main>
      <FlowersHero />
      <FlowersFilter />
    </main>
  )
}

export default Flowers