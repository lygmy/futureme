'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationFading, setAnimationFading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const timeValue = searchParams.get('timeValue') || '6';
  const timeUnit = searchParams.get('timeUnit') || 'months';
  const countryCode = searchParams.get('countryCode') || '+1';
  const phoneNumber = searchParams.get('phoneNumber') || '';

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

  const handleAnimationEnd = () => {
    // Start fade out animation
    setAnimationFading(true);
    
    // After fade out completes, hide animation and show confirmation
    setTimeout(() => {
      setShowAnimation(false);
      setShowConfirmation(true);
    }, 300); // 500ms fade duration
  };

  const handleBackToForm = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Paper texture background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/paper%20texture%20seamless.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '434px 434px'
        }}
      />

      {/* Animation */}
      {showAnimation && (
        <div
          className={`absolute inset-0 flex items-center justify-center w-full h-full z-10 transition-opacity duration-500 ease-in-out ${
            animationFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <video
            playsInline //prevents native player from opening on iOS
            autoPlay
            muted
            onEnded={handleAnimationEnd}
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
          >
            <source src="/images/letter-animation.mov" type="video/mp4" />
            <source src="/images/letter-animation.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="text-center space-y-8 opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards] relative z-10">
          <div className="space-y-2">
            <h1 className="text-[24px] font-['ABC_Monument_Grotesk'] text-[#4E4E4E]">
              Letter Sent to the Future!
            </h1>
            <p className="text-[18px] font-marist text-[#999999]">
              Your letter will be delivered on {calculateDeliveryDate()} to {countryCode} {phoneNumber}
            </p>
          </div>
          <button
            onClick={handleBackToForm}
            className="px-8 h-[49px] bg-gradient-to-b from-[#5B5B5B] to-[#2D2D2D] border border-[#6E6E6E] rounded-[47px] text-white text-[18px] font-['ABC_Monument_Grotesk'] shadow-lg backdrop-blur-sm cursor-pointer"
          >
            Send Another Letter
          </button>
        </div>
      )}
    </div>
  );
}