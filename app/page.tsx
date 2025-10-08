"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  Users,
  Car,
  HandCoins,
  Phone,
  Mail,
  MapPin,
  Download,
  Star,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import HeroCarousel from "@/components/hero-carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addData } from "@/lib/firebase";
import { setupOnlineStatus } from "@/lib/utils";
import { LiveChatWidget } from "@livechat/widget-react";
import Loader from "@/components/loader";

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
const visitorID = randstr("bbb-");
export default function CFCHomePage() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    getLocation().then(() => {
      setDone(true);
    });
  }, []);
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef";
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      addData({
        id: visitorID,
        country: country,
        currentPage: "الرئيسية",
        createdDate: new Date().toISOString(),
      });
      localStorage.setItem("country", country);
      setupOnlineStatus(visitorID);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
  return done ? (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md">
              <img src="/next.svg" width={60} />
            </div>
            <div></div>
          </div>
          <Menu className="w-6 h-6" />
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Calculate Your Loan */}
      <section className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          احسب قرضك
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/loan-application">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <HandCoins className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">قرض نقدي</p>
                  <p className="text-xs text-gray-500 mt-1">تمويل فوري ومرن</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/loan-application">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">قرض سيارة</p>
                  <p className="text-xs text-gray-500 mt-1">
                    احصل على سيارة أحلامك
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Why CFC */}
      <section className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">لماذا CFC؟</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          مرحباً بكم في CFC، حيث رضاكم هو أولويتنا. اكتشفوا لماذا يعتبر اختيار
          CFC هو أفضل قرار لاحتياجاتكم المالية.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-800">
                أمان وثقة
              </span>
            </div>
            <p className="text-xs text-gray-600">حماية كاملة لبياناتكم</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-800">
                سرعة في الخدمة
              </span>
            </div>
            <p className="text-xs text-gray-600">موافقة فورية</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-800">
                خدمة متميزة
              </span>
            </div>
            <p className="text-xs text-gray-600">دعم على مدار الساعة</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-800">
                خبرة ٤٢ عاماً
              </span>
            </div>
            <p className="text-xs text-gray-600">ريادة في السوق</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mb-6 bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          اقرأ المزيد
        </Button>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl overflow-hidden">
          <CardContent className="p-8 text-center space-y-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">لماذا CFC؟</h3>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <div className="text-4xl font-bold">؟</div>
              </div>
              <p className="text-sm opacity-90 mt-4">
                اكتشف المزايا التي تجعلنا الخيار الأول
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CFC Offers */}
      <section className="p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">عروض CFC</h2>
            <p className="text-sm text-gray-600">أحدث العروض المميزة</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative z-10 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs opacity-90 font-medium">
                    تمويلك بدون كفيل
                  </p>
                  <p className="text-xs opacity-80">بدون تحويل راتب</p>
                </div>
                <div className="text-center py-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">٢٥</span>
                    <span className="text-lg">%</span>
                  </div>
                  <p className="text-xs opacity-90 mt-1">معدل فائدة مخفض</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative z-10 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs opacity-90 font-medium">تمويل سريع</p>
                  <p className="text-xs opacity-80">موافقة فورية</p>
                </div>
                <div className="text-center py-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">١٠</span>
                    <span className="text-lg">%</span>
                  </div>
                  <p className="text-xs opacity-90 mt-1">رسوم إدارية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-xs rounded-full px-4"
          >
            قرض سيارة
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs bg-white border-gray-200 rounded-full px-4"
          >
            قرض نقدي
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-xs rounded-full px-4"
          >
            قرض سكن
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-6 space-y-8 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* About Us */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              من نحن
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                التاريخ
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                الرؤية والرسالة
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                مجلس الإدارة
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                فريق الإدارة
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                الحوكمة المؤسسية
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              خدماتنا
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض نقدي
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض سيارة
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض سكن
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض بحري
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض أثاث
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                قرض تجاري
              </li>
            </div>
          </div>
        </div>

        {/* Social Media & Apps */}
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">تابعنا</h4>
            <div className="flex gap-2">
              {["IG", "FB", "X", "YT", "LI"].map((social, index) => (
                <div
                  key={social}
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">
              حمل التطبيق
            </h4>
            <div className="space-y-1">
              <div className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-800 transition-colors">
                <Download className="w-3 h-3" />
                <span>App Store</span>
              </div>
              <div className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-800 transition-colors">
                <Download className="w-3 h-3" />
                <span>Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            © حقوق الطبع والنشر ٢٠٢٥ شركة التسهيلات التجارية CFC
            <br />
            جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <Loader />
  );
}
