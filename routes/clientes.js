const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

// Retorna todos os clientesss
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
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({error: errBcrypt}) }
        conn.query(
            'INSERT INTO clientes (nome,email,senha) VALUES (?,?,?)',
            [req.body.nome, req.body.email,hash],
            (error,resultado,field) => {
                conn.release(); //sempre faça o release, para liberar a conexão poiso o pool tem limite de conexões
                if (error) { return res.status(500).send({error: error})}
                response = {
                    mensagem: 'Cliente inserido com sucesso',
                    usuarioCriado: {
                        id_cliente: resultado.insertId,
                        email: req.body.email
                    }            
                }
                return res.status(201).send(response)
                });
            })
    })
    
});

// READ
router.get('/:id_cliente', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM clientes WHERE id_cliente = ?;',
            [req.params.id_cliente],
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
            'UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE id_cliente = ?',
            [req.body.nome, req.body.email,req.body.senha,req.body.id_cliente],
            (error,resultado,field) => {
                conn.release(); 

                if (error) { return res.status(500).send({error: error})}
                  
                res.status(202).send({
                    mensagem: 'Cliente atualizado com sucesso'
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
            'DELETE FROM clientes WHERE id_cliente = ?',
            [req.body.id_cliente],
            (error,resultado,field) => {
                conn.release(); 
                if (error) { return res.status(500).send({error: error}) }
                  
                res.status(202).send({
                    mensagem: 'Cliente excluído com sucesso'
                });
            }
        )
    })
});

module.exports = router;