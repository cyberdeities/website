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
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ff00"/>
                    <stop offset="100%" stopColor="#00cc00"/>
                  </linearGradient>
                </defs>
                <path d="M12 2 C8 2, 6 4, 6 7 L6 12 C6 16, 12 18, 12 18 S18 16, 18 12 L18 7 C18 4, 16 2, 12 2 Z" 
                      fill="url(#logo-gradient)"/>
                <rect x="10" y="10" width="4" height="3" rx="0.5" fill="#0a0a0a"/>
                <path d="M10.5 10 L10.5 8.5 C10.5 7.7, 11.2 7, 12 7 S13.5 7.7, 13.5 8.5 L13.5 10" 
                      fill="none" stroke="#0a0a0a" strokeWidth="0.8"/>
              </svg>
            </div>
          <h1 className="tech-font neon-text">Cyber Deities</h1>
          </div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Trust</a>
            <a href="#faq">FAQ</a>
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
          <p className="section-subtitle">Comprehensive cybersecurity solutions designed for Bhutanese businesses</p>
          <div className="grid grid-3">
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        stroke="#00ff00" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Security Audits & OWASP Assessments</h3>
              <p>Comprehensive security audits based on OWASP Top 10 vulnerabilities to identify and address critical security gaps in your applications.</p>
              <div className="service-example">
                <strong>Example:</strong> Securing banking portals and government e-services in Bhutan
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M12 15l3.53-3.53a1 1 0 00-1.414-1.414L12 12.172 9.88 10.05a1 1 0 10-1.414 1.414L12 15z" fill="#00ff00"/>
                  <path d="M4 7h16v2H4V7zM4 11h16v2H4v-2zM4 15h7v2H4v-2z" stroke="#00ff00" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <h3>Penetration Testing</h3>
              <p>Professional web and mobile application penetration testing to uncover vulnerabilities before malicious actors do.</p>
              <div className="service-example">
                <strong>Example:</strong> Testing e-commerce platforms and mobile banking apps for Bhutanese companies
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        stroke="#00ff00" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" stroke="#00ff00" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <h3>Network & Infrastructure Security</h3>
              <p>Thorough network and infrastructure security assessments to protect your organization's critical systems and data.</p>
              <div className="service-example">
                <strong>Example:</strong> Securing office networks for hotels, hospitals, and government offices
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#00ff00" strokeWidth="2" fill="none"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
                        stroke="#00ff00" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Security Awareness Training</h3>
              <p>Educational programs to help your team recognize and respond to cyber threats, building your first line of defense.</p>
              <div className="service-example">
                <strong>Example:</strong> Training programs for staff in tourism, finance, and education sectors
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#00ff00" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Incident Response Planning</h3>
              <p>Expert consulting to develop comprehensive incident response plans, ensuring your organization is prepared for security events.</p>
              <div className="service-example">
                <strong>Example:</strong> Emergency response protocols for telecom and utility companies
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                        stroke="#00ff00" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Cybersecurity Consulting</h3>
              <p>Strategic guidance on implementing effective security measures tailored to your business needs and regulatory requirements.</p>
              <div className="service-example">
                <strong>Example:</strong> Compliance consulting for financial institutions and healthcare providers
              </div>
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

      {/* <section id="testimonials" className="section">
        <div className="container">
          <h2 className="tech-font">Trusted by Bhutanese Organizations</h2>
          <div className="grid grid-3">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <p>"Cyber Deities helped us secure our online banking platform with thorough OWASP assessments. Their local expertise combined with international standards gave us confidence in our digital services."</p>
              </div>
              <div className="testimonial-author">
                <strong>Dorji Wangchuk</strong>
                <span>IT Director, Bhutan National Bank</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <p>"The security awareness training provided by Cyber Deities was excellent. Our staff now confidently recognize and respond to cyber threats, significantly improving our overall security posture."</p>
              </div>
              <div className="testimonial-author">
                <strong>Pema Lhamo</strong>
                <span>HR Manager, Tourism Council of Bhutan</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <p>"Their incident response planning was crucial for our hospital. We now have clear protocols that protect patient data and ensure continuity of critical healthcare services."</p>
              </div>
              <div className="testimonial-author">
                <strong>Dr. Karma Rinzin</strong>
                <span>CIO, Jigme Dorji Wangchuck National Referral Hospital</span>
              </div>
            </div>
          </div>
          
          <div className="certifications">
            <h3 className="tech-font">Our Certifications & Affiliations</h3>
            <div className="cert-list">
              <div className="cert-item">
                <span className="cert-badge">CISSP</span>
                <span>Certified Information Systems Security Professional</span>
              </div>
              <div className="cert-item">
                <span className="cert-badge">CEH</span>
                <span>Certified Ethical Hacker</span>
              </div>
              <div className="cert-item">
                <span className="cert-badge">CISA</span>
                <span>Certified Information Systems Auditor</span>
              </div>
              <div className="cert-item">
                <span className="cert-badge">OWASP</span>
                <span>Open Web Application Security Project Member</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="faq" className="section">
        <div className="container">
          <h2 className="tech-font">Frequently Asked Questions</h2>
          <p className="section-subtitle">Common cybersecurity questions from Bhutanese businesses</p>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Why does my small business in Bhutan need cybersecurity?</h3>
              <p>Even small businesses are targeted by cybercriminals. With Bhutan's growing digital economy, protecting customer data, financial information, and business operations is essential for maintaining trust and regulatory compliance.</p>
            </div>
            <div className="faq-item">
              <h3>What are the most common cyber threats facing Bhutanese organizations?</h3>
              <p>Phishing attacks, ransomware, weak passwords, unpatched software, and social engineering. We help organizations address these threats through comprehensive security assessments and training.</p>
            </div>
            <div className="faq-item">
              <h3>How often should we conduct security assessments?</h3>
              <p>We recommend annual comprehensive assessments for most organizations, with quarterly reviews for high-risk sectors like banking, healthcare, and government services.</p>
            </div>
            <div className="faq-item">
              <h3>Do you provide services in Dzongkha?</h3>
              <p>Yes, our team can conduct training and consultations in Dzongkha, English, and Nepali to ensure all staff members can fully understand and implement security practices.</p>
            </div>
            <div className="faq-item">
              <h3>What makes Cyber Deities different from international cybersecurity firms?</h3>
              <p>We understand Bhutan's unique regulatory environment, cultural context, and business practices. This local knowledge, combined with international cybersecurity expertise, provides more relevant and effective solutions.</p>
            </div>
            <div className="faq-item">
              <h3>How quickly can you respond to a security incident?</h3>
              <p>Our incident response team is available 24/7 for critical situations. We typically respond within 2 hours for emergency incidents and provide immediate guidance to minimize damage.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="section">
        <div className="container">
          <h2 className="tech-font">Cybersecurity Insights for Bhutan</h2>
          <p className="section-subtitle">Stay informed about the latest cybersecurity trends and threats affecting Bhutanese businesses</p>
          
          <div className="grid grid-3">
            <div className="blog-card">
              <div className="blog-date">
                <span className="tech-font">Jan 15, 2025</span>
              </div>
              <h3>Essential Cybersecurity Checklist for Bhutanese Small Businesses</h3>
              <p>A comprehensive guide covering the fundamental security measures every small business in Bhutan should implement to protect against common cyber threats.</p>
              <a href="#" className="blog-link tech-font">Read More →</a>
            </div>
            
            <div className="blog-card">
              <div className="blog-date">
                <span className="tech-font">Jan 10, 2025</span>
              </div>
              <h3>Understanding OWASP Top 10: A Guide for Bhutanese Developers</h3>
              <p>An in-depth look at the OWASP Top 10 web application security risks and how Bhutanese developers can build more secure applications.</p>
              <a href="#" className="blog-link tech-font">Read More →</a>
            </div>
            
            <div className="blog-card">
              <div className="blog-date">
                <span className="tech-font">Jan 05, 2025</span>
              </div>
              <h3>Preparing for Cyber Incidents: Lessons from Global Best Practices</h3>
              <p>How Bhutanese organizations can learn from international incident response strategies to build resilient cybersecurity frameworks.</p>
              <a href="#" className="blog-link tech-font">Read More →</a>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-outline">View All Articles</button>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2 className="tech-font">Ready to Secure Your Business?</h2>
          <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            Take the first step towards better cybersecurity. Contact us for a consultation and learn how we can help protect your organization.
          </p>
          
          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="tech-font">Get In Touch</h3>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                          fill="#00ff00"/>
                  </svg>
                </div>
                <div>
                  <strong>Office Address</strong>
                  <p>Cyber Deities Ltd.<br/>
                  Norzin Lam, Chang Lam Plaza<br/>
                  Thimphu 11001, Bhutan</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" 
                          fill="#00ff00"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>info@cyberdeities.bt<br/>
                  support@cyberdeities.bt</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" 
                          fill="#00ff00"/>
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>+975 2 123 456<br/>
                  Emergency: +975 17 123 456</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
                          fill="#00ff00"/>
                  </svg>
                </div>
                <div>
                  <strong>Business Hours</strong>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>
                  Saturday: 10:00 AM - 4:00 PM<br/>
                  24/7 Emergency Response Available</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <ContactForm />
            </div>
          </div>
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
