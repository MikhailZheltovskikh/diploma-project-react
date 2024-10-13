const bcrypt = require('bcrypt');
const User = require('../modules/User');
const { generate } = require('../helpers/token');

// register
async function register(login, password) {
    try {
        if (!password) {
            throw new Error('Пароль пуст');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({ login, password: passwordHash });
        const token = generate({ id: user.id });

        return { user, token };
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Такой пользователь уже существует!');
        }

        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// login
async function login(login, password) {
    try {
        const user = await User.findOne({ login });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error('Неверный пароль');
        }

        const token = generate({ id: user.id });

        return { token, user };
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

module.exports = {
    register,
    login,
};
