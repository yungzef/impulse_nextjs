import AppBar from "@/app/components/AppBar";
import HeroSection from "@/app/components/HeroSection";
import PlatformFeatures from "@/app/components/PlatformFeatures";
import AIHelper from "@/app/components/AIHelper";
import TestingModes from "@/app/components/TestingModes";
import StatisticsSection from "@/app/components/StatisticsSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import FAQSection from "@/app/components/FAQSection";
import FooterSection from "@/app/components/FooterSection";
import CTASection from "@/app/components/CTASection";

export default function HomePage() {

    return (
        <>
            <AppBar/>
            <main className="pt-20">
                <HeroSection/>
                <PlatformFeatures/>
                <AIHelper/>
                <TestingModes/>
                <StatisticsSection/>
                <TestimonialsSection/>
                <FAQSection/>
                <CTASection/>
                <FooterSection/>
            </main>
        </>
    );
}
