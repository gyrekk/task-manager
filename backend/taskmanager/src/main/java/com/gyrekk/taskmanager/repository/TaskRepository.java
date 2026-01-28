package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;

import java.util.List;

public interface TaskRepository {
    public List<Task> findAll();

    public Task findById(Long taskId);
    public Task findByName(String name);

    public Task save(Task task);
    public void deleteById(Long taskId);
    public Task update(Task task);
}
