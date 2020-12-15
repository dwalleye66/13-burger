const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        let hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(
        ["burger_name"],
        [req.body.burger_name],
        function (result) {
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    const id = req.params.id;
    const data = req.body.devoured;
    const cols = {
        idParm: "id",
        devourParm: "devoured"
    };

    burger.update(cols, [data, id], (result) => {
        res.json({ id: result.affectedRows });
    })
});

router.delete("/api/clear", function (req, res) {
    burger.clear((result) => {
        res.json(result);
    });
});

module.exports = router;
