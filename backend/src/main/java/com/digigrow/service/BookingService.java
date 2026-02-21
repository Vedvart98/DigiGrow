package com.digigrow.service;

import com.digigrow.dto.BookingRequestDto;
import com.digigrow.entity.BookingConsultation;
import com.digigrow.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BookingService {
    BookingConsultation createBooking(BookingRequestDto dto);
    Page<BookingConsultation> getAllBookings(Pageable pageable);
    Page<BookingConsultation> getBookingsByStatus(BookingStatus status, Pageable pageable);
    BookingConsultation getBookingById(Long id);
    BookingConsultation updateBookingStatus(Long id, BookingStatus status, String notes);
    Map<String, Long> getBookingStats();
    List<Object[]> getServiceTypeStats();
}
