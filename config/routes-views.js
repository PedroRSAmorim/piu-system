const path = require('path');

exports.index = (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/public', 'index.html'));
};

exports.dashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/views', 'dashboard.html'));
};
