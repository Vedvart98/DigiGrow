package com.digigrow.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author_name", nullable = false)
    private String authorName;

    @Column(name = "author_role")
    private String authorRole;

    @Column(name = "company_name")
    private String companyName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private Integer rating;

    @Column(name = "avatar_initials")
    private String avatarInitials;

    @Column(name = "is_featured")
    private boolean isFeatured = false;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
