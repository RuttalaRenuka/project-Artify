import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';

// Pages import definitions
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const { currentTab } = useApp();

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'offers':
        return <Offers />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div id="artify-app-shell" className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Universal Announcement offers */}
      <AnnouncementBar />
      
      {/* Header containing brand logo and menu controls */}
      <Header />
      
      {/* Reactive Main viewport */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      
      {/* Studio footer declarations */}
      <Footer />
      
      {/* Floating AI dynamic live chat */}
      <LiveChat />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
