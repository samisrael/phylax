package com.phylax.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ZoneDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private Integer populationEstimate;
    private String status;
    private Double riskScore;
    private Integer participantCount;
    private LocalDateTime createdAt;
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long id;
        private String name;
        private String location;
        private String description;
        private Integer populationEstimate;
        private String status;
        private Double riskScore;
        private Integer participantCount;
        private LocalDateTime createdAt;
        
        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder populationEstimate(Integer populationEstimate) { this.populationEstimate = populationEstimate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public Builder participantCount(Integer participantCount) { this.participantCount = participantCount; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        
        public ZoneDTO build() {
            ZoneDTO dto = new ZoneDTO();
            dto.setId(id);
            dto.setName(name);
            dto.setLocation(location);
            dto.setDescription(description);
            dto.setPopulationEstimate(populationEstimate);
            dto.setStatus(status);
            dto.setRiskScore(riskScore);
            dto.setParticipantCount(participantCount);
            dto.setCreatedAt(createdAt);
            return dto;
        }
    }
}
