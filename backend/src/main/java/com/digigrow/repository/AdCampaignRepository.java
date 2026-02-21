package com.digigrow.repository;

import com.digigrow.entity.AdCampaign;
import com.digigrow.enums.CampaignStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdCampaignRepository extends JpaRepository<AdCampaign, Long> {
    Page<AdCampaign> findByStatusOrderByCreatedAtDesc(CampaignStatus status, Pageable pageable);
    Page<AdCampaign> findByPlatformOrderByCreatedAtDesc(String platform, Pageable pageable);
    List<AdCampaign> findByClientEmailOrderByCreatedAtDesc(String email);
    long countByStatus(CampaignStatus status);

    @Query("SELECT SUM(a.spend) FROM AdCampaign a WHERE a.status = 'ACTIVE'")
    java.math.BigDecimal totalActiveSpend();

    @Query("SELECT a.platform, COUNT(a) FROM AdCampaign a GROUP BY a.platform")
    List<Object[]> countByPlatform();

    @Query("SELECT SUM(a.impressions), SUM(a.clicks), SUM(a.conversions) FROM AdCampaign a")
    List<Object[]> aggregateStats();
}
