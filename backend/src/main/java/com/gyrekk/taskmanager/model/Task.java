package com.gyrekk.taskmanager.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity // To mówi Springowi: "Na podstawie tej klasy stwórz tabelę w bazie"
@Table(name = "tasks") // (Opcjonalne) Możesz wymusić nazwę tabeli, np. "tasks"
public class Task {
    @Id // To jest Klucz Główny (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Baza sama będzie nadawać kolejne numery ID (Auto Increment)
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate date;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public TaskPriority getPriority() {
        return priority;
    }
    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}
