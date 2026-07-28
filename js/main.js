'use strict'



import { criarHome } from './pages/home.js'
import { criarCurso } from './pages/curso.js'
/* import {criarAluno} from '/.pages/alunos.js' */

const paginas = {
    home: {
        titulo: "Lion School",
        renderizar: criarHome
    },
    curso: {
        titulo: "Alunos do Curso",
        renderizar: criarCurso
    }, /*
    aluno: {
        titulo: "Dados do aluno",
        renderizar: criarAluno
    } */
}

export async function renderizarPagina(nomePagina, id = null) {
    const main = document.getElementById('main')
    main.className = `main-${nomePagina}`
    const pagina = await paginas[nomePagina].renderizar(id)
    document.title = paginas[nomePagina].titulo

    main.replaceChildren(pagina)
}

renderizarPagina('home')