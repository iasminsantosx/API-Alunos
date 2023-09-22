let { alunos, identificadoraluno} = require('../bancodedados');

const listarAlunos = (req,res) =>{
    if(alunos.length===0){
        return res.status(200).json({mensagem:' Banco de dados vazio.'})
    }
    return res.status(200).json(alunos);
}

const obterAluno = (req,res) =>{
    const { id } = req.params;

    const aluno = alunos.find((aluno) =>{
        return aluno.id === Number(id);
    });

    if(isNaN(id)){
        return res.status(400).json({mensagem: 'ID deve ser um número válido.'});
    }

    else if(!aluno){
        return res.status(404).json({mensagem: 'Aluno não encontrado.'});
    }

    return res.status(200).json(aluno);
}

const cadastrarAluno = (req,res) =>{
    const { nome, sobrenome, idade, curso} = req.body;

    if(!nome || nome===''){
        return res.status(400).json({mensagem: 'O nome é obrigatório.'});
    }
    if(!sobrenome || sobrenome===''){
        return res.status(400).json({mensagem: 'O sobrenome é obrigatório.'});
    }
    if(!idade || idade==='' || Number(idade)<18){
        return res.status(400).json({mensagem: 'a idade é obrigatória.'});
    }
    if(!curso || curso===''){
        return res.status(400).json({mensagem: 'O curso é obrigatório.'});
    }
    
    const aluno = {
        id: identificadoraluno++,
        nome: nome,
        sobrenome: sobrenome,
        idade: idade,
        curso:curso
    }
    alunos.push(aluno);

    return res.status(201).json(aluno);

}

const deletarAluno = (req,res) =>{

    const { id } = req.params

    const aluno = alunos.find((aluno) =>{
        return aluno.id === Number(id);
    });

    if(isNaN(id)){
        return res.status(400).json({mensagem: 'ID deve ser um número válido.'});
    }

    else if(!aluno){
        return res.status(404).json({mensagem: 'Aluno não encontrado.'});
    }

    alunos = alunos.filter((aluno)=>{
        return aluno.id !== Number(id);
    })

    return res.status(200).json(aluno);
}

module.exports = {
    listarAlunos,
    obterAluno,
    cadastrarAluno,
    deletarAluno
}