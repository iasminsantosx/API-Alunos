const express = require('express');
const rotas = require('./rotas');
const validarSenha = require('./intermediarios');


const app = express();

app.use(validarSenha);

app.use(rotas);

app.listen(3000);