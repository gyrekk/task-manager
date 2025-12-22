package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TaskRepository {
    public List<Task> findAll();
    public Task save(Task task);
    public void deleteById(Long id);
    public Task update(Task task);

    public Task findById(Long id);
}
