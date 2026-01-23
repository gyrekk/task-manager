package com.gyrekk.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gyrekk.taskmanager.service.TaskPriority;
import com.gyrekk.taskmanager.service.TaskStatus;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING) // WAŻNE: Zapisuje w bazie jako "HIGH", a nie 2
    private TaskPriority priority;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;


    @OneToMany(mappedBy ="task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SubTask> subtasks = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SubTask> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<SubTask> subtasks) {
        this.subtasks = subtasks;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }
}
