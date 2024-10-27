const fs = require('fs').promises;
const path = require('path');

const productsListPath = path.join('C:', 'ProgramData', 'Piu-System', 'global', 'productsList.json');

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
};

class PRODUCTS {
    // maybe we use it later
    // constructor() {
    //     this._product = {
    //         name: "teste",
    //         qty: "1",
    //         desc: "Isso é um teste da api",
    //         code: "1234",
    //         category: "teste",
    //         date: "comeback later",
    //         provider: "Maintainer"
    //     };
    // };

    async queryItems(req, res) {
        try {
            const data = await fs.readFile(productsListPath, 'utf-8');
            const productsList = JSON.parse(data);
    
            res.status(200).json(productsList);
        } catch (error) {
            console.error('Error reading products info:', error);
            res.status(500).json({ message: 'Error reading products info' });
        };
    };


    async createItem(req, res) {
        const data = req.body;
    
        if (!data || !data.name || !data.qty || !data.desc || !data.code || !data.category || !data.provider) {
            return res.status(400).json({ message: 'All fields must be filled in' });
        };
        
        const date = new Date();

        const newItem = {
            id: generateRandomId(),
            createdAt: date,
            ...data
        };
    
        try {
            const fileData = await fs.readFile(productsListPath, 'utf-8');
            const productsList = JSON.parse(fileData);
    
            productsList.push(newItem);
    
            await fs.writeFile(productsListPath, JSON.stringify(productsList, null, 2));
            
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error adding the item:', error);
            res.status(500).json({ message: 'Error adding the item' });
        };
    };

    async updateItem(id, req, res) {
        const data = req.body;
    
        try {
            const fileData = await fs.readFile(productsListPath, 'utf-8');
            const productsList = JSON.parse(fileData);
    
            const itemIndex = productsList.findIndex(item => item.id === id);
    
            if (itemIndex === -1) {
                return res.status(404).json({ message: 'Item not found' });
            }
    
            productsList[itemIndex] = { ...productsList[itemIndex], ...data };
    
            await fs.writeFile(productsListPath, JSON.stringify(productsList, null, 2));
            
            res.status(200).json(productsList[itemIndex]);
        } catch (error) {
            console.error('Error updating the item:', error);
            res.status(500).json({ message: 'Error updating the item' });
        }
    }
};

const Products = new PRODUCTS();

exports.get = async function (req, res) {
    Products.queryItems(req, res);
};

exports.create = async function (req, res) {
    Products.createItem(req, res);
};

exports.update = async function (id, req, res) {
    Products.updateItem(id, req, res);
};