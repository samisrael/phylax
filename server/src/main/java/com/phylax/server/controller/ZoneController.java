package com.phylax.server.controller;

import com.phylax.server.dto.CreateZoneRequest;
import com.phylax.server.dto.ErrorResponse;
import com.phylax.server.dto.ZoneDTO;
import com.phylax.server.service.ZoneService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/zones")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ZoneController {

    private static final Logger log = LoggerFactory.getLogger(ZoneController.class);
    private final ZoneService zoneService;

    /**
     * Create zone (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createZone(@RequestBody CreateZoneRequest request) {
        try {
            ZoneDTO zone = zoneService.createZone(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(zone);
        } catch (Exception e) {
            log.error("Error creating zone", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error creating zone"));
        }
    }

    /**
     * Get all zones (Public)
     */
    @GetMapping
    public ResponseEntity<?> getAllZones() {
        try {
            List<ZoneDTO> zones = zoneService.getAllZones();
            return ResponseEntity.ok(zones);
        } catch (Exception e) {
            log.error("Error fetching zones", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching zones"));
        }
    }

    /**
     * Get zone by ID (Public)
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getZoneById(@PathVariable Long id) {
        try {
            ZoneDTO zone = zoneService.getZoneById(id);
            return ResponseEntity.ok(zone);
        } catch (Exception e) {
            log.error("Error fetching zone", e);
            return ResponseEntity.status(404).body(new ErrorResponse("Zone not found"));
        }
    }

    /**
     * Get active zones (Public)
     */
    @GetMapping("/active")
    public ResponseEntity<?> getActiveZones() {
        try {
            List<ZoneDTO> zones = zoneService.getActiveZones();
            return ResponseEntity.ok(zones);
        } catch (Exception e) {
            log.error("Error fetching active zones", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching zones"));
        }
    }

    /**
     * Search zones by location (Public)
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchZonesByLocation(@RequestParam String location) {
        try {
            List<ZoneDTO> zones = zoneService.getZonesByLocation(location);
            return ResponseEntity.ok(zones);
        } catch (Exception e) {
            log.error("Error searching zones", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error searching zones"));
        }
    }

    /**
     * Update zone risk score (Admin only)
     */
    @PutMapping("/{id}/risk-score")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateZoneRiskScore(@PathVariable Long id, @RequestParam Double riskScore) {
        try {
            ZoneDTO zone = zoneService.updateZoneRiskScore(id, riskScore);
            return ResponseEntity.ok(zone);
        } catch (Exception e) {
            log.error("Error updating zone risk score", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error updating zone"));
        }
    }

    /**
     * Update zone (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateZone(
            @PathVariable Long id,
            @RequestBody CreateZoneRequest request) {
        try {
            ZoneDTO zone = zoneService.updateZone(id, request);
            return ResponseEntity.ok(zone);
        } catch (Exception e) {
            log.error("Error updating zone", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error updating zone"));
        }
    }

    /**
     * Delete zone (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteZone(@PathVariable Long id) {
        try {
            zoneService.deleteZone(id);
            return ResponseEntity.ok(Map.of("message", "Zone deleted successfully"));
        } catch (Exception e) {
            log.error("Error deleting zone", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error deleting zone"));
        }
    }
}
