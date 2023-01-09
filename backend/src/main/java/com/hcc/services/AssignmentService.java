package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.sql.Time;
import java.util.Date;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    public Set<Assignment> findByUser (User user) {
        return assignmentRepository.findByUser(user);
    }

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        byte[] array = new byte[7]; // length is bounded by 7
        new Random().nextBytes(array);
        String generatedString = new String(array, Charset.forName("UTF-8"));

        assignment.setName("Assignment " + generatedString);
        assignment.setStatus("unsubmitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }

    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
