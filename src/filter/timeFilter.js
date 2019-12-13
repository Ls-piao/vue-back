
function time(d) {
    var d = parseInt(d)
    var date = new Date(d)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + '-' + month + '-' + day
}
export default time