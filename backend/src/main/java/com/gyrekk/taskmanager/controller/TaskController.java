package com.gyrekk.taskmanager.controller;

import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Mówi Springowi: "To klasa obsługująca zapytania REST API".
@RequestMapping("/api/tasks") // Wszystkie metody tutaj zaczynają się od adresu "localhost:8080/api/tasks"
@CrossOrigin(origins = "*")// Pozwala przeglądarce (JavaScript) pytać z innego portu
public class TaskController {

    public final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Obsługa GET /api/tasks
    @GetMapping
    public List<Task> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return tasks; // Kelner woła Kierownika: "Daj listę"
    }

    // Obsługa POST /api/tasks (Tworzenie nowego)
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        System.out.println(task.getTitle() + " | " +  task.getDescription() + " | " + task.getPriority() + " | " + task.getStatus() + " | " + task.isCompleted() + " | " + task.getDate());
        return taskService.createTask(task); // Kelner woła Kierownika: "Zrób to"
    }

    // Obsługa DELETE /api/tasks/{id} (np. /api/tasks/5)
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        System.out.println("Usunieto zadanie o id: " + id);
        taskService.deleteTask(id);
    }

    // Obsługa PUT /api/tasks/{id} (Aktualizacja)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        System.out.println("Zmieniono zadanie na: " + updatedTask.getTitle() + " | " + updatedTask.isCompleted() + " | " + updatedTask.getStatus()+ " | " + updatedTask.getPriority());
        return updatedTask;
    }
}
