package com.phylax.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateContributionRequest {
    private String type; // MONEY, SUPPLIES, TRANSPORT
    private Double amount;
    private String description;
    private Long zoneId;
}
