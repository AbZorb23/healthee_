function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function registerUser() {
  const u = document.getElementById('regUsername').value;
  const p = document.getElementById('regPassword').value;
  if (u && p) {
    localStorage.setItem('username', u);
    localStorage.setItem('password', p);
    alert('Registration successful!');
    switchPage('loginPage');
  } else {
    alert('Please fill in both fields.');
  }
}

function loginUser() {
  const u = document.getElementById('loginUsername').value;
  const p = document.getElementById('loginPassword').value;
  const storedU = localStorage.getItem('username');
  const storedP = localStorage.getItem('password');

  if (u === storedU && p === storedP) {
    document.getElementById('displayUser').innerText = u;
    switchPage('mainPage');
  } else {
    alert('Access Denied: Invalid credentials');
  }
}

function logout() {
  switchPage('loginPage');
}

function updateSettings() {
  const newU = document.getElementById('newUsername').value;
  const newP = document.getElementById('newPassword').value;
  if (newU) localStorage.setItem('username', newU);
  if (newP) localStorage.setItem('password', newP);
  alert('Settings updated!');
  switchPage('mainPage');
}

document.getElementById('healthForm').addEventListener('submit', function (e) {
  e.preventDefault();
  switchPage('loadingPage');
  setTimeout(() => {
    generateResults();
    switchPage('resultsPage');
  }, 2000);
});

function generateResults() {
  const sleep = +document.getElementById('sleep').value;
  const water = +document.getElementById('water').value;
  const meals = +document.getElementById('meals').value;
  const bp = document.getElementById('bp').value;
  const activity = document.getElementById('activity').value;
  const mood = document.getElementById('mood').value;

  let issues = [], dos = [], donts = [];

  if (sleep < 6) {
    issues.push('Insufficient sleep');
    dos.push('Sleep 7–8 hours daily');
    donts.push('Avoid staying up late');
  }
  if (water < 6) {
    issues.push('Low hydration');
    dos.push('Drink at least 8 cups of water');
    donts.push('Avoid sugary drinks');
  }
  if (meals < 2) {
    issues.push('Poor nutrition');
    dos.push('Eat at least 3 meals daily');
    donts.push('Don’t skip breakfast');
  }
  if (activity === 'No') {
    issues.push('Lack of exercise');
    dos.push('Take a 10-minute walk');
    donts.push('Avoid sitting too long');
  }
  if (['Sad', 'Stressed'].includes(mood)) {
    issues.push('Mood imbalance');
    dos.push('Try journaling or breathing');
    donts.push('Avoid bottling up emotions');
  }
  if (bp) {
    try {
      const [s, d] = bp.split('/').map(Number);
      if (s > 140 || d > 90) {
        issues.push('High blood pressure');
        dos.push('Reduce salt and stress');
        donts.push('Avoid caffeine');
      }
    } catch {
      issues.push('⚠️ Invalid BP format');
    }
  }

  document.getElementById('resultsBox').innerHTML = `
    <h3>🩺 Issues:</h3><p>${issues.join('<br>')}</p>
    <h3>✔️ Do's:</h3><p>${dos.join('<br>')}</p>
    <h3>❌ Don'ts:</h3><p>${donts.join('<br>')}</p>
  `;
}
