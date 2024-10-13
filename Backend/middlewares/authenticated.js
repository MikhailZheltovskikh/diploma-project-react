const User = require('../modules/User');
const { verify } = require('../helpers/token');

module.exports = async function (req, res, next) {
    try {
        const tokenData = verify(req.cookies.token);

        const user = await User.findOne({ _id: tokenData.id });

        if (!user) {
            res.send({ error: 'Пользователь не авторизирован' });

            return;
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.message === 'jwt must be provided') {
            res.send({ error: 'Пользователь не авторизирован', data: null });
        }
        res.send({ error: error.message, data: null });
    }
};
