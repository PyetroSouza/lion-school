'use strict'


import { getAluno } from "../router/aluno.js"

export async function criarAluno(id) {
    const aluno = await getAluno(id)

    const main = document.createElement('div')
    main.classList.add('aluno')

    const quadradoAluno = document.createElement('div')
    quadradoAluno.classList.add('quadrado-aluno')

    const foto = document.createElement('img')
    foto.classList.add('fotoaluno')
    foto.src = aluno.foto

    const nome = document.createElement('span')
    nome.classList.add('nome')
    nome.textContent = aluno.nome

    quadradoAluno.append(foto, nome)

    const quadradoGrafico = document.createElement('div')
    quadradoGrafico.classList.add('quadrado-grafico')

    const materias = aluno.desempenho

materias.forEach(materia => {

    const coluna = document.createElement('div')
    coluna.classList.add('coluna-materia')

    let cor

    if (materia.valor >= 70) {
        cor = 'azul'
    } else if (materia.valor >= 50) {
        cor = 'amarelo'
    } else {
        cor = 'vermelho'
    }

    const nota = document.createElement('span')
    nota.classList.add('nota', cor)
    nota.textContent = materia.valor

    const barraFundo = document.createElement('div')
    barraFundo.classList.add('barra-fundo')

    const barra = document.createElement('div')
    barra.classList.add('barra-progresso', cor)
    barra.style.height = `${materia.valor}%`

    barraFundo.appendChild(barra)

    const sigla = document.createElement('span')
    sigla.classList.add('sigla')
    sigla.textContent = materia.categoria

    coluna.append(nota, barraFundo, sigla)
    quadradoGrafico.appendChild(coluna)
})

    main.append(quadradoAluno, quadradoGrafico)

    return main
}