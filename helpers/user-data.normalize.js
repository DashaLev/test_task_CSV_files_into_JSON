const { normalizeUserPhone } = require('./user-phone.normalize');
const { normalizeUserDate } = require('./user-date.normalize');

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

        userToNormalize.date = normalizeUserDate(userToNormalize.date)

        if(userToNormalize.cc) {
            userToNormalize.costCenterNum = userToNormalize.cc.slice(3)
        }

        const fieldsToRemove = [
            'first_name',
            'last_name',
            'user',
            'email',
            'cc'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;

    }
}
