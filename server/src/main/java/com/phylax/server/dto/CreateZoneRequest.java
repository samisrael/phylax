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
public class CreateZoneRequest {
    private String name;
    private String location;
    private String description;
    private Integer populationEstimate;
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getPopulationEstimate() { return populationEstimate; }
    public void setPopulationEstimate(Integer populationEstimate) { this.populationEstimate = populationEstimate; }
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private String name;
        private String location;
        private String description;
        private Integer populationEstimate;
        
        public Builder name(String name) { this.name = name; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder populationEstimate(Integer populationEstimate) { this.populationEstimate = populationEstimate; return this; }
        
        public CreateZoneRequest build() {
            return new CreateZoneRequest(name, location, description, populationEstimate);
        }
    }
}
