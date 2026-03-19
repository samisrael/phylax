package com.phylax.server.service;

import com.phylax.server.dto.RiskAssessmentDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RiskAssessmentService {

    public RiskAssessmentDTO calculateRisk(Double rainfall, Double forecast, Double humidity) {
        // Risk score calculation: score = (rainfall * 0.4) + (forecast * 0.3) + (humidity * 0.3)
        // Normalize values to 0-100 scale
        Double normalizedRainfall = Math.min(rainfall / 200.0 * 100, 100.0); // Max 200mm = 100%
        Double normalizedForecast = Math.min(forecast, 100.0);
        Double normalizedHumidity = Math.min(humidity, 100.0);

        Double riskScore = (normalizedRainfall * 0.4) + (normalizedForecast * 0.3) + (normalizedHumidity * 0.3);

        String riskLevel = determineRiskLevel(riskScore);
        String recommendation = getRecommendation(riskLevel);

        return RiskAssessmentDTO.builder()
                .riskScore(riskScore)
                .riskLevel(riskLevel)
                .rainfall(rainfall)
                .forecast(forecast)
                .humidity(humidity)
                .recommendation(recommendation)
                .build();
    }

    private String determineRiskLevel(Double riskScore) {
        if (riskScore < 20) {
            return "Unlikely";
        } else if (riskScore < 40) {
            return "Likely";
        } else if (riskScore < 60) {
            return "Expected";
        } else if (riskScore < 80) {
            return "Most Expected";
        } else {
            return "Evacuate Immediately";
        }
    }

    private String getRecommendation(String riskLevel) {
        return switch (riskLevel) {
            case "Unlikely" -> "Monitor situation regularly";
            case "Likely" -> "Prepare emergency supplies";
            case "Expected" -> "Alert residents and prepare evacuation routes";
            case "Most Expected" -> "Prepare for immediate evacuation";
            case "Evacuate Immediately" -> "EVACUATE IMMEDIATELY - Disaster imminent";
            default -> "Unknown risk level";
        };
    }
}
