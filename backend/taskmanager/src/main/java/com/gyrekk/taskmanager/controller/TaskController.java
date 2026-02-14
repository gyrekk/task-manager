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

//    @GetMapping
//    public List<Task> getAllTasks() {
//        return taskService.getAllTasks();
//    }
    @GetMapping
    public List<Task> getAllTasks(@RequestParam(value = "key", required = false) String key,
                                  @RequestParam(value = "sortBy", required = false) String sortBy,
                                  @RequestParam(value = "status", required = false) String status) {
        return taskService.getAllTasks(key, sortBy, status);
    }

    @GetMapping("/search")
    public List<Task> getAllTasksBySearchKey(@RequestParam("key") String key) {
        List<Task> allTasks = taskService.getAllBySearchKey(key);
        return allTasks;
    }

    @GetMapping("/date-desc")
    public List<Task> getAllTasksByDateDesc() {
        return taskService.getAllTasksSortedByDateDesc();
    }

    @GetMapping("/date")
    public List<Task> getAllTasksByDate() {
        return taskService.getAllTasksSortedByDateAsc();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        Task newTask = taskService.createTask(task);
        System.out.println("Dodano zadanie: " +  newTask.getName());
        return newTask;
    }

    @PostMapping("/bulk")
    public List<Task> createTasks(@RequestBody List<Task> tasks) {
        return taskService.createTasks(tasks);
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
