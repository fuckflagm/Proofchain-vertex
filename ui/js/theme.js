/**
 * ProofChain Palette Theme & Session Controller
 * Manages theme mode and renders multi-page role navigation.
 */
import { renderNav } from './auth.js';

(function () {
  'use strict';

  const STORAGE_KEY = 'proofchain_theme_mode';
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'vanilla-light';

  document.documentElement.setAttribute('data-theme', savedTheme);

  window.addEventListener('DOMContentLoaded', () => {
    const activeFile = window.location.pathname.split('/').pop() || 'index.html';
    renderNav(activeFile);
  });
})();
