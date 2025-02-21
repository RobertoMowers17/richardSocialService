package com.richard.calendar.repositories;

import com.richard.calendar.models.Event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE strftime('%Y-%m-%d', e.date) BETWEEN :startDate AND :endDate")
    List<Event> findEventsByMonth(@Param("startDate") String startDate, @Param("endDate") String endDate);

}
