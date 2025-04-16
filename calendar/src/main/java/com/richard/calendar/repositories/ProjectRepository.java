package com.richard.calendar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.richard.calendar.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
