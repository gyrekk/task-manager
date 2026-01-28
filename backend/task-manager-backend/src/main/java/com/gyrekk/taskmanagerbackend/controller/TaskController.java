package com.gyrekk.taskmanager.controller;

import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")// Pozwala przeglądarce (JavaScript) pytać z innego portu

public class TaskController {

    public final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        List<Task> allTasks = taskService.getAllTasks();
        return allTasks;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        Task newTask = taskService.createTask(task);
        System.out.println("Dodano zadanie: " +  newTask.getName());
        return newTask;
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        System.out.println("Usunięto zadanie: " + getTaskById(id).getName());
        taskService.deleteTaskById(id);

    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        System.out.println("Zaaktualizowano zadanie " + getTaskById(id).getName());
        return updatedTask;
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }
}
