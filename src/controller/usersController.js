const db = require('./../models');
const userModel = db.Users;
const customErrorHandler = require('../error/customError');
const tryCatchMiddleware = require('../utils/tryCatchMiddleware');
const helper = require("../helper/helper");


module.exports.register = tryCatchMiddleware(async (req, res, next) => {

    const { email, name, number, password } = req.body

    if (!(email && name && number && password)) {
        return next(customErrorHandler("All feild are required", 404, false))
    }
    const userFind = await userModel.findOne({ where: { email: email } });
    console.log(userFind);

    if (userFind != null) {
        return next(customErrorHandler("Email address is already use..", 404, false))
    }
    const hashed = await helper.hashPassword(password)

    const data = { email, name, number, password: hashed }

    await userModel.create(data)
    res.status(200).json({
        status: true,
        msg: "Success",
        data
    });
})

module.exports.login = tryCatchMiddleware(async (req, res, next) => {
    const { email, password } = req.body

    if (!(email && password)) {
        return next(customErrorHandler("All feild are required", 404, false));
    }
    const userFind = await userModel.findOne({ where: { email: email } });
    if (userFind != undefined) {
        const psCompare = await helper.comparePassword(password, userFind.password);
        const token = await helper.tokenGenrate(userFind.userId, "1h")
        if (!psCompare) {
            return next(customErrorHandler("Invalid password", 402, false));
        } else {
            const data = { userId: userFind.userId, email: userFind.email, name: userFind.name, number: userFind.number, token };
            res.status(200).json({
                status: true,
                msg: "Successful Login",
                data
            });
        }
    } else {
        return next(customErrorHandler("Invalid Email", 402, false));
    }

});