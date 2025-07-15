function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function registerUser() {
  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value.trim();

  if (!u || !p) {
    alert('Please fill in both fields.');
    return;
  }

  if (p.length < 5) {
    alert('Password must be at least 5 characters.');
    return;
  }

  localStorage.setItem('username', u);
  localStorage.setItem('password', p);
  alert('Registration successful!');
  switchPage('loginPage');
}

function loginUser() {
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();
  const storedU = localStorage.getItem('username');
  const storedP = localStorage.getItem('password');

  if (u === storedU && p === storedP) {
    document.getElementById('displayUser').innerText = u;
    alert(`Welcome back, ${u}!`);
    switchPage('mainPage');
  } else {
    alert('Access Denied: Invalid credentials');
  }
}

function logout() {
  switchPage('loginPage');
}

function updateSettings() {
  const newU = document.getElementById('newUsername').value.trim();
  const newP = document.getElementById('newPassword').value.trim();

  if (newU) localStorage.setItem('username', newU);
  if (newP) {
    if (newP.length < 5) {
      alert('Password must be at least 5 characters.');
      return;
    }
    localStorage.setItem('password', newP);
  }

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
  const bp = document.getElementById('bp').value.trim();
  const activity = document.getElementById('activity').value;
  const mood = document.getElementById('mood').value;

  let issues = [], dos = [], donts = [];

  if (sleep < 6) {
    issues.push('😴 Not enough sleep');
    dos.push('💤 Sleep 7–8 hours daily');
    donts.push('🚫 Don’t stay up too late');
  }

  if (water < 6) {
    issues.push('🥤 Low hydration');
    dos.push('💧 Drink at least 8 cups');
    donts.push('🚫 Skip sugary drinks');
  }

  if (meals < 2) {
    issues.push('🍽️ Poor nutrition');
    dos.push('🍱 Eat 3 meals a day');
    donts.push('🚫 Don’t skip breakfast');
  }

  if (activity === 'No') {
    issues.push('🏃 Lack of exercise');
    dos.push('🧍 Walk for 10 minutes');
    donts.push('🪑 Avoid sitting too long');
  }

  if (['Sad', 'Stressed'].includes(mood)) {
    issues.push('😟 Mood imbalance');
    dos.push('📝 Try journaling');
    donts.push('😶 Don’t bottle emotions');
  }

  if (bp.includes('/')) {
    const [s, d] = bp.split('/').map(Number);
    if (s > 140 || d > 90) {
      issues.push('⚠️ High blood pressure');
      dos.push('🥗 Reduce salt');
      donts.push('☕ Avoid caffeine');
    }
  } else if (bp) {
    issues.push('❗ Invalid BP format (use 120/80)');
  }

  document.getElementById('resultsBox').innerHTML = `
    <h3>🩺 Issues:</h3><p>${issues.join('<br>')}</p>
    <h3>✔️ Do's:</h3><p>${dos.join('<br>')}</p>
    <h3>❌ Don'ts:</h3><p>${donts.join('<br>')}</p>
  `;
}