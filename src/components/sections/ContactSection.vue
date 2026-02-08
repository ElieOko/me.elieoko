<!-- src/components/sections/ContactSection.vue -->
<template>
  <section id="contact" class="contact-section">
    <!-- Animated Background -->
    <div class="contact-bg">
      <div class="bg-circuit">
        <div class="circuit-line" v-for="n in 8" :key="n" :style="circuitStyle(n)"></div>
        <div class="circuit-node" v-for="node in circuitNodes" :key="node.id" :style="nodeStyle(node)"></div>
      </div>
    </div>
    
    <div class="container">
     
      
      <div class="contact-content">
        <!-- Left Column - Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <h3 class="info-title">
              <i class="fas fa-map-marker-alt"></i>
              Contact Information
            </h3>
            
            <div class="info-items">
              <div class="info-item" v-for="item in contactInfo" :key="item.id">
                <div class="item-icon" :style="{ backgroundColor: item.color }">
                  <i :class="item.icon"></i>
                </div>
                <div class="item-content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.value }}</p>
                  <a v-if="item.link" :href="item.link" class="item-link">
                    {{ item.action }}
                    <i class="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Availability -->
            <div class="availability">
              <h4><i class="fas fa-calendar-check"></i> Current Availability</h4>
              <div class="availability-status">
                <div class="status-indicator available"></div>
                <span>Available for new projects</span>
              </div>
              <p class="availability-note">
                Typically respond within 24 hours. Remote or on-site consultation available.
              </p>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="social-card">
            <h3 class="social-title">Connect Elsewhere</h3>
            <div class="social-grid">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url"
                class="social-item"
                :style="{ '--social-color': social.color }"
                target="_blank"
              >
                <div class="social-icon">
                  <i :class="social.icon"></i>
                </div>
                <div class="social-details">
                  <span class="social-name">{{ social.name }}</span>
                  <span class="social-handle">{{ social.handle }}</span>
                </div>
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Contact Form -->
        <div class="contact-form">
          <div class="form-card">
            <div class="form-header">
              <h3 class="form-title">
                <i class="fas fa-paper-plane"></i>
                Send Message
              </h3>
              <div class="form-status" :class="formStatusClass">
                <i :class="formStatusIcon"></i>
                {{ formStatus }}
              </div>
            </div>
            
            <form @submit.prevent="submitForm" class="form">
              <!-- Form Steps -->
              <div class="form-steps">
                <div 
                  v-for="(step, index) in formSteps" 
                  :key="step"
                  class="step"
                  :class="{ 
                    active: currentStep === index,
                    completed: currentStep > index
                  }"
                  @click="goToStep(index)"
                >
                  <div class="step-number">{{ index + 1 }}</div>
                  <span class="step-label">{{ step }}</span>
                </div>
              </div>
              
              <!-- Step 1: Project Details -->
              <div v-if="currentStep === 0" class="form-step">
                <div class="form-group">
                  <label for="projectType">
                    <i class="fas fa-project-diagram"></i>
                    Project Type
                  </label>
                  <select 
                    id="projectType" 
                    v-model="formData.projectType"
                    class="form-select dark-options"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="system">System Architecture</option>
                    <option value="cloud">Cloud Infrastructure</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="timeline">
                    <i class="fas fa-clock"></i>
                    Timeline
                  </label>
                  <select 
                    id="timeline" 
                    v-model="formData.timeline"
                    class="form-select dark-options"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1-4 weeks)</option>
                    <option value="short">Short-term (1-3 months)</option>
                    <option value="medium">Medium-term (3-6 months)</option>
                    <option value="long">Long-term (6+ months)</option>
                    <option value="ongoing">Ongoing partnership</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="budget">
                    <i class="fas fa-coins"></i>
                    Budget Range
                  </label>
                  <select 
                    id="budget" 
                    v-model="formData.budget"
                    class="form-select dark-options"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="small">$5k - $20k</option>
                    <option value="medium">$20k - $50k</option>
                    <option value="large">$50k - $100k</option>
                    <option value="enterprise">$100k+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>
              
              <!-- Step 2: Contact Info -->
              <div v-if="currentStep === 1" class="form-step">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">
                      <i class="fas fa-user"></i>
                      Name / Company
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      v-model="formData.name"
                      placeholder="Your name or company"
                      class="form-input"
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="email">
                      <i class="fas fa-envelope"></i>
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      v-model="formData.email"
                      placeholder="elieoko100@gmail.com"
                      class="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone">
                    <i class="fas fa-phone"></i>
                    Phone (Optional)
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    v-model="formData.phone"
                    placeholder="+1 (555) 123-4567"
                    class="form-input"
                  />
                </div>
                
                <div class="form-group">
                  <label for="website">
                    <i class="fas fa-globe"></i>
                    Website / LinkedIn
                  </label>
                  <input 
                    type="url" 
                    id="website"
                    v-model="formData.website"
                    placeholder="https://yourwebsite.com"
                    class="form-input"
                  />
                </div>
              </div>
              
              <!-- Step 3: Project Details -->
              <div v-if="currentStep === 2" class="form-step">
                <div class="form-group">
                  <label for="projectTitle">
                    <i class="fas fa-heading"></i>
                    Project Title
                  </label>
                  <input 
                    type="text" 
                    id="projectTitle"
                    v-model="formData.projectTitle"
                    placeholder="Brief project title"
                    class="form-input"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="description">
                    <i class="fas fa-align-left"></i>
                    Project Description
                  </label>
                  <textarea 
                    id="description"
                    v-model="formData.description"
                    placeholder="Describe your project, goals, and challenges..."
                    rows="4"
                    class="form-textarea"
                    required
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="requirements">
                    <i class="fas fa-list-check"></i>
                    Key Requirements
                  </label>
                  <div class="requirements-tags">
                    <label 
                      v-for="req in requirementOptions" 
                      :key="req.id"
                      class="requirement-tag"
                      :class="{ selected: formData.requirements.includes(req.id) }"
                    >
                      <input 
                        type="checkbox"
                        :value="req.id"
                        v-model="formData.requirements"
                        hidden
                      />
                      <i :class="req.icon"></i>
                      {{ req.label }}
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Step 4: Review & Submit -->
              <div v-if="currentStep === 3" class="form-step review-step">
                <div class="review-section">
                  <h4><i class="fas fa-clipboard-check"></i> Project Summary</h4>
                  <div class="review-grid">
                    <div class="review-item">
                      <span class="review-label">Project Type:</span>
                      <span class="review-value">{{ getProjectTypeLabel(formData.projectType) }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">Timeline:</span>
                      <span class="review-value">{{ getTimelineLabel(formData.timeline) }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">Budget:</span>
                      <span class="review-value">{{ getBudgetLabel(formData.budget) }}</span>
                    </div>
                    <div class="review-item">
                      <span class="review-label">Contact:</span>
                      <span class="review-value">{{ formData.name }} ({{ formData.email }})</span>
                    </div>
                  </div>
                </div>
                
                <div class="review-section">
                  <h4><i class="fas fa-file-alt"></i> Project Details</h4>
                  <p class="review-description">{{ formData.description }}</p>
                  
                  <div class="review-tags">
                    <span 
                      v-for="req in selectedRequirements" 
                      :key="req.id"
                      class="review-tag"
                    >
                      <i :class="req.icon"></i>
                      {{ req.label }}
                    </span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="formData.agreeTerms"
                      required
                    />
                    <span>I agree to the <a href="#" @click.prevent="openTerms">terms and conditions</a> and privacy policy</span>
                  </label>
                  
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="formData.subscribeNewsletter"
                    />
                    <span>Subscribe to monthly tech insights and updates</span>
                  </label>
                </div>
              </div>
              
              <!-- Form Navigation -->
              <div class="form-navigation">
                <button 
                  type="button" 
                  class="btn btn-secondary"
                  @click="previousStep"
                  v-if="currentStep > 0"
                >
                  <i class="fas fa-arrow-left"></i>
                  Previous
                </button>
                
                <div class="navigation-spacer"></div>
                
                <button 
                  type="button" 
                  class="btn btn-primary"
                  @click="nextStep"
                  v-if="currentStep < 3"
                >
                  Continue
                  <i class="fas fa-arrow-right"></i>
                </button>
                
                <button 
                  type="submit" 
                  class="btn btn-success"
                  :disabled="isSubmitting"
                  v-if="currentStep === 3"
                >
                  <i class="fas fa-paper-plane"></i>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
            
            <!-- Encryption Notice -->
            <div class="encryption-notice">
              <i class="fas fa-lock"></i>
              <span>All messages are encrypted and secured. Your information is protected.</span>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Circuit animation
interface CircuitNode {
  id: number
  x: number
  y: number
  pulse: number
}

const circuitNodes = ref<CircuitNode[]>([])
for (let i = 0; i < 12; i++) {
  circuitNodes.value.push({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    pulse: Math.random() * 100
  })
}

const circuitStyle = (n: number) => ({
  transform: `rotate(${n * 45}deg)`,
  animationDelay: `${n * 0.5}s`
})

const nodeStyle = (node: CircuitNode) => ({
  left: `${node.x}%`,
  top: `${node.y}%`,
  animationDelay: `${node.pulse}s`
})

// Contact Information
const contactInfo = [
  {
    id: 1,
    icon: 'fas fa-envelope',
    title: 'Email',
    value: 'elieoko100@gmail.com',
    link: 'mailto:elieoko100@gmail.com',
    action: 'Send Email',
    color: '#00f3ff'
  },
  {
    id: 2,
    icon: 'fab fa-github',
    title: 'GitHub',
    value: 'github.com/ElieOko',
    link: 'https://github.com/ElieOko',
    action: 'View Code',
    color: '#333333'
  },
  {
    id: 3,
    icon: 'fas fa-file-contract',
    title: 'Availability',
    value: 'Projects from 3 months',
    action: 'View Calendar',
    color: '#00ff41'
  },
  {
    id: 4,
    icon: 'fas fa-clock',
    title: 'Response Time',
    value: 'Within 24 hours',
    action: 'Learn More',
    color: '#9d4edd'
  }
]

// Social Links
const socialLinks = [
  {
    name: 'GitHub',
    handle: '@ElieOko',
    url: 'https://github.com',
    icon: 'fab fa-github',
    color: '#333333'
  },
  {
    name: 'LinkedIn',
    handle: 'Elie Oko',
    url: 'https://linkedin.com',
    icon: 'fab fa-linkedin',
    color: '#0077B5'
  },
  {
    name: 'Twitter',
    handle: '@ElieOko',
    url: 'https://twitter.com',
    icon: 'fab fa-twitter',
    color: '#1DA1F2'
  },
  {
    name: 'Stack Overflow',
    handle: 'Top 5%',
    url: 'https://stackoverflow.com',
    icon: 'fab fa-stack-overflow',
    color: '#F48024'
  }
]

// Form Data
const formSteps = ['Project Type', 'Contact Info', 'Details', 'Review']
const currentStep = ref(0)
const isSubmitting = ref(false)
const formStatus = ref('Ready to send')
const formStatusClass = ref('status-ready')
const formStatusIcon = ref('fas fa-circle')

const formData = reactive({
  projectType: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  website: '',
  projectTitle: '',
  description: '',
  requirements: [] as string[],
  agreeTerms: false,
  subscribeNewsletter: false
})

// Requirement Options
const requirementOptions = [
  { id: 'performance', label: 'High Performance', icon: 'fas fa-tachometer-alt' },
  { id: 'scalability', label: 'Scalability', icon: 'fas fa-expand-arrows-alt' },
  { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
  { id: 'mobile', label: 'Mobile Support', icon: 'fas fa-mobile-alt' },
  { id: 'api', label: 'API Development', icon: 'fas fa-code' },
  { id: 'cloud', label: 'Cloud Migration', icon: 'fas fa-cloud' },
  { id: 'devops', label: 'DevOps', icon: 'fas fa-cogs' },
  { id: 'ux', label: 'UX/UI Design', icon: 'fas fa-paint-brush' }
]

// Computed
const selectedRequirements = computed(() => {
  return requirementOptions.filter(req => formData.requirements.includes(req.id))
})

const getProjectTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    'web': 'Web Development',
    'mobile': 'Mobile App',
    'system': 'System Architecture',
    'cloud': 'Cloud Infrastructure',
    'consulting': 'Technical Consulting',
    'other': 'Other'
  }
  return types[type] || type
}

const getTimelineLabel = (timeline: string) => {
  const timelines: Record<string, string> = {
    'urgent': 'Urgent (1-4 weeks)',
    'short': 'Short-term (1-3 months)',
    'medium': 'Medium-term (3-6 months)',
    'long': 'Long-term (6+ months)',
    'ongoing': 'Ongoing partnership'
  }
  return timelines[timeline] || timeline
}

const getBudgetLabel = (budget: string) => {
  const budgets: Record<string, string> = {
    'small': '$5k - $20k',
    'medium': '$20k - $50k',
    'large': '$50k - $100k',
    'enterprise': '$100k+',
    'discuss': 'Let\'s discuss'
  }
  return budgets[budget] || budget
}

// Methods
const goToStep = (step: number) => {
  if (step <= currentStep.value) {
    currentStep.value = step
  }
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitForm = async () => {
  if (!formData.agreeTerms) {
    formStatus.value = 'Please agree to terms and conditions'
    formStatusClass.value = 'status-error'
    formStatusIcon.value = 'fas fa-exclamation-circle'
    return
  }

  isSubmitting.value = true
  formStatus.value = 'Sending message...'
  formStatusClass.value = 'status-sending'
  formStatusIcon.value = 'fas fa-spinner fa-spin'

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    formStatus.value = 'Message sent successfully!'
    formStatusClass.value = 'status-success'
    formStatusIcon.value = 'fas fa-check-circle'
    
    // Reset form after success
    setTimeout(() => {
      resetForm()
      currentStep.value = 0
      formStatus.value = 'Ready to send'
      formStatusClass.value = 'status-ready'
      formStatusIcon.value = 'fas fa-circle'
    }, 3000)
    
  } catch (error) {
    formStatus.value = 'Failed to send message. Please try again.'
    formStatusClass.value = 'status-error'
    formStatusIcon.value = 'fas fa-exclamation-circle'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(formData, {
    projectType: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    projectTitle: '',
    description: '',
    requirements: [],
    agreeTerms: false,
    subscribeNewsletter: false
  })
}

const scheduleCall = () => {
  window.open('https://calendly.com', '_blank')
}

const openTerms = () => {
  // Open terms modal or page
  console.log('Open terms modal')
}
</script>

<style scoped>
.contact-section {
  padding: 6rem 0;
  /* position: relative; */
  overflow: hidden;
}

/* Background Circuit */
.contact-bg {
  /* position: absolute; */
  inset: 0;
  z-index: -1;
  opacity: 0.1;
}

.bg-circuit {
  position: absolute;
  inset: 0;
}

.circuit-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00f3ff, transparent);
  transform-origin: center;
  animation: circuitPulse 4s ease-in-out infinite;
}

@keyframes circuitPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.circuit-node {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #00f3ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px #00f3ff;
  animation: nodePulse 2s ease-in-out infinite;
}

@keyframes nodePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.5); }
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-decorator {
  color: #00f3ff;
  font-family: monospace;
  opacity: 0.5;
}

.section-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.info-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  color: #00f3ff;
  font-size: 1.5rem;
}

.info-title i {
  font-size: 1.25rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
}

.item-content h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: white;
}

.item-content p {
  margin: 0 0 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.item-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #00f3ff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.item-link:hover {
  gap: 0.75rem;
}

/* Availability */
.availability {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.availability h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.availability-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.available {
  background: #00ff41;
  box-shadow: 0 0 10px #00ff41;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.availability-note {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Social Card */
.social-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.social-title {
  margin: 0 0 1.5rem;
  color: white;
  font-size: 1.25rem;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-item:hover {
  background: var(--social-color, rgba(0, 243, 255, 0.2));
  border-color: var(--social-color, #00f3ff);
  transform: translateY(-2px);
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--social-color, rgba(255, 255, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.social-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.social-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.social-handle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.social-item .fa-external-link-alt {
  font-size: 0.875rem;
  opacity: 0.5;
}

/* Contact Form */
.contact-form {
  position: relative;
}

.form-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: sticky;
  top: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  color: white;
  font-size: 1.5rem;
}

.form-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-status.status-ready {
  background: rgba(0, 243, 255, 0.1);
  color: #00f3ff;
  border: 1px solid rgba(0, 243, 255, 0.3);
}

.form-status.status-sending {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.form-status.status-success {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.form-status.status-error {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

/* Form Steps */
.form-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.form-steps::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: linear-gradient(135deg, #00f3ff, #9d4edd);
  border-color: transparent;
  color: white;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
}

.step.completed .step-number {
  background: #00ff41;
  border-color: transparent;
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  transition: all 0.3s ease;
}

.step.active .step-label {
  color: white;
  font-weight: 600;
}

/* Form Styles */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-step {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.dark-options {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(27, 3, 3, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-options option {
  background-color: #1a1a2e;
  color: rgba(26, 3, 3, 0.9);
}

.dark-options option:checked {
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.2), rgba(157, 78, 221, 0.2));

}
.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #00f3ff;
  box-shadow: 0 0 0 3px rgba(0, 243, 255, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Requirements Tags */
.requirements-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.requirement-tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.requirement-tag:hover {
  background: rgba(255, 255, 255, 0.1);
}

.requirement-tag.selected {
  background: rgba(0, 243, 255, 0.2);
  border-color: #00f3ff;
  color: #00f3ff;
}

/* Review Step */
.review-step {
  gap: 2rem;
}

.review-section {
  display: flex;
flex-direction: column;
gap: 1rem;
}

.review-section h4 {
display: flex;
align-items: center;
gap: 0.5rem;
margin: 0;
color: rgba(255, 255, 255, 0.9);
font-size: 1rem;
}

.review-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1rem;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 12px;
padding: 1.5rem;
}

.review-item {
display: flex;
flex-direction: column;
gap: 0.25rem;
}

.review-label {
font-size: 0.75rem;
color: rgba(255, 255, 255, 0.6);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.review-value {
font-size: 0.875rem;
color: white;
font-weight: 500;
}

.review-description {
margin: 0;
padding: 1rem;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 8px;
color: rgba(255, 255, 255, 0.8);
line-height: 1.6;
}

.review-tags {
display: flex;
flex-wrap: wrap;
gap: 0.5rem;
}

.review-tag {
padding: 0.25rem 0.75rem;
background: rgba(0, 243, 255, 0.1);
border: 1px solid rgba(0, 243, 255, 0.3);
border-radius: 1rem;
font-size: 0.75rem;
color: #00f3ff;
display: flex;
align-items: center;
gap: 0.25rem;
}

.checkbox-label {
display: flex;
align-items: flex-start;
gap: 0.75rem;
font-size: 0.875rem;
color: rgba(255, 255, 255, 0.8);
cursor: pointer;
line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
margin-top: 0.25rem;
flex-shrink: 0;
}

.checkbox-label a {
color: #00f3ff;
text-decoration: none;
}

.checkbox-label a:hover {
text-decoration: underline;
}

/* Form Navigation */
.form-navigation {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 2rem;
padding-top: 1.5rem;
border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.navigation-spacer {
flex: 1;
}

.btn {
padding: 0.75rem 1.5rem;
border: none;
border-radius: 8px;
font-weight: 600;
font-size: 0.875rem;
cursor: pointer;
display: inline-flex;
align-items: center;
gap: 0.5rem;
transition: all 0.3s ease;
}

.btn-primary {
background: linear-gradient(90deg, #00f3ff, #9d4edd);
color: white;
}

.btn-primary:hover:not(:disabled) {
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(0, 243, 255, 0.3);
}

.btn-secondary {
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
color: white;
}

.btn-secondary:hover:not(:disabled) {
background: rgba(255, 255, 255, 0.2);
border-color: #00f3ff;
}

.btn-success {
background: linear-gradient(90deg, #00ff41, #00cc33);
color: white;
}

.btn-success:hover:not(:disabled) {
transform: translateY(-2px);
box-shadow: 0 10px 25px rgba(0, 255, 65, 0.3);
}

.btn:disabled {
opacity: 0.5;
cursor: not-allowed;
}

.btn-large {
padding: 1rem 2rem;
font-size: 1rem;
}

/* Encryption Notice */
.encryption-notice {
display: flex;
align-items: center;
gap: 0.75rem;
margin-top: 2rem;
padding: 1rem;
background: rgba(0, 243, 255, 0.05);
border: 1px solid rgba(0, 243, 255, 0.1);
border-radius: 8px;
color: rgba(255, 255, 255, 0.7);
font-size: 0.875rem;
}

.encryption-notice i {
color: #00f3ff;
}

/* Call to Action */
.cta-section {
margin-top: 4rem;
}

.cta-card {
display: flex;
justify-content: space-between;
align-items: center;
padding: 3rem;
background: linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(157, 78, 221, 0.1));
border: 1px solid rgba(0, 243, 255, 0.2);
border-radius: 24px;
position: relative;
overflow: hidden;
}

.cta-card::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: radial-gradient(circle at 80% 20%, rgba(0, 243, 255, 0.1), transparent 50%);
}

.cta-content {
position: relative;
z-index: 1;
}

.cta-content h3 {
margin: 0 0 0.5rem;
font-size: 1.75rem;
color: white;
}

.cta-content p {
margin: 0;
color: rgba(255, 255, 255, 0.8);
max-width: 500px;
}

.cta-card .btn {
position: relative;
z-index: 1;
}

@media (max-width: 768px) {
.cta-card {
flex-direction: column;
gap: 2rem;
text-align: center;
padding: 2rem;
}

.cta-content h3 {
font-size: 1.5rem;
}
}

/* Responsive */
@media (max-width: 768px) {
.section-title {
font-size: 2rem;
}

.form-card {
padding: 1.5rem;
}

.form-steps {
flex-direction: column;
gap: 1rem;
align-items: flex-start;
}

.form-steps::before {
display: none;
}

.step {
flex-direction: row;
gap: 1rem;
}

.info-card,
.social-card {
padding: 1.5rem;
}
}
</style>