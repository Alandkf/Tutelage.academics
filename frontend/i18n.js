import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      inglishForKids: {
        first : {
        title: "English for Kids and Teens",
        description: "Engaging and interactive English learning program designed specifically for young learners aged 5-17. Our innovative approach combines fun games, creative activities, and age-appropriate content to make learning English an enjoyable and effective experience.",
        enrollButtonText: "Enroll Now",
        }
      },
    }
  },
  ku: {
    translation: {
      inglishForKids: {
        first: {
        title: "ئینگلیزی بۆ منداڵ و تازە پێگەیشتوان",
        description: "بەرنامەی فێرکاری ئینگلیزی کە تایبەتمەندی بۆ خوێندکارانی بچووکەکان و تازە پێگەیشتوانی تەمەن 5-17 ساڵ هەیە. ڕێگای نوێمان کۆمەڵە یارییە خۆش و چالاکی دروست دەکات و ناوەرۆکی گونجاو بۆ تەمەن بەکاردێنێت بۆ ئەوەی فێرکاری ئینگلیزی بە شێوەیەکی خۆش و کاریگەر بکرێتەوە.",
        enrollButtonText: "خۆت تۆمار بکە",
        }
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
