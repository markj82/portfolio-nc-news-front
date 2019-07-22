const fnsDate = require('date-fns/distance_in_words_to_now');


exports.datePrettier = date => {
    const time = new Date(date)
    return `${fnsDate(time)} ago`
}

exports.paragraphShortener = p => {
    if (p.length > 100) return p.substring(0, 100)
}