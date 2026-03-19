package com.phylax.server.controller;

import com.phylax.server.dto.ErrorResponse;
import com.phylax.server.dto.RiskAssessmentDTO;
import com.phylax.server.service.RiskAssessmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/risk-assessment")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RiskAssessmentController {

    private static final Logger log = LoggerFactory.getLogger(RiskAssessmentController.class);
    private final RiskAssessmentService riskAssessmentService;

    @GetMapping("/calculate")
    public ResponseEntity<?> calculateRisk(
            @RequestParam Double rainfall,
            @RequestParam Double forecast,
            @RequestParam Double humidity) {
        try {
            RiskAssessmentDTO risk = riskAssessmentService.calculateRisk(rainfall, forecast, humidity);
            return ResponseEntity.ok(risk);
        } catch (Exception e) {
            log.error("Error calculating risk", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error calculating risk"));
        }
    }
}
