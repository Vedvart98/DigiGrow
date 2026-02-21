package com.digigrow.controller;

import com.digigrow.config.JwtUtils;
import com.digigrow.dto.ApiResponse;
import com.digigrow.dto.BookingRequestDto;
import com.digigrow.entity.*;
import com.digigrow.enums.BookingStatus;
import com.digigrow.enums.CampaignStatus;
import com.digigrow.repository.*;
import com.digigrow.service.BookingService;
import com.digigrow.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

// ======================================================
// BOOKING CONTROLLER
// ======================================================
@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Slf4j
class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingConsultation>> createBooking(
            @Valid @RequestBody BookingRequestDto dto) {
        BookingConsultation booking = bookingService.createBooking(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Booking created successfully! We'll contact you within 24 hours.", booking));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookingConsultation>>> getAllBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) BookingStatus status) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookingConsultation> bookings = status != null
                ? bookingService.getBookingsByStatus(status, pageable)
                : bookingService.getAllBookings(pageable);

        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingConsultation>> getBooking(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getBookingById(id)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<BookingConsultation>> updateStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status,
            @RequestParam(required = false) String notes) {
        BookingConsultation updated = bookingService.updateBookingStatus(id, status, notes);
        return ResponseEntity.ok(ApiResponse.success("Status updated", updated));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStats() {
        return ResponseEntity.ok(ApiResponse.success(bookingService.getBookingStats()));
    }
}

// ======================================================
// SERVICES CONTROLLER
// ======================================================
@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@Slf4j
class ServicesController {

    private final ServiceRepository serviceRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceEntity>>> getAllServices() {
        List<ServiceEntity> services = serviceRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ServiceEntity>> getServiceBySlug(@PathVariable String slug) {
        ServiceEntity service = serviceRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Service not found: " + slug));
        return ResponseEntity.ok(ApiResponse.success(service));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceEntity>> createService(@RequestBody ServiceEntity service) {
        ServiceEntity saved = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Service created", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceEntity>> updateService(
            @PathVariable Long id, @RequestBody ServiceEntity service) {
        service.setId(id);
        ServiceEntity updated = serviceRepository.save(service);
        return ResponseEntity.ok(ApiResponse.success("Service updated", updated));
    }
}

// ======================================================
// CONTACT CONTROLLER
// ======================================================
@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@Slf4j
class ContactController {

    private final ContactMessageRepository contactRepository;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> sendMessage(
            @RequestBody ContactMessage contactMessage) {
        ContactMessage saved = contactRepository.save(contactMessage);
        emailService.sendContactConfirmation(saved);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent! We'll get back to you soon.", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ContactMessage>>> getMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ContactMessage> messages = unreadOnly
                ? contactRepository.findByIsReadFalseOrderByCreatedAtDesc(pageable)
                : contactRepository.findAllByOrderByCreatedAtDesc(pageable);
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<ContactMessage>> markAsRead(@PathVariable Long id) {
        ContactMessage msg = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        msg.setRead(true);
        return ResponseEntity.ok(ApiResponse.success("Marked as read", contactRepository.save(msg)));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount() {
        return ResponseEntity.ok(ApiResponse.success(contactRepository.countByIsReadFalse()));
    }
}

// ======================================================
// TESTIMONIALS CONTROLLER
// ======================================================
@RestController
@RequestMapping("/testimonials")
@RequiredArgsConstructor
class TestimonialsController {

    private final TestimonialRepository testimonialRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAll(
            @RequestParam(defaultValue = "false") boolean featuredOnly) {
        List<Testimonial> list = featuredOnly
                ? testimonialRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByDisplayOrderAsc()
                : testimonialRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Testimonial>> create(@RequestBody Testimonial testimonial) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Testimonial added", testimonialRepository.save(testimonial)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> update(
            @PathVariable Long id, @RequestBody Testimonial testimonial) {
        testimonial.setId(id);
        return ResponseEntity.ok(ApiResponse.success("Updated", testimonialRepository.save(testimonial)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        testimonialRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}

// ======================================================
// AD CAMPAIGNS CONTROLLER
// ======================================================
@RestController
@RequestMapping("/campaigns")
@RequiredArgsConstructor
@Slf4j
class AdCampaignController {

    private final AdCampaignRepository campaignRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AdCampaign>>> getAllCampaigns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) CampaignStatus status,
            @RequestParam(required = false) String platform) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<AdCampaign> campaigns;

        if (status != null) {
            campaigns = campaignRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else if (platform != null) {
            campaigns = campaignRepository.findByPlatformOrderByCreatedAtDesc(platform, pageable);
        } else {
            campaigns = campaignRepository.findAll(pageable);
        }
        return ResponseEntity.ok(ApiResponse.success(campaigns));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AdCampaign>> createCampaign(@RequestBody AdCampaign campaign) {
        AdCampaign saved = campaignRepository.save(campaign);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Campaign created", saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdCampaign>> getCampaign(@PathVariable Long id) {
        AdCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        return ResponseEntity.ok(ApiResponse.success(campaign));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AdCampaign>> updateStatus(
            @PathVariable Long id, @RequestParam CampaignStatus status) {
        AdCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaign.setStatus(status);
        return ResponseEntity.ok(ApiResponse.success("Status updated", campaignRepository.save(campaign)));
    }

    @PatchMapping("/{id}/metrics")
    public ResponseEntity<ApiResponse<AdCampaign>> updateMetrics(
            @PathVariable Long id,
            @RequestParam(required = false) Long impressions,
            @RequestParam(required = false) Long clicks,
            @RequestParam(required = false) Integer conversions,
            @RequestParam(required = false) BigDecimal spend) {
        AdCampaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        if (impressions != null) campaign.setImpressions(impressions);
        if (clicks != null) campaign.setClicks(clicks);
        if (conversions != null) campaign.setConversions(conversions);
        if (spend != null) campaign.setSpend(spend);
        return ResponseEntity.ok(ApiResponse.success("Metrics updated", campaignRepository.save(campaign)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCampaignStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", campaignRepository.count());
        stats.put("active", campaignRepository.countByStatus(CampaignStatus.ACTIVE));
        stats.put("draft", campaignRepository.countByStatus(CampaignStatus.DRAFT));
        stats.put("paused", campaignRepository.countByStatus(CampaignStatus.PAUSED));
        stats.put("platformBreakdown", campaignRepository.countByPlatform());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}

// ======================================================
// AUTH CONTROLLER
// ======================================================
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid credentials"));
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtils.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("tokenType", "Bearer");
        response.put("email", email);

        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
}

// ======================================================
// NEWSLETTER CONTROLLER
// ======================================================
@RestController
@RequestMapping("/newsletter")
@RequiredArgsConstructor
class NewsletterController {

    private final NewsletterSubscriberRepository subscriberRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<String>> subscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String name = body.get("name");

        if (subscriberRepository.existsByEmail(email)) {
            return ResponseEntity.ok(ApiResponse.success("Already subscribed!", email));
        }

        NewsletterSubscriber subscriber = NewsletterSubscriber.builder()
                .email(email)
                .name(name)
                .isActive(true)
                .build();

        subscriberRepository.save(subscriber);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Subscribed successfully!", email));
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<ApiResponse<String>> unsubscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        subscriberRepository.findByEmail(email).ifPresent(sub -> {
            sub.setActive(false);
            sub.setUnsubscribedAt(java.time.LocalDateTime.now());
            subscriberRepository.save(sub);
        });
        return ResponseEntity.ok(ApiResponse.success("Unsubscribed", email));
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> getSubscriberCount() {
        return ResponseEntity.ok(ApiResponse.success(subscriberRepository.countByIsActiveTrue()));
    }
}

// ======================================================
// DASHBOARD CONTROLLER (Admin)
// ======================================================
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Slf4j
class DashboardController {

    private final BookingService bookingService;
    private final AdCampaignRepository campaignRepository;
    private final ContactMessageRepository contactRepository;
    private final NewsletterSubscriberRepository subscriberRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Booking stats
        Map<String, Long> bookingStats = bookingService.getBookingStats();
        stats.put("bookings", bookingStats);

        // Campaign stats
        stats.put("totalCampaigns", campaignRepository.count());
        stats.put("activeCampaigns", campaignRepository.countByStatus(CampaignStatus.ACTIVE));

        // Contact stats
        stats.put("unreadMessages", contactRepository.countByIsReadFalse());

        // Newsletter
        stats.put("subscribers", subscriberRepository.countByIsActiveTrue());

        // Platform breakdown
        stats.put("platformBreakdown", campaignRepository.countByPlatform());

        // Service type breakdown
        stats.put("serviceBreakdown", bookingService.getServiceTypeStats());

        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
