const Usuario = require('../model/usuario');

exports.cadastrarUsuario = async(req, res)=>{
    const {login, senha} = req.body
    if(!login || !senha){
      return res.status(404).send('Informações inválidas!')
    }

  try {
    const novoUsuario = new Usuario({login, senha})
    await novoUsuario.save()
    res.status(200).send('Usuário cadastrado com sucesso')
  } catch (error) {
    res.status(500).json({error:"Erro ao cadastrar usuário"})
    
  }
}