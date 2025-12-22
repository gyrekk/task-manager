package com.gyrekk.taskmanager.controller;

import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") // Odblokowuje dostęp dla Frontendu
public class TaskController {

    public final TaskService taskService; // Teraz gadamy z Serwisem!

    // Wstrzykujemy Serwis przez konstruktor
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks(); // Kelner woła Kierownika: "Daj listę"
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        System.out.println(task.getTitle() + " | " +  task.getDescription() + " | " + task.getPriority() + " | " + task.getStatus() + " | " + task.isCompleted() + " | " + task.getDate());
        return taskService.createTask(task); // Kelner woła Kierownika: "Zrób to"
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        System.out.println("Usunieto zadanie o id: " + id);
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        System.out.println("Zmieniono zadanie na: " + updatedTask.getTitle() + " | " + updatedTask.isCompleted() + " | " + updatedTask.getStatus()+ " | " + updatedTask.getPriority());
        return updatedTask;
    }
}
