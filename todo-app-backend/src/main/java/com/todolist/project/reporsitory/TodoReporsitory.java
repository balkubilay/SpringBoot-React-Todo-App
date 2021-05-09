package com.todolist.project.reporsitory;

import com.todolist.project.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoReporsitory extends JpaRepository<Todo,Long> {

}

