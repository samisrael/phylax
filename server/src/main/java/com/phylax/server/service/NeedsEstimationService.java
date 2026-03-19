package com.phylax.server.service;

import com.phylax.server.dto.NeedsEstimationDTO;
import com.phylax.server.model.Zone;
import com.phylax.server.repository.ZoneRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NeedsEstimationService {

    private final ZoneRepository zoneRepository;

    // Daily requirements per person
    private static final Double WATER_PER_PERSON_PER_DAY = 3.5; // liters
    private static final Double FOOD_PER_PERSON_PER_DAY = 1.5; // kg
    private static final Double ESSENTIALS_PER_PERSON_PER_DAY = 0.5; // kg

    public NeedsEstimationDTO estimateNeeds(Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        Integer population = zone.getPopulationEstimate();

        Double totalDailyWater = population * WATER_PER_PERSON_PER_DAY;
        Double totalDailyFood = population * FOOD_PER_PERSON_PER_DAY;
        Double totalDailyEssentials = population * ESSENTIALS_PER_PERSON_PER_DAY;

        return NeedsEstimationDTO.builder()
                .zoneId(zoneId)
                .population(population)
                .waterPerPersonPerDay(WATER_PER_PERSON_PER_DAY)
                .foodPerPersonPerDay(FOOD_PER_PERSON_PER_DAY)
                .essentialsPerPersonPerDay(ESSENTIALS_PER_PERSON_PER_DAY)
                .totalDailyWater(totalDailyWater)
                .totalDailyFood(totalDailyFood)
                .totalDailyEssentials(totalDailyEssentials)
                .build();
    }
}
