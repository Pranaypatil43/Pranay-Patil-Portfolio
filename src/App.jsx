import React from 'react'
import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import Journey      from './components/Journey'
import Achievements from './components/Achievements'
import Contact      from './components/Contact'

export default function App() {
  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
