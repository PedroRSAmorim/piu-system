const productService = require('../src/api/productService');
const historyService = require('../src/api/historyService');

exports.getProducts = (req, res) => {
    productService.get(req, res);
};

exports.createProduct = (req, res) => {
    productService.create(req, res);
};
  
exports.updateProduct = (req, res) => {
    const id = req.query.id;
    productService.update(id, req, res);
};

exports.removeProduct = (req, res) => {
    const id = req.query.id;
    productService.remove(id, req, res);
};

exports.getHistory = (req, res) => {
    historyService.get(req, res);
};

// Maybe we need .env later ???
// exports.getenv = (req, res, next) => {
//   if (process.env.AUTH_URL) return res.send(".env is active!")
//   else return res.send(".env is not active!");
// };

