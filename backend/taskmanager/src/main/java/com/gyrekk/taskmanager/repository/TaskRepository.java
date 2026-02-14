package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;

import java.util.List;

public interface TaskRepository {
    public List<Task> findAll();
    public List<Task> findByCriteria(String key, String sortBy, String status);


    public List<Task> findAllBySearchKey(String key);

    public List<Task> findAllByDateDesc();
    public List<Task> findAllByDateAsc();

    public Task findById(Long taskId);
    public Task findByName(String name);

    public Task save(Task task);
    public void deleteById(Long taskId);
    public Task update(Task task);

    public List<Task> saveListOfTasks(List<Task> tasksList);
}
