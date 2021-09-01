const router = require('express').Router();

const Catalog = require("../models/catalogs");

// create a Catalog
router.post("/", async (req, res) => {
    const newCatalog = new Catalog(req.body);
    try {
        const savedCatalog = await newCatalog.save();
        res.status(200).json(savedCatalog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all Catalog
router.get("/", async (req, res) => {
    try {
        const CatalogRes = await Catalog.find();
        res.status(200).json(CatalogRes);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;