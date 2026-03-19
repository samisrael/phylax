package com.phylax.server.repository;

import com.phylax.server.model.Zone;
import com.phylax.server.model.ZoneStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
    List<Zone> findByStatus(ZoneStatus status);
    List<Zone> findByLocationContainingIgnoreCase(String location);
}
