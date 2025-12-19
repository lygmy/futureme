'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [timeValue, setTimeValue] = useState('6');
  const [timeUnit, setTimeUnit] = useState('months');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    // Delay content appearance for bounce animation
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  };

  const handleClosePopup = () => {
    setShowContent(false);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 200);
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const calculateDeliveryDate = () => {
    const now = new Date();
    const value = parseInt(timeValue);

    //When user clears input, return current date
    if (timeValue === '') {
    console.log('Function execution stopped: Input is empty');
    const defaultMonthName = now.toLocaleDateString('en-US', { month: 'long' });
    return `${defaultMonthName} ${now.getDate()}${getOrdinalSuffix(now.getDate())} ${now.getFullYear()}`;
  }

    if (timeUnit === 'months') {
      now.setMonth(now.getMonth() + value);
    } else if (timeUnit === 'years') {
      now.setFullYear(now.getFullYear() + value);
    } else if (timeUnit === 'days') {
      now.setDate(now.getDate() + value);
    }

    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const day = now.getDate();
    const year = now.getFullYear();

    return `${month} ${day}${getOrdinalSuffix(day)} ${year}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const day = now.getDate();
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${month} ${day}${getOrdinalSuffix(day)}, ${time}`;
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
    <div className="relative min-h-screen w-full">
      {/* Paper texture background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/paper%20texture%20seamless.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '434px 434px'
        }}
      />

      {/* Top gradient with progressive blur */}
      <div className="fixed top-0 left-0 right-0 h-[129px] z-20 pointer-events-none">
        <div className="absolute inset-0 backdrop-blur-md" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(234,232,222,0.3)] to-transparent" />
      </div>

      {/* Bottom gradient with progressive blur */}
      <div className="fixed bottom-0 left-0 right-0 h-[129px] z-20 pointer-events-none">
        <div className="absolute inset-0 backdrop-blur-md" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(234,232,222,0.5)] to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-[5] flex flex-col gap-4 px-4 pt-20 pb-[180px] max-w-full mx-auto md:max-w-[540px] lg:max-w-[540px]">
        {/* Date header - scrolls with content */}
        <div className="text-[#999999] text-[18px] font-normal font-marist">
          {getCurrentDate()}
        </div>

        <div className="h-[0.5px] bg-[#DCDCDC]"></div>

        {/* Letter textarea - expands with content, whole page scrolls */}
        <textarea
          placeholder="Dear future me,"
          value={letterContent}
          onChange={(e) => {
            setLetterContent(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          className="w-full bg-transparent text-[#4E4E4E] placeholder:text-[#999999] text-[18px] font-marist resize-none outline-none leading-normal overflow-hidden"
          style={{ minHeight: '800px' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
      </div>

      {/* Fixed button at bottom */}
      <motion.button
        onClick={handleOpenPopup}
        animate={isPopupOpen ? "primary" : "secondary"}
        variants={{
          secondary: {
            background: 'linear-gradient(to bottom, rgba(235,235,235,0.7), rgba(192,192,192,0.7))',
            borderColor: '#CECECE',
            color: '#4E4E4E'
          },
          primary: {
            background: 'linear-gradient(to bottom, #5B5B5B, #2D2D2D)',
            borderColor: '#6E6E6E',
            color: '#FFFFFF'
          }
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30 w-[calc(100%-32px)] max-w-[363px] h-[49px] border rounded-[47px] text-[18px] font-['ABC_Monument_Grotesk'] backdrop-blur-sm shadow-lg"
      >
        Send to the future
      </motion.button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.3)]"
              onClick={handleClosePopup}
            />

            {/* Popup - positioned at bottom matching button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              style={{ transformOrigin: 'bottom center' }}
              className="fixed bottom-12 left-4 right-4 z-50 bg-white rounded-[28px] shadow-[0px_3px_12px_0px_rgba(0,0,0,0.15),0px_1px_34px_4px_rgba(0,0,0,0.05)] font-['ABC_Monument_Grotesk'] max-w-[calc(540px-32px)] mx-auto p-3"
            >
              {/* Close button - fades in after scale */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleClosePopup}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-[#999999] hover:text-[#4E4E4E] z-10"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#E8E8E8"/>
                  <path d="M18 10L10 18M10 10L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>

              {/* Content - fades in after scale */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-10 pt-11 px-3 pb-0"
              >
              {/* Text content */}
              <div className="flex flex-col gap-2">
                <p className="text-[#787878] text-[28px] leading-normal font-['ABC_Monument_Grotesk']">
                  Your letter will arrive in
                </p>

                {/* Time selection row */}
                <div className="flex gap-2 items-center">
                  <div className="bg-[#F5F4F2] px-4 py-2 rounded-lg flex items-center justify-center shrink-0">
                    <input
                      type="number"
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                      className="bg-transparent text-[#4E4E4E] text-[28px] outline-none font-['ABC_Monument_Grotesk'] text-center"
                      style={{ width: '2ch', minWidth: '2ch' }}
                      min="1"
                    />
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value)}
                      className="bg-[#F5F4F2] pl-4 pr-10 py-2 rounded-lg text-[#4E4E4E] text-[28px] outline-none appearance-none cursor-pointer font-['ABC_Monument_Grotesk']"
                    >
                      <option value="days">days</option>
                      <option value="months">months</option>
                      <option value="years">years</option>
                    </select>
                    <Image
                      src="/icons/downward-carat.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  <p className="text-[#787878] text-[28px] leading-normal font-['ABC_Monument_Grotesk'] shrink-0">,</p>
                </div>

                <p className="text-[#787878] text-[28px] leading-normal font-['ABC_Monument_Grotesk']">
                  {calculateDeliveryDate()}, at
                </p>

                {/* Phone number row */}
                <div className="flex gap-2 items-center">
                  <div className="bg-[#F5F4F2] px-4 py-2 rounded-lg flex items-center justify-center shrink-0">
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent text-[#4E4E4E] text-[28px] outline-none font-['ABC_Monument_Grotesk'] w-full"
                      placeholder="+1"
                      style={{ width: `${Math.max(countryCode.length, 2)}ch` }}
                    />
                  </div>
                  <div className="bg-[#F5F4F2] px-4 py-2 rounded-lg flex-1 min-w-0">
                    <input
                      type="tel"
                      placeholder="(281) 888-0123"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-transparent text-[#4E4E4E] placeholder:text-[#999999] text-[28px] outline-none font-['ABC_Monument_Grotesk'] w-full"
                    />
                  </div>
                  <p className="text-[#787878] text-[28px] leading-normal font-['ABC_Monument_Grotesk'] shrink-0">.</p>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleSendToFuture}
                className="w-[calc(100vw-64px)] max-w-[363px] mx-auto h-[49px] bg-gradient-to-b from-[#5B5B5B] to-[#2D2D2D] border border-[#6E6E6E] rounded-[47px] text-white text-[18px] font-['ABC_Monument_Grotesk'] backdrop-blur-sm"
              >
                Send to the future
              </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
