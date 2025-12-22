package com.gyrekk.taskmanager.service;

import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, Task task) {
        task.setId(id);
        return taskRepository.update(task);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id);
    }
}
