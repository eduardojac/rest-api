const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os parceiros
router.get('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM parceiros;',
            (error,resultado,fields) => {
                if (error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })

});
 
// CREATE
router.post('/', (req,res,next) => {

    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO parceiros (empresa,cidade,telefone,cpf) VALUES (?,?,?,?)',
            [req.body.empresa, req.body.cidade,req.body.telefone,req.body.cpf],
            (error,resultado,field) => {
                conn.release(); //sempre faça o release, para liberar a conexão poiso o pool tem limite de conexões

                if (error) { return res.status(500).send({error: error})}
                  
                res.status(201).send({
                    mensagem: 'Parceiro inserido com sucesso',
                    id_parceiro: resultado.insertId
                });
            }
        )
    })


     
});

// READ
router.get('/:id_parceiro', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM parceiros WHERE id_parceiro = ?;',
            [req.params.id_parceiro],
            (error,resultado,fields) => {
                if (error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

// UPDATE
router.patch('/', (req,res,next) => {
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'UPDATE parceiros SET empresa = ?, cidade = ?, telefone = ?, cpf = ? WHERE id_parceiro = ?',
            [req.body.empresa, req.body.cidade,req.body.telefone,req.body.cpf,req.body.id_parceiro],
            (error,resultado,field) => {
                conn.release(); 

                if (error) { return res.status(500).send({error: error})}
                  
                res.status(202).send({
                    mensagem: 'Parceiro atualizado com sucesso'
                });
            }
        )
    })
});

// DELETE
router.delete('/', (req,res,next) => {
    mysql.getConnection((error,conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM parceiros WHERE id_parceiro = ?',
            [req.body.id_parceiro],
            (error,resultado,field) => {
                conn.release(); 
                if (error) { return res.status(500).send({error: error}) }
                  
                res.status(202).send({
                    mensagem: 'Parceiro excluído com sucesso'
                });
            }
        )
    })
});

module.exports = router;