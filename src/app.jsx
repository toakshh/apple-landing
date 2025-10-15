
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Showcase from './components/Showcase';
import Features from './components/Features';
import Highlights from './components/Highlights';
import Footer from './components/Footer';
import Performance from './components/Performance';

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  )
}

export default App