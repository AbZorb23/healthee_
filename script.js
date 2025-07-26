
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function goToMainPage() {
  showPage('mainPage');
  setTimeout(() => {
    showPage('loadingPage');
    setTimeout(() => {
      showPage('resultPage');
    }, 2000);
  }, 500);
}
window.onload = () => {
  showPage('loginPage');
};
