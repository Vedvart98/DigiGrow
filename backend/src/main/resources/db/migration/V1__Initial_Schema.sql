-- DigiGrow Database Schema
-- PostgreSQL Migration V1

-- ==========================================
-- USERS TABLE (Admin & Staff)
-- ==========================================
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ADMIN',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- BOOKING CONSULTATIONS TABLE
-- ==========================================
CREATE TABLE booking_consultations (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    business_name VARCHAR(200),
    city VARCHAR(100) DEFAULT 'Delhi',
    service_type VARCHAR(60) NOT NULL,
    monthly_budget VARCHAR(50),
    message TEXT,
    status VARCHAR(30) DEFAULT 'PENDING',
    scheduled_date TIMESTAMP,
    notes TEXT,
    assigned_to BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SERVICES TABLE
-- ==========================================
CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(300),
    icon VARCHAR(10),
    features JSONB,
    price_starting_from DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- AD CAMPAIGNS TABLE
-- ==========================================
CREATE TABLE ad_campaigns (
    id BIGSERIAL PRIMARY KEY,
    client_name VARCHAR(200) NOT NULL,
    client_email VARCHAR(150) NOT NULL,
    client_phone VARCHAR(20),
    business_name VARCHAR(200) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    campaign_type VARCHAR(80) NOT NULL,
    target_location VARCHAR(150) DEFAULT 'Delhi, India',
    budget_daily DECIMAL(12,2),
    budget_monthly DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    target_audience TEXT,
    campaign_objective VARCHAR(80),
    status VARCHAR(30) DEFAULT 'DRAFT',
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions INT DEFAULT 0,
    spend DECIMAL(12,2) DEFAULT 0,
    managed_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- CONTACT MESSAGES TABLE
-- ==========================================
CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TESTIMONIALS TABLE
-- ==========================================
CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(120),
    company_name VARCHAR(150),
    content TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    avatar_initials VARCHAR(5),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- BLOG POSTS TABLE
-- ==========================================
CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url VARCHAR(500),
    tags JSONB,
    category VARCHAR(80),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    author_id BIGINT REFERENCES users(id),
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ==========================================
CREATE TABLE newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- ==========================================
-- PLATFORM STATS TABLE
-- ==========================================
CREATE TABLE platform_stats (
    id BIGSERIAL PRIMARY KEY,
    platform VARCHAR(60) NOT NULL,
    campaign_id BIGINT REFERENCES ad_campaigns(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions INT DEFAULT 0,
    spend DECIMAL(12,2) DEFAULT 0,
    ctr DECIMAL(8,4),
    cpc DECIMAL(10,2),
    cpa DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(platform, campaign_id, date)
);

-- ==========================================
-- SEED DEFAULT ADMIN USER
-- Password: Admin@123 (BCrypt hashed)
-- ==========================================
INSERT INTO users (name, email, password, role) VALUES
('Admin DigiGrow', 'admin@digigrow.agency',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCgTtXMmAfEqHJr5cX/CGDO', 'SUPER_ADMIN');

-- ==========================================
-- SEED SERVICES
-- ==========================================
INSERT INTO services (name, slug, description, short_description, icon, features, price_starting_from, display_order) VALUES
('Paid Advertising', 'paid-advertising',
 'Drive targeted traffic with data-driven paid campaigns across Google, Facebook, Instagram and more.',
 'Maximize ROI with precision-targeted ad campaigns',
 '🎯',
 '["Google Ads (Search, Display, Shopping)", "Facebook & Instagram Ads", "LinkedIn Advertising", "YouTube Video Ads", "Remarketing Campaigns"]',
 15000.00, 1),

('Social Media Marketing', 'social-media-marketing',
 'Build a powerful social presence that engages your audience and drives business growth.',
 'Grow your brand across all social platforms',
 '📱',
 '["Content Strategy & Planning", "Social Media Management", "Community Engagement", "Influencer Partnerships", "Analytics & Reporting"]',
 12000.00, 2),

('Search Engine Optimization', 'seo',
 'Improve your organic visibility and rank higher in search results for valuable keywords in Delhi.',
 'Dominate search results and drive organic traffic',
 '🔍',
 '["Technical SEO Audit", "On-Page Optimization", "Link Building Strategy", "Local SEO - Delhi Focus", "Content Optimization"]',
 18000.00, 3),

('Content Marketing', 'content-marketing',
 'Create compelling content that attracts, engages, and converts your target audience.',
 'Tell your brand story with impactful content',
 '✍️',
 '["Blog Writing & Publishing", "Video Content Production", "Infographic Design", "Email Newsletter Creation", "Content Distribution"]',
 10000.00, 4),

('Analytics & Reporting', 'analytics-reporting',
 'Track, measure, and optimize your marketing performance with comprehensive analytics dashboards.',
 'Data-driven decisions for maximum growth',
 '📊',
 '["Google Analytics Setup", "Conversion Tracking", "Custom Dashboard Creation", "Monthly Performance Reports", "ROI Analysis"]',
 8000.00, 5),

('Website Development', 'website-development',
 'Build conversion-optimized websites that turn visitors into customers with modern design.',
 'Stunning websites that convert visitors to leads',
 '🌐',
 '["Responsive Web Design", "Landing Page Creation", "E-commerce Solutions", "Website Speed Optimization", "CMS Integration"]',
 25000.00, 6);

-- ==========================================
-- SEED TESTIMONIALS
-- ==========================================
INSERT INTO testimonials (author_name, author_role, company_name, content, rating, avatar_initials, is_featured, display_order) VALUES
('Rajesh Kumar', 'CEO', 'TechSolutions Delhi',
 'DigiGrow transformed our online presence. Within 3 months, we saw a 300% increase in qualified leads through Google Ads. Their team is professional, responsive, and truly understands digital marketing.',
 5, 'RK', TRUE, 1),

('Priya Sharma', 'Founder', 'FashionHub',
 'The ROI we achieved with their social media campaigns is incredible. Our Instagram following grew from 2K to 50K in 6 months, and sales from social media increased by 400%. Highly recommended!',
 5, 'PS', TRUE, 2),

('Amit Malhotra', 'Director', 'HomeServe India',
 'Their SEO expertise helped us rank #1 for our most important keywords in Delhi. Organic traffic increased by 250%, and we are now getting more inquiries than ever before. Worth every rupee!',
 5, 'AM', TRUE, 3),

('Sunita Agarwal', 'Owner', 'Sunita Boutique Delhi',
 'As a small business owner, I was hesitant about digital marketing. DigiGrow made it simple and affordable. My boutique now gets 5x more walk-in customers thanks to their local SEO and Google Ads.',
 5, 'SA', FALSE, 4);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_booking_status ON booking_consultations(status);
CREATE INDEX idx_booking_email ON booking_consultations(email);
CREATE INDEX idx_booking_created ON booking_consultations(created_at DESC);
CREATE INDEX idx_campaign_status ON ad_campaigns(status);
CREATE INDEX idx_campaign_platform ON ad_campaigns(platform);
CREATE INDEX idx_campaign_client ON ad_campaigns(client_email);
CREATE INDEX idx_contact_read ON contact_messages(is_read);
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_platform_stats_date ON platform_stats(date DESC);
