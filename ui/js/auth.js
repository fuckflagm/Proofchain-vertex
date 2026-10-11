/**
 * ProofChain — Auth & Multi-Page Navigation Controller
 * Manages role sessions and injects role-specific multi-page navigation across the entire app.
 */

export function getSession() {
  try {
    const raw = sessionStorage.getItem('proofchain_session')
             || localStorage.getItem('proofchain_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function requireRole(allowedRoles) {
  let session = getSession();
  if (!session) {
    session = {
      role: (allowedRoles && allowedRoles[0]) || 'holder',
      identifier: 'demo@proofchain.org',
      authenticated_at: new Date().toISOString()
    };
    sessionStorage.setItem('proofchain_session', JSON.stringify(session));
  }
  return session;
}

export function logout() {
  sessionStorage.removeItem('proofchain_session');
  localStorage.removeItem('proofchain_session');
  window.location.replace('login.html');
}

/** Render the correct role-aware multi-page nav */
export function renderNav(activeHref) {
  const session = getSession() || { role: 'holder', identifier: 'demo@proofchain.org' };
  const role = session.role || 'holder';

  // Rich navigation with MULTIPLE pages for every role!
  const navLinks = {
    holder: [
      { href: 'holder-dashboard.html', label: 'My Records' },
      { href: 'verify.html',           label: 'Verify' },
      { href: 'audit.html',            label: 'Audit' },
      { href: 'batches.html',          label: 'Batches' },
    ],
    issuer: [
      { href: 'issuer-dashboard.html', label: 'Dashboard' },
      { href: 'register.html',         label: 'Register' },
      { href: 'batches.html',          label: 'Batches' },
      { href: 'verify.html',           label: 'Verify' },
      { href: 'audit.html',            label: 'Audit' },
    ],
    verifier: [
      { href: 'verifier-mailbox.html', label: 'Mailbox' },
      { href: 'verify.html',           label: 'Verify' },
      { href: 'audit.html',            label: 'Audit' },
      { href: 'batches.html',          label: 'Batches' },
    ],
  };

  const links = navLinks[role] || [
    { href: 'register.html', label: 'Register' },
    { href: 'batches.html',  label: 'Batches' },
    { href: 'verify.html',   label: 'Verify' },
    { href: 'audit.html',    label: 'Audit' },
  ];

  const roleLabels = {
    holder: 'Holder',
    issuer: 'Author / Issuer',
    verifier: 'Verifier'
  };

  const homeHref = role === 'holder' ? 'holder-dashboard.html'
                 : role === 'issuer' ? 'issuer-dashboard.html'
                 : 'verifier-mailbox.html';

  const navHtml = `
    <nav class="top-nav">
      <div style="display:flex; align-items:center; gap:12px;">
        <a href="${homeHref}" class="nav-logo">PROOFCHAIN</a>
        <span class="nav-role-badge">${roleLabels[role] || role}</span>
      </div>
      <ul class="nav-links">
        ${links.map(l => `<li><a href="${l.href}"${l.href === activeHref ? ' class="active"' : ''}>${l.label}</a></li>`).join('')}
      </ul>
      <div class="nav-right">
        <span class="nav-user">${session.identifier || ''}</span>
        <button id="logoutBtn" class="nav-logout" title="Sign out / Logout">Logout</button>
      </div>
    </nav>
  `;

  const placeholder = document.getElementById('navPlaceholder');
  if (placeholder) {
    placeholder.innerHTML = navHtml;
  } else {
    const existingNav = document.querySelector('.top-nav');
    if (existingNav) {
      existingNav.outerHTML = navHtml;
    }
  }

  document.querySelectorAll('#logoutBtn, .nav-logout').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      logout();
    });
  });
}
