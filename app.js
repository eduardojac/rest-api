const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');

const rotaClientes = require('./routes/clientes');
const rotaPets = require('./routes/pets');
const rotaParceiros = require('./routes/parceiros');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header('Acess-Control-Allow-Origin', '*');
    res.header(
        'Acess-Control-Allow-Header',
        'Origin, X-Reqrested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        req.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

app.use('/clientes', rotaClientes);
app.use('/pets', rotaPets);
app.use('/parceiros', rotaParceiros);

// Quando não encontra a rota
app.use((req,res,next) =>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req,res,next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})


// Importar pra dentro do server
module.exports = app;