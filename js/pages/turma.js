'use strict'

import { getAlunosByIdCurso } from "../router/aluno.js"
import { renderizarPagina } from "../main.js"

let alunosDoCursoAtual = []

function renderizarCardsContainer(alunosParaExibir) {
    const containerCards = document.querySelector('.cards-alunos')
    if (!containerCards) return

    containerCards.innerHTML = ''

    alunosParaExibir.forEach(aluno => {
        const card = document.createElement('div')
        card.addEventListener("click", () => {
            renderizarPagina("aluno", aluno.id)
        })
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

function ativarMenuStatus() {
    const statusUl = document.querySelector('.status ul')
    if (!statusUl) return

    statusUl.innerHTML = `
        <li data-status="todos" class="status-opcao opcao-todos">Status</li>
        <li data-status="cursando" class="status-opcao opcao-cursando">Cursando</li>
        <li data-status="finalizado" class="status-opcao opcao-finalizado">Finalizado</li>
    `

    statusUl.onclick = (event) => {
        const li = event.target.closest('li')
        if (!li) return

        const statusSelecionado = li.getAttribute('data-status')
        filtrarAlunosPorStatus(statusSelecionado)

        const details = statusUl.closest('details')
        if (details) details.removeAttribute('open')
    }
}

export async function criarTurma(curso) {
    const main = document.createElement('div')
    main.classList.add('turmas')

    const todosAlunos = await getAlunosByIdCurso(curso.id)
    alunosDoCursoAtual = todosAlunos.filter(aluno => Number(aluno.curso_id) === Number(curso.id))

    const tituloAlunos = document.createElement('div')
    tituloAlunos.classList.add('titulo-alunos')

    const titulo = document.createElement('h1')
    titulo.textContent = curso.nome

    tituloAlunos.appendChild(titulo)
    main.appendChild(tituloAlunos)

    const containerCards = document.createElement('div')
    containerCards.classList.add('cards-alunos')
    main.appendChild(containerCards)

    setTimeout(() => {
        renderizarCardsContainer(alunosDoCursoAtual)
        ativarMenuStatus()
    }, 0)

    return main
}