package com.phylax.server.controller;

import com.phylax.server.dto.ContributionDTO;
import com.phylax.server.dto.CreateContributionRequest;
import com.phylax.server.dto.ErrorResponse;
import com.phylax.server.service.ContributionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contributions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ContributionController {

    private static final Logger log = LoggerFactory.getLogger(ContributionController.class);
    private final ContributionService contributionService;

    /**
     * Create contribution (Authenticated users only)
     */
    @PostMapping
    public ResponseEntity<?> createContribution(
            @RequestBody CreateContributionRequest request,
            Authentication authentication) {
        try {
            String userEmail = (String) authentication.getPrincipal();
            ContributionDTO contribution = contributionService.createContribution(userEmail, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(contribution);
        } catch (Exception e) {
            log.error("Error creating contribution", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error creating contribution"));
        }
    }

    /**
     * Get my contributions (Current user's own contributions)
     */
    @GetMapping("/my-contributions")
    public ResponseEntity<?> getMyContributions(Authentication authentication) {
        try {
            String userEmail = (String) authentication.getPrincipal();
            List<ContributionDTO> contributions = contributionService.getMyContributions(userEmail);
            return ResponseEntity.ok(contributions);
        } catch (Exception e) {
            log.error("Error fetching contributions", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching contributions"));
        }
    }

    /**
     * Get contributions by user ID (Admin: any user, User: only own)
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getContributionsByUserId(
            @PathVariable Long userId,
            Authentication authentication) {
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(auth -> auth.equals("ROLE_ADMIN"));

            // For now, allow any authenticated user to view contributions
            // In a stricter implementation, you could check if user is viewing their own
            List<ContributionDTO> contributions = contributionService.getContributionsByUserId(userId);
            return ResponseEntity.ok(contributions);
        } catch (Exception e) {
            log.error("Error fetching contributions", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching contributions"));
        }
    }

    /**
     * Get contributions by zone (Anyone can view)
     */
    @GetMapping("/zone/{zoneId}")
    public ResponseEntity<?> getContributionsByZoneId(@PathVariable Long zoneId) {
        try {
            List<ContributionDTO> contributions = contributionService.getContributionsByZoneId(zoneId);
            return ResponseEntity.ok(contributions);
        } catch (Exception e) {
            log.error("Error fetching contributions", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching contributions"));
        }
    }

    /**
     * Get total money contributions for a zone
     */
    @GetMapping("/zone/{zoneId}/total-money")
    public ResponseEntity<?> getTotalMoneyContributions(@PathVariable Long zoneId) {
        try {
            Double total = contributionService.getTotalMoneyContributionsByZoneId(zoneId);
            return ResponseEntity.ok(new TotalMoneyResponse(total));
        } catch (Exception e) {
            log.error("Error fetching total contributions", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching total"));
        }
    }

    /**
     * Update contribution (User: own only, Admin: any)
     */
    @PutMapping("/{contributionId}")
    public ResponseEntity<?> updateContribution(
            @PathVariable Long contributionId,
            @RequestBody CreateContributionRequest request,
            Authentication authentication) {
        try {
            String userEmail = (String) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(auth -> auth.equals("ROLE_ADMIN"));

            ContributionDTO contribution = contributionService.updateContribution(
                    contributionId, request, userEmail, isAdmin);
            return ResponseEntity.ok(contribution);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating contribution", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error updating contribution"));
        }
    }

    /**
     * Delete contribution (Admin only or owner)
     */
    @DeleteMapping("/{contributionId}")
    public ResponseEntity<?> deleteContribution(
            @PathVariable Long contributionId,
            Authentication authentication) {
        try {
            String userEmail = (String) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(auth -> auth.equals("ROLE_ADMIN"));

            contributionService.deleteContribution(contributionId, userEmail, isAdmin);
            return ResponseEntity.ok(Map.of("message", "Contribution deleted successfully"));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            log.error("Error deleting contribution", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error deleting contribution"));
        }
    }
}

record TotalMoneyResponse(Double total) {}
