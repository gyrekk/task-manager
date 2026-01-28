package com.gyrekk.taskmanagerbackend.controller;

import com.gyrekk.taskmanager.model.SubTask;
import com.gyrekk.taskmanager.service.SubTaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subtasks")
@CrossOrigin(origins = "*")// Pozwala przeglądarce (JavaScript) pytać z innego portu

public class SubTaskController {

    private final SubTaskService subTaskService;

    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @PostMapping("/task/{taskId}")
    public SubTask createSubTask(@RequestBody SubTask subTask, @PathVariable Long taskId){
        SubTask newSubTask = subTaskService.createSubTask(subTask, taskId);
        System.out.println("Utworzono subtask: " +  newSubTask.getName() + " do taska: " + newSubTask.getTask().getName());
        return newSubTask;
    }

    @DeleteMapping("/{subTaskId}")
    public void deleteSubTask(@PathVariable Long subTaskId){
        System.out.println("Usunięto subtask: " +  subTaskService.getSubTaskById(subTaskId) + " z taska: " + subTaskService.getSubTaskById(subTaskId).getTask().getName());
        subTaskService.deleteSubTaskById(subTaskId);
    }

    @PutMapping("/{subTaskId}")
    public SubTask updateSubTask(@PathVariable Long subTaskId, @RequestBody SubTask subTask){
        SubTask updatedSubTask = subTaskService.updateSubTask(subTaskId, subTask);
        System.out.println("Zaaktualizowano subtask: " +  subTaskService.getSubTaskById(subTaskId).getName() + " z taska: " + subTaskService.getSubTaskById(subTaskId).getTask().getName());

        return updatedSubTask;
    }
}
