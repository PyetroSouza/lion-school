'use strict'



import { criarHome } from './pages/home.js'
import { criarTurma } from './pages/turma.js'
import { criarAluno } from './pages/aluno.js'

let cursoAtual = null

const paginas = {
    home: {
        titulo: "Lion School",
        renderizar: criarHome,
        textoHeader: "Sair",
        acaoHeader: function () {
            location.reload()
        }
    },
    curso: {
        titulo: "Alunos do Curso",
        renderizar: criarTurma,
        textoHeader: 'Voltar',
        acaoHeader: function () {
            renderizarPagina("home")
        }
    },
    aluno: {
        titulo: "Alunos",
        renderizar: criarAluno,
        textoHeader: "Voltar",
        acaoHeader() {
            renderizarPagina("curso", cursoAtual)
        }
    }
}

const botaoHeader = document.getElementById('botao-header')
const textoHeader = document.getElementById('texto-header')

export async function renderizarPagina(nomePagina, dados = null) {

    const main = document.getElementById('main')
    const headerStatus = document.getElementById("header-status")
    if (nomePagina === "curso") {
        cursoAtual = dados
    }
    if (nomePagina === "curso") {
        headerStatus.classList.remove("oculto")
    } else {
        headerStatus.classList.add("oculto")
    }

    main.className = `main-${nomePagina}`

    const pagina = await paginas[nomePagina].renderizar(dados)

    document.title = paginas[nomePagina].titulo

    textoHeader.textContent = paginas[nomePagina].textoHeader
    botaoHeader.onclick = paginas[nomePagina].acaoHeader

    main.replaceChildren(pagina)
}



renderizarPagina('home')