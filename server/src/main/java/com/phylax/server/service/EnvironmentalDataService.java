package com.phylax.server.service;

import com.phylax.server.dto.EnvironmentalDataDTO;
import com.phylax.server.model.EnvironmentalData;
import com.phylax.server.repository.EnvironmentalDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class EnvironmentalDataService {

    private final EnvironmentalDataRepository environmentalDataRepository;

    public EnvironmentalDataDTO getCurrentEnvironmentalData(String location) {
        EnvironmentalData data = environmentalDataRepository
                .findTopByLocationOrderByRecordedAtDesc(location)
                .orElse(null);

        if (data == null) {
            // Return mock data if not found in database
            return getMockEnvironmentalData(location);
        }

        return convertToDTO(data);
    }

    public EnvironmentalDataDTO saveEnvironmentalData(String location, Double rainfall, 
                                                       Double temperature, Double humidity,
                                                       Double forecast, String weatherCondition,
                                                       Double cumulativeRainfall) {
        EnvironmentalData data = EnvironmentalData.builder()
                .location(location)
                .rainfall(rainfall)
                .temperature(temperature)
                .humidity(humidity)
                .forecast(forecast)
                .weatherCondition(weatherCondition)
                .cumulativeRainfall(cumulativeRainfall)
                .build();

        data = environmentalDataRepository.save(data);
        return convertToDTO(data);
    }

    private EnvironmentalDataDTO getMockEnvironmentalData(String location) {
        // Mock data for demo purposes
        return EnvironmentalDataDTO.builder()
                .location(location)
                .rainfall(45.5)
                .temperature(28.5)
                .humidity(72.0)
                .forecast(65.0)
                .weatherCondition("Rainy")
                .cumulativeRainfall(120.0)
                .recordedAt(LocalDateTime.now().toString())
                .build();
    }

    private EnvironmentalDataDTO convertToDTO(EnvironmentalData data) {
        return EnvironmentalDataDTO.builder()
                .id(data.getId())
                .location(data.getLocation())
                .rainfall(data.getRainfall())
                .temperature(data.getTemperature())
                .humidity(data.getHumidity())
                .forecast(data.getForecast())
                .weatherCondition(data.getWeatherCondition())
                .cumulativeRainfall(data.getCumulativeRainfall())
                .recordedAt(data.getRecordedAt().toString())
                .build();
    }
}
