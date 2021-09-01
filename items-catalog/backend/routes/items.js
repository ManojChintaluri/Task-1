const router = require('express').Router();

const { request } = require('express');
const Items = require("../models/items");

// create a Items
router.post("/", async (req, res) => {
    const newItems = new Items(req.body);
    try {
        const savedItems = await newItems.save();
        res.status(200).json(savedItems);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all Items
router.get("/", async (req, res) => {
    try {
        const ItemsRes = await Items.find();
        res.status(200).json(ItemsRes);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update an Item
router.post("/update/:id", async (req, res) => {
    try {
        const updatedItem = await Items.updateOne({ _id: req.params.id },req.body);
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a Item
router.get("/delete/:id", async (req, res) => {
    try {
        const removedItem = await Items.remove({ _id: req.params.id });
        res.status(200).json(removedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;