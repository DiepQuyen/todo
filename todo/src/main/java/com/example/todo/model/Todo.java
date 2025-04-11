package com.example.todo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime deadline; // Thêm trường deadline

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public Todo(Long id, String title, boolean completed, LocalDateTime deadline) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.deadline = deadline;
    }


    public Todo() {
    }

    public Todo(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}