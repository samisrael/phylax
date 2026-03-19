package com.phylax.server.service;

import com.phylax.server.dto.UserDTO;
import com.phylax.server.model.User;
import com.phylax.server.model.UserRole;
import com.phylax.server.repository.UserRepository;
import com.phylax.server.repository.ContributionRepository;
import com.phylax.server.repository.ZoneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final ContributionRepository contributionRepository;
    private final ZoneRepository zoneRepository;

    /**
     * Get user by email
     */
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    /**
     * Get user by ID
     */
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    /**
     * Get all users (Admin only)
     */
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    /**
     * Update user role (Admin only)
     */
    public UserDTO updateUserRole(Long userId, String newRole) {
        // Validate role
        try {
            UserRole.valueOf(newRole);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + newRole + ". Must be one of: USER, ADMIN, RESPONDER");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(UserRole.valueOf(newRole));
        userRepository.save(user);

        return convertToDTO(user);
    }

    /**
     * Delete user (Admin only)
     */
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete the user - cascading delete handles contributions
        userRepository.delete(user);
        log.info("User with ID {} deleted successfully", userId);
    }

    /**
     * Update own profile
     */
    public UserDTO updateUserProfile(String email, String newName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(newName);
        userRepository.save(user);

        return convertToDTO(user);
    }

    /**
     * Get dashboard statistics (Admin only)
     */
    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total users
        long totalUsers = userRepository.count();
        stats.put("totalUsers", totalUsers);

        // Users by role
        Map<String, Long> usersByRole = new HashMap<>();
        for (UserRole role : UserRole.values()) {
            long count = userRepository.findAll().stream()
                    .filter(user -> user.getRole() == role)
                    .count();
            usersByRole.put(role.toString(), count);
        }
        stats.put("usersByRole", usersByRole);

        // Total zones
        long totalZones = zoneRepository.count();
        stats.put("totalZones", totalZones);

        // Total contributions
        long totalContributions = contributionRepository.count();
        stats.put("totalContributions", totalContributions);

        // Recent users (last 5)
        List<UserDTO> recentUsers = userRepository.findAll().stream()
                .sorted((u1, u2) -> u2.getCreatedAt().compareTo(u1.getCreatedAt()))
                .limit(5)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        stats.put("recentUsers", recentUsers);

        return stats;
    }

    /**
     * Check if user owns a contribution
     */
    public boolean userOwnsContribution(Long userId, Long contributionId) {
        return contributionRepository.findById(contributionId)
                .map(contribution -> contribution.getUser().getId().equals(userId))
                .orElse(false);
    }

    /**
     * Check if user owns a zone
     */
    public boolean userOwnsZone(Long userId, Long zoneId) {
        // Zones are not currently tied to users, only admins can modify them
        // This method returns false for regular users
        return false;
    }

    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
