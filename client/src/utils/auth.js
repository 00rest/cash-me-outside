import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken, id, name) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_name', name);

    window.location.assign('/home');
  }
  

  getSession = () => ({
    idToken: localStorage.getItem('id_token'),
    userId: localStorage.getItem('user_id'),
    userName: localStorage.getItem('user_name')
  })

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_accounts');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
