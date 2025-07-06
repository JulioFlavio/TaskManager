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

async function cadastroUsuario() {
  const nome = $("name=['nomeCadastro']").val
  const email = $("name=['emailCadastro']").val
  const senha = $("name=['senhaCadastro']").val
  const confirmarSenha = $("name=['confirmarSenha']").val

  if (!(senha == confirmarSenha)) {

  } else {
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    }

    const response = fetch('/cadastro',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })

    const respostaServidor = (await response).text()
    console.log(respostaServidor)
  }
}