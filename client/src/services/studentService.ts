import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export interface Student{
    id?: number;
    name: string;
    email: string;
    registerNumber: string;
    department: string;
} 

export const addStudent = async (student: Student): Promise<Student> => {
    const response = await api.post<Student>('/students/add', student);
    return response.data;
}

export const getAllStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/students/getAll');
    return response.data;
}

export const updateStudentById = async (id: number, updateStudent: Partial<Student>) : Promise<Student> => {
    const response = await api.put<Student>(`/students/updateById/${id}`, updateStudent);
    return response.data;
}

export const deleteStudentById = async (id: number): Promise<{message: string}> => {
    const response = await api.delete<{message: string}>(`/students/deleteById/${id}`);
    return response.data;
}