// MÄÄRITTELE REITIT
const express = require("express");
const router = express.Router();

// tuodaan schema
const Item = require("../models/item");

// REITTI 1 - return all
router.get("/getall", async (req, res) => {
    try {
        // hae kaikki scheman mukaiset tietokannasta
        const items = await Item.find();
        // palauta json muotoinen tieto
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REITTI 2 - return one
router.get("/:id", async (req, res) => {
    try {
        // haetaan osoitteessa annetulla id:llä
        const item = await Item.findById(req.params.id);
        if (!item) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REITTI 3 - create new
router.post("/add", async (req, res) => {
    try {
        // luodaan uusi cocktail
        const whiskeySour = new Item({
            name: "Whiskey Sour",
            ingredients: [
                "whiskey",
                "lemon juice",
                "egg white",
                "simple syrup",
                "aromatic bitters",
            ],
            instructions:
                "Dry shake whiskey, lemon juice, simple syrup and egg white vigorously for 20 seconds. Strain into a rocks glass filled with ice and add a few drops of aromatic bitters on top of the drink. Garnish with a lemon twist.",
        });
        // lisätään tietokantaan
        await whiskeySour.save();
        res.status(201).json({ message: "Item created successfully", item: whiskeySour });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REITTI 4 - update
router.patch("/update/:id", async (req, res) => {
    try {
        // haetaan osoitteessa annetulla id:llä
        const filter = { _id: req.params.id };
        // määritellään päivitettävä tieto
        const update = { name: "Dry Martini" };
        // tallennetaan päivitetty tieto
        const updated = await Item.findOneAndUpdate(filter, update, { new: true });
        if (!updated) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        res.status(200).json({ message: "Item updated successfully", updatedItem: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REITTI 5 - delete
router.delete("/delete/:id", async (req, res) => {
    try {
        // haetaan osoitteessa annetulla id:llä
        const filter = { _id: req.params.id };
        const deleted = await Item.findByIdAndDelete(filter);
        if (!deleted) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
