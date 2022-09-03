class UserDTO {
  #id;
  #email;
  #password;
  #name;
  #adress;
  #age;
  #telephone;
  #picture;

  constructor(id, email, password, name, adress, age, telephone, picture) {
    this.#id = id;
    this.#email = email;
    this.#password = password;
    this.#name = name;
    this.#adress = adress;
    this.#age = age;
    this.#telephone = telephone;
    this.#picture = picture;
  }

  getId() {
    return this.#id;
  }

  getEmail() {
    return this.#email;
  }

  getPassword() {
    return this.#password;
  }

  getname() {
    return this.#name;
  }

  getadress() {
    return this.#adress;
  }

  getage() {
    return this.#age;
  }

  gettelephone() {
    return this.#telephone;
  }

  getpicture() {
    return this.#picture;
  }

  ToJSON() {
    return {
      id: this.#id,
      email: this.#email,
      password: this.#password,
      name: this.#name,
      adress: this.#adress,
      age: this.#age,
      telephone: this.#telephone,
      picture: this.#picture,
    };
  }
}

module.exports = UserDTO;
