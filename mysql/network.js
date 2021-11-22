const express = require('express');

// const secure = require('./secure');
const response = require('../network/response');
const store = require('../store/mysql')
const router = express.Router();


router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list(req, res, next) {
    const datos = await store.list(req.params.table);
    response.success(req, res, datos, 200);
}
async function get(req, res, next) {
    const datos = await store.get(req.params.table, req.params.id);
    response.success(req, res, datos, 200);
}
async function insert(req, res, next) {
    const datos = await store.insert(req.params.table, req.body, true);
    response.success(req, res, datos, 201);
}
async function upsert(req, res, next) {
    const datos = await store.upsert(req.params.table, req.body, false);
    response.success(req, res, datos, 201);
}

module.exports = router;
