package com.gyrekk.taskmanager.repository;

import com.gyrekk.taskmanager.model.Task;
import com.gyrekk.taskmanager.service.TaskStatus;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
public class InMemoryTaskRepository implements TaskRepository {

    private final List<Task> tasks = new ArrayList<>();
    private Long currentId = 1L;

    // Zwraca wszystkie taski
    @Override
    public List <Task> findAll() {
        return tasks;
    }

    @Override
    public List <Task> findByCriteria(String key, String sortBy, String status) {
        Stream<Task> stream = tasks.stream();

        if(key!=null && !key.isEmpty()){
            String searchKey = key.toLowerCase();
            stream = stream.filter(t -> t.getName().toLowerCase().contains(searchKey));
        }

        if(sortBy!=null && !sortBy.isEmpty()){
            switch(sortBy){
                case "date-asc":
                    stream = stream.sorted(Comparator.comparing(Task::getDate));
                    break;
                case "date-desc":
                    stream = stream.sorted(Comparator.comparing(Task::getDate).reversed());
                    break;
            }
        }

        if(status!=null && !status.isEmpty()){
            switch(status){
                case "ALL":
                    break;
                case "NOT_STARTED":
                    stream = stream.filter(t -> t.getStatus().equals(TaskStatus.NOT_STARTED));
                    break;
                case "IN_PROGRESS":
                    stream = stream.filter(t -> t.getStatus().equals(TaskStatus.IN_PROGRESS));
                    break;
                case "COMPLETED":
                    stream = stream.filter(t -> t.getStatus().equals(TaskStatus.COMPLETED));
                    break;
            }
        }
        return stream.collect(Collectors.toList());
    }


    @Override
    public List<Task> findAllBySearchKey(String key) {
        return tasks.stream().filter(t -> t.getName().contains(key)).collect(Collectors.toList());
    }

    @Override
    public List<Task> findAllByDateDesc() {
        return tasks.stream().sorted(Comparator.comparing(Task::getDate).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<Task> findAllByDateAsc() {
        return tasks.stream().sorted(Comparator.comparing(Task::getDate))
                .collect(Collectors.toList());
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
        tasks.add(0, task);

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

    @Override
    public List<Task> saveListOfTasks(List<Task> tasksList) {
        List<Task> savedTasks = new ArrayList<>();

        for(Task task : tasks) {
            Task saved =  save(task);
            savedTasks.add(saved);
        }
        return savedTasks;
    }
}
