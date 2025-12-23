package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.SubTask;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemorySubTaskRepository implements SubTaskRepository {

    private final List<SubTask> database = new ArrayList<>();
    private Long CurrentId = 1L;

    @Override
    public List<SubTask> findAll() {
        return database;
    }

    @Override
    public SubTask save(SubTask subTask) {
        if(subTask.getId()==null){
            subTask.setId(CurrentId++);
        }

        database.removeIf(st -> st.getId().equals(subTask.getId()));
        database.add(subTask);
        return subTask;
    }

    @Override
    public List<SubTask> findByTaskId(Long subTaskId) {
        return database.stream()
                // FILTR: Przepuść tylko te subtaski, które mają rodzica ORAZ ID rodzica zgadza się z szukanym
                .filter(subTask -> subTask.getTask() != null && subTask.getTask().getId().equals(subTaskId))
                .toList();
    }

    @Override
    public void deleteById(Long subTaskId) {
        database.removeIf(t -> t.getId().equals(subTaskId));
    }

}

