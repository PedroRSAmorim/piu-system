const fs = require('fs').promises;
const path = require('path');

const historyPath = path.join('C:', 'ProgramData', 'Piu-System', 'global', 'history.json');

class HISTORY {
    // constructor() {
    //     this._entry = {
    //         method:"DELETE/PATCH/POST",
    //         itemName: "sample",
    //         entryDate: ""    
    //     };
    // };

    async queryHistory(req, res){ 
        try {
            const data = await fs.readFile(historyPath, 'utf-8');
            const history = JSON.parse(data);
    
            res.status(200).json(history);
        } catch (error) {
            console.error('Error reading history info:', error);
            res.status(500).json({ message: 'Error reading history info' });
        };
    };

    async createEntry(data, createdAt){
        try {            
            console.log(data);
            let result = {
                method:'POST',
                itemName: data.name,
                itemQty: data.qty,
                entryDate: createdAt 
            };

            const fileData = await fs.readFile(historyPath, 'utf-8');
            const history = JSON.parse(fileData);
    
            history.push(result);
    
            await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
        
            return result;
        } catch (error) {
            console.error('Error creating history info:', error);
        };
    };

    async updateEntry(item, updatedItem, updatedAt){
        try {            
            let result = {
                method:'PATCH',
                itemName: item.name,
                oldItemQty: item.qty,
                newItemQty: updatedItem.qty,
                entryDate: updatedAt
            };

            const fileData = await fs.readFile(historyPath, 'utf-8');
            const history = JSON.parse(fileData);
    
            history.push(result);
    
            await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
            
            return result;
        } catch (error) {
            console.error('Error updating history info:', error);
        };
    };

    async removeEntry(data, removedAt){
        try {            
            let result = {
                method:'DELETE',
                itemName: data.name,
                entryDate: removedAt 
            };

            const fileData = await fs.readFile(historyPath, 'utf-8');
            const history = JSON.parse(fileData);
    
            history.push(result);
    
            await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
            
            return result;
        } catch (error) {
            console.error('Error removing history info:', error);
        };
    };
};

const History = new HISTORY();

exports.get = async function (req, res) {
    History.queryHistory(req, res);
};

exports.create = async function (data, createdAt) {
    History.createEntry(data, createdAt);
};

exports.update = async function (item, updatedItem, updatedAt) {
    History.updateEntry(item, updatedItem, updatedAt);
};

exports.remove = async function (data, removedAt) {
    History.removeEntry(data, removedAt);
};