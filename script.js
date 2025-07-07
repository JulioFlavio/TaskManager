const { text } = require("express");
const { event } = require("jquery");

function cadastro() {
  $("#formCadastro").removeClass("hidden");
  $("#formLogin").addClass("hidden");

  $("#cadastro").attr("class", 'cadastro bg-neutral-50 text-blue-500 font-bold p-2 px-5 rounded-xl')
  $("#login").attr("class", 'login text-neutral-500 font-bold p-2 px-5 rounded-xl')
}

function login() {
  $("#formCadastro").addClass("hidden");
  $("#formLogin").removeClass("hidden");

  $("#cadastro").attr("class", 'login text-neutral-500 font-bold p-2 px-5 rounded-xl')
  $("#login").attr("class", 'cadastro bg-neutral-50 text-blue-500 font-bold p-2 px-5 rounded-xl')
}

async function cadastroUsuario(event) {
  event.preventDefault();
  const nome = $('[name="nomeCadastro"]').val();
  const email = $('[name="emailCadastro"]').val();
  const senha = $('[name="senhaCadastro"]').val();
  const confirmarSenha = $('[name="confirmarSenha"]').val();

  if (!(senha == confirmarSenha)) {
    alert("As senhas não coincidem!")
  } else {
    const usuario = {
      nomeCompleto: nome,
      email: email,
      senha: senha,
    }

    const response = await fetch('http://localhost:3000/cadastro',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })

    const respostaServidor = await response.json()
    Swal.fire({
      icon: respostaServidor.icon,
      title: respostaServidor.title,
      text: respostaServidor.text
    });
  }
}

async function loginUsuario(event) {
  event.preventDefault()

  const email = $('[name="emailLogin"]').val();
  const senha = $('[name="senhaLogin"]').val();
  const login = {
    email: email,
    senha: senha
  }

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(login)
  })
  const respostaServidor = await response.json();
  if (respostaServidor.message === 'sucess')
    window.location.href = 'listas.html'
  else {
    Swal.fire ({
      icon: respostaServidor.icon,
      title: respostaServidor.title,
      text: respostaServidor.text
    })
  }
}