package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        assignment.setStatus("unsubmitted");
        assignment.setUser(user);

        return assignmentRepository.save(assignment);
    }
}
