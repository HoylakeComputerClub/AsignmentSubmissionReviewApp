package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.sql.Time;
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
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        assignment.setStatus("Nedds to be Submitted");
        assignment.setUser(user);

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
