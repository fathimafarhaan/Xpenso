const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Route to get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new expense
router.post('/', async (req, res) => {
    const { title, amount, category } = req.body;

    const newExpense = new Expense({
        title,
        amount,
        category
    });

    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
