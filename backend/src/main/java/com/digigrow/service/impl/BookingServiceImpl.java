package com.digigrow.service.impl;

import com.digigrow.dto.BookingRequestDto;
import com.digigrow.entity.BookingConsultation;
import com.digigrow.enums.BookingStatus;
import com.digigrow.repository.BookingConsultationRepository;
import com.digigrow.service.BookingService;
import com.digigrow.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingConsultationRepository bookingRepository;
    private final EmailService emailService;

    @Override
    public BookingConsultation createBooking(BookingRequestDto dto) {
        BookingConsultation booking = BookingConsultation.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .businessName(dto.getBusinessName())
                .city(dto.getCity() != null ? dto.getCity() : "Delhi")
                .serviceType(dto.getServiceType())
                .monthlyBudget(dto.getMonthlyBudget())
                .message(dto.getMessage())
                .status(BookingStatus.PENDING)
                .build();

        BookingConsultation saved = bookingRepository.save(booking);
        log.info("New booking created: ID={}, Email={}", saved.getId(), saved.getEmail());

        // Send confirmation email asynchronously
        emailService.sendBookingConfirmation(saved);
        emailService.sendAdminNotification(saved);

        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingConsultation> getAllBookings(Pageable pageable) {
        return bookingRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingConsultation> getBookingsByStatus(BookingStatus status, Pageable pageable) {
        return bookingRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingConsultation getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Override
    public BookingConsultation updateBookingStatus(Long id, BookingStatus status, String notes) {
        BookingConsultation booking = getBookingById(id);
        booking.setStatus(status);
        if (notes != null) booking.setNotes(notes);
        return bookingRepository.save(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getBookingStats() {
        return Map.of(
                "total", bookingRepository.count(),
                "pending", bookingRepository.countByStatus(BookingStatus.PENDING),
                "confirmed", bookingRepository.countByStatus(BookingStatus.CONFIRMED),
                "completed", bookingRepository.countByStatus(BookingStatus.COMPLETED),
                "today", bookingRepository.countTodayBookings()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Object[]> getServiceTypeStats() {
        return bookingRepository.countByServiceType();
    }
}
