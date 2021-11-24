const dayJs = require('dayjs');

const { normalizeUserPhone } = require('./normalizeUserPhone');

module.exports = {

    normalizeRowOfDate: (str) => {
        return str.split(',').toString().split('||').toString().replace(/"+/g, '').split(',')
    },

    normalizeUser: (userToNormalize = {}) => {

        userToNormalize.name = userToNormalize.first_name + ' ' + userToNormalize.last_name

        userToNormalize.phone = normalizeUserPhone(userToNormalize.phone)

        userToNormalize.person = {
            first_name: userToNormalize.first_name,
            last_name: userToNormalize.last_name
        }

        userToNormalize.amount = Number(userToNormalize.amount)

        userToNormalize.date = dayjs(userToNormalize.date, 'YYYY-MM-DD')
        console.log(userToNormalize.date);

        if(userToNormalize.cc) {
            userToNormalize.costCenterNum = userToNormalize.cc.slice(3)
        }

        const fieldsToRemove = [
            'user',
            'email'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;

    }
}
