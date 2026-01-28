package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.SubTask;

import java.util.List;

public interface SubTaskRepository {
    public List<SubTask> findAll();
    public List<SubTask> findAllByTaskId(Long taskId);

    public SubTask findById(Long subTaskId);

    public SubTask save(SubTask subTask);
    public void deleteById(Long subTaskId);
    public SubTask update(SubTask subTask);

}
