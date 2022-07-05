const router = require('express').Router();

// import controllers
const productController = require('../controller/productsController');
const {verifyTokenAndAuthorization} = require('./../middleware/verifyToken')

router.post('/api/products', productController.addProducts);
router.get('/api/products',verifyTokenAndAuthorization, productController.getProducts);
router.delete('/api/products/:id', productController.delteProducts);
router.get('/api/products/:id', productController.getOneProduct);
router.put('/api/products/:id', productController.updateProduct);
router.get('/api/search/:key', productController.searchProducts);





module.exports = router;