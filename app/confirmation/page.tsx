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
    <div className="min-h-screen bg-[#E8E7E5] flex flex-col items-center justify-center p-4 relative">
      {/* Animation */}
      {showAnimation && (
        <div 
          className={`absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-500 ease-in-out ${
            animationFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <video
            autoPlay
            muted
            onEnded={handleAnimationEnd}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          >
            <source src="/images/letter-animation.mov" type="video/mp4" />
            <source src="/images/letter-animation.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="text-center space-y-6 opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards]">
          <div className="space-y-2">
            <h1 className="text-2xl font-marist text-[#4E4E4E] font-medium">
              Letter Sent to the Future!
            </h1>
            <p className="text-base font-marist text-[#999999]">
              Your letter will be delivered on {calculateDeliveryDate()} to {countryCode} {phoneNumber}
            </p>
          </div>
          <button
            onClick={handleBackToForm}
            className="px-8 py-3 bg-gradient-to-b from-stone-300 to-stone-400 rounded-[36px] shadow-[inset_0px_1px_2px_1px_rgba(255,255,255,0.40)] outline outline-[0.5px] outline-offset-[-0.5px] outline-[#908E8B] text-[#4E4E4E] text-base font-medium font-marist cursor-pointer"
          >
            Send Another Letter
          </button>
        </div>
      )}
    </div>
  );
}