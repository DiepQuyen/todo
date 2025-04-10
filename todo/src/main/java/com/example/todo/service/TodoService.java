package com.example.todo.service;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    //lấy tất cả
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    //tạo mới
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    //update
    public Todo updateTodo(Long id, Todo todoDetails) {
        //tìm theo id
        Todo todo = todoRepository.findById(id).orElseThrow();
        //update các thông tin
        todo.setTitle(todoDetails.getTitle());
        todo.setCompleted(todoDetails.isCompleted());
        //lưu
        return todoRepository.save(todo);
    }

    //xoá theo id
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    //xóa cái là iscompleted
    public void deleteCompletedTodos() {
        todoRepository.deleteAll(todoRepository.findAll().stream()
                .filter(Todo::isCompleted)
                .toList());
    }
}