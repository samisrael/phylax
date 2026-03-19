package com.phylax.server.controller;

import com.phylax.server.dto.ErrorResponse;
import com.phylax.server.dto.NeedsEstimationDTO;
import com.phylax.server.service.NeedsEstimationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zones/{zoneId}/needs")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class NeedsEstimationController {

    private static final Logger log = LoggerFactory.getLogger(NeedsEstimationController.class);
    private final NeedsEstimationService needsEstimationService;

    @GetMapping
    public ResponseEntity<?> estimateNeeds(@PathVariable Long zoneId) {
        try {
            NeedsEstimationDTO needs = needsEstimationService.estimateNeeds(zoneId);
            return ResponseEntity.ok(needs);
        } catch (Exception e) {
            log.error("Error estimating needs", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error estimating needs"));
        }
    }
}
