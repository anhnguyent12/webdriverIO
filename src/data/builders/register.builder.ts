import register from 'fixtures/register' with { type: 'json' };

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

class RegisterBuilder {
  private registerUser: RegisterData;

  constructor() {
    this.registerUser = {
      firstName: register.firstName,
      lastName: register.lastName,
      username: register.username,
      password: register.password,
    };
  }

  public build(): RegisterData {
    return structuredClone(this.registerUser);
  }
}

export default new RegisterBuilder().build();
