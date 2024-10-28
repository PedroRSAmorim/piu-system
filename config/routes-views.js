const path = require("path");
const fs = require("fs");

exports.dashboard = (req, res) => {
    const dashboardPath = path.join(__dirname, "../assets/views", "dashboard.html");

    fs.readFile(dashboardPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error loading page:", err);
            return res.status(500).send("Error loading page");
        }

        res.render("ng/layout", { content: data, title: "Dashboard" });
    });
};