// api/routes/guests.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ: Ambil semua tamu
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM guests ORDER BY created_at DESC');
        res.json(results);
    } catch (err) {
        console.error('Error fetching guests:', err);
        res.status(500).json({ error: 'Error fetching guests' });
    }
});

// CREATE: Tambah tamu baru
router.post('/', async (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Nama dan pesan wajib diisi' });
    }

    try {
        const [result] = await db.query('INSERT INTO guests (name, message) VALUES (?, ?)', [name, message]);
        res.json({ id: result.insertId, name, message, created_at: new Date() });
    } catch (err) {
        console.error('Error adding guest:', err);
        res.status(500).json({ error: 'Error adding guest' });
    }
});

// UPDATE: Edit tamu berdasarkan ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: 'Nama dan pesan wajib diisi' });
    }

    try {
        await db.query('UPDATE guests SET name = ?, message = ? WHERE id = ?', [name, message, id]);
        res.json({ message: 'Data berhasil diupdate' });
    } catch (err) {
        console.error('Error updating guest:', err);
        res.status(500).json({ error: 'Error updating guest' });
    }
});

// DELETE: Hapus tamu berdasarkan ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM guests WHERE id = ?', [id]);
        res.json({ message: 'Data berhasil dihapus' });
    } catch (err) {
        console.error('Error deleting guest:', err);
        res.status(500).json({ error: 'Error deleting guest' });
    }
});

module.exports = router;
