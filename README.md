# 🚀 DigiGrow - Digital Marketing Agency Platform

A full-stack digital marketing agency web application built with **Spring Boot** backend and **React** frontend, using **PostgreSQL** database.

---

## 🧱 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS  |
| Animations  | Framer Motion                 |
| Forms       | React Hook Form + Zod         |
| Backend     | Spring Boot 3.2 (Java 17)     |
| Security    | Spring Security + JWT          |
| Database    | **PostgreSQL** (recommended)  |
| ORM         | Spring Data JPA / Hibernate   |
| Migrations  | Flyway                        |
| Email       | Spring Mail (SMTP)            |

---

## 🗄️ Why PostgreSQL?

We chose **PostgreSQL** over MySQL or MongoDB for DigiGrow because:

1. **JSON/JSONB support** — Service features and campaign configs stored as JSONB (indexed, queryable)
2. **Analytics queries** — Complex GROUP BY, window functions for campaign performance reports
3. **Full-text search** — Built-in FTS for searching bookings and contacts
4. **ACID compliance** — Critical for financial ad spend data
5. **Indexing power** — Partial indexes on `status` columns for fast filtering
6. **Free & production-grade** — Used by Supabase, Neon, Railway, AWS RDS

---

## 📁 Project Structure

```
digigrow/
├── backend/                          # Spring Boot API
│   ├── src/main/java/com/digigrow/
│   │   ├── DigiGrowApplication.java  # Entry point
│   │   ├── config/
│   │   │   ├── SecurityConfig.java   # Spring Security + JWT filter
│   │   │   └── JwtUtils.java        # JWT token management
│   │   ├── controller/
│   │   │   └── Controllers.java     # All REST controllers
│   │   ├── dto/
│   │   │   ├── ApiResponse.java     # Generic API wrapper
│   │   │   └── DtoClasses.java      # Request/Response DTOs
│   │   ├── entity/                  # JPA entities
│   │   │   ├── User.java
│   │   │   ├── BookingConsultation.java
│   │   │   ├── AdCampaign.java
│   │   │   ├── ServiceEntity.java
│   │   │   ├── ContactMessage.java
│   │   │   ├── Testimonial.java
│   │   │   └── NewsletterSubscriber.java
│   │   ├── enums/
│   │   │   ├── BookingStatus.java
│   │   │   ├── CampaignStatus.java
│   │   │   └── AdPlatform.java
│   │   ├── exception/
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/              # Spring Data JPA repos
│   │   └── service/
│   │       ├── BookingService.java
│   │       ├── EmailService.java
│   │       └── impl/
│   │           └── BookingServiceImpl.java
│   └── src/main/resources/
│       ├── application.properties
│       └── db/migration/
│           └── V1__Initial_Schema.sql  # Flyway migration
│
└── frontend/                         # React App
    └── src/
        ├── main.jsx                  # Entry point
        ├── App.jsx                   # Router setup
        ├── context/
        │   └── AuthContext.jsx       # Auth state management
        ├── services/
        │   └── api.js               # Axios API client
        ├── pages/
        │   ├── HomePage.jsx          # Public landing page
        │   └── admin/
        │       ├── AdminLogin.jsx
        │       ├── AdminDashboard.jsx
        │       ├── AdminBookings.jsx
        │       └── AdminCampaigns.jsx
        ├── components/
        │   ├── common/
        │   │   └── Navbar.jsx
        │   └── sections/
        │       ├── HeroSection.jsx
        │       ├── ServicesSection.jsx
        │       ├── BookingSection.jsx
        │       └── OtherSections.jsx  # Platforms, Process, Testimonials, Footer
        └── styles/
            └── globals.css
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

---

### Step 1: PostgreSQL Setup

```sql
-- Run in psql as superuser
CREATE DATABASE digigrow_db;
CREATE USER digigrow_user WITH ENCRYPTED PASSWORD 'digigrow_password';
GRANT ALL PRIVILEGES ON DATABASE digigrow_db TO digigrow_user;
```

Or using Docker:
```bash
docker run --name digigrow-postgres \
  -e POSTGRES_DB=digigrow_db \
  -e POSTGRES_USER=digigrow_user \
  -e POSTGRES_PASSWORD=digigrow_password \
  -p 5432:5432 \
  -d postgres:15
```

---

### Step 2: Backend Setup

```bash
cd backend

# Edit application.properties if needed
# (DB credentials, email settings, JWT secret)

# Run (Flyway will auto-run V1__Initial_Schema.sql)
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080/api`

**Default Admin Credentials:**
- Email: `admin@digigrow.agency`
- Password: `Admin@123`

---

### Step 3: Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend starts at: `http://localhost:3000`

---

## 🌐 API Endpoints

### Public (no auth required)
| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| POST   | `/api/bookings`             | Create consultation booking |
| GET    | `/api/services`             | List all active services  |
| GET    | `/api/services/{slug}`      | Get service by slug       |
| POST   | `/api/contact`              | Send contact message      |
| GET    | `/api/testimonials`         | Get testimonials          |
| POST   | `/api/newsletter/subscribe` | Subscribe to newsletter   |
| POST   | `/api/auth/login`           | Admin login               |

### Admin (JWT required)
| Method | Endpoint                         | Description              |
|--------|----------------------------------|--------------------------|
| GET    | `/api/bookings`                  | List all bookings        |
| PATCH  | `/api/bookings/{id}/status`      | Update booking status    |
| GET    | `/api/bookings/stats`            | Booking statistics       |
| GET    | `/api/campaigns`                 | List all campaigns       |
| POST   | `/api/campaigns`                 | Create new campaign      |
| PATCH  | `/api/campaigns/{id}/status`     | Update campaign status   |
| PATCH  | `/api/campaigns/{id}/metrics`    | Update campaign metrics  |
| GET    | `/api/contact`                   | List contact messages    |
| PATCH  | `/api/contact/{id}/read`         | Mark message as read     |
| GET    | `/api/dashboard/stats`           | Dashboard statistics     |

---

## 🔒 Security
- JWT authentication for all admin routes
- BCrypt password encoding (strength 12)
- CORS configured for localhost:3000 and production domain
- Input validation with Bean Validation (JSR-380)
- Global exception handler for clean error responses

---

## 📧 Email Configuration

Update `application.properties`:
```properties
spring.mail.username=your-gmail@gmail.com
spring.mail.password=your-16-char-app-password
```

For Gmail: Enable 2FA → Generate App Password → Use it here.

---

## 🚀 Production Deployment

### Backend
```bash
mvn clean package -DskipTests
java -jar target/digigrow-backend-1.0.0.jar \
  --spring.datasource.url=jdbc:postgresql://prod-host:5432/digigrow_db \
  --app.jwt.secret=your-production-secret-key
```

### Frontend
```bash
npm run build
# Deploy /dist folder to Nginx, Vercel, or Netlify
```

### Nginx config for SPA + API proxy
```nginx
server {
    listen 80;
    root /var/www/digigrow/dist;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:8080;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| `users` | Admin users |
| `booking_consultations` | Client consultation bookings |
| `services` | Digital marketing services offered |
| `ad_campaigns` | Client ad campaign management |
| `contact_messages` | Contact form submissions |
| `testimonials` | Client reviews/testimonials |
| `newsletter_subscribers` | Email newsletter list |
| `platform_stats` | Daily campaign performance stats |

---

## ✨ Features

- **Landing Page**: Hero, Services, Platforms, Process, Testimonials, Booking Form
- **Booking System**: Full form with validation, email confirmation, status management
- **Admin Dashboard**: Stats overview, recent bookings table
- **Bookings Management**: Filter by status, update status inline, pagination
- **Campaign Manager**: Multi-platform campaigns (Google, Facebook, Instagram, etc.)
- **JWT Auth**: Secure admin login with token-based sessions
- **Email Notifications**: Auto-send confirmation to client + alert to admin
- **Newsletter**: Subscribe/unsubscribe functionality
- **Testimonials**: CMS for managing client reviews
- **Services CMS**: Manage your service offerings from admin
