exports.datePrettier = date => {
    const time = new Date(date)
    return time.toLocaleString()
}