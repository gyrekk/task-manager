package com.gyrekk.taskmanager.service;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.SubTaskRepository;
import com.gyrekk.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final SubTaskService subTaskService;

    public TaskService(TaskRepository taskRepository, SubTaskService subTaskService) {
        this.taskRepository = taskRepository;
        this.subTaskService = subTaskService;
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        List<SubTask> allSubTasks = subTaskService.getAllSubTasks();

        for (Task task : tasks) {
            List<SubTask> taskSubTasks = allSubTasks.stream()
                    .filter(st -> st.getTask() != null && st.getTask().getId().equals(task.getId()))
                    .toList();
            task.setSubTasks(taskSubTasks);
        }

        return tasks;
    }

    public Task getTaskById(Long id) {
        Task task = taskRepository.findById(id);

        if(task != null) {
            task.setSubTasks(subTaskService.getSubTasksByTaskId(task.getId()));
        }

        return task;
    }

    @Transactional
    public Task createTask(Task task) {

        Task savedTask = taskRepository.save(task);

        subTaskService.createSubTasks(task.getSubTasks(), savedTask); // Mówimy serwisowi od dzieci: "Zapisz te podzadania dla tego rodzica"

        savedTask.setSubTasks(task.getSubTasks()); // Aktualizujemy listę w zwracanym obiekcie, żeby frontend widział dodane subtaski

        return savedTask;
    }

    @Transactional
    public void deleteTask(Long id) {

        subTaskService.deleteSubTasksByTaskId(id);
        taskRepository.deleteById(id);
    }

    @Transactional
    public Task updateTask(Long id, Task task) {
        task.setId(id);
        return taskRepository.update(task);
    }

}
