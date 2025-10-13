import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      courses: {
        CoursesHero: {
          title: "Comprehensive English Courses with Tutelage",
          description: "Discover our expertly designed English courses tailored for every learning goal. From general communication to specialized business English, we offer structured programs that guide you from beginner to advanced proficiency with confidence."
        },
        CoursesShowcase: {
          title: "Choose Your Perfect English Course",
          description: "Explore our comprehensive range of English courses designed to meet your specific learning goals and career aspirations",
          courses: [
            {
              title: "English for Kids and Teens",
              description: "Engaging and interactive English learning program designed specifically for young learners aged 6-17. Fun activities, games, and age-appropriate content help children develop strong language skills naturally.",
              features: ["Interactive Games", "Age-Appropriate Content", "Fun Learning Activities"],
              buttonText: "Explore English for Kids and Teens"
            },
            {
              title: "English for Adults",
              description: "Comprehensive English language program tailored for adult learners with busy schedules. Focus on practical skills for work, travel, and daily communication with flexible learning options.",
              features: ["Flexible Scheduling", "Practical Communication", "Career-Focused Skills"],
              buttonText: "Explore English for Adults"
            },
            {
              title: "Academic English",
              description: "Master the English skills needed for academic success, including essay writing, research techniques, presentation skills, and critical thinking in English.",
              features: ["Academic Writing", "Research Skills", "Presentation Techniques"],
              buttonText: "Explore Academic English"
            },
            {
              title: "English Proficiency Tests",
              description: "Prepare for international English proficiency exams like IELTS, TOEFL, and Cambridge with targeted practice and test-taking strategies.",
              features: ["IELTS Preparation", "TOEFL Training", "Cambridge Exams"],
              buttonText: "Explore English Proficiency Tests"
            },
            {
              title: "Business English",
              description: "Develop professional English communication skills for the workplace, including business writing, presentations, negotiations, and meeting facilitation.",
              features: ["Business Communication", "Professional Writing", "Meeting Skills"],
              buttonText: "Explore Business English"
            }
          ],
          keyFeatures: "Key Features:"
        },
        CoursesCTA: {
          title: "Not Sure Which Course is Right for You?",
          description: "Take our comprehensive assessment quiz to discover the perfect English course tailored to your current level, learning goals, and career aspirations. Get personalized recommendations in just a few minutes.",
          features: [
            "5-Minute Assessment",
            "Personalized Results",
            "Expert Recommendations"
          ],
          buttonText: "Take the Course Quiz",
          info: "Free assessment • No registration required • Instant results"
        }
      },
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
      inglishForAdults: {
        first: {
          title: "English for Adults",
          description: "Comprehensive English language program tailored specifically for adult learners with busy schedules. Our flexible approach combines professional instruction, real-world conversation practice, and modern teaching methods to help you achieve fluency and confidence in English communication.",
          enrollButtonText: "Enroll Now",
        },
        second: {
          mainTitle: "Let English be your superpower",
          subtitle: "Reach fluency in no time",
        },
        classTypes: {
          public: {
            title: "Public Classes",
            features: [
              "Live online classes",
              "Practice your language in small groups (3-5) students only",
              "Thorough language placement test",
              "Detailed curriculum backed by Tutelage Method designed to deliver a real-life language exposure to you",
              "Continuous feedback on your fluency and accuracy progress",
              "Course duration is 5 consecutive weeks, 15 classes, more than 22 hours of real conversation with our experienced instructors",
              "Tutelage's certificate of participation"
            ],
            buttonText: "Request Price"
          },
          private: {
            title: "Private Classes",
            features: [
              "Live online class",
              "A Dedicated experienced instructor with full studying support throughout your course",
              "Extra daily materials delivered via a private group with the instructor",
              "The flexibility of creating your own studying package",
              "Tutelage AI: Your personalized 24/7 practice partner, providing instant feedback and customized conversation exercises outside of class time"
            ],
            buttonText: "Request Price"
          }
        },
        inPerson: {
          title: "In-Person Classes",
          description: "Join our in-person classes available at specific locations, offering the same quality and personalized experience as our online programs, with the added benefit of face-to-face interaction and a collaborative learning atmosphere.",
          contactTitle: "Contact us for more information"
        },
        interactiveWay: {
          title: "Learn a new language in an interactive way",
          description: "Join our live online Adult ESL classes and start speaking with confidence! Our courses—available for both small groups (3-5 students) and private study—are designed and taught interactively to maximize your real-life conversation time. We provide a thorough language placement test and use the Tutelage Method for a detailed, effective curriculum with continuous feedback on your progress. Private students get a dedicated instructor, flexible packages, and Tutelage AI, a personalized 24/7 practice partner outside of class. All participants receive a certificate of participation. Don't miss this chance to become one of our success stories!"
        },
        faq: {
          title: "Frequently Asked Questions",
          subtitle: "About Tutelage's English for Adults courses",
          questions: [
            {
              question: "What level of English do I need to enroll in the course?",
              answer: "The courses are organized based on the student's level. It is required from you to go through a language placement test before starting. This ensures we place you in the group that matches your level or helps the private tutor to tailor the curriculum based on your needs."
            },
            {
              question: "How is the class structure designed to be interactive and engaging?",
              answer: "Tutelage classes are both designed and taught in interactive and creative ways. Our experienced instructors encourage and guide the students to incorporate their first language skills into their second language learning. Then implement many lively activities such as: guiding discussions through group and pair work alongside many dynamic activities that maximize your speaking time inside the classroom."
            },
            {
              question: "What is the Tutelage Method, and how does it ensure real-life language exposure?",
              answer: "The Tutelage Method is backed by intensive research written by Tutelage's academic staff in 2022 it includes a detailed curriculum and a full educational framework backing our courses. It is specifically designed to move beyond textbook exercises and provide you with language skills and scenarios relevant to real-life situations, making sure you can confidently use what you learn immediately outside of the classroom."
            },
            {
              question: "What kind of feedback will I receive on my progress?",
              answer: "You will receive continuous feedback from your experienced instructors on both your fluency (how smoothly you speak) and your accuracy (grammar and vocabulary use), helping you clearly understand and track your improvements throughout the entire course. It doesn't matter whether you have enrolled in a group or private course, you are going to receive necessary feedback in both classes."
            },
            {
              question: "Will I receive a certificate after completing the course?",
              answer: "Yes, all participants who successfully complete the course will receive a Tutelage's certificate of participation to officially recognize your progress and achievement."
            }
          ]
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
      }
    }
  },
  ku: {
    translation: {
      courses: {
        CoursesHero: {
          title: "کۆرسە گشتگیرەکانی ئینگلیزی لەگەڵ توتڵج",
          description: "کۆرسە پسپۆڕانە داڕێژراوەکانی ئینگلیزیمان بدۆزەرەوە کە بۆ هەموو ئامانجێکی فێربوون گونجاون. لە پەیوەندی کردنی گشتییەوە تا ئینگلیزی بازرگانی تایبەت، پڕۆگرامە پێکهاتەکانمان پێشکەش دەکەین کە بە متمانە ڕێنماییت دەکەن لە ئاستی سەرەتاییەوە بۆ پسپۆڕی."
        },
        CoursesShowcase: {
          title: "کۆرسی تەواوی ئینگلیزیت هەڵبژێرە",
          description: "گەڕان بۆ کۆمەڵە گشتگیری کۆرسەکانی ئینگلیزیمان کە داڕێژراون بۆ دابینکردنی ئامانجە تایبەتەکانی فێربوون و ئاواتەکانی کارییەکانت",
          courses: [
            {
              title: "ئینگلیزی بۆ منداڵ و گەنجان",
              description: "پڕۆگرامێکی سەرنجڕاکێش و کارلێککراوی فێربوونی ئینگلیزی کە بە تایبەتی بۆ فێرخوازانی گەنجی تەمەن ٦-١٧ ساڵ داڕێژراوە. چالاکی خۆش، یاری و ناوەڕۆکی گونجاو بۆ تەمەن یارمەتی منداڵان دەدات بە سروشتی لێهاتوویی زمانی بەهێز پەرە پێ بدەن.",
              features: ["یاری کارلێککراو", "ناوەڕۆکی گونجاو بۆ تەمەن", "چالاکی فێربوونی خۆش"],
              buttonText: "گەڕان بۆ ئینگلیزی بۆ منداڵ و گەنجان"
            },
            {
              title: "ئینگلیزی بۆ گەورەسالان",
              description: "پڕۆگرامێکی گشتگیری زمانی ئینگلیزی کە بۆ فێرخوازانی گەورەسال کە خشتەی سەرقاڵیان هەیە گونجاوە. گرنگی بە لێهاتوویی کارپێکراو دەدرێت بۆ کار، گەشت و پەیوەندی ڕۆژانە لەگەڵ بژاردەی فێربوونی نەرم.",
              features: ["خشتەکاری نەرم", "پەیوەندی کارپێکراو", "لێهاتووی تەرکیزکراو لەسەر کار"],
              buttonText: "گەڕان بۆ ئینگلیزی بۆ گەورەسالان"
            },
            {
              title: "ئینگلیزی ئەکادیمی",
              description: "لێهاتوویەکانی ئینگلیزی کە پێویستە بۆ سەرکەوتنی ئەکادیمی فێرببە، لەوانە نووسینی وتار، تەکنیکەکانی لێکۆڵینەوە، لێهاتوویی پێشکەشکردن و بیرکردنەوەی ڕەخنەیی بە ئینگلیزی.",
              features: ["نووسینی ئەکادیمی", "لێهاتوویی لێکۆڵینەوە", "تەکنیکەکانی پێشکەشکردن"],
              buttonText: "گەڕان بۆ ئینگلیزی ئەکادیمی"
            },
            {
              title: "تاقیکردنەوەکانی پسپۆڕی ئینگلیزی",
              description: "ئامادەکاری بۆ تاقیکردنەوەکانی نێودەوڵەتی پسپۆڕی ئینگلیزی وەک ئایێڵتس، تۆفڵ و کەیمبریج لەگەڵ مەشقی ئامانجدار و ستراتیژی تاقیکردنەوە.",
              features: ["ئامادەکاری ئایێڵتس", "ڕاهێنانی تۆفڵ", "تاقیکردنەوەکانی کەیمبریج"],
              buttonText: "گەڕان بۆ تاقیکردنەوەکانی پسپۆڕی ئینگلیزی"
            },
            {
              title: "ئینگلیزی بازرگانی",
              description: "لێهاتوویی پەیوەندی پیشەیی ئینگلیزی بۆ شوێنی کار پەرە پێ بدە، لەوانە نووسینی بازرگانی، پێشکەشکردن، دانوستان و ئاسانکاری کۆبوونەوە.",
              features: ["پەیوەندی بازرگانی", "نووسینی پیشەیی", "لێهاتوویی کۆبوونەوە"],
              buttonText: "گەڕان بۆ ئینگلیزی بازرگانی"
            }
          ],
          keyFeatures: "تایبەتمەندییە سەرەکییەکان:"
        },
        CoursesCTA: {
          title: "دڵنیا نیت کام کۆرس گونجاوە بۆ تۆ؟",
          description: "تاقیکردنەوەی هەڵسەنگاندنی گشتگیرمان ئەنجام بدە بۆ دۆزینەوەی کۆرسی تەواوی ئینگلیزی کە بۆ ئاستی ئێستات، ئامانجەکانی فێربوون و ئاواتە کارییەکانت گونجاوە. ڕاسپاردەی کەسیکراو لە چەند خولەکێکدا وەربگرە.",
          features: [
            "هەڵسەنگاندنی ٥ خولەکی",
            "ئەنجامی کەسیکراو",
            "ڕاسپاردەی پسپۆڕانە"
          ],
          buttonText: "تاقیکردنەوەی کۆرس ئەنجام بدە",
          info: "هەڵسەنگاندنی بێبەرامبەر • پێویستی بە تۆمارکردن نییە • ئەنجامی یەکسەر"
        }
      },
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
      inglishForAdults: {
        first: {
          title: "ئینگلیزی بۆ گەورەسالان",
          description: "پڕۆگرامێکی گشتگیری زمانی ئینگلیزی کە بە تایبەتی بۆ فێرخوازانی گەورەسال کە خشتەی سەرقاڵیان هەیە داڕێژراوە. ڕێبازی نەرمی ئێمە ڕاهێنانی پسپۆڕانە، مەشقی گفتوگۆی ڕاستەقینە و شێوازی وانەگوتنەوەی نوێ تێکەڵ دەکات بۆ یارمەتیدانت بۆ گەیشتن بە ڕەوانی و متمانە لە پەیوەندی کردن بە ئینگلیزی.",
          enrollButtonText: "تۆماربوون",
        },
        second: {
          mainTitle: "با ئینگلیزی ببێتە هێزی سەرەکیت",
          subtitle: "بە زوویی بگە بە ڕەوانی",
        },
        classTypes: {
          public: {
            title: "پۆلی گشتی",
            features: [
              "وانەی ڕاستەوخۆی سەرهێڵ",
              "مەشقی زمانەکەت لە گرووپی بچووک (تەنها ٣-٥ قوتابی)",
              "تاقیکردنەوەی ورد بۆ پلەبەندی زمان",
              "مەنهەجێکی ورد پشتگیریکراو لە ڕێبازی توتڵج کە داڕێژراوە بۆ دابینکردنی بەرکەوتنی زمانی ڕاستەقینە بۆت",
              "گەڕاندنەوەی بەردەوام لەسەر پێشکەوتنی ڕەوانی و وردی",
              "ماوەی کۆرس ٥ هەفتەی بەردەوامە، ١٥ وانە، زیاتر لە ٢٢ کاتژمێر گفتوگۆی ڕاستەقینە لەگەڵ ڕاهێنەرە بەئەزموونەکانمان",
              "بڕوانامەی بەشداریکردنی توتڵج"
            ],
            buttonText: "داواکاری نرخ"
          },
          private: {
            title: "پۆلی تایبەت",
            features: [
              "وانەی ڕاستەوخۆی سەرهێڵ",
              "ڕاهێنەرێکی تایبەت و بەئەزموون لەگەڵ پشتگیری تەواوی خوێندن بە درێژایی کۆرسەکەت",
              "کەرەستەی ڕۆژانەی زیادە کە لە ڕێگەی گرووپێکی تایبەتەوە لەگەڵ ڕاهێنەرەکە پێشکەش دەکرێن",
              "نەرمی لە دروستکردنی پاکێجی خوێندنی خۆت",
              "هۆشی دەستکردی توتڵج: هاوبەشی مەشقکردنی کەسیی ٢٤/٧ت، گەڕاندنەوەی یەکسەر و ڕاهێنانی گفتوگۆی کەسیکراو لە دەرەوەی کاتی وانە پێشکەش دەکات"
            ],
            buttonText: "داواکاری نرخ"
          }
        },
        inPerson: {
          title: "پۆلی ڕووبەڕوو",
          description: "بەشداری بکە لە پۆلە ڕووبەڕووەکانمان کە لە شوێنە تایبەتەکاندا بەردەستن، هەمان کوالیتی و ئەزموونی کەسی پێشکەش دەکەن وەک پڕۆگرامە سەرهێڵییەکانمان، لەگەڵ سوودی زیادەی کارلێککردنی ڕووبەڕوو و ژینگەی فێربوونی هاوبەشانە.",
          contactTitle: "پەیوەندیمان پێوە بکە بۆ زانیاری زیاتر"
        },
        interactiveWay: {
          title: "فێربوونی زمانێکی نوێ بە شێوەیەکی کارلێککراو",
          description: "بەشداری بکە لە پۆلە ڕاستەوخۆی سەرهێڵییەکانمان بۆ گەورەسالان و دەست بکە بە قسەکردن بە متمانە! کۆرسەکانمان - کە بۆ گرووپی بچووک (٣-٥ قوتابی) و خوێندنی تایبەت بەردەستن - داڕێژراون و بە شێوەیەکی کارلێککراو وانە دەگوترێنەوە بۆ زۆرکردنی کاتی گفتوگۆی ڕاستەقینەت. تاقیکردنەوەیەکی ورد بۆ پلەبەندی زمان پێشکەش دەکەین و ڕێبازی توتڵج بەکاردەهێنین بۆ مەنهەجێکی ورد و کاریگەر لەگەڵ گەڕاندنەوەی بەردەوام لەسەر پێشکەوتنت. قوتابیانی تایبەت ڕاهێنەرێکی تایبەت، پاکێجی نەرم و هۆشی دەستکردی توتڵج وەردەگرن، هاوبەشێکی مەشقکردنی کەسیی ٢٤/٧ لە دەرەوەی کاتی پۆل. هەموو بەشداربووان بڕوانامەی بەشداریکردن وەردەگرن. ئەم دەرفەتە لە دەست مەدە بۆ ئەوەی ببیتە یەکێک لە چیرۆکە سەرکەوتووەکانمان!"
        },
        faq: {
          title: "پرسیارە دووبارەبووەکان",
          subtitle: "دەربارەی کۆرسەکانی ئینگلیزی بۆ گەورەسالانی توتڵج",
          questions: [
            {
              question: "چ ئاستێکی ئینگلیزیم پێویستە بۆ تۆماربوون لە کۆرسەکە؟",
              answer: "کۆرسەکان لەسەر بنەمای ئاستی قوتابی ڕێکخراون. پێویستە تاقیکردنەوەی پلەبەندی زمان ئەنجام بدەیت پێش دەستپێکردن. ئەمە دڵنیایی دەداتەوە کە لە گرووپێکدا دادەنرێیت کە لەگەڵ ئاستەکەت دەگونجێت یان یارمەتی ڕاهێنەری تایبەت دەدات مەنهەج لەسەر پێداویستیەکانت بگونجێنێت."
            },
            {
              question: "چۆن پێکهاتەی پۆلەکە داڕێژراوە بۆ ئەوەی کارلێککراو و سەرنجڕاکێش بێت؟",
              answer: "پۆلەکانی توتڵج هەم داڕێژراون و هەم بە شێوازی کارلێککراو و داهێنەرانە وانە دەگوترێنەوە. ڕاهێنەرە بەئەزموونەکانمان هاندەدەن و ڕێنمایی قوتابیان دەکەن بۆ بەکارهێنانی لێهاتوویی زمانی یەکەمیان لە فێربوونی زمانی دووەمیان. پاشان چالاکی زیندووی زۆر جێبەجێ دەکەن وەک: ڕێنمایی گفتوگۆکان لە ڕێگەی کاری گرووپی و جووت لەگەڵ چالاکی بەهێز کە کاتی قسەکردنت لە ناو پۆلەکە زۆر دەکات."
            },
            {
              question: "ڕێبازی توتڵج چییە و چۆن دڵنیایی بەرکەوتنی زمانی ڕاستەقینە دەداتەوە؟",
              answer: "ڕێبازی توتڵج پشتگیری لە لێکۆڵینەوەی چڕ دەکرێت کە لەلایەن ستافی ئەکادیمی توتڵجەوە لە ساڵی ٢٠٢٢دا نووسراوە و مەنهەجێکی ورد و چوارچێوەیەکی پەروەردەیی تەواو لەخۆدەگرێت کە پشتگیری کۆرسەکانمان دەکات. بە تایبەتی داڕێژراوە بۆ دەربازبوون لە ڕاهێنانەکانی کتێب و دابینکردنی لێهاتووی زمان و سیناریۆکانی پەیوەندیدار بە دۆخە ڕاستەقینەکان، دڵنیایی لەوە دەداتەوە کە بە متمانە دەتوانیت ئەوەی فێردەبیت یەکسەر لە دەرەوەی پۆلەکە بەکاری بهێنیت."
            },
            {
              question: "چ جۆرە گەڕاندنەوەیەک لەسەر پێشکەوتنم وەردەگرم؟",
              answer: "گەڕاندنەوەی بەردەوام لە ڕاهێنەرە بەئەزموونەکانت وەردەگریت لەسەر هەردوو ڕەوانیت (چۆن بە نەرمی قسە دەکەیت) و وردیت (بەکارهێنانی ڕێزمان و وشەگەل)، یارمەتیت دەدات بە ڕوونی تێبگەیت و پێشکەوتنەکانت بە درێژایی هەموو کۆرسەکە بەدواداچووی بکەیت. گرنگ نییە لە پۆلی گشتی یان تایبەتدا تۆمار بوویت، گەڕاندنەوەی پێویست لە هەردوو پۆلەکەدا وەردەگریت."
            },
            {
              question: "دوای تەواوکردنی کۆرسەکە بڕوانامە وەردەگرم؟",
              answer: "بەڵێ، هەموو بەشداربووانێک کە بە سەرکەوتوویی کۆرسەکە تەواو دەکەن بڕوانامەی بەشداریکردنی توتڵج وەردەگرن بۆ ناسینەوەی فەرمی پێشکەوتن و دەستکەوتەکانیان."
            }
          ]
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
      }
    }
  }
};

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('tutelage-language') || 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(), // Use saved language instead of hardcoded 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tutelage-language', lng);
    
    // Update RTL class on body
    if (lng === 'ku') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }
});

export default i18n;
