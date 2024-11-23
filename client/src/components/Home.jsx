import React, { useEffect, useState } from 'react';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="app-container">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <h2 className="logo-text">InvoiceFlow</h2>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link fade-in fade-in-delay-1">Features</a>
          <a href="#solutions" className="nav-link fade-in fade-in-delay-2">Solutions</a>
          <a href="#developers" className="nav-link fade-in fade-in-delay-2">Developers</a>
          <a href="#docs" className="nav-link fade-in fade-in-delay-2">Docs</a>
          <a href="#login" className="cta-button fade-in fade-in-delay-3">Get Started</a>
        </div>
      </nav>

      <section className="hero-section">
        <h1 className="hero-title">
          Financial Infrastructure<br />For Modern Business
        </h1>
        <p className="hero-subtitle">
          Build powerful invoicing solutions with our developer-friendly platform
        </p>
        <a href="#demo" className="cta-button hero-cta">Book a Demo</a>
      </section>

      <section className="stats-section">
        {[
          { number: '$800M+', label: 'Processed Volume' },
          { number: '20,000+', label: 'Monthly Transactions' },
          { number: '2,000+', label: 'Active Companies' }
        ].map((stat, index) => (
          <div key={index} className={`stat-card fade-in fade-in-delay-${index + 1}`}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="features-grid">
        {[
          {
            title: 'Smart Invoicing',
            description: 'Create and manage invoices with automated payment tracking'
          },
          {
            title: 'Payment Integration',
            description: 'Accept payments in multiple currencies with built-in processing'
          },
          {
            title: 'Analytics Dashboard',
            description: 'Get real-time insights into your invoicing performance'
          },
          {
            title: 'API-First',
            description: 'Powerful APIs and SDKs for seamless integration'
          },
          {
            title: 'Compliance Ready',
            description: 'Built-in compliance features for major regulations'
          },
          {
            title: 'Automated Workflows',
            description: 'Streamline processes with customizable automation'
          }
        ].map((feature, index) => (
          <div key={index} className={`feature-card fade-in fade-in-delay-${index % 3 + 1}`}>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
