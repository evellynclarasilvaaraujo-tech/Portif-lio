/* =========================================================
   Evlyndev — Portfólio
   script.js (JavaScript puro, sem dependências)
   ---------------------------------------------------------
   ÍNDICE
   0. CONFIGURAÇÕES EDITÁVEIS  ← edite seus dados aqui
   1. Utilitários
   2. Ano automático
   3. Header, menu mobile e navegação ativa
   4. Progresso de rolagem e parallax
   5. Scroll reveal
   6. Cursor personalizado
   7. Partículas tecnológicas
   8. Filtros de projetos e links de exemplo
   9. Foto da seção Sobre
   10. Links de contato (a partir do CONFIG)
   11. Formulário com validação
   12. Inicialização
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   0. CONFIGURAÇÕES EDITÁVEIS
   Troque os valores abaixo pelos seus dados reais.
   Enquanto estiverem com os valores de exemplo, os botões
   correspondentes avisam que ainda precisam ser configurados.
   --------------------------------------------------------- */
const CONFIG = {
  email: 'evlyndev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/devevlynaraujo/',
  github: 'https://github.com/evellynclarasilvaaraujo-tech',
  // WhatsApp: código do país + DDD + número, somente dígitos. Ex.: 5591999999999
  whatsapp: '5594999694135',
  whatsappMessage: 'Olá, Evellyn! Vi seu portfólio e gostaria de conversar.',
  // Opcional: endpoint de um serviço de formulários (ex.: Formspree). Deixe vazio para usar o app de e-mail.
  formEndpoint: ''
};

/* ---------------------------------------------------------
   1. Utilitários
   --------------------------------------------------------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Considera "não configurado" quando o valor ainda é o de exemplo. */
function isPlaceholder(value) {
  const v = String(value || '').toLowerCase();
  return !v || v.includes('exemplo.com') || v.includes('seu-usuario') || /^5500000000000$/.test(v);
}

/** Exibe uma mensagem rápida (toast) na parte inferior da tela. */
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

/** Limita a frequência de execução (usado em eventos de rolagem). */
function rafThrottle(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { fn(...args); ticking = false; });
  };
}

/* ---------------------------------------------------------
   2. Ano automático
   --------------------------------------------------------- */
function initYear() {
  const year = new Date().getFullYear();
  $$('[data-year]').forEach((el) => { el.textContent = year; });
}

function initWhatsAppLinks() {
  const phone = CONFIG.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(CONFIG.whatsappMessage);
  const url = `https://wa.me/${phone}?text=${message}`;

  ['#linkWhatsapp', '#footWhatsapp'].forEach((selector) => {
    const link = $(selector);
    if (link) link.href = url;
  });
}

initWhatsAppLinks();