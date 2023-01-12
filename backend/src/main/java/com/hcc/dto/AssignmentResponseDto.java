package com.hcc.dto;

import com.hcc.entities.Assignment;
import com.hcc.enums.AssignmentEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {
    private Assignment assignment;
    private List<AssignmentEnumDto> assignmentEnums = new ArrayList<>();

    public AssignmentResponseDto(Assignment assignment) {
        this.assignment = assignment;
        Arrays.stream(AssignmentEnum.values())
                .forEach(assignmentEnum -> {
                    AssignmentEnumDto assignmentEnumDto = new AssignmentEnumDto(assignmentEnum.getAssignmentName(), assignmentEnum.getAssignmentNumber());
                    assignmentEnums.add(assignmentEnumDto);
                });
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public List<AssignmentEnumDto> getAssignmentEnums() {
        return assignmentEnums;
    }
}
