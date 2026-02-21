import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import BookingSection from '../components/sections/BookingSection';
import {
  PlatformsSection,
  ProcessSection,
  TestimonialsSection,
} from '../components/sections/OtherSections';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PlatformsSection />
      <ProcessSection />
      <TestimonialsSection />
      <BookingSection />
    </main>
  );
}
