// This simulates login data from backend
export function getCurrentUserRole() {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
  return user.role || 'user'; // fallback to 'user'
}
