package com.gyrekk.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

//@Entity
//@Table(name = "subTasks")
public class SubTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean completed;

    @ManyToOne // RELACJA: Wiele SubTasków należy do Jednego Taska.
//    @JoinColumn(name = "task_id")// W bazie danych powstanie kolumna "task_id" trzymająca ID rodzica.
    @JsonBackReference // JSON nie wyświetla znowu całego Taska, ucina pętlę nieskończoności.
    private Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
