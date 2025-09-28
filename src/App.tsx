import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import './App.css'
// import cyberBg from './assets/cyber-bg.jpg'

interface ContactFormData {
  name: string
  email: string
  organization?: string
  message: string
}

const EMAILJS_SERVICE_ID = 'service_w0sra4a' 
const EMAILJS_TEMPLATE_ID = 'template_xypqage'
const EMAILJS_PUBLIC_KEY = 'aK7JLOSCCoummC8qh'

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize EmailJS (you only need to do this once)
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Prepare email data
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        organization: data.organization || 'Not specified',
        message: data.message,
        to_email: 'contact@cyberdeities.bt' // Replace with your actual email
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      setSubmitStatus('success')
      reset() // Clear form
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {submitStatus === 'success' && (
        <div className="success-message">
          <p className="tech-font neon-text">✓ Message sent successfully! We'll get back to you within 24 hours.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          <p className="tech-font" style={{ color: 'var(--accent)' }}>
            ✗ Failed to send message. Please try again or contact us directly.
          </p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name *"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address *"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Organization/Company"
            {...register('organization')}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Tell us about your cybersecurity needs and how we can help you... *"
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' }
            })}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-text">{errors.message.message}</span>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Get Security Consultation'}
        </button>
      </form>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="terminal">
          <p className="tech-font neon-text">{'>>'} Initializing secure connection...</p>
          <p className="tech-font neon-text">{'>>'} Running security protocols...</p>
          <p className="tech-font neon-text">{'>>'} Access granted...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <h1 className="tech-font neon-text">Cyber Deities</h1>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#why-choose">Why Choose Us</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className="hero" style={{
        backgroundColor: 'var(--background)',  // Fallback background
        // backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url(${cyberBg})`
      }}>
        <div className="container">
          <h1 className="tech-font">Protecting Bhutan's Digital Frontier</h1>
          <p className="subtitle">Trusted cybersecurity solutions for businesses and organizations across the Kingdom of Bhutan</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Secure Your Business</button>
            <button className="btn btn-outline">Our Services</button>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <h2 className="tech-font">Our Services</h2>
          <div className="grid grid-3">
            <div className="service-card">
              <h3>Security Audits & OWASP Assessments</h3>
              <p>Comprehensive security audits based on OWASP Top 10 vulnerabilities to identify and address critical security gaps in your applications.</p>
            </div>
            <div className="service-card">
              <h3>Penetration Testing</h3>
              <p>Professional web and mobile application penetration testing to uncover vulnerabilities before malicious actors do.</p>
            </div>
            <div className="service-card">
              <h3>Network & Infrastructure Security</h3>
              <p>Thorough network and infrastructure security assessments to protect your organization's critical systems and data.</p>
            </div>
            <div className="service-card">
              <h3>Security Awareness Training</h3>
              <p>Educational programs to help your team recognize and respond to cyber threats, building your first line of defense.</p>
            </div>
            <div className="service-card">
              <h3>Incident Response Planning</h3>
              <p>Expert consulting to develop comprehensive incident response plans, ensuring your organization is prepared for security events.</p>
            </div>
            <div className="service-card">
              <h3>Cybersecurity Consulting</h3>
              <p>Strategic guidance on implementing effective security measures tailored to your business needs and regulatory requirements.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <div className="grid grid-2">
            <div>
              <h2 className="tech-font">About Cyber Deities</h2>
              <p><strong>Our Mission:</strong> To safeguard Bhutanese businesses, government institutions, and individuals in the digital age by providing accessible, reliable, and comprehensive cybersecurity services that protect against evolving cyber threats.</p>
              <p>As a dedicated cybersecurity firm based in Bhutan, we understand the unique challenges facing organizations in our digital landscape. Our team combines international cybersecurity expertise with deep knowledge of the local business environment.</p>
              <p><strong>Our Vision:</strong> To be the trusted cybersecurity partner that empowers Bhutanese organizations to confidently embrace digital transformation while maintaining the highest standards of security.</p>
            </div>
            <div>
              <h3 className="tech-font">Our Values</h3>
              <div className="values-list">
                <div className="value-item">
                  <h4>Trust & Transparency</h4>
                  <p>Building lasting relationships through honest communication and reliable service delivery.</p>
                </div>
                <div className="value-item">
                  <h4>Local Expertise</h4>
                  <p>Understanding Bhutan's unique digital landscape and regulatory environment.</p>
                </div>
                <div className="value-item">
                  <h4>Continuous Learning</h4>
                  <p>Staying ahead of emerging threats through ongoing education and professional development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose" className="section">
        <div className="container">
          <h2 className="tech-font">Why Choose Cyber Deities?</h2>
          <div className="grid grid-3">
            <div className="service-card">
              <h3>Local Knowledge, Global Standards</h3>
              <p>We understand Bhutan's business environment, regulatory requirements, and cultural context while applying internationally recognized cybersecurity frameworks and best practices.</p>
            </div>
            <div className="service-card">
              <h3>Tailored Solutions</h3>
              <p>Every organization is unique. We design customized security strategies that fit your specific needs, budget, and risk profile rather than offering one-size-fits-all solutions.</p>
            </div>
            <div className="service-card">
              <h3>Transparent Communication</h3>
              <p>We explain complex security concepts in clear, understandable terms. No jargon, no confusion—just honest assessments and practical recommendations you can act on.</p>
            </div>
            <div className="service-card">
              <h3>Proactive Partnership</h3>
              <p>Beyond identifying problems, we work with you to implement sustainable solutions and build long-term security resilience for your organization.</p>
            </div>
            <div className="service-card">
              <h3>Accessible Expertise</h3>
              <p>Professional cybersecurity services designed to be accessible to Bhutanese businesses of all sizes, from small enterprises to large organizations.</p>
            </div>
            <div className="service-card">
              <h3>Commitment to Excellence</h3>
              <p>We're invested in Bhutan's digital future. Your security is our priority, and we're committed to delivering reliable, high-quality services that protect what matters most to you.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2 className="tech-font">Ready to Secure Your Business?</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Take the first step towards better cybersecurity. Contact us for a consultation and learn how we can help protect your organization.
          </p>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2025 Cyber Deities. All rights reserved. Protecting Bhutan's digital future.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
