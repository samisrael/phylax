package com.phylax.server.service;

import com.phylax.server.dto.ContributionDTO;
import com.phylax.server.dto.CreateContributionRequest;
import com.phylax.server.model.Contribution;
import com.phylax.server.model.ContributionType;
import com.phylax.server.model.User;
import com.phylax.server.model.Zone;
import com.phylax.server.repository.ContributionRepository;
import com.phylax.server.repository.UserRepository;
import com.phylax.server.repository.ZoneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ContributionService {

    private final ContributionRepository contributionRepository;
    private final UserRepository userRepository;
    private final ZoneRepository zoneRepository;
    private final ZoneService zoneService;

    public ContributionDTO createContribution(String userEmail, CreateContributionRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Zone zone = zoneRepository.findById(request.getZoneId())
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        Contribution contribution = Contribution.builder()
                .type(ContributionType.valueOf(request.getType()))
                .amount(request.getAmount())
                .description(request.getDescription())
                .user(user)
                .zone(zone)
                .build();

        contribution = contributionRepository.save(contribution);

        // Update zone participation count
        zoneService.addContribution(zone.getId());

        return convertToDTO(contribution);
    }

    public List<ContributionDTO> getContributionsByUserId(Long userId) {
        List<Contribution> contributions = contributionRepository.findByUserId(userId);
        return contributions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ContributionDTO> getContributionsByZoneId(Long zoneId) {
        List<Contribution> contributions = contributionRepository.findByZoneId(zoneId);
        return contributions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Double getTotalMoneyContributionsByZoneId(Long zoneId) {
        List<Contribution> contributions = contributionRepository.findByZoneId(zoneId);
        return contributions.stream()
                .filter(c -> c.getType() == ContributionType.MONEY)
                .mapToDouble(Contribution::getAmount)
                .sum();
    }

    /**
     * Update contribution (User can update own, Admin can update any)
     */
    public ContributionDTO updateContribution(Long contributionId, CreateContributionRequest request, String userEmail, boolean isAdmin) {
        Contribution contribution = contributionRepository.findById(contributionId)
                .orElseThrow(() -> new RuntimeException("Contribution not found"));

        // Check authorization - user can only update own contributions
        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (!contribution.getUser().getId().equals(user.getId())) {
                throw new SecurityException("You can only update your own contributions");
            }
        }

        contribution.setType(ContributionType.valueOf(request.getType()));
        contribution.setAmount(request.getAmount());
        contribution.setDescription(request.getDescription());

        contribution = contributionRepository.save(contribution);
        return convertToDTO(contribution);
    }

    /**
     * Delete contribution (User can delete own, Admin can delete any)
     */
    public void deleteContribution(Long contributionId, String userEmail, boolean isAdmin) {
        Contribution contribution = contributionRepository.findById(contributionId)
                .orElseThrow(() -> new RuntimeException("Contribution not found"));

        // Check authorization - user can only delete own contributions
        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (!contribution.getUser().getId().equals(user.getId())) {
                throw new SecurityException("You can only delete your own contributions");
            }
        }

        Long zoneId = contribution.getZone().getId();
        contributionRepository.delete(contribution);
        
        // Update zone participation count
        zoneService.removeContribution(zoneId);
    }

    /**
     * Get contributions for current user
     */
    public List<ContributionDTO> getMyContributions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Contribution> contributions = contributionRepository.findByUserId(user.getId());
        return contributions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ContributionDTO convertToDTO(Contribution contribution) {
        return ContributionDTO.builder()
                .id(contribution.getId())
                .type(contribution.getType().toString())
                .amount(contribution.getAmount())
                .description(contribution.getDescription())
                .userId(contribution.getUser().getId())
                .zoneId(contribution.getZone().getId())
                .createdAt(contribution.getCreatedAt())
                .build();
    }
}
