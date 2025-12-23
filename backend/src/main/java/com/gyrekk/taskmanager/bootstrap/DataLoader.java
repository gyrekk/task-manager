package com.gyrekk.taskmanager.bootstrap;


import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.model.TaskPriority;
import com.gyrekk.taskmanager.model.TaskStatus;
import com.gyrekk.taskmanager.repository.TaskRepository;
import com.gyrekk.taskmanager.service.TaskService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final TaskService taskService;


    public DataLoader(TaskService taskService) {
        this.taskService = taskService;
    }
    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- Ładowanie przykładowych danych... ---");

        // --- TASK 1 ---
        Task task1 = new Task();
        task1.setTitle("Zadanie domowe");
        task1.setDescription("Matematyka i Polski");
        task1.setStatus(TaskStatus.NOT_STARTED);
        task1.setPriority(TaskPriority.LOW);
        task1.setDate(LocalDate.now());
        task1.setCompleted(false);

        // Tworzenie listy subtasków dla Task 1
        List<SubTask> subTasks1 = new ArrayList<>();

        SubTask sub1 = new SubTask();
        sub1.setTitle("Ćwiczenia str. 50");
        sub1.setCompleted(false);
        // Nie musimy tu robić setTask(task1), bo TaskService zrobi to za nas w pętli!
        subTasks1.add(sub1);

        SubTask sub2 = new SubTask();
        sub2.setTitle("Rozprawka"); // Poprawiono zmienną z sub1 na sub2
        sub2.setCompleted(false);
        subTasks1.add(sub2);

        // WAŻNE: Przypisujemy listę do taska PRZED wysłaniem do serwisu
        task1.setSubTasks(subTasks1);

        // Zapisujemy przez SERWIS (to uruchomi logikę zapisywania subtasków)
        Task savedTask1 = taskService.createTask(task1);


        // --- TASK 2 ---
        Task task2 = new Task();
        task2.setTitle("Zakupy");
        task2.setDescription("Biedronka");
        task2.setStatus(TaskStatus.NOT_STARTED);
        task2.setPriority(TaskPriority.HIGH);
        task2.setDate(LocalDate.now());
        task2.setCompleted(false);

        List<SubTask> subTasks2 = new ArrayList<>();

        SubTask sub3 = new SubTask();
        sub3.setTitle("Mleko"); // Poprawiono zmienną na sub3
        sub3.setCompleted(false);
        subTasks2.add(sub3);

        SubTask sub4 = new SubTask();
        sub4.setTitle("Chleb"); // Poprawiono zmienną na sub4
        sub4.setCompleted(false);
        subTasks2.add(sub4);

        task2.setSubTasks(subTasks2);

        Task savedTask2 = taskService.createTask(task2);

        // Sprawdzamy wynik
        System.out.println("Task 1: " + savedTask1.getTitle());
        savedTask1.getSubTasks().forEach(s -> System.out.println(" - " + s.getTitle()));

        System.out.println("Task 2: " + savedTask2.getTitle());
        savedTask2.getSubTasks().forEach(s -> System.out.println(" - " + s.getTitle()));
    }
}
