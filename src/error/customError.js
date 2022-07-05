module.exports = (msg="error", statusCode=403, status=false) => {
    let data = {
        statusCode,
        msg,
        status
    }
    return data;
}