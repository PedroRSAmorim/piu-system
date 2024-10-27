class PRODUCTS {
    // maybe we use it later
    // constructor() {
    //     this._isMessage = false;
    // };

    async queryItems(req, res) {

    };

    async createItems(req, res) {

    };

    async updateItem(id, req, res) {

    };
};

const Products = new PRODUCTS();

exports.get = async function (req, res) {
    Products.queryItems(req, res);
};

exports.create = async function (req, res) {
    Products.createItems(req, res);
};

exports.update = async function (id, req, res) {
    Products.updateItem(id, req, res);
};