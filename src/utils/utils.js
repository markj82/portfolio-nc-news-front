exports.datePrettier = date => {
    const time = new Date(date)
    return time.toLocaleString()
}

exports.paragraphShortener = p => {
    if (p.length > 100) return p.substring(0, 100)
}