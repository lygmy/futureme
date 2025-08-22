'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const [timeValue, setTimeValue] = useState('6');
  const [timeUnit, setTimeUnit] = useState('months');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const router = useRouter();

  const calculateDeliveryDate = () => {
    const now = new Date();
    const value = parseInt(timeValue);
    
    if (timeUnit === 'months') {
      now.setMonth(now.getMonth() + value);
    } else if (timeUnit === 'years') {
      now.setFullYear(now.getFullYear() + value);
    } else if (timeUnit === 'days') {
      now.setDate(now.getDate() + value);
    }
    
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSendToFuture = () => {
    const params = new URLSearchParams({
      timeValue,
      timeUnit,
      countryCode,
      phoneNumber,
      letterContent
    });
    
    router.push(`/confirmation?${params.toString()}`);
  };


  return (
    <div className="min-h-screen bg-[#E8E7E5] flex items-center justify-center p-4">
      <div className="w-full max-w-[540px] flex flex-col items-center gap-8 sm:gap-11">
        {/* Delivery Settings */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-1 text-base font-marist text-[#4E4E4E] text-center">
          {/* First line on mobile: time selection */}
          <div className="flex items-center justify-center gap-1 whitespace-nowrap">
            <span>Deliver in</span>
            
            <div className="px-3 py-2 bg-[#EDECEA] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#D1D0CD] flex items-center">
              <input
                type="number"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-8 bg-transparent text-center text-[#4E4E4E] text-base font-marist outline-none"
                min="1"
              />
            </div>
            
            <div className="relative">
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="p-2 bg-[#EDECEA] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#D1D0CD] text-[#4E4E4E] text-base font-marist appearance-none pr-8 cursor-pointer"
                aria-label="Time unit"
              >
                <option value="days">days</option>
                <option value="months">months</option>
                <option value="years">years</option>
              </select>
              <Image
                src="/icons/downward-carat.svg"
                alt=""
                width={12}
                height={12}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
            
            <span className="hidden sm:inline">({calculateDeliveryDate()})</span>
          </div>

          {/* Mobile: Date display */}
          <div className="sm:hidden text-[#4E4E4E]">
            ({calculateDeliveryDate()})
          </div>

          {/* Second line on mobile: phone selection */}
          <div className="flex items-center justify-center gap-1 whitespace-nowrap">
            <span>to</span>
            
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="p-2 bg-[#EDECEA] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#D1D0CD] text-[#4E4E4E] text-base font-marist appearance-none pr-8 cursor-pointer"
                aria-label="Country code"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+33">+33</option>
                <option value="+49">+49</option>
              </select>
              <Image
                src="/icons/downward-carat.svg"
                alt=""
                width={12}
                height={12}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
            
            <div className="p-2 bg-[#EDECEA] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#D1D0CD] flex items-center min-w-[116px]">
              <input
                type="tel"
                placeholder="(123) 456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-transparent text-[#4E4E4E] placeholder:text-[#999999] text-base font-marist outline-none w-full"
              />
            </div>
            
            <span>.</span>
          </div>
        </div>

        {/* Letter */}
        <div className="w-full px-6 sm:px-12 py-6 sm:py-9 bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05),_0px_7px_7px_0px_rgba(0,0,0,0.04),_0px_16px_10px_0px_rgba(0,0,0,0.03),_0px_29px_11px_0px_rgba(0,0,0,0.01),_0px_45px_12px_0px_rgba(0,0,0,0.00)] outline outline-[0.5px] outline-offset-[-0.5px] outline-[#F2F2F2] rounded-[4px] flex flex-col gap-4 sm:gap-5">
          <div className="text-[#999999] text-base font-normal font-marist">
            {getCurrentDate()}
          </div>
          
          <div className="h-[0.5px] bg-[#DCDCDC]"></div>
          
          <textarea
            placeholder="Dear future me,"
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            className="w-full h-[400px] sm:h-[576px] bg-transparent text-[#4E4E4E] placeholder:text-[#999999] text-base font-marist resize-none outline-none leading-relaxed pr-4"
          />
        </div>

        {/* Send Button */}
        <div className="relative w-full sm:w-96 h-11 max-w-md">
          <div className="w-full h-full bg-gradient-to-b from-stone-300 to-stone-400 rounded-[36px] shadow-[inset_0px_1px_2px_1px_rgba(255,255,255,0.40)] outline outline-[0.5px] outline-offset-[-0.5px] outline-[#908E8B]"></div>
          <button 
            onClick={handleSendToFuture}
            className="absolute inset-0 flex items-center justify-center text-[#4E4E4E] text-base font-medium font-marist"
          >
            Send to the Future
          </button>
        </div>
      </div>
    </div>
  );
}
