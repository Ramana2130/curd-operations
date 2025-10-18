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
    register_number: string;
    department: string;
} 

export const getAllStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/students/getAll');
    console.log(response.data);
    return response.data;
}

export const addStudent = async (student: Student): Promise<Student> => {
    const response = await api.post<Student>('/students/add', student);
    return response.data;
}
