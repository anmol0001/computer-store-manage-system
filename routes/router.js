const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const { body, query, param, validationResult } = require('express-validator');


// Get all items from store 
router.get('/items', async (req, res) => {
    try {
        const { itemName } = req.query
        let items = ''
        if (!itemName) {
            items = await Item.find();
            if (!items || !items.length)
                return res.status(404).json({ message: 'Oops! There are no items found in the store' });
        }
        else {
            items = await Item.findOne({itemName})
            if (!items)
                return res.status(404).json({ message: 'Oops! There is no such item found in the store' });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new item in store
router.post('/items', [
    body('itemName').notEmpty().withMessage('Item name must not be empty!'),
    body('price').notEmpty().withMessage('Price must not be empty!').isNumeric().withMessage('Price must be a number!'),
    body('quantity').notEmpty().withMessage('Quantity must not be empty!').isNumeric().withMessage('Quantity must be a number!')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
            const item = new Item({
                itemName: req.body.itemName.toLowerCase(),
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity
            });

            const newItem = await item.save();
            res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update an item in the store by name or ID using query parameters
router.put('/updateItems', [
    query('type').notEmpty().withMessage('Type Field must not be empty!'),
    query('identifier').notEmpty().withMessage('Identifier must not be empty!'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { type, identifier } = req.query; // Get the type and identifier from query parameters
        const { price, quantity } = req.body; // Extract update fields from the request body
        let item;
        // If price or quantity is provided in the request body, update only those fields
        let updateFields = price && quantity ? { price, quantity } : (!price ? (!quantity ? null : { quantity }) : { price })

        if (!updateFields)
            return res.status(404).json({ message: 'You can send request without updated values of price or quantity' });

        if (type === 'name') {
            // Update item by name
            item = await Item.findOneAndUpdate(
                { itemName: identifier },
                { $set: updateFields },
                { new: true }
            );
        } else if (type === 'id') {
            // Update item by ID
            item = await Item.findByIdAndUpdate(
                identifier,
                { $set: updateFields },
                { new: true }
            );
        } else {
            return res.status(400).json({ message: 'Invalid type parameter.Must be "name" or "id".' });
        }

        if(!item)
        return res.status(404).json({ message: 'Not found any data with "name" or "id".' });

        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item from store
router.delete('/deleteItems/:id',async (req, res) => {
    try {
        const itemId = req.params.id; // Get the item ID from the request parameters
        // Find the item by its ID and remove it
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (deletedItem) {
            // Item deleted successfully
            res.status(202).json({ message: 'Item deleted successfully' });
        } else {
            // Item not found
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



module.exports = router;
