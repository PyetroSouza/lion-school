'use strict'

const URL = "https://lion-school-phbo.onrender.com/alunos"

export async function getAlunos(){
    const response = await fetch(URL)
    return response.json()
}

export async function getAlunos(id){
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error (`Erro ao buscar o aluno de id ${id}`)
        return response.json()
}

export async function getAlunosByIdCurso (idCurso){
    const response = await fetch(`${URL}?cursos_id=${idCurso}`)
    if (!response.ok) throw new Error (`Error ao buscar o aluno do curso id ${idCurso}`)
        return response.json()
}
export async function getAlunosByStatus (status){
    const response = await fetch(`${URL}?status=${status}`)
    if (!response.ok) throw new Error (`Error ao buscar o aluno do curso id ${status}`)
        return response.json()
}
