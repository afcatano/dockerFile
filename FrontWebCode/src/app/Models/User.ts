export class User {

  public username: string;
  public password: string;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getUsername = () => {
    return this.username;
  }

  setUsername = (username) => {
    this.username = username;
  }

  getPassword = () => {
    return this.username;
  }

  setPassword = (password) => {
    this.password=password;
  }

  toJSON = () => ({
    user: this.username,
    password: this.password
  })

}
