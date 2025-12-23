package com.gyrekk.taskmanager.service;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.repository.SubTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTaskService {
    private final SubTaskRepository subTaskRepository;

    public SubTaskService(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    public List<SubTask> getAllSubTasks() {
        return subTaskRepository.findAll();
    }

    public List<SubTask> getSubTasksByTaskId(Long taskId) {
        return subTaskRepository.findByTaskId(taskId);
    }

    public void createSubTasks(List<SubTask> subTasks, Task task) {
        if(subTasks != null) {
            for(SubTask subTask : subTasks) {
                subTask.setTask(task); // Ustawia rodzica w obiekcie dziecka!
                subTaskRepository.save(subTask); // Zapisuje dziecko w bazie
            }
        }
    }

    public void deleteSubTasksByTaskId(Long taskId) {
        List<SubTask> subTasks = subTaskRepository.findByTaskId(taskId);
        for(SubTask subTask : subTasks) {
            subTaskRepository.deleteById(subTask.getId());
        }
    }
}
