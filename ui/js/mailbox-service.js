/**
 * ProofChain Shared Mailbox & Access Permissions Service
 * Coordinates verification access requests between Verifiers, Holders, and Issuers/Authors.
 */

const STORAGE_KEY = 'proofchain_access_requests_v2';

export const INITIAL_REQUESTS = [
  {
    id: 'req_001',
    from: 'Priya Sharma (Senior Recruiter, Infosys)',
    verifierId: 'priya.sharma@infosys.com',
    targetRole: 'holder',
    targetRecipient: 'Alex Vance (alex@proofchain.org)',
    doc: 'B.Tech Computer Science Degree',
    docText: 'ACADEMIC CREDENTIAL ATTESTATION\nInstitution: State Technical University\nRecipient: Alex Vance\nDegree: Bachelor of Technology in Computer Science\nGraduation Date: 2024-05-15\nStatus: FIRST CLASS WITH DISTINCTION\nSeal ID: STU-ENG-2024-9921',
    docHash: 'a3f8c1d2e5b7490f821c437a098d6e3c129487b1c4e2098d7f6a5b4c3d2e1f0a',
    merkleRoot: '6f8d3c1a2e4b509f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
    purpose: 'Employment background check for Senior Engineering role',
    time: new Date(Date.now() - 18 * 60000).toISOString(),
    status: 'pending'
  },
  {
    id: 'req_002',
    from: 'Marcus Vance (Compliance Auditor, KPMG)',
    verifierId: 'marcus@kpmg.org',
    targetRole: 'issuer',
    targetRecipient: 'University Registrar (operator@proofchain.org)',
    doc: 'Annual Registry Attestation Ledger',
    docText: 'REGISTRY OPERATOR COMPLIANCE CHECKPOINT\nIssuer Authority: State Higher Education Council\nBatch Registry: 2026-10-B0001\nAttestation Status: IMMUTABLE ANCHOR VERIFIED',
    docHash: 'e1029abc7ff40123984712039847102938471029384710293847102938471029',
    merkleRoot: 'd89f72b10a398c2198047b192837401928374019283740192837401928374019',
    purpose: 'Quarterly institutional attestation registry compliance audit',
    time: new Date(Date.now() - 42 * 60000).toISOString(),
    status: 'pending'
  }
];

export function getAccessRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_REQUESTS;
  } catch {
    return INITIAL_REQUESTS;
  }
}

export function saveAccessRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addAccessRequest(request) {
  const reqs = getAccessRequests();
  reqs.unshift(request);
  saveAccessRequests(reqs);
  return reqs;
}

export function updateRequestStatus(id, newStatus) {
  const reqs = getAccessRequests();
  const target = reqs.find(r => r.id === id);
  if (target) {
    target.status = newStatus;
    target.updatedAt = new Date().toISOString();
    saveAccessRequests(reqs);
  }
  return reqs;
}
