<template>
  <section id="contact" class="section contact">
    <div class="container editorial-grid">
      <aside class="section-aside">
        <span class="section-number">04</span>
        <p class="section-eyebrow">Contact</p>
        <p>
          Pour une mission, une revue d’architecture, une application métier ou
          un échange technique.
        </p>
      </aside>

      <div class="contact-panel">
        <div class="contact-intro">
          <h2 class="section-title">Parlons de votre projet</h2>
          <p class="section-lead">
            Disponible pour des missions freelance, du conseil technique ou du
            développement produit. Réponse sous 24 h.
          </p>

          <ul class="contact-list">
            <li>
              <span class="label">Email</span>
              <a href="mailto:elieoko100@gmail.com">elieoko100@gmail.com</a>
            </li>
            <li>
              <span class="label">Téléphone</span>
              <a href="tel:+243827824163">+243 827 824 163</a>
            </li>
            <li>
              <span class="label">Localisation</span>
              <span>Kinshasa, RDC</span>
            </li>
            <li>
              <span class="label">GitHub</span>
              <a href="https://github.com/ElieOko" target="_blank" rel="noopener">
                github.com/ElieOko
              </a>
            </li>
          </ul>
        </div>

        <form class="contact-form" @submit.prevent="submit">
          <div class="field">
            <label for="name">Nom</label>
            <input id="name" v-model="form.name" type="text" required placeholder="Votre nom" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required placeholder="vous@entreprise.com" />
          </div>
          <div class="field">
            <label for="subject">Sujet</label>
            <select id="subject" v-model="form.subject" required>
              <option value="" disabled>Choisir</option>
              <option value="web">Application web</option>
              <option value="mobile">Application mobile</option>
              <option value="backend">Backend / API</option>
              <option value="consulting">Conseil technique</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              placeholder="Décrivez brièvement votre besoin..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="sending">
            {{ sending ? 'Envoi...' : 'Envoyer' }}
            <i class="fas fa-paper-plane"></i>
          </button>
          <p v-if="feedback" class="feedback" :class="feedbackType">{{ feedback }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sending = ref(false)
const feedback = ref('')
const feedbackType = ref<'ok' | 'err'>('ok')

const submit = async () => {
  sending.value = true
  feedback.value = ''
  try {
    const subject = encodeURIComponent(`[Portfolio] ${form.subject} - ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\n-\n${form.name}\n${form.email}`
    )
    window.location.href = `mailto:elieoko100@gmail.com?subject=${subject}&body=${body}`
    feedback.value = 'Votre client mail va s’ouvrir...'
    feedbackType.value = 'ok'
  } catch {
    feedback.value = 'Une erreur est survenue. Écrivez-moi directement.'
    feedbackType.value = 'err'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact {
  background:
    radial-gradient(ellipse 70% 50% at 100% 100%, rgba(180, 55, 34, 0.09), transparent 50%),
    var(--paper-elevated);
}

.contact-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.contact-intro {
  border-top: 1px solid var(--line-strong);
  padding-top: 1.35rem;
}

.contact-intro .section-lead {
  margin-bottom: 2rem;
}

.contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
}

.contact-list li {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--line);
}

.contact-list .label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.contact-list a,
.contact-list span:not(.label) {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}

.contact-list a:hover {
  color: var(--accent);
}

.contact-form {
  background: var(--paper-elevated);
  border: 1px solid var(--line-strong);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  box-shadow: var(--shadow);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink);
}

.field input,
.field select,
.field textarea {
  padding: 0.82rem 0.95rem;
  border: 1.5px solid var(--line-strong);
  border-radius: 0;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink);
  background: #fffaf1;
  transition: border-color 0.2s var(--ease);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.feedback {
  font-size: 0.9rem;
  margin: 0;
}

.feedback.ok {
  color: var(--accent);
}

.feedback.err {
  color: var(--accent-warm);
}

@media (max-width: 800px) {
  .contact-panel {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-list li {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
}
</style>
