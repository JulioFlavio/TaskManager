// const dado = JSON.parse(localStorage.getItem('user'))
// 

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
  });
  $("#corpo").html(linhas);
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
});
