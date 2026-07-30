'use strict'

const URL = "https://lion-school-phbo.onrender.com/alunos"

export async function getAlunos() {
    const response = await fetch(URL)

    if (!response.ok) {
        throw new Error('Erro ao listar alunos.')
    }

    return response.json()
}

export async function getAluno(id) {
    const response = await fetch(`${URL}/${id}`)

    if (!response.ok) {
        throw new Error(`Erro ao buscar o aluno de id ${id}`)
    }

    return response.json()
}

// CORREÇÃO AQUI: 'curso_id' em vez de 'cursos_id' ou 'curso'
export async function getAlunosByIdCurso(idCurso) {
    const response = await fetch(`${URL}?curso_id=${idCurso}`)

    if (!response.ok) {
        throw new Error(`Erro ao buscar o aluno do curso id ${idCurso}`)
    }

    return response.json()
}

export async function getAlunosByStatus(status) {
    const response = await fetch(`${URL}?status=${status}`)

    if (!response.ok) {
        throw new Error(`Erro ao buscar aluno com status ${status}`)
    }

    return response.json()
}