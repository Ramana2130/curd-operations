package com.example.college.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.college.model.Student;
import com.example.college.service.StudentService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<?> createStudent(@Valid @RequestBody Student student){
        Map<String, String> response = new HashMap<>();
        try {
            Student createStudent = studentService.addStudent(student);
            response.put("message","Student added successfully");
            response.put("studentId", String.valueOf(createStudent.getId()));
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(400).body(response);
        }
    }

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Student found successfully"),
        @ApiResponse(responseCode = "404", description = "Student not found")
    })
    @GetMapping("/get/{id}")
    ResponseEntity<Student> getStudentById(@PathVariable long id){
        try {
            Student getStudent = studentService.getStudentById(id);
            return new ResponseEntity<>(getStudent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAll")
    ResponseEntity <List<Student>> getAllStudent(){
        try {
            List<Student> getAllStudents = studentService.getAllStudent();
            return new ResponseEntity<>(getAllStudents, HttpStatus.OK);            
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getByPage")
    ResponseEntity<Page<Student>> getStudentByPage(@RequestParam int pageNumber, @RequestParam int size){
        try {
            Page<Student> getByPage = studentService.getStudentByPage(pageNumber, size);
            return new ResponseEntity<>(getByPage, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateById/{id}")
    ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student student){
        try {
            Student updateById = studentService.updateStudent(id, student);
            return new ResponseEntity<>(updateById, HttpStatus.CREATED);            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteById/{id}")
    ResponseEntity<String> deletebyId(@PathVariable long id){
        try {
            studentService.deletebyId(id);
            return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAll")
    ResponseEntity <String> deleteAll(){
        try {
            studentService.deleteAll();
            return new ResponseEntity<>("All Records Deleted Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
