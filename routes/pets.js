const express = require('express');
const router = express.Router();


// Retorna todos os pets
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Retorna os pets'
    });
});

// CREATE
router.post('/', (req,res,next) => {
    const pet ={
        id_pet: req.body.id_pet,
        id_cliente: req.body.id_cliente,
        apelido: req.body.apelido,
        sexo: req.body.sexo,
        especie: req.body.especie
    }
    res.status(201).send({
        mensagem: 'O Pet foi criado',
        petCriado: pet
    });
});

// READ
router.get('/:id_pet', (req,res,next) => {
    const id = req.params.id_pet
        res.status(200).send({
            mensagem: 'Detalhes do Pet',
            id_pet: id
        });
});

// UPDATE
router.patch('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'O Pet foi atualizado'
    });
});

// DELETE
router.delete('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'O Pet foi excluído'
    });
});

module.exports = router;