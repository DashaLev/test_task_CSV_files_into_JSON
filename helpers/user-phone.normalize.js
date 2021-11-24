module.exports = {
    normalizeUserPhone: (phone) => {
        let onlyNumbers = ('' + phone).replace(/\D/g, '');

        let match = onlyNumbers.match(/^(4|)?(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            let intlCode = (match[4] ? '+380' : '')
            return [intlCode, match[2], match[3], match[4]].join('')

        }

        return null;
    }
}
