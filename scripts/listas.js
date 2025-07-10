function nomeUsuario() {
  const user = JSON.parse(localStorage.getItem('user'));
  $("#nomeUser").text(user.nome)
}
nomeUsuario()

function mostraTotal() {
  $('#tarefasConcluidas').addClass('hidden');
  $('#totalTarefas').removeClass('hidden');
}

function mostraConcluidas() {
  $('#totalTarefas').addClass('hidden');
  $('#tarefasConcluidas').removeClass('hidden');
}

async function buscaTarefas() {
  const user = localStorage.getItem('user')

  const response = await fetch('http://localhost:3000/tarefas', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: user
  });
  const resposta = await response.json()
  localStorage.setItem("tarefas", JSON.stringify(resposta))
  return resposta;
}

async function preencheTarefas() {
  const resposta = await buscaTarefas()
  linhas = ''
  cont = 0
  resposta.tarefas.forEach(tarefa => {
    const dataFormatada = new Date(tarefa.data_criacao).toLocaleDateString('pt-BR');
    linhas +=`
    <tr data-nome-tarefa="${tarefa.nome}" data-id-tarefa="${tarefa.id}" class="bg-white shadow rounded-xl">
      <td class="p-3">
        <div class="flex gap-3">
          <input type="checkbox" name="${tarefa.nome}">
          <h1 class="text-md text-neutral-700 font-semibold">${tarefa.nome}</h1>
        </div>
        ${tarefa.descricao ? `<p class="text-sm text-gray-600">${tarefa.descricao}</p>` : ''}
      </td>
      <td class="p-3 align-top text-sm">${dataFormatada}</td>
    </tr>  
  `
  cont++;
  });
  $("#corpo").html(linhas);
  $("#naoRealizadas").text(cont);
}
preencheTarefas()


$(document).on('change', 'input[type="checkbox"]', async function tarefaConcluida () {
  // const nome = $(this).attr('name') || $(this).attr('id');
  const marcado = $(this).is(':checked');
  const tarefa = $(this).closest('tr');
  const id = tarefa.data('id-tarefa'); 
  const idUsuario = {
    id: id
  }  


  const response = await fetch('http://localhost:3000/tarefas', {
    method: 'delete',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(idUsuario)
  })
  const resposta = await response.json()
  console.log(resposta)

  preencheTarefas()
});


function adicionarTarefa() {
  Swal.fire({
    showCancelButton: true,
    confirmButtonText: 'Adicionar Tarefa',
    cancelButtonText: 'Cancelar',
    html: `
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

      <h1 class="my-10 text-3xl">Registrar nova tarefa</h1>
      <form id="novaTarefa" class="grid grid-cols-2 gap-3 text-start" onsubmit="">
        <div class="col-span-2">
          <label class="text-xl" for="nomeTarefa">Nome da Tarefa:</label>
          <input class="border border-neutral-300 my-2 p-2 rounded-lg w-full bg-gray-100" type="text" name="nomeTarefa" required>

          <label class="text-xl" for="descricaoTarefa">Descrição da Tarefa:</label>
          <input class="border border-neutral-300 my-2 p-2 rounded-lg w-full bg-gray-100" type="text" name="descricaoTarefa" required>
        </div>

        <div class="col-start-1>
          <label class="text-xl" for="categoria">Categoria:</label> <br>
          <select id="categoriaTarefa" name="categoria" class="bg-gray-100 p-2 border rounded-xl w-full my-2">
            <option selected disabled>Selecione uma opção</option>
            <option value="pessoal">Pessoal</option>
            <option value="trabalho">Trabalho</option>
            <option value="estudos">Estudos</option>
            <option value="casa">Casa</option>
          </select>
        </div>

        <div class="col-start-2>
          <label for="dataEsperada" class="text-xl">Data de conclusão</label>
          <input class="border border-neutral-300 my-2 p-2 rounded-lg w-full bg-gray-100" type="date" name="dataEsperada">
        </div>

      </form>
      <div id="erro"></div>
    `,
    preConfirm: async () => {
      // Fazer o JSON e retornar. Depois usar .then para enviar ao backend

      const nomeTarefa = $("[name='nomeTarefa'").val();
      const descricaoTarefa = $("[name='descricaoTarefa'").val();
      const categoriaTarefa = $("#categoriaTarefa").val();
      const user = JSON.parse(localStorage.getItem('user'));


      if (!nomeTarefa || !descricaoTarefa || !categoriaTarefa) {
        $("#erro").html(`<p class="text-red-700">Preencha todos os campos</p>`)
        return false;
      }


      const dados = {
        nomeTarefa: nomeTarefa,
        descricaoTarefa: descricaoTarefa,
        categoriaTarefa: categoriaTarefa,
        idUsuario: user.id
      }

      const response = await fetch('http://localhost:3000/tarefas/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
      })
      const resultado = await response.json()
      return resultado;
    },
    allowOutsideClick: () => !Swal.isLoading()

      // <button class="bg-blue-500 text-neutral-50 font-bold rounded-xl w-full mt-3 p-4" type="submit">Entrar</button>
  }).then ((result) => {
    if(result.isConfirmed) {
      preencheTarefas()
      Swal.fire({
        icon: 'success',
        title: 'Tarefa cadastrada!'
      })
    }
  })
}