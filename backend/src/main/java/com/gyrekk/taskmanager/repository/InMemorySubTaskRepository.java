package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.SubTask;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemorySubTaskRepository implements SubTaskRepository {

    private final List<SubTask> subTasks = new ArrayList<>();
    private Long currentId = 1L;

    // Zwraca wszystkie podzadania niezaleznie od przypisania
    @Override
    public List<SubTask> findAll() {
        return subTasks;
    }
    // zwraca wszystkie podzadania przypisane do danego taska
    @Override
    public List<SubTask> findAllByTaskId(Long taskId) {
        return subTasks.stream()
                .filter(st -> st.getTask() != null && st.getTask().getId().equals(taskId))
                .toList();
    }

    // Zwraca podzadanie po id
    @Override
    public SubTask findById(Long subTaskId) {
        return subTasks.stream()
                .filter(st -> st.getId().equals(subTaskId))
                .findFirst().orElse(null);
    }
    // Zapisuje nowe podzadanie
    @Override
    public SubTask save(SubTask subTask) {
        if (subTask.getId() == null) {
            subTask.setId(currentId);
            currentId++;
        }

        subTasks.removeIf(st -> st.getId().equals(subTask.getId()));
        subTasks.add(subTask);

        return subTask;
    }

    // Usuwa podzadanie o danym id
    @Override
    public void deleteById(Long subTaskId) {
        subTasks.removeIf(st -> st.getId().equals(subTaskId));
    }

    // Aktualizuje podzadanie
    @Override
    public SubTask update(SubTask subTask) {
        for(int i = 0; i < subTasks.size(); i++) {
            if(subTasks.get(i).getId().equals(subTask.getId())) {
                subTasks.set(i, subTask);
                return subTask;
            }
        }
        return null;
    }

}
