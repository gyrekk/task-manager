package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.SubTask;

import java.util.List;

public interface SubTaskRepository {
    public List<SubTask> findAll();
    public SubTask save(SubTask subTask);
    List<SubTask> findByTaskId(Long subTaskId);
    public void deleteById(Long subTaskId);
}
