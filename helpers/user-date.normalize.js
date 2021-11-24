const dayJs = require('dayjs');

module.exports = {
    normalizeUserDate: (date) => {
        let dateToNormalize = new Date(parseInt(date))

        return dayJs(dateToNormalize).format('YYYY-MM-DD')
    }
}

