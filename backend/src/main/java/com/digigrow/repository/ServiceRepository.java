package com.digigrow.repository;

import com.digigrow.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByIsActiveTrueOrderByDisplayOrderAsc();
    Optional<ServiceEntity> findBySlug(String slug);
}
