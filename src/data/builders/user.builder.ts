import user from 'fixtures/user' with { type: 'json' };

interface UserData {
  username: string;
  password: string;
  userId?: string;
}

class UserBuilder {
  private user: UserData;

  constructor() {
    this.user = {
      username: user.username,
      password: user.password,
      userId: user.userId,
    };
  }

  public build(): UserData {
    return structuredClone(this.user);
  }
}

export default new UserBuilder().build();
