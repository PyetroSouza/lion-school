'use strict'

const URL = "https://lion-school-phbo.onrender.com/cursos"

export async function getCursos() {
    const response = await fetch(URL)
    return response.json()
}

export async function getCurso(id) {
    const response = await fetch(`${URL}/${id}`)

    if (!response.ok) {
        throw new Error(`Erro ao buscar o curso de id ${id}`)
    }

    return response.json()
}

