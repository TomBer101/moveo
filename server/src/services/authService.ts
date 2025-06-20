import bcrypt from 'bcrypt';
import {IUser, User} from '../models/User';

const SALT_ROUNDS = 10;

export const login = async (name: string, password: string): Promise<IUser> => {
    const user = await User.findOne({name});

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
}

export const register = async (name: string, password: string, role: string): Promise<IUser> => {
    const existingUser = await User.findOne({name});

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
        name,
        password: hashedPassword,
        role
    });

    return newUser.save();

}

