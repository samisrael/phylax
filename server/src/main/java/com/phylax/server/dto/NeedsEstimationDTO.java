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
public class NeedsEstimationDTO {
    private Long zoneId;
    private Integer population;
    private Double foodPerPersonPerDay;
    private Double waterPerPersonPerDay;
    private Double essentialsPerPersonPerDay;
    private Double totalDailyFood;
    private Double totalDailyWater;
    private Double totalDailyEssentials;
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long zoneId;
        private Integer population;
        private Double foodPerPersonPerDay;
        private Double waterPerPersonPerDay;
        private Double essentialsPerPersonPerDay;
        private Double totalDailyFood;
        private Double totalDailyWater;
        private Double totalDailyEssentials;
        
        public Builder zoneId(Long zoneId) { this.zoneId = zoneId; return this; }
        public Builder population(Integer population) { this.population = population; return this; }
        public Builder foodPerPersonPerDay(Double foodPerPersonPerDay) { this.foodPerPersonPerDay = foodPerPersonPerDay; return this; }
        public Builder waterPerPersonPerDay(Double waterPerPersonPerDay) { this.waterPerPersonPerDay = waterPerPersonPerDay; return this; }
        public Builder essentialsPerPersonPerDay(Double essentialsPerPersonPerDay) { this.essentialsPerPersonPerDay = essentialsPerPersonPerDay; return this; }
        public Builder totalDailyFood(Double totalDailyFood) { this.totalDailyFood = totalDailyFood; return this; }
        public Builder totalDailyWater(Double totalDailyWater) { this.totalDailyWater = totalDailyWater; return this; }
        public Builder totalDailyEssentials(Double totalDailyEssentials) { this.totalDailyEssentials = totalDailyEssentials; return this; }
        
        public NeedsEstimationDTO build() {
            NeedsEstimationDTO dto = new NeedsEstimationDTO();
            dto.zoneId = zoneId;
            dto.population = population;
            dto.foodPerPersonPerDay = foodPerPersonPerDay;
            dto.waterPerPersonPerDay = waterPerPersonPerDay;
            dto.essentialsPerPersonPerDay = essentialsPerPersonPerDay;
            dto.totalDailyFood = totalDailyFood;
            dto.totalDailyWater = totalDailyWater;
            dto.totalDailyEssentials = totalDailyEssentials;
            return dto;
        }
    }
}
