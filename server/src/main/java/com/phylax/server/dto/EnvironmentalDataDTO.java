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
public class EnvironmentalDataDTO {
    private Long id;
    private String location;
    private Double rainfall;
    private Double temperature;
    private Double humidity;
    private Double forecast;
    private String weatherCondition;
    private Double cumulativeRainfall;
    private String recordedAt;
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long id;
        private String location;
        private Double rainfall;
        private Double temperature;
        private Double humidity;
        private Double forecast;
        private String weatherCondition;
        private Double cumulativeRainfall;
        private String recordedAt;
        
        public Builder id(Long id) { this.id = id; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder rainfall(Double rainfall) { this.rainfall = rainfall; return this; }
        public Builder temperature(Double temperature) { this.temperature = temperature; return this; }
        public Builder humidity(Double humidity) { this.humidity = humidity; return this; }
        public Builder forecast(Double forecast) { this.forecast = forecast; return this; }
        public Builder weatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; return this; }
        public Builder cumulativeRainfall(Double cumulativeRainfall) { this.cumulativeRainfall = cumulativeRainfall; return this; }
        public Builder recordedAt(String recordedAt) { this.recordedAt = recordedAt; return this; }
        
        public EnvironmentalDataDTO build() {
            EnvironmentalDataDTO dto = new EnvironmentalDataDTO();
            dto.setId(id);
            dto.setLocation(location);
            dto.setRainfall(rainfall);
            dto.setTemperature(temperature);
            dto.setHumidity(humidity);
            dto.setForecast(forecast);
            dto.setWeatherCondition(weatherCondition);
            dto.setCumulativeRainfall(cumulativeRainfall);
            dto.setRecordedAt(recordedAt);
            return dto;
        }
    }
}
