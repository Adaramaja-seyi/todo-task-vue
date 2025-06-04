<template>
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero-section text-center">
        <b-container>
          <h1 class="hero-title">Master Your Tasks with TaskFlow</h1>
          <p class="hero-subtitle">Organize, track, and conquer your to-do list with ease.</p>
          <b-button to="/signup" variant="primary" size="lg" class="mt-3">Get Started</b-button>
        </b-container>
      </section>
  
      <!-- Features Section -->
      <section id="features" class="features-section">
        <b-container>
          <h2 class="section-title text-center mb-5">Features</h2>
          <b-row>
            <b-col md="4" class="mb-4">
              <b-card class="feature-card shadow-sm text-center">
                <div class="feature-icon mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h4>Task Management</h4>
                <p>Create, edit, and organize tasks effortlessly.</p>
              </b-card>
            </b-col>
            <b-col md="4" class="mb-4">
              <b-card class="feature-card shadow-sm text-center">
                <div class="feature-icon mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h4>Progress Tracking</h4>
                <p>Monitor completed and pending tasks with analytics.</p>
              </b-card>
            </b-col>
            <b-col md="4" class="mb-4">
              <b-card class="feature-card shadow-sm text-center">
                <div class="feature-icon mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h4>Easy Navigation</h4>
                <p>Intuitive interface for seamless task flow.</p>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </section>
  
      <!-- How It Works Section -->
      <section id="how-it-works" class="how-it-works-section">
        <b-container>
          <h2 class="section-title text-center mb-5">How It Works</h2>
          <b-row>
            <b-col md="4" class="mb-4">
              <div class="step-card text-center">
                <div class="step-number">1</div>
                <h4>Sign Up</h4>
                <p>Create your TaskFlow account in seconds.</p>
              </div>
            </b-col>
            <b-col md="4" class="mb-4">
              <div class="step-card text-center">
                <div class="step-number">2</div>
                <h4>Add Tasks</h4>
                <p>List your tasks and set priorities.</p>
              </div>
            </b-col>
            <b-col md="4" class="mb-4">
              <div class="step-card text-center">
                <div class="step-number">3</div>
                <h4>Track & Succeed</h4>
                <p>Monitor progress and complete tasks.</p>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </section>
  
      <!-- Contact Us Section -->
      <section id="contact-us" class="contact-us-section">
        <b-container>
          <h2 class="section-title text-center mb-5">Contact Us</h2>
          <b-row>
            <b-col md="6" class="mx-auto">
              <b-form @submit.prevent="submitContact">
                <b-form-group label="Name" class="mb-3">
                  <b-form-input v-model="contact.name" required></b-form-input>
                </b-form-group>
                <b-form-group label="Email" class="mb-3">
                  <b-form-input v-model="contact.email" type="email" required></b-form-input>
                </b-form-group>
                <b-form-group label="Message" class="mb-3">
                  <b-form-textarea v-model="contact.message" rows="5" required></b-form-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary" block>Send Message</b-button>
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </section>
  
      <!-- Footer -->
      <footer class="footer-section text-center">
        <b-container>
          <p>© 2025 TaskFlow. All rights reserved.</p>
        </b-container>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingView',
    data() {
      return {
        contact: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      submitContact() {
        alert('Thank you for your message! We will get back to you soon.');
        this.contact = { name: '', email: '', message: '' };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Landing Page Styles */
  .landing-page {
    padding-top: 0;
  }
  
  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%);
    padding: 6rem 0;
    color: #0d1229;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    color: rgba(13, 18, 41, 0.7);
  }
  
  /* Features Section */
  .features-section {
    padding: 4rem 0;
    background: #fff;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 600;
    color: #0d1229;
  }
  
  .feature-card {
    border: none;
    border-radius: 12px;
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    color: #007bff;
  }
  
  /* How It Works Section */
  .how-it-works-section {
    padding: 4rem 0;
    background: #f8f9ff;
  }
  
  .step-card {
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .step-card:hover {
    transform: translateY(-5px);
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-weight: 600;
  }
  
  /* Contact Us Section */
  .contact-us-section {
    padding: 4rem 0;
    background: #fff;
  }
  
  /* Footer */
  .footer-section {
    padding: 2rem 0;
    background: #0d1229;
    color: rgba(255, 255, 255, 0.7);
  }
  
  /* Responsive */
  @media (max-width: 991.98px) {
    .hero-title {
      font-size: 2.5rem;
    }
  
    .section-title {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 576px) {
    .hero-title {
      font-size: 2rem;
    }
  
    .hero-subtitle {
      font-size: 1rem;
    }
  
    .section-title {
      font-size: 1.75rem;
    }
  }
  </style>