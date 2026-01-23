package com.gyrekk.taskmanager.service;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final SubTaskService subTaskService;

    public TaskService(TaskRepository taskRepository, SubTaskService subTaskService) {
        this.taskRepository = taskRepository;
        this.subTaskService = subTaskService;
    }

    public List<Task> getAllTasks() {
        List<Task> allTasks = taskRepository.findAll();
        List<SubTask> allSubTasks = subTaskService.getAllSubTasks();
        for(Task task : allTasks) {
            List<SubTask> taskChildren = allSubTasks.stream()
                    .filter(st -> st.getTask() != null && st.getTask().getId().equals(task.getId()))
                    .toList();
            task.setSubtasks(taskChildren);
        }
        return allTasks;
    }

    public Task getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId);
        if(task != null) {
            List<SubTask> taskSubTasks = subTaskService.getAllSubTasksByTaskId(taskId);
            task.setSubtasks(taskSubTasks);
        }
        return task;
    }

    public Task createTask(Task task) {
        Task savedTask = taskRepository.save(task);

        if (savedTask.getSubtasks() != null && !task.getSubtasks().isEmpty()) {
            for (SubTask subTask : savedTask.getSubtasks()) {
                subTaskService.createSubTask(subTask, savedTask.getId());
            }
            savedTask.setSubtasks(subTaskService.getAllSubTasksByTaskId(savedTask.getId()));
        }
        return savedTask;
    }

    public void deleteTaskById(Long taskId) {

        if(taskRepository.findById(taskId) == null) {
            return;
        }

        List<SubTask> selectedTaskSubTasks = subTaskService.getAllSubTasksByTaskId(taskId);

        for(SubTask subTask : selectedTaskSubTasks) {
            subTaskService.deleteSubTaskById(subTask.getId());
        }

        taskRepository.deleteById(taskId);
    }

    public Task updateTask(Long taskId, Task updatedTask) {
        Task existingTask = taskRepository.findById(taskId);

        if(existingTask != null) {
            existingTask.setName(updatedTask.getName());
            if (updatedTask.getStatus() != null) {
                existingTask.setStatus(updatedTask.getStatus());
            }
            if (updatedTask.getPriority() != null) {
                existingTask.setPriority(updatedTask.getPriority());
            }
            return taskRepository.update(existingTask);
        }

        return null;
    }
}
