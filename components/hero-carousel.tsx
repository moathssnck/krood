"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "لجميع عملائنا الكرام، شكراً لكم!",
    subtitle: "إنجازاتنا خلال أكثر من ٤٧ عاماً",
    description: "نشكر جميع عملائنا الكرام على ثقتهم بنا",
    bgGradient: "/5629a9bf-5852-4219-9899-12609a2f621c.jpeg",
  },
  {
    id: 2,
    title: "خدمات مالية متميزة",
    subtitle: "حلول تمويلية مبتكرة",
    description: "نقدم أفضل الحلول المالية لتلبية احتياجاتكم",
    bgGradient: "/CFC-Logo.jpg",
  },
  {
    id: 3,
    title: "ثقة وأمان في التعامل",
    subtitle: "شريكك المالي الموثوق",
    description: "نبني معكم مستقبلاً مالياً آمناً ومستقراً",
    bgGradient: "/f78243cba-db06-48dc-a0ba-79d51a5b21c6.jpeg",
  },
  {
    id: 4,
    title: "تمويل سريع ومرن",
    subtitle: "إجراءات مبسطة وسريعة",
    description: "احصل على التمويل الذي تحتاجه بأسرع وقت ممكن",
    bgGradient: "/5d1f5c8f-0ad0-439c-8321-610891d87b1b.jpeg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative m-1 text-white rounded-md overflow-hidden">
      <div className="relative h-48 sm:h-56">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div
              className="h-full bg-cover p-6 flex flex-col justify-center"
              style={{ backgroundImage: `url(${slide.bgGradient})` }}
            >
              {" "}
              <div className="text-center space-y-3">
                <div className="space-y-2"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="الشريحة السابقة"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="الشريحة التالية"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/10 hover:bg-white/60"
            }`}
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
