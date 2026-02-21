package com.digigrow.entity;

import com.digigrow.enums.CampaignStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ad_campaigns")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "client_email", nullable = false)
    private String clientEmail;

    @Column(name = "client_phone")
    private String clientPhone;

    @Column(name = "business_name", nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String platform;

    @Column(name = "campaign_type", nullable = false)
    private String campaignType;

    @Column(name = "target_location")
    private String targetLocation = "Delhi, India";

    @Column(name = "budget_daily")
    private BigDecimal budgetDaily;

    @Column(name = "budget_monthly")
    private BigDecimal budgetMonthly;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "target_audience", columnDefinition = "TEXT")
    private String targetAudience;

    @Column(name = "campaign_objective")
    private String campaignObjective;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CampaignStatus status = CampaignStatus.DRAFT;

    @Column
    private Long impressions = 0L;

    @Column
    private Long clicks = 0L;

    @Column
    private Integer conversions = 0;

    @Column
    private BigDecimal spend = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managed_by")
    private User managedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Derived Metrics
    @Transient
    public double getCtr() {
        if (impressions == null || impressions == 0) return 0.0;
        return (clicks != null ? clicks : 0) * 100.0 / impressions;
    }

    @Transient
    public BigDecimal getCpc() {
        if (clicks == null || clicks == 0 || spend == null) return BigDecimal.ZERO;
        return spend.divide(BigDecimal.valueOf(clicks), 2, java.math.RoundingMode.HALF_UP);
    }
}
