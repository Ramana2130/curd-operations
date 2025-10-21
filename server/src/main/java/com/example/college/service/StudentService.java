package com.example.college.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.college.model.Student;
import com.example.college.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) throws Exception{
        String normalizedRegisterNumber = student.getRegisterNumber().toUpperCase();
        Optional<Student> existingEmail = studentRepository.findByEmail(student.getEmail());
        if(existingEmail.isPresent()){
            throw new Exception("Email already exists");
        }
        Optional<Student> existingRegisterNumber = studentRepository.findByRegisterNumber(normalizedRegisterNumber);
        if(existingRegisterNumber.isPresent()){
            throw new Exception("Register Number already exists");
        }
        student.setRegisterNumber(normalizedRegisterNumber);
        return studentRepository.save(student);
    }

    public Student getStudentById(Long id){
        return studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<Student> getAllStudent(){
        return studentRepository.findAll();
    }

    public Student updateStudent(Long id, Student student){
        Optional<Student> exStu = studentRepository.findById(id);

        if(exStu.isPresent()){
            Student students = exStu.get();
            students.setName(student.getName());
            students.setEmail(student.getEmail());
            students.setRegisterNumber(student.getRegisterNumber());
            students.setDepartment(student.getDepartment());
            return studentRepository.save(students);
        } else {
            throw new RuntimeException("Student not found");
        }
    }

    public void deletebyId(Long id){
        studentRepository.deleteById(id);
    }

    public void deleteAll(){
        studentRepository.deleteAll();
    }
    
    public Page<Student> getStudentByPage(int pageNumber, int size){
        Pageable pageable = PageRequest.of(pageNumber, size);
        return studentRepository.findAll(pageable);
    }
}
