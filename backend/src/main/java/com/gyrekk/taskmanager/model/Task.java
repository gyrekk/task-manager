package com.gyrekk.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// Narazie nie potrzebne
//@Entity // Mówi bazie danych: "Stwórz tabelę na podstawie tej klasy".
//@Table(name = "tasks") // (Opcjonalne) Nazywa tę tabelę "tasks".
public class Task {

    @Id // To pole jest Kluczem Głównym (unikalnym identyfikatorem wiersza).
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Baza sama nada numer (Auto Increment: 1, 2, 3...).
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate date;

    // RELACJA: Jeden Task ma Wiele SubTasków.
    // mappedBy = "task": Mówi, że fizyczne powiązanie jest w klasie SubTask w polu o nazwie "task".
    // cascade = ALL: Jak zapiszesz/usuniesz Taska, zrób to samo z jego SubTaskami.
    // orphanRemoval = true: Jak usuniesz SubTaska z tej listy, usuń go też z bazy danych.
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SubTask> subTasks = new ArrayList<>();

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

    public List<SubTask> getSubTasks() {
        return subTasks;
    }

    public void setSubTasks(List<SubTask> subTasks) {
        this.subTasks = subTasks;
    }


    public void addSubTask(SubTask subTask) {
        this.subTasks.add(subTask);
        subTask.setTask(this);
    }
}
