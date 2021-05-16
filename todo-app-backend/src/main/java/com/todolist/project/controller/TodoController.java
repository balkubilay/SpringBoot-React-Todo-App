package com.todolist.project.controller;

import com.todolist.project.exception.ResourceNotFoundException;
import com.todolist.project.model.Todo;
import com.todolist.project.reporsitory.TodoReporsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TodoController {

    @Autowired
    private TodoReporsitory todoReporsitory;

    //get all todos
    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        return todoReporsitory.findAll();
    }

    //     create todo rest api
    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoReporsitory.save(todo);
    }

    // get todo by id rest api
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo = todoReporsitory.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id :" + id));
        return ResponseEntity.ok(todo);
    }

    // update todo rest api
    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoReporsitory.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id :" + id));

        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setTime(todoDetails.getTime());

        Todo updatedTodo = todoReporsitory.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    //delete todo rest api
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTodo(@PathVariable Long id) {
        Todo todo = todoReporsitory.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id :" + id));
        todoReporsitory.delete(todo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
