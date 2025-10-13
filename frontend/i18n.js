import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      inglishForKids: {
        first: {
          title: "English for Kids and Teens",
          description: "Engaging and interactive English learning program designed specifically for young learners aged 5-17. Our innovative approach combines fun games, creative activities, and age-appropriate content to make learning English an enjoyable and effective experience.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English Language be their superpower",
          subtitle: "Start your Language journey with Tutelage",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "Small groups (3-5 learners only)",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Age-specific for top results",
              "Certificate of completion",
              "32 lessons per course"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live Online classes",
              "For ages 5-17",
              "One-on-one lessons (1 learner only)",
              "Designed course for each learner",
              "Practice with AI companion",
              "Fun games and interactive lessons backed by Tutelage Method",
              "Certificate of completion",
              "Flexibility in time and schedule",
              "16 lessons"
            ],
            buttonText: "Request Price"
          }
        },
        funWay: {
          title: "Learn a New Language the Fun Way",
          description: "Tutelage classes for kids and teens use research-proven methods to deliver age-specific, interactive lessons that make learning engaging and effective. Small groups of 3–5 students allow personalized attention from experienced teachers. Fun games, creative activities, and continuous feedback help every student reach their full potential. In a safe online environment with certificates of completion."
        },
        whyBest: {
          title: "Why we are the best choice",
          items: [
            {
              title: "Expert Instructors",
              description: "Learn from qualified native English speakers with years of teaching experience and proven track records."
            },
            {
              title: "Flexible Scheduling",
              description: "Choose from multiple time slots that fit your busy lifestyle with options for weekend and evening classes."
            },
            {
              title: "Proven Results",
              description: "Join thousands of successful students who have achieved their English learning goals with our effective methods."
            },
            {
              title: "Interactive Learning",
              description: "Experience engaging lessons with modern teaching techniques, games, and real-world conversation practice."
            }
          ]
        },
        similarCourses: {
          title: "Similar Courses",
          description: "Explore other English courses that might interest you and complement your learning journey.",
          viewButton: "View Course",
          viewAllButton: "View All Courses",
          duration: "Duration"
        },
        howToEnroll: {
          title: "How to Enroll?",
          description: "Join thousands of learners worldwide and learn the English language with ease in the most fun and interactive ways.",
          steps: [
            {
              title: "Request Payment",
              description: "Fill out our enrollment form with your information and course preferences to begin your journey with us."
            },
            {
              title: "Enroll",
              description: "Complete the secure payment process and receive instant confirmation of your enrollment via email."
            },
            {
              title: "Placement Test",
              description: "Take our comprehensive placement test to determine your current English level and find the right starting point."
            },
            {
              title: "Start Learning",
              description: "Join your scheduled classes with expert instructors and begin your interactive English learning experience."
            }
          ]
        },
        requestPricing: {
          title: "Request Pricing and Course Information",
          description: "Contact us to speak with an enrollment advisor about our pricing, flexible payment plans, and to get more information about our language programs.",
          form: {
            country: "Country of Residence",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            zipCode: "Zip Code",
            interestedIn: "I'm Interested In",
            classType: "Class Type",
            testType: "Test Type",
            message: "Message (Optional)",
            messagePlaceholder: "Tell us more about your learning goals or any questions you have...",
            selectCourse: "Select a course",
            selectClassType: "Select class type",
            selectTestType: "Select test type",
            submitButton: "Request Pricing",
            submittingButton: "Submitting Request...",
            required: "*",
            info1: "Our enrollment team will respond to your inquiry via email or phone as soon as possible",
            info2: "Please check your email and phone for our response within 24 hours"
          }
        }
      },
    }
  },
  ku: {
    translation: {
      inglishForKids: {
        first: {
          title: "ئینگلیزی بۆ منداڵ و گەنجان",
          description: "پڕۆگرامێکی فێربوونی ئینگلیزی کە بە تایبەتی بۆ فێرخوازانی گەنج لە تەمەنی ٥-١٧ ساڵ داڕێژراوە. ڕێبازی نوێی ئێمە یاری خۆش، چالاکی داهێنەرانە و ناوەڕۆکی گونجاو بۆ تەمەن تێکەڵ دەکات بۆ ئەوەی فێربوونی ئینگلیزی بکاتە ئەزموونێکی خۆش و کاریگەر.",
          enrollButtonText: "تۆماربوون",
        },
        second: {
          mainTitle: "با زمانی ئینگلیزی ببێتە هێزی سەرەکی منداڵەکانتان",
          subtitle: "گەشتی زمانەکەت لەگەڵ توتڵج دەست پێ بکە",
        },
        classTypes: {
          public: {
            title: "پۆلی گشتی",
            features: [
              "وانەی ڕاستەوخۆی سەرهێڵ",
              "بۆ تەمەنی ٥-١٧ ساڵ",
              "گرووپی بچووک (تەنها ٣-٥ فێرخواز)",
              "مەشق لەگەڵ هاوبەشی دەستکرد",
              "یاری خۆش و وانە کارلێککراوەکان پشتگیریکراو لە ڕێبازی توتڵج",
              "تایبەت بە تەمەن بۆ باشترین ئەنجامەکان",
              "بڕوانامەی تەواوکردن",
              "٣٢ وانە بۆ هەر کۆرسێک"
            ],
            buttonText: "داواکاری نرخ"
          },
          private: {
            title: "پۆلی تایبەت",
            features: [
              "وانەی ڕاستەوخۆی سەرهێڵ",
              "بۆ تەمەنی ٥-١٧ ساڵ",
              "وانەی تاکە کەس (تەنها ١ فێرخواز)",
              "کۆرسێکی داڕێژراو بۆ هەر فێرخوازێک",
              "مەشق لەگەڵ هاوبەشی دەستکرد",
              "یاری خۆش و وانە کارلێککراوەکان پشتگیریکراو لە ڕێبازی توتڵج",
              "بڕوانامەی تەواوکردن",
              "نەرمی لە کات و خشتەی کاتژمێر",
              "١٦ وانە"
            ],
            buttonText: "داواکاری نرخ"
          }
        },
        funWay: {
          title: "فێربوونی زمانێکی نوێ بە شێوەیەکی خۆش",
          description: "پۆلەکانی توتڵج بۆ منداڵ و گەنجان شێوازی پشتڕاستکراوی لێکۆڵینەوە بەکاردەهێنن بۆ پێشکەشکردنی وانە کارلێککراوەکانی تایبەت بە تەمەن کە فێربوون دەکەنە سەرنجڕاکێش و کاریگەر. گرووپی بچووکی ٣-٥ قوتابی ڕێگە بە سەرنجی تاکە کەسی دەدات لە مامۆستایانی بەئەزموونەوە. یاری خۆش، چالاکی داهێنەرانە و گەڕاندنەوەی بەردەوام یارمەتی هەر قوتابییەک دەدات بگاتە توانای تەواوی خۆی. لە ژینگەیەکی سەرهێڵی پارێزراو لەگەڵ بڕوانامەی تەواوکردن."
        },
        whyBest: {
          title: "بۆچی ئێمە باشترین هەڵبژاردەین",
          items: [
            {
              title: "مامۆستایانی پسپۆڕ",
              description: "فێربە لە قسەکەرانی ڕەسەنی ئینگلیزی کە ساڵانێکی ئەزموونی وانەگوتنەوەیان هەیە و تۆمارێکی سەلماوەیان هەیە."
            },
            {
              title: "خشتەی کاتی نەرم",
              description: "هەڵبژێرە لە چەندین کاتی بەردەست کە لەگەڵ ژیانی سەرقاڵت دەگونجێت لەگەڵ بژاردەکانی پۆلی کۆتایی هەفتە و ئێوارە."
            },
            {
              title: "ئەنجامی سەلماوە",
              description: "پەیوەندی بکە بە هەزاران قوتابی سەرکەوتوو کە ئامانجەکانی فێربوونی ئینگلیزییان بەدەستهێناوە بە شێوازە کاریگەرەکانمان."
            },
            {
              title: "فێربوونی کارلێککراو",
              description: "ئەزموونی وانە سەرنجڕاکێشەکان بکە لەگەڵ تەکنیکی وانەگوتنەوەی نوێ، یاری و مەشقی گفتوگۆی ڕاستەقینە."
            }
          ]
        },
        similarCourses: {
          title: "کۆرسە هاوشێوەکان",
          description: "گەڕان بۆ کۆرسەکانی تری ئینگلیزی کە ڕەنگە سەرنجت ڕابکێشن و گەشتی فێربوونەکەت تەواو بکەن.",
          viewButton: "بینینی کۆرس",
          viewAllButton: "بینینی هەموو کۆرسەکان",
          duration: "ماوە"
        },
        howToEnroll: {
          title: "چۆن تۆمار ببم؟",
          description: "پەیوەندی بکە بە هەزاران فێرخواز لە سەرانسەری جیهان و فێری زمانی ئینگلیزی ببە بە ئاسانی لە خۆشترین و کارلێکترین شێوازەکاندا.",
          steps: [
            {
              title: "داواکاری پارەدان",
              description: "فۆڕمی تۆماربوونمان پڕبکەرەوە بە زانیاریەکانت و هەڵبژاردنەکانی کۆرسەکەت بۆ دەستپێکردنی گەشتەکەت لەگەڵمان."
            },
            {
              title: "تۆماربوون",
              description: "پرۆسەی پارەدانی پارێزراو تەواو بکە و دڵنیایی یەکجارەکی تۆماربوونەکەت وەربگرە لە ڕێگەی ئیمەیڵەوە."
            },
            {
              title: "تاقیکردنەوەی پلەبەندی",
              description: "تاقیکردنەوەی گشتگیری پلەبەندیمان ئەنجام بدە بۆ دیاریکردنی ئاستی ئینگلیزیت لە ئێستادا و دۆزینەوەی خاڵی دەستپێکردنی گونجاو."
            },
            {
              title: "دەستکردن بە فێربوون",
              description: "پەیوەندی بکە بە پۆلە خشتەکراوەکانت لەگەڵ مامۆستایانی پسپۆڕ و دەست بکە بە ئەزموونی فێربوونی کارلێکی ئینگلیزی."
            }
          ]
        },
        requestPricing: {
          title: "داواکاری نرخ و زانیاری کۆرس",
          description: "پەیوەندیمان پێوە بکە بۆ قسەکردن لەگەڵ ڕاوێژکاری تۆماربوون دەربارەی نرخەکانمان، پلانی پارەدانی نەرم و وەرگرتنی زیاتر زانیاری دەربارەی پڕۆگرامە زمانییەکانمان.",
          form: {
            country: "وڵاتی نیشتەجێبوون",
            firstName: "ناوی یەکەم",
            lastName: "ناوی کۆتایی",
            email: "ئیمەیڵ",
            phone: "ژمارەی تەلەفۆن",
            zipCode: "کۆدی پۆستە",
            interestedIn: "حەزم لێیە",
            classType: "جۆری پۆل",
            testType: "جۆری تاقیکردنەوە",
            message: "پەیام (بژاردەیی)",
            messagePlaceholder: "زیاتر پێمان بڵێ دەربارەی ئامانجەکانی فێربوونت یان هەر پرسیارێکت هەیە...",
            selectCourse: "کۆرسێک هەڵبژێرە",
            selectClassType: "جۆری پۆل هەڵبژێرە",
            selectTestType: "جۆری تاقیکردنەوە هەڵبژێرە",
            submitButton: "داواکاری نرخ",
            submittingButton: "ناردنی داواکاری...",
            required: "*",
            info1: "تیمی تۆماربوونمان وەڵامی پرسیارەکەت دەداتەوە لە ڕێگەی ئیمەیڵ یان تەلەفۆنەوە لە زووترین کاتدا",
            info2: "تکایە ئیمەیڵ و تەلەفۆنەکەت بپشکنە بۆ وەڵامەکەمان لە ماوەی ٢٤ کاتژمێردا"
          }
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
