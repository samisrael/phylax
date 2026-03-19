package com.phylax.server.repository;

import com.phylax.server.model.EnvironmentalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnvironmentalDataRepository extends JpaRepository<EnvironmentalData, Long> {
    Optional<EnvironmentalData> findTopByLocationOrderByRecordedAtDesc(String location);
}
