import HeroSection from '../components/sections/con1.homePage';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';
import FloatingButtons from '../components/layout/top'

const Home1 = () => {
  return (
    <>
      {/* FIX: Use position 'fixed' and the maximum z-index (z-[999] or z-50 in Tailwind) 
        to ensure the Navbar stays on top of ALL other fixed/absolute content, 
        including the Hero Section's visuals.
      */}
      <div className="fixed top-0 left-0 w-full z-[999]">
        <Navbar/>
      </div>

      {/* This fixed background element should remain low in the stack */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ backgroundColor: '#000011' }}
      >
      </div>

      {/* The HeroSection content will now flow below the fixed Navbar */}
      <HeroSection /> 
        
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default Home1;