package com.phylax.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContributionDTO {
    private Long id;
    private String type;
    private Double amount;
    private String description;
    private Long userId;
    private Long zoneId;
    private LocalDateTime createdAt;
}
