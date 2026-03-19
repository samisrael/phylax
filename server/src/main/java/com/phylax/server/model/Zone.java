package com.phylax.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "zones")
@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Zone name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Population estimate is required")
    @Positive(message = "Population must be positive")
    @Column(nullable = false)
    private Integer populationEstimate;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ZoneStatus status;

    @NotNull(message = "Risk level is required")
    @Positive(message = "Risk level must be positive")
    @Column(nullable = false)
    private Double riskScore;

    @Column(name = "participant_count")
    private Integer participantCount = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contribution> contributions;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getPopulationEstimate() { return populationEstimate; }
    public void setPopulationEstimate(Integer populationEstimate) { this.populationEstimate = populationEstimate; }
    
    public ZoneStatus getStatus() { return status; }
    public void setStatus(ZoneStatus status) { this.status = status; }
    
    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }
    
    public Integer getParticipantCount() { return participantCount; }
    public void setParticipantCount(Integer participantCount) { this.participantCount = participantCount; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<Contribution> getContributions() { return contributions; }
    public void setContributions(List<Contribution> contributions) { this.contributions = contributions; }

    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long id;
        private String name;
        private String location;
        private String description;
        private Integer populationEstimate;
        private ZoneStatus status;
        private Double riskScore;
        private Integer participantCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        
        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder populationEstimate(Integer populationEstimate) { this.populationEstimate = populationEstimate; return this; }
        public Builder status(ZoneStatus status) { this.status = status; return this; }
        public Builder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public Builder participantCount(Integer participantCount) { this.participantCount = participantCount; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        
        public Zone build() {
            Zone zone = new Zone();
            zone.id = this.id;
            zone.name = this.name;
            zone.location = this.location;
            zone.description = this.description;
            zone.populationEstimate = this.populationEstimate;
            zone.status = this.status;
            zone.riskScore = this.riskScore;
            zone.participantCount = this.participantCount;
            zone.createdAt = this.createdAt;
            zone.updatedAt = this.updatedAt;
            return zone;
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = ZoneStatus.INACTIVE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
