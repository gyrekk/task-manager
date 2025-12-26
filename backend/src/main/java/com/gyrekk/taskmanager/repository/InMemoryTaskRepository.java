package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

    private final List<Task> tasks = new ArrayList<>();
    private Long currentId = 1L;

    // Zwraca wszystkie taski
    @Override
    public List <Task> findAll() {
        return tasks;
    }

    //Zwraca taska po id
    @Override
    public Task findById(Long taskId) {
        return tasks.stream()
                .filter(t -> t.getId().equals(taskId))
                .findFirst().orElse(null);
    }

    // Zwraca taska po nazwie
    @Override
    public Task findByName(String name) {
        return tasks.stream()
                .filter(t -> t.getName().equalsIgnoreCase(name))
                .findFirst().orElse(null);
    }

    // Zapisuje nowego taska
    @Override
    public Task save(Task task) {
        if (task.getId() == null) {
            task.setId(currentId);
            currentId++;
        }

        tasks.removeIf(t -> t.getId().equals(task.getId()));
        tasks.add(task);

        return task;
    }

    // Usuwa taska o danym id
    @Override
    public void deleteById(Long taskId) {
        tasks.removeIf(t -> t.getId().equals(taskId));
    }

    // Aktualizuje taska
    @Override
    public Task update(Task task) {
        // Bardziej wydajna wersja
        for(int i = 0; i < tasks.size(); i++) {
            if(tasks.get(i).getId().equals(task.getId())) {
                tasks.set(i, task);
                return task;
            }
        }
        return null;
    }
}
