import User from '../Models/user';
import bcrypt from 'bcryptjs';

export type userObject = {
  displayName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

class UserAPI {
  async getNonSensitiveUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }
  async createUser(userObject: userObject) {
    console.log(userObject);
    const { password, passwordConfirmation, username, displayName } =
      userObject;
    if (password !== passwordConfirmation) {
      throw new Error('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    await User.create({ displayName, username, password: hashedPassword });
    return true;
  }
}

export default UserAPI;
