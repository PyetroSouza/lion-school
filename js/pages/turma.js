'use strict'

import { getAlunosByIdCurso } from "../router/aluno.js"

let alunosDoCursoAtual = []

// Função para renderizar/re-renderizar os cards no container
function renderizarCardsContainer(alunosParaExibir) {
    const containerCards = document.querySelector('.cards-alunos')
    if (!containerCards) return

    containerCards.innerHTML = ''

    alunosParaExibir.forEach(aluno => {
        const card = document.createElement('div')
        card.classList.add('card-aluno')

        const statusClass = aluno.status ? aluno.status.toLowerCase().trim() : ''
        if (statusClass) {
            card.classList.add(statusClass)
        }

        const imagem = document.createElement('img')
        imagem.src = aluno.foto
        imagem.alt = aluno.nome

        const nome = document.createElement('h2')
        nome.textContent = aluno.nome

        card.append(imagem, nome)
        containerCards.appendChild(card)
    })
}

// Função de filtro chamada no clique
export function filtrarAlunosPorStatus(statusFiltro) {
    if (!statusFiltro || statusFiltro === 'todos') {
        renderizarCardsContainer(alunosDoCursoAtual)
    } else {
        const filtrados = alunosDoCursoAtual.filter(aluno => 
            aluno.status.toLowerCase().trim() === statusFiltro.toLowerCase().trim()
        )
        renderizarCardsContainer(filtrados)
    }
}

// Configura os cliques do menu dropdown de status do Header
function ativarMenuStatus() {
    const statusUl = document.querySelector('.status ul')
    
    if (!statusUl) return

    // Se a lista de status ainda não tem as opções Cursando, Finalizado e Todos, criamos elas:
    statusUl.innerHTML = `
        <li data-status="todos" style="cursor: pointer;">Todos</li>
        <li data-status="cursando" style="cursor: pointer;">Cursando</li>
        <li data-status="finalizado" style="cursor: pointer;">Finalizado</li>
    `

    // Adiciona evento de clique na lista
    statusUl.addEventListener('click', (event) => {
        const li = event.target.closest('li')
        if (!li) return

        const statusSelecionado = li.getAttribute('data-status')
        filtrarAlunosPorStatus(statusSelecionado)

        // Fecha o dropdown do <details> após clicar
        const details = statusUl.closest('details')
        if (details) details.removeAttribute('open')
    })
}

export async function criarTurma(curso) {
    const main = document.createElement('div')
    main.classList.add('turmas')

    // Busca os alunos do curso selecionado
    const todosAlunos = await getAlunosByIdCurso(curso.id)
    alunosDoCursoAtual = todosAlunos.filter(aluno => Number(aluno.curso_id) === Number(curso.id))

    // Título
    const tituloAlunos = document.createElement('div')
    tituloAlunos.classList.add('titulo-alunos')

    const titulo = document.createElement('h1')
    titulo.textContent = curso.nome

    tituloAlunos.appendChild(titulo)
    main.appendChild(tituloAlunos)

    // Container de cards
    const containerCards = document.createElement('div')
    containerCards.classList.add('cards-alunos')
    main.appendChild(containerCards)

    // Renderiza inicialmente todos os alunos do curso
    setTimeout(() => {
        renderizarCardsContainer(alunosDoCursoAtual)
        ativarMenuStatus() // Ativa os cliques no menu de status
    }, 0)

    return main
}