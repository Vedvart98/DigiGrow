package com.digigrow.repository;

import com.digigrow.entity.BookingConsultation;
import com.digigrow.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingConsultationRepository extends JpaRepository<BookingConsultation, Long> {
    Page<BookingConsultation> findByStatusOrderByCreatedAtDesc(BookingStatus status, Pageable pageable);
    Page<BookingConsultation> findAllByOrderByCreatedAtDesc(Pageable pageable);
    List<BookingConsultation> findByEmailOrderByCreatedAtDesc(String email);
    long countByStatus(BookingStatus status);

    @Query("SELECT b.serviceType, COUNT(b) FROM BookingConsultation b GROUP BY b.serviceType ORDER BY COUNT(b) DESC")
    List<Object[]> countByServiceType();

    @Query("SELECT COUNT(b) FROM BookingConsultation b WHERE FUNCTION('DATE', b.createdAt) = CURRENT_DATE")
    long countTodayBookings();
}
