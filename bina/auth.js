// Auth gate for bina partners area
(function() {
  const auth = localStorage.getItem('binaAuth');
  if (!auth) {
    window.location.href = '/bina/';
    return;
  }
  const age = Date.now() - parseInt(auth);
  if (age > 30 * 24 * 60 * 60 * 1000) {
    localStorage.removeItem('binaAuth');
    window.location.href = '/bina/';
    return;
  }
})();

function logout() {
  localStorage.removeItem('binaAuth');
  sessionStorage.removeItem('binaAuth');
  window.location.href = '/bina/';
}
