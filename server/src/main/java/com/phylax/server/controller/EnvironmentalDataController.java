package com.phylax.server.controller;

import com.phylax.server.dto.EnvironmentalDataDTO;
import com.phylax.server.dto.ErrorResponse;
import com.phylax.server.service.EnvironmentalDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/environment")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EnvironmentalDataController {

    private static final Logger log = LoggerFactory.getLogger(EnvironmentalDataController.class);
    private final EnvironmentalDataService environmentalDataService;

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentEnvironmentalData(
            @RequestParam(defaultValue = "Default Location") String location) {
        try {
            EnvironmentalDataDTO data = environmentalDataService.getCurrentEnvironmentalData(location);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            log.error("Error fetching environmental data", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error fetching environmental data"));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveEnvironmentalData(
            @RequestParam String location,
            @RequestParam Double rainfall,
            @RequestParam Double temperature,
            @RequestParam Double humidity,
            @RequestParam Double forecast,
            @RequestParam String weatherCondition,
            @RequestParam Double cumulativeRainfall) {
        try {
            EnvironmentalDataDTO data = environmentalDataService.saveEnvironmentalData(
                    location, rainfall, temperature, humidity, forecast, weatherCondition, cumulativeRainfall);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            log.error("Error saving environmental data", e);
            return ResponseEntity.status(500).body(new ErrorResponse("Error saving environmental data"));
        }
    }
}
