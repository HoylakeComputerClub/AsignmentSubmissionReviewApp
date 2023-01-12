package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    public Set<Assignment> findByUser (User user) {
        return assignmentRepository.findByUser(user);
    }

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setUser(user);
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        return assignmentRepository.save(assignment);
    }

    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public ResponseEntity<?> delete(Long id) {
        Assignment assignmentToDelete = assignmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Assignment does not exist with id " + id));
        assignmentRepository.delete(assignmentToDelete);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        System.out.println(response.get("deleted"));
        return ResponseEntity.ok(response);
    }
}
