package com.gyrekk.taskmanager;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.TaskRepository;
import com.gyrekk.taskmanager.service.SubTaskService;
import com.gyrekk.taskmanager.service.TaskService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class TaskManagerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagerBackendApplication.class, args);
    }

    /*
    @Bean
    public CommandLineRunner init(TaskService taskService, SubTaskService subTaskService) {
        return args -> {
            System.out.println("--- Test ---");

            // Task 1
            Task task1 = new Task();
            task1.setName("Task1");
            taskService.createTask(task1);

            SubTask subTask1 = new SubTask();
            subTask1.setName("SubTask1");
            subTask1.setCompleted(false);
            subTaskService.createSubTask(subTask1, task1.getId());

            SubTask subTask2 = new SubTask();
            subTask2.setName("SubTask2");
            subTask2.setCompleted(false);
            subTaskService.createSubTask(subTask2, task1.getId());

            // Task 2
            Task task2 = new Task();
            task2.setName("Task2");
            taskService.createTask(task2);

            // Task 3
            Task task3 = new Task();
            task3.setName("Task3");
            taskService.createTask(task3);

            SubTask subTask3 = new SubTask();
            subTask3.setName("SubTask3");
            subTask3.setCompleted(false);
            subTaskService.createSubTask(subTask3, task3.getId());

            SubTask subTask4 = new SubTask();
            subTask4.setName("SubTask4");
            subTask4.setCompleted(false);
            subTaskService.createSubTask(subTask4, task3.getId());

            List<Task> allTasks = taskService.getAllTasks();

            for (Task t : allTasks) {
                System.out.println("Zadanie: " + t.getId() + " " + t.getName());
                if (!t.getSubtasks().isEmpty()) {
                    for (SubTask st : t.getSubtasks()) {
                        System.out.println("   - Podzadanie: " + st.getId() + " " + st.getName() + " [Zrobione: " + st.getCompleted() + "]");
                    }
                } else {
                    System.out.println("   [BŁĄD! Lista podzadań jest pusta/null!]");
                }
            }

            System.out.println("\n--- Update ---\n");

            Task task5 = new Task();
            task5.setName("!!!Update1");

            taskService.updateTask(2L, task5);

            SubTask subTask5 = new SubTask();
            subTask5.setName("!!!Update2");
            subTask5.setCompleted(true);

            subTaskService.updateSubTask(1L, subTask5);

            SubTask subTask6 = new SubTask();
            subTask6.setName("!!!Update3");
            subTask6.setCompleted(true);
            subTaskService.updateSubTask(4L, subTask6);

            for (Task t : allTasks) {
                System.out.println("Zadanie: " + t.getId() + " " + t.getName());
                if (!t.getSubtasks().isEmpty()) {
                    for (SubTask st : t.getSubtasks()) {
                        System.out.println("   - Podzadanie: " + st.getId() + " " + st.getName() + " [Zrobione: " + st.getCompleted() + "]");
                    }
                } else {
                    System.out.println("   [BŁĄD! Lista podzadań jest pusta/null!]");
                }
            }
        };
    } */
}
