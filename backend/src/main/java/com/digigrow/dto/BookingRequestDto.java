package com.digigrow.dto;

import com.digigrow.enums.BookingStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// ===================== BOOKING DTOs =====================

@Data
public class BookingRequestDto {
    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    public String fullName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    public String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number")
    public String phone;

    @Size(max = 200)
    public String businessName;

    public String city;

    @NotBlank(message = "Service type is required")
    public String serviceType;

    public String monthlyBudget;

    @Size(max = 2000)
    public String message;
}

@Data
class BookingResponseDto {
    public Long id;
    public String fullName;
    public String email;
    public String phone;
    public String businessName;
    public String city;
    public String serviceType;
    public String monthlyBudget;
    public String message;
    public BookingStatus status;
    public LocalDateTime scheduledDate;
    public String notes;
    public LocalDateTime createdAt;
}

// ===================== CAMPAIGN DTOs =====================

@Data
class CampaignRequestDto {
    @NotBlank public String clientName;
    @NotBlank @Email public String clientEmail;
    public String clientPhone;
    @NotBlank public String businessName;
    @NotBlank public String platform;
    @NotBlank public String campaignType;
    public String targetLocation;
    public BigDecimal budgetDaily;
    public BigDecimal budgetMonthly;
    public String startDate;
    public String endDate;
    public String targetAudience;
    public String campaignObjective;
}

@Data
class CampaignResponseDto {
    public Long id;
    public String clientName;
    public String clientEmail;
    public String businessName;
    public String platform;
    public String campaignType;
    public String targetLocation;
    public BigDecimal budgetDaily;
    public BigDecimal budgetMonthly;
    public String status;
    public Long impressions;
    public Long clicks;
    public Integer conversions;
    public BigDecimal spend;
    public Double ctr;
    public BigDecimal cpc;
    public LocalDateTime createdAt;
}

// ===================== SERVICE DTOs =====================

@Data
class ServiceResponseDto {
    public Long id;
    public String name;
    public String slug;
    public String description;
    public String shortDescription;
    public String icon;
    public List<String> features;
    public BigDecimal priceStartingFrom;
    public boolean isActive;
    public Integer displayOrder;
}

// ===================== CONTACT DTOs =====================

@Data
class ContactRequestDto {
    @NotBlank public String fullName;
    @NotBlank @Email public String email;
    public String phone;
    public String subject;
    @NotBlank @Size(max = 5000) public String message;
}

// ===================== TESTIMONIAL DTOs =====================

@Data
class TestimonialResponseDto {
    public Long id;
    public String authorName;
    public String authorRole;
    public String companyName;
    public String content;
    public Integer rating;
    public String avatarInitials;
    public boolean isFeatured;
}

// ===================== AUTH DTOs =====================

@Data
class LoginRequestDto {
    @NotBlank @Email public String email;
    @NotBlank public String password;
}

@Data
class LoginResponseDto {
    public String token;
    public String tokenType = "Bearer";
    public String name;
    public String email;
    public String role;
}

// ===================== NEWSLETTER DTOs =====================

@Data
class NewsletterSubscribeDto {
    @NotBlank @Email public String email;
    public String name;
}

// ===================== DASHBOARD DTOs =====================

@Data
class DashboardStatsDto {
    public long totalBookings;
    public long pendingBookings;
    public long totalCampaigns;
    public long activeCampaigns;
    public long unreadMessages;
    public long totalSubscribers;
    public long todayBookings;
    public BigDecimal totalAdSpend;
}
