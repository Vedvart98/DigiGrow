package com.digigrow.service;

import com.digigrow.entity.BookingConsultation;
import com.digigrow.entity.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.name}")
    private String appName;

    @Async
    public void sendBookingConfirmation(BookingConsultation booking) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(booking.getEmail());
            helper.setSubject("✅ Booking Confirmed - " + appName);

            String html = buildBookingConfirmationEmail(booking);
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Booking confirmation sent to: {}", booking.getEmail());
        } catch (MessagingException e) {
            log.error("Failed to send confirmation email to {}: {}", booking.getEmail(), e.getMessage());
        }
    }

    @Async
    public void sendAdminNotification(BookingConsultation booking) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setSubject("🔔 New Booking #" + booking.getId() + " - " + booking.getFullName());

            String html = "<h2>New Consultation Booking</h2>"
                    + "<p><b>Name:</b> " + booking.getFullName() + "</p>"
                    + "<p><b>Email:</b> " + booking.getEmail() + "</p>"
                    + "<p><b>Phone:</b> " + booking.getPhone() + "</p>"
                    + "<p><b>Business:</b> " + booking.getBusinessName() + "</p>"
                    + "<p><b>Service:</b> " + booking.getServiceType() + "</p>"
                    + "<p><b>Budget:</b> " + booking.getMonthlyBudget() + "</p>"
                    + "<p><b>Message:</b> " + booking.getMessage() + "</p>";

            helper.setText(html, true);
            mailSender.send(message);
            log.info("Admin notification sent for booking #{}", booking.getId());
        } catch (MessagingException e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
        }
    }

    @Async
    public void sendContactConfirmation(ContactMessage contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(contact.getEmail());
            helper.setSubject("Thank you for contacting " + appName);

            String html = "<h2>We received your message!</h2>"
                    + "<p>Dear " + contact.getFullName() + ",</p>"
                    + "<p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>"
                    + "<br/><p>Best regards,<br/>" + appName + " Team</p>";

            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send contact confirmation: {}", e.getMessage());
        }
    }

    private String buildBookingConfirmationEmail(BookingConsultation booking) {
        return """
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #FF6B35, #FF8E53); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0;">DigiGrow</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Digital Marketing Agency</p>
                </div>
                <div style="padding: 30px; background: white;">
                    <h2 style="color: #1A1A2E;">Your Consultation is Booked! ✅</h2>
                    <p>Dear %s,</p>
                    <p>Thank you for booking a consultation with DigiGrow. We're excited to help grow your business!</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="color: #FF6B35; margin-top: 0;">Booking Details</h3>
                        <p><strong>Service:</strong> %s</p>
                        <p><strong>Budget:</strong> %s</p>
                        <p><strong>Business:</strong> %s</p>
                    </div>
                    <p>Our team will call you at <strong>%s</strong> to confirm the consultation time.</p>
                    <p>You can also reach us at: <a href="mailto:hello@digigrow.agency">hello@digigrow.agency</a></p>
                </div>
            </body>
            </html>
            """.formatted(
                booking.getFullName(),
                booking.getServiceType(),
                booking.getMonthlyBudget(),
                booking.getBusinessName(),
                booking.getPhone()
        );
    }
}
