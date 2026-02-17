package org.example.utcctp.service;

import org.example.utcctp.model.InternshipPosition;
import org.example.utcctp.model.Trip;
import org.example.utcctp.model.User;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EligibilityService {

    public boolean isEligibleForTrip(Trip trip, User student) {
        if (student == null || student.getFaculty() == null) {
            return false;
        }

        String allowedFaculties = trip.getAllowedFaculties();
        String allowedMajors = trip.getAllowedMajors();

        if (allowedFaculties == null || allowedFaculties.trim().isEmpty()) {
            return true;
        }

        List<String> facultyList = Arrays.asList(allowedFaculties.split(","));
        boolean facultyMatch = facultyList.stream()
                .map(String::trim)
                .anyMatch(f -> f.equalsIgnoreCase(student.getFaculty()));

        if (!facultyMatch) {
            return false;
        }

        if (allowedMajors != null && !allowedMajors.trim().isEmpty() && student.getMajor() != null) {
            List<String> majorList = Arrays.asList(allowedMajors.split(","));
            return majorList.stream()
                    .map(String::trim)
                    .anyMatch(m -> m.equalsIgnoreCase(student.getMajor()));
        }

        return true;
    }

    public boolean isEligibleForInternship(InternshipPosition position, User student) {
        if (student == null || student.getFaculty() == null) {
            return false;
        }

        String allowedFaculties = position.getAllowedFaculties();
        String allowedMajors = position.getAllowedMajors();

        if (allowedFaculties == null || allowedFaculties.trim().isEmpty()) {
            return true;
        }

        List<String> facultyList = Arrays.asList(allowedFaculties.split(","));
        boolean facultyMatch = facultyList.stream()
                .map(String::trim)
                .anyMatch(f -> f.equalsIgnoreCase(student.getFaculty()));

        if (!facultyMatch) {
            return false;
        }

        if (allowedMajors != null && !allowedMajors.trim().isEmpty() && student.getMajor() != null) {
            List<String> majorList = Arrays.asList(allowedMajors.split(","));
            return majorList.stream()
                    .map(String::trim)
                    .anyMatch(m -> m.equalsIgnoreCase(student.getMajor()));
        }

        return true;
    }

    public String getEligibilityMessage(String allowedFaculties, String allowedMajors, String allowedYears) {
        StringBuilder message = new StringBuilder();
        
        if (allowedFaculties == null || allowedFaculties.trim().isEmpty()) {
            message.append("📚 เปิดรับทุกคณะ");
        } else {
            message.append("📚 รับเฉพาะคณะ: ").append(allowedFaculties);
        }

        if (allowedMajors != null && !allowedMajors.trim().isEmpty()) {
            message.append("\n🎓 สาขา: ").append(allowedMajors);
        }

        if (allowedYears != null && !allowedYears.trim().isEmpty()) {
            message.append("\n👨‍🎓 ชั้นปี: ").append(allowedYears);
        } else {
            message.append("\n👨‍🎓 รับทุกชั้นปี");
        }

        return message.toString();
    }

    public String getEligibilityMessageShort(String allowedFaculties, String allowedMajors, String allowedYears) {
        if ((allowedFaculties == null || allowedFaculties.trim().isEmpty()) &&
            (allowedMajors == null || allowedMajors.trim().isEmpty()) &&
            (allowedYears == null || allowedYears.trim().isEmpty())) {
            return "เปิดรับทุกคณะ ทุกสาขา ทุกชั้นปี";
        }

        StringBuilder message = new StringBuilder();
        
        if (allowedFaculties != null && !allowedFaculties.trim().isEmpty()) {
            message.append("คณะ: ").append(allowedFaculties);
        } else {
            message.append("ทุกคณะ");
        }

        if (allowedYears != null && !allowedYears.trim().isEmpty()) {
            message.append(" | ชั้นปี: ").append(allowedYears);
        }

        return message.toString();
    }
}
