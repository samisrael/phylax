package com.phylax.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "environmental_data")
@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnvironmentalData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotNull(message = "Rainfall is required")
    @Column(nullable = false)
    private Double rainfall; // in mm

    @NotNull(message = "Temperature is required")
    @Column(nullable = false)
    private Double temperature; // in Celsius

    @NotNull(message = "Humidity is required")
    @Column(nullable = false)
    private Double humidity; // percentage

    @Column(nullable = true)
    private Double forecast; // weather forecast score 0-100

    @Column(nullable = true)
    private String weatherCondition;

    @Column(name = "cumulative_rainfall")
    private Double cumulativeRainfall; // 24-hour cumulative

    @Column(name = "recorded_at", nullable = false, updatable = false)
    private LocalDateTime recordedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public Double getRainfall() { return rainfall; }
    public void setRainfall(Double rainfall) { this.rainfall = rainfall; }
    
    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }
    
    public Double getHumidity() { return humidity; }
    public void setHumidity(Double humidity) { this.humidity = humidity; }
    
    public Double getForecast() { return forecast; }
    public void setForecast(Double forecast) { this.forecast = forecast; }
    
    public String getWeatherCondition() { return weatherCondition; }
    public void setWeatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; }
    
    public Double getCumulativeRainfall() { return cumulativeRainfall; }
    public void setCumulativeRainfall(Double cumulativeRainfall) { this.cumulativeRainfall = cumulativeRainfall; }
    
    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }

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
        private LocalDateTime recordedAt;
        
        public Builder id(Long id) { this.id = id; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder rainfall(Double rainfall) { this.rainfall = rainfall; return this; }
        public Builder temperature(Double temperature) { this.temperature = temperature; return this; }
        public Builder humidity(Double humidity) { this.humidity = humidity; return this; }
        public Builder forecast(Double forecast) { this.forecast = forecast; return this; }
        public Builder weatherCondition(String weatherCondition) { this.weatherCondition = weatherCondition; return this; }
        public Builder cumulativeRainfall(Double cumulativeRainfall) { this.cumulativeRainfall = cumulativeRainfall; return this; }
        public Builder recordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; return this; }
        
        public EnvironmentalData build() {
            EnvironmentalData data = new EnvironmentalData();
            data.id = this.id;
            data.location = this.location;
            data.rainfall = this.rainfall;
            data.temperature = this.temperature;
            data.humidity = this.humidity;
            data.forecast = this.forecast;
            data.weatherCondition = this.weatherCondition;
            data.cumulativeRainfall = this.cumulativeRainfall;
            data.recordedAt = this.recordedAt;
            return data;
        }
    }

    @PrePersist
    protected void onCreate() {
        recordedAt = LocalDateTime.now();
    }
}
