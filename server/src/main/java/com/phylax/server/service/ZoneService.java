package com.phylax.server.service;

import com.phylax.server.dto.CreateZoneRequest;
import com.phylax.server.dto.ZoneDTO;
import com.phylax.server.model.Zone;
import com.phylax.server.model.ZoneStatus;
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
public class ZoneService {

    private final ZoneRepository zoneRepository;
    private static final Integer ACTIVATION_THRESHOLD = 5;

    public ZoneDTO createZone(CreateZoneRequest request) {
        Zone zone = Zone.builder()
                .name(request.getName())
                .location(request.getLocation())
                .description(request.getDescription())
                .populationEstimate(request.getPopulationEstimate())
                .status(ZoneStatus.INACTIVE)
                .riskScore(0.0)
                .participantCount(0)
                .build();

        zone = zoneRepository.save(zone);
        return convertToDTO(zone);
    }

    public ZoneDTO getZoneById(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));
        return convertToDTO(zone);
    }

    public List<ZoneDTO> getAllZones() {
        List<Zone> zones = zoneRepository.findAll();
        return zones.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ZoneDTO> getActiveZones() {
        List<Zone> zones = zoneRepository.findByStatus(ZoneStatus.ACTIVE);
        return zones.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ZoneDTO> getZonesByLocation(String location) {
        List<Zone> zones = zoneRepository.findByLocationContainingIgnoreCase(location);
        return zones.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ZoneDTO updateZoneRiskScore(Long zoneId, Double riskScore) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));
        zone.setRiskScore(riskScore);

        // Update status based on risk score
        if (riskScore >= 80) {
            zone.setStatus(ZoneStatus.EVACUATE);
        } else if (riskScore >= 60) {
            zone.setStatus(ZoneStatus.HIGH_ALERT);
        } else if (riskScore >= 40) {
            zone.setStatus(ZoneStatus.ACTIVE);
        } else if (riskScore >= 20) {
            zone.setStatus(ZoneStatus.MONITORING);
        } else {
            zone.setStatus(ZoneStatus.INACTIVE);
        }

        zone = zoneRepository.save(zone);
        return convertToDTO(zone);
    }

    public ZoneDTO addContribution(Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zone.setParticipantCount(zone.getParticipantCount() + 1);

        // Activate zone if threshold reached
        if (zone.getParticipantCount() >= ACTIVATION_THRESHOLD && 
            zone.getStatus() == ZoneStatus.INACTIVE) {
            zone.setStatus(ZoneStatus.MONITORING);
        }

        zone = zoneRepository.save(zone);
        return convertToDTO(zone);
    }

    /**
     * Remove contribution from zone (update participant count)
     */
    public ZoneDTO removeContribution(Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        if (zone.getParticipantCount() > 0) {
            zone.setParticipantCount(zone.getParticipantCount() - 1);
            zone = zoneRepository.save(zone);
        }

        return convertToDTO(zone);
    }

    /**
     * Update zone (Admin only)
     */
    public ZoneDTO updateZone(Long zoneId, CreateZoneRequest request) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zone.setName(request.getName());
        zone.setLocation(request.getLocation());
        zone.setDescription(request.getDescription());
        zone.setPopulationEstimate(request.getPopulationEstimate());

        zone = zoneRepository.save(zone);
        return convertToDTO(zone);
    }

    /**
     * Delete zone (Admin only)
     */
    public void deleteZone(Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));
        zoneRepository.delete(zone);
        log.info("Zone with ID {} deleted successfully", zoneId);
    }

    private ZoneDTO convertToDTO(Zone zone) {
        return ZoneDTO.builder()
                .id(zone.getId())
                .name(zone.getName())
                .location(zone.getLocation())
                .description(zone.getDescription())
                .populationEstimate(zone.getPopulationEstimate())
                .status(zone.getStatus().toString())
                .riskScore(zone.getRiskScore())
                .participantCount(zone.getParticipantCount())
                .createdAt(zone.getCreatedAt())
                .build();
    }
}
