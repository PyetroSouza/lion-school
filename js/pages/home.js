'use strict'

import { renderizarPagina } from "../main.js"

export function criarHome() {
    const main = document.createElement('main')

    const slogan = document.createElement('div')
    slogan.classList.add('slogan')

    const textSlogan = document.createElement('p')
    textSlogan.innerHTML = "Escolha um <span>curso</span> para gerencia"
    
    const imgSlogan = document.createElement('img')
    imgSlogan.src = '../../assents/devices.svg'
    imgSlogan.alt = 'Dispositivos'

    const student = document.createElement("div")
    student.classList.add("student")

    const imgStudent = document.createElement('img')
    imgStudent.src = '../../assents/studant.svg'

    const botoes = document.createElement('div') 
    botoes.classList.add("botoes")

    const ds = document.createElement("div")
    ds.classList.add('ds')
    const buttonDs = document.createElement('button')
    const imgButtonDs = document.createElement('img')
    imgButtonDs.src = '../../assents/ds.svg'

    const txtButtonDs = document.createElement('p')
    txtButtonDs.innerHTML = 'DS'

    buttonDs.append(imgButtonDs,txtButtonDs)

    const redes = document.createElement("div")
    redes.classList.add('redes')
    const buttonRedes = document.createElement('button')
    const imgButtonRedes = document.createElement('img')
    imgButtonDs.src = '../../assents/redes.svg'
    
    const txtButtonRedes = document.createElement('p')
    txtButtonDs.innerHTML = 'REDES'

    buttonDs.append(imgButtonDs,txtButtonDs)
    buttonRedes.append(imgButtonRedes, txtButtonRedes)

    botoes.append(ds, redes)

    main.append(slogan, student, botoes)

    return main
}