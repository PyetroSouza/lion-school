'use strict'

import { getCursos } from "../router/cursos.js"
import { renderizarPagina } from "../main.js"

export async function criarHome() {

    const cursos = await getCursos()

    const container = document.createElement('div')
    container.classList.add('home')

    const slogan = document.createElement('div')
    slogan.classList.add('slogan')

    const textSlogan = document.createElement('p')
    textSlogan.innerHTML = 'Escolha um <span>curso</span> para gerenciar'

    const imgSlogan = document.createElement('img')
    imgSlogan.src = '../../assents/devices.svg'
    imgSlogan.alt = 'Dispositivos'

    slogan.append(textSlogan, imgSlogan)

    const student = document.createElement('div')
    student.classList.add('student')

    const imgStudent = document.createElement('img')
    imgStudent.src = '../../assents/studant.svg'

    student.append(imgStudent)

    const botoes = document.createElement('div')

    botoes.classList.add('botoes')

    cursos.forEach(curso => {

        const div = document.createElement('div')
        div.classList.add(curso.sigla.toLowerCase())

        const button = document.createElement('button')
        button.addEventListener("click", () => {
            renderizarPagina("curso", curso)
        })

        const img = document.createElement('img')
        img.src = curso.icon
        img.alt = curso.nome

        const texto = document.createElement('p')
        texto.textContent = curso.sigla

        button.append(img, texto)
        div.append(button)
        botoes.append(div)
    })

    container.append(slogan, student, botoes)

    return container
}