package com.phylax.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiskAssessmentDTO {
    private Double riskScore; // 0-100
    private String riskLevel; // Unlikely, Likely, Expected, Most Expected, Evacuate Immediately
    private Double rainfall;
    private Double forecast;
    private Double humidity;
    private String recommendation;
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Double riskScore;
        private String riskLevel;
        private Double rainfall;
        private Double forecast;
        private Double humidity;
        private String recommendation;
        
        public Builder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public Builder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
        public Builder rainfall(Double rainfall) { this.rainfall = rainfall; return this; }
        public Builder forecast(Double forecast) { this.forecast = forecast; return this; }
        public Builder humidity(Double humidity) { this.humidity = humidity; return this; }
        public Builder recommendation(String recommendation) { this.recommendation = recommendation; return this; }
        
        public RiskAssessmentDTO build() {
            RiskAssessmentDTO dto = new RiskAssessmentDTO();
            dto.setRiskScore(riskScore);
            dto.setRiskLevel(riskLevel);
            dto.setRainfall(rainfall);
            dto.setForecast(forecast);
            dto.setHumidity(humidity);
            dto.setRecommendation(recommendation);
            return dto;
        }
    }
}
