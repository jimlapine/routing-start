export class AuthService {
  loggedIn = false;

  // This is a delay of 800 milliseconds before returning loggedIn Asynchronously
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(resolve(this.loggedIn), 20000);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
