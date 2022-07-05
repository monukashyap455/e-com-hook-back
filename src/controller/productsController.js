const db = require('./../models');
const Products = db.Products;
const customErrorHandler = require('../error/customError');
const tryCatchMiddleware = require('../utils/tryCatchMiddleware');
const Op = require('Sequelize').Op

module.exports.addProducts = tryCatchMiddleware(async (req, res, next) => {

    const { userId, name, price, category, company } = req.body

    if (!(userId && name && price && category, company)) {
        return next(customErrorHandler("All feild are required", 404, false))
    }
    const data = { name, price, category, company, userId }

    await Products.create(data)
    res.status(200).json({
        status: true,
        msg: "Success",
        data
    });
})


module.exports.getProducts = tryCatchMiddleware(async (req, res, next) => {

    const product = await Products.findAll();
    if (product) {
        res.status(200).json({
            status: true,
            msg: "Success",
            data: product
        });
    } else {
        return next(customErrorHandler("No Data", 404, false))
    }

})


module.exports.delteProducts = tryCatchMiddleware(async (req, res, next) => {

    Id = req.params.id

    await Products.destroy({
        where: {
            ProductId: Id
        }
    })
        .then(() => res.status(200).json("Product has been deleted"))
        .catch(err => res.send(" Something went wrong" + err));

});

module.exports.getOneProduct = tryCatchMiddleware(async (req, res, next) => {

    const ProductId = req.params.id

    const project = await Products.findOne({ where: { ProductId: ProductId } });
    if (project === null) {
        console.log('Not found!');
    } else {
        res.status(200).json({
            status: true,
            msg: "Success",
            data: project
        });
    }
})

module.exports.updateProduct = tryCatchMiddleware(async (req, res, next) => {
    const Id = req.params.id

    const { name, price, category, company } = req.body

    await Products.upsert({
        ProductId: Id, // find by id 

        name: name,
        price: price,
        category: category,
        company: company

    })
        .then(() => res.status(200).json("Product has been Updated"))
        .catch(err => res.send(" Something went wrong" + err));

});


module.exports.searchProducts = tryCatchMiddleware(async (req, res, next) => {
    const key = req.params.key;
    const data = await Products.findAll({
        where: {
            [Op.or]: [
                { ProductId: key },
                { userId: key },
                { name: key },
                { category: key },
                { price: key }
            ]
        }
    })
    if (data) {
        res.send(data)
    } else {
        res.send("something went wrong")
    }
});

