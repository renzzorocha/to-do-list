document.addEventListener('DOMContentLoaded', carregarTarefas);

const entradaTarefa = document.getElementById('entrada-tarefa');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

botaoAdicionar.addEventListener('click', adicionarTarefa);

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => criarElementoTarefa(tarefa));
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('.item-tarefa').forEach(tarefaEl => {
        tarefas.push({
            texto: tarefaEl.querySelector('.texto-tarefa').textContent,
            concluida: tarefaEl.classList.contains('concluida')
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const itemTarefa = document.createElement('li');
    itemTarefa.classList.add('item-tarefa');
    if (tarefa.concluida) itemTarefa.classList.add('concluida');

    const textoTarefa = document.createElement('span');
    textoTarefa.classList.add('texto-tarefa');
    textoTarefa.textContent = tarefa.texto;
    itemTarefa.appendChild(textoTarefa);

    const botaoConcluir = document.createElement('button');
    botaoConcluir.textContent = '✔';
    botaoConcluir.classList.add('botao-concluir');
    botaoConcluir.addEventListener('click', () => {
        itemTarefa.classList.toggle('concluida');
        salvarTarefas();
    });
    itemTarefa.appendChild(botaoConcluir);

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '✖';
    botaoRemover.classList.add('botao-remover');
    botaoRemover.addEventListener('click', () => {
        itemTarefa.remove();
        salvarTarefas();
    });
    itemTarefa.appendChild(botaoRemover);

    listaTarefas.appendChild(itemTarefa);
}

function adicionarTarefa() {
    const texto = entradaTarefa.value.trim();
    if (texto === '') return;

    const tarefa = { texto: texto, concluida: false };
    criarElementoTarefa(tarefa);
    salvarTarefas();
    entradaTarefa.value = '';
}
