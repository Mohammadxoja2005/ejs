const express = require("express");
const router = express.Router();
// models
const { crud } = require("../models");

//getting all information  
router.get("/", async (req, res) => {
    const getAll = await crud.findAll();
    res.json(getAll);
})

// creating 
router.post("/", async (req, res) => {
    const data = req.body;
    const createOne = await crud.create(data);

    res.json(createOne);
})

// updating 
router.put('/', async (req, res) => {
    const { id, text } = req.body;

    crud.update(
        { "text": text },
        { where: { id: id } }
    )

    res.json("success");
})

// deleting
router.delete('/', async (req, res) => {
    const { id } = req.body;
    console.log(id)
    crud.destroy({ where: { id: id } })

    res.json("success");
})

module.exports = router;