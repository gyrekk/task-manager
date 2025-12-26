package com.gyrekk.taskmanager.service;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.SubTaskRepository;
import com.gyrekk.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTaskService {

    private final SubTaskRepository subTaskRepository;
    private final TaskRepository taskRepository;

    public SubTaskService(SubTaskRepository subTaskRepository, TaskRepository taskRepository) {
        this.subTaskRepository = subTaskRepository;
        this.taskRepository = taskRepository;
    }

    public List<SubTask> getAllSubTasks() {
        return subTaskRepository.findAll();
    }

    public List<SubTask> getAllSubTasksByTaskId(Long taskId) {
        return subTaskRepository.findAllByTaskId(taskId);
    }

    public SubTask getSubTaskById(Long subTaskId) {
        return subTaskRepository.findById(subTaskId);
    }

    public SubTask createSubTask(SubTask subTask, Long taskId) {
        Task task = taskRepository.findById(taskId);

        if(task != null) {
            subTask.setTask(task);
            return subTaskRepository.save(subTask);
        }

        return null;
    }

    public void deleteSubTaskById(Long taskId) {
        subTaskRepository.deleteById(taskId);
    }

    public SubTask updateSubTask(Long subTaskId, SubTask updatedSubTask) {
        SubTask existingSubTask = subTaskRepository.findById(subTaskId);

        if(existingSubTask != null) {
            existingSubTask.setName(updatedSubTask.getName());
            existingSubTask.setCompleted(updatedSubTask.getCompleted());
            return subTaskRepository.update(existingSubTask);
        }
        return null;
    }


}
