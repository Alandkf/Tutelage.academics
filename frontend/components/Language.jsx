'use client';

import i18n from '@/i18n';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png?20250221172329" },
  { code: 'ku', label: 'کوردی', url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Kurdistan.svg/1200px-Flag_of_Kurdistan.svg.png" },
];

const Language = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRTL, setIsRTL] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tutelage-language') || 'en';
    const language = languages.find(lang => lang.code === savedLanguage);
    
    if (language) {
      setSelectedLanguage(language.label);
      
      // Apply RTL if Kurdish
      if (savedLanguage === 'ku') {
        document.body.classList.add('rtl');
        setIsRTL(true);
      } else {
        document.body.classList.remove('rtl');
        setIsRTL(false);
      }

      // Sync with i18n if different
      if (i18n.language !== savedLanguage && i18n.changeLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  // Check for RTL direction changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsRTL(document.body.classList.contains('rtl'))
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Initial check
    setIsRTL(document.body.classList.contains('rtl'))

    return () => observer.disconnect()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (code) => {
    const language = languages.find(lang => lang.code === code);
    setSelectedLanguage(language.label);
    
    // Save to localStorage
    localStorage.setItem('tutelage-language', code);
    
    // Change language in i18n
    if (i18n.changeLanguage) {
      i18n.changeLanguage(code);
    }

    // Update RTL class on body
    if (code === 'ku') {
      document.body.classList.add('rtl');
      setIsRTL(true);
    } else {
      document.body.classList.remove('rtl');
      setIsRTL(false);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-sm font-medium text-gray-700 hover:text-yellow-400 dark:text-white dark:hover:text-gray-200 rounded-md focus:outline-none p-1 ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image 
          src={languages.find(lang => lang.label === selectedLanguage)?.url} 
          alt={selectedLanguage} 
          width={24} 
          height={16} 
          className="inline-block "
        />
        <svg
          className={`${isOpen ? 'transform rotate-180' : ''} h-4 w-4 transition ${isRTL ? 'mr-1' : 'ml-1'}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className={`z-50 origin-top absolute mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 ${isRTL ? 'left-0' : 'right-0'}`}>
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
              >
                <Image src={language.url} alt={language.label} width={20} height={20} className={`inline-block ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;