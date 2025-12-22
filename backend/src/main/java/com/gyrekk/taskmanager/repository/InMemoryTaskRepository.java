package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

    private final List<Task> database = new ArrayList<>();
    private Long currentId = 1L;

    @Override
    public List<Task> findAll() {
        return database;
    }

    @Override
    public Task save(Task task) {
        if(task.getId()==null){
            task.setId(currentId);
            currentId++;
        }
        database.removeIf(t -> t.getId().equals(task.getId()));
        database.add(task);
        return task;
    }

    @Override
    public void deleteById(Long id) {
        database.removeIf(t -> t.getId().equals(id));
    }
    @Override
    public Task update(Task task) {
        for (int i = 0; i < database.size(); i++) {
            if(database.get(i).getId().equals(task.getId())){
                database.set(i, task);
                return task;
            }

        }
        return null;
    }

    @Override
    public Task findById(Long id) {
        for (int i = 0; i < database.size(); i++) {
            if(database.get(i).getId().equals(id)){
                return database.get(i);
            }
        }
        return null;
    }
}
