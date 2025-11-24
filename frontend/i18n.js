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
          title: "Frequently Asked Questions(FAQs)",
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
      },
      enroll: {
        title: "Enroll",
        titleWithCourse: "Enroll in",
        subtitle: "Take the first step towards mastering English. Fill out the form below and we'll get in touch with you soon.",
        form: {
          fullName: "Full Name",
          fullNamePlaceholder: "Enter your full name",
          email: "Email Address",
          emailPlaceholder: "Enter your email address",
          phone: "Phone Number",
          phonePlaceholder: "Enter your phone number",
          age: "Age",
          agePlaceholder: "Enter your age",
          profession: "Profession",
          professionPlaceholder: "Select your profession",
          professionTooltip: "Choose the option that best describes your current education or work status.",
          course: "Course",
          coursePlaceholder: "Select a course",
          submitButton: "Submit Enrollment",
          submittingButton: "Submitting...",
          required: "*"
        },
        infoMessage: "Please fill out this form to enroll in your chosen course. Our team will contact you as soon as possible via email or phone to discuss your learning goals and schedule.",
        sidebar: {
          exploreOtherCourses: "Explore Other Courses",
          exploreDescription: "Discover more ways to improve your English",
          viewAllCourses: "View All Courses",
          tryTutelageAI: "Try Tutelage AI",
          aiDescription: "Powerful tutoring AI designed for English learning",
          aiContent: "Experience our AI-powered English tutor that helps you learn and speak more confidently. Practice conversations, get instant feedback, and improve faster.",
          launchAI: "Launch Tutelage AI",
          findYourLevel: "Find Your Level",
          levelDescription: "Discover your English proficiency level",
          levelContent: "Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development.",
          takePlacementTest: "Take Free Test",
          practiceTests: "Practice Tests",
          practiceDescription: "Test your skills with our practice exams",
          freePracticeTests: "Free Practice Tests",
          mockTests: "International Mock Tests"
        },
        successDialog: {
          title: "Enrollment Successful! 🎉",
          description: "Thank you for enrolling with Tutelage! We have successfully received your application.",
          message: "Our team will be in touch with you via email or phone number within 24 hours to discuss your learning goals and help you get started on your English learning journey.",
          button: "Continue Exploring"
        }
      },
      ArabicCourse: {
        title: "Arabic Language Classes",
        description: "Why enroll in Tutelage Arabic classes? Experience interactive and engaging Arabic classes that fully immerse you in the language. With a skilled teacher and a well-designed curriculum, you’ll quickly boost your confidence and improve your everyday Arabic skills. This course is ideal for anyone who wants to learn or enhance their Arabic proficiency.",
        secondTitle: "Discover your ideal class!",
        classTypes: {
          online: {
            title: "Online Private Classes",
            features: [
              "Online Private Classes",
              "One-on-one Arabic language instruction",
              " Personalized study plan based on your goals",
              "Daily materials, homework, and feedback",
              "Flexible scheduling for online lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy lessons at any time and from any place."
            ],
            buttonText: "Ask for Price"
          },
          inPerson: {
            title: "In-Person Private Classes",
            features: [
              "In-Person Private Classes",
              "One-on-one Arabic language instruction",
              "Personalized study plan based on your goals",
              "Printed and in-class materials with guided practice",
              "Suited schedule for face-to-face lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy learning in a supportive classroom environment",
              "Note: this course only available at select locations."
            ],
            buttonText: "Ask for Price"
          },
        },
        thirdTitle: "Arabic Classes for All Ages!",
        thirdCard: {
          kids:{
            title: "For Kids",
            desc: "Enjoy interactive Arabic lessons full of games, fun activities and shortstories that make learning simple and exciting."
          },
          teens:{
            title: "For Teens",
            desc: "Dynamic Arabic classes designed to boost language skills, confidence, and communication abilities for teenagers."
          },
          adults:{
            title: "For Adults",
            desc: "Practical Arabic courses that help adults enhance everyday communication and achieve greater fluency efficiently."
        }
                  },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's Arabic courses",
          questions: [
            {
              question: "Who can join the classes?",
              answer: "Our classes are open to kids, teens, and adults at all levels."
            },
            {
              question: "Are classes online, in-person?",
              answer: "We offer private online classes and face-to-face classes available at select locations."
            },
            {
              question: "How long is each class?",
              answer: "Class duration is flexible and can be adjusted to your schedule and learning goals."
            },
            {
              question: "Do you provide study materials?",
              answer: "Yes, all students receive daily materials, homework, and feedback."
            },
            {
              question: "Can I choose my schedule?",
              answer: "Absolutely! We offer flexible scheduling for both online and in-person lessons."
            },
            {
              question: "Will I get a certificate?",
              answer: "Yes, a Tutelage certificate is awarded upon completion of the course."
            }
          ]
        },
        enrollForm: {
          title: "Enroll now!",
          subtitle: "Register your Arabic class",
          firstName: "First name",
          lastName: "Last name",
          age: "Age",
          country: "Country",
          classType: "Type of class",
          phone: "Phone",
          email: "Email",
          interestedIn: "Interested in",
          selectClassType: "Select class type",
          selectLanguage: "Select language",
          submitButton: "Submit",
          submittingButton: "Submitting...",
          required: "*"
        }
      },
      KurdishCourse: {
        title: "Kurdish Language Classes",
        description: "Why enroll in Tutelage Kurdish classes? Our Kurdish classes are interactive and engaging, designed to fully immerse students in the language. With a qualified teacher and a well-structured curriculum, you’ll build confidence and improve your everyday Kurdish skills quickly and effectively. Whether you are a member of the Kurdish diaspora or a passionate individual seeking to learn or improve the Kurdish language, this course is specifically designed for you.",
        secondTitle: "Find your perfect class",
        classTypes: {
          online: {
            title: "Online Private Classes",
            features: [
              "Online Private Classes",
              "One-on-one Kurdish language instruction",
              "Personalized study plan based on your goals",
              "Daily materials, homework, and feedback",
              "Flexible scheduling for online lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy lessons at any time and from any place."
            ],
            buttonText: "Ask for Price"
          },
          inPerson: {
            title: "In-Person Private Classes",
            features: [
              "In-Person Private Classes",
              "One-on-one Kurdish language instruction",
              "Personalized study plan based on your goals",
              "Printed and in-class materials with guided practice",
              "Suited schedule for face-to-face lessons",
              "Continuous progress tracking and teacher support",
              "Tutelage certificate awarded upon completion",
              "Enjoy learning in a supportive classroom environment",
              "Note: this course only available at select locations."
            ],
            buttonText: "Ask for Price"
          },
        },
        thirdTitle: "Available classes for everyone!",
        thirdCard: {
          kids:{
            title: "For Kids",
            desc: "Fun and interactive Kurdish classes with games and activities to make learning enjoyable and easy."
          },
          teens:{
            title: "For Teens",
            desc: "Engaging Kurdish lessons that boost language skills, confidence, and communication for teens."
          },
          adults:{
            title: "For Adults",
            desc: "Practical Kurdish classes for adults to improve everyday communication and fluency efficiently."
        }
                  },
        faq: {
          title: "Frequently Asked Questions(FAQs)",
          subtitle: "About Tutelage's Kurdish courses",
          questions: [
            {
              question: "Who can join the classes?",
              answer: "Our classes are open to kids, teens, and adults at all levels."
            },
            {
              question: "Are classes online, in-person?",
              answer: "We offer private online classes and face-to-face classes available at select locations."
            },
            {
              question: "How long is each class?",
              answer: "Class duration is flexible and can be adjusted to your schedule and learning goals."
            },
            {
              question: "Do you provide study materials?",
              answer: "Yes, all students receive daily materials, homework, and feedback."
            },
            {
              question: "Can I choose my schedule?",
              answer: "Absolutely! We offer flexible scheduling for both online and in-person lessons."
            },
            {
              question: "Will I get a certificate?",
              answer: "Yes, a Tutelage certificate is awarded upon completion of the course."
            }
          ]
        },
        enrollForm: {
          title: "Enroll now!",
          subtitle: "Register your Arabic class",
          firstName: "First name",
          lastName: "Last name",
          age: "Age",
          country: "Country",
          classType: "Type of class",
          phone: "Phone",
          email: "Email",
          interestedIn: "Interested in",
          selectClassType: "Select class type",
          selectLanguage: "Select language",
          submitButton: "Submit",
          submittingButton: "Submitting...",
          required: "*"
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
          title: "زمانی ئینگلیزی بۆ تەمەنی گەورە",
          description: "پڕۆگرامێکی گشتگیری زمانی ئینگلیزی کە بە تایبەتی بۆ فێرخوازانی گەورەسال کە خشتەی سەرقاڵیان هەیە داڕێژراوە. ڕێبازی نەرمی ئێمە ڕاهێنانی پسپۆڕانە، مەشقی گفتوگۆی ڕاستەقینە و شێوازی وانەگوتنەوەی نوێ تێکەڵ دەکات بۆ یارمەتیدانت بۆ گەیشتن بە ڕەوانی و متمانە لە پەیوەندی کردن بە ئینگلیزی.",
          enrollButtonText: "تۆماربوون",
        },
        second: {
          mainTitle: "با زمانی ئینگلیزی ببێتە هێزی ڕاستەقینەت ",
          subtitle: "بە کەمترین کات بگە بە ئاستی زمان پاراوی ",
        },
        classTypes: {
          public: {
            title: "کۆرسی گروپات ",
            features: [
              "کۆرسی ئۆنڵاینی ڕاستەوخۆ",
              "نی زمانەکەت بکە لە گروپی تەنها ٣ - ٥ فێرخوازیدا",
              "ئاستی زمانەکەت دیاری بکە",
              "مەنهەجی ڕێکخراوی توتڵج تایبەت بە زمانی ڕاستەقینەی ڕۆژانە ",
              "هەڵسەنگاندنی بەردەوام لەسەر بەرەو پێش چوونی ئاستی زمان پاراوی و دروستی ڕێزمانت",
              "ماوەی کۆرس : پێنج هەفتەی لەسەر یەک ، پازدە وانە ، زیاد لە ٢٢ کاتژمێر لە گفتوگۆکردنی زمانی ڕاستەقینە لەگەڵ ڕاهێنەرە بە ئەزموونەکانمان",
              "بڕوانامەی بەشداریکردنی پەیمانگای توتڵج"
            ],
            buttonText: "داواکاری نرخ"
          },
          private: {
            title: "کۆرسی تایبەت",
            features: [
              "کۆرسی ئۆنڵاینی ڕاستەوخۆ",
              "ڕاهێنەرێکی پڕ ئەزموونی تایبەت بە خۆت کە بەدرێژای خوێندنی کۆرسەکەت یاریدەدەرت دەبێت",
              "ناردنی سەرچاوەی زیادەی ڕۆژانە لە ڕێگەی گروپی تایبەت بە ڕاهێنەرەکەت ",
              "ڕێکخستنی پاکێج و کاتەکانی کۆرس بەپێی فێرخوازەکە دەبێت",
              "ژیری دەستکردی توتڵج : هاوبەشی ڕاهێنانی بەردەوامی زیرەکی دەستکردی توتڵج ڕۆژانەت بەدەر لە کاتی وانە خوێندنت کە هەڵسەنگاندنت بۆ دەکات و گفتووگۆت لەگەڵ دەکات "
            ],
            buttonText: "داواکاری نرخ"
          }
        },
        inPerson: {
          title: "کۆرسی ڕووبەڕوو",
          description: "بەشداری بکە لە پۆلە ڕووبەڕووەکانمان کە لە شوێنە تایبەتەکاندا بەردەستن، هەمان کوالیتی و ئەزموونی کەسی پێشکەش دەکەن وەک پڕۆگرامە سەرهێڵییەکانمان، لەگەڵ سوودی زیادەی کارلێککردنی ڕووبەڕوو و ژینگەی فێربوونی هاوبەشانە.",
          contactTitle: "پەیوەندیمان پێوە بکە بۆ زانیاری زیاتر"
        },
        interactiveWay: {
          title: "فێری زمانێکی نوێ ببە بەشێوازێکی کاریگەر",
          description: "!بەشداربە لە کۆرسە ئۆنڵاینە ڕاستەوخۆکانی توتڵج تایبەت بە تەمەنی گەورە بۆ فێربوونی زمانی ئینگلیزی و بە پاراوی دەست بکە بە قسەکردن ! کۆرسەکانمان بەردەستن بۆ گروپی نمونەیی ٣ - ٥ فێرخوازی و هەروەها کۆرسی تایبەتی یەک فێرخوازی . ئێمە ئاستی زمانەکەت بە دروستی دیاری دەکەین و ڕێگا نوێگەریەکانی توتڵج بەکار دەهێنین بۆ فەراهەمکردنی کۆرسێکی کاریگەر و چڕ بە پێدانی هەڵسەنگاندنی بەردەوام لەسەر ئاستی بەرەوپێش چوونت . لە کۆرسە تایبەتەکاندا ڕاهێنەری تایبەت بە خۆتت دەبێت کە جگە لە پێدانی فیدباکی بەردەوام کات و پاکێجەکانی کۆرسەکەت خوازیاریانە هەڵدەبژێریت . هەروەها مافی بەکارهێنانی ژیری دەستکردی توتڵجت دەبێت کە بە دەر لە کاتی وانە خوێندنت بەردەوام هاوڕێی ڕاهێنانەکانت دەبێت بە شێوازێکی نوێگەریانە و کاریگەر . هەموو فێرخوازانمان بڕوانامەی بەشداریکردنی کۆرسەکانی توتڵج وەردەگرن . ئەم دەرفەتە لە دەست مەدەن بۆ بوون بە یەکێک لە چیرۆکی سەرکەوتنەکانمان"
        },
        faq: {
          title: "پرسیارە باوەکان",
          subtitle: "باوترین پرسیارەکان دەربارەی کۆرسەکانی زمانی ئینگلیزی بۆ تەمەنی گەورە",
          questions: [
            {
              question: "پێویستە لە چی ئاستێکی زمانەکەدابم بۆ بەشداریکردن لەم کۆرسە؟",
              answer: ".نیگەران مەبە! کۆرسەکانمان بە پێی ئاستی فێرخوازان ڕێکخراون و تاقیکردنەوەی دیاری کردنی ئاستت بۆ ئەنجام دەدرێت . بۆیە گروپێکت بۆ دیاری دەکرێت لە هەمان ئاستی خۆتدا بێت یاخود ڕاهێنەرانمان کۆرسێکت بۆ ئامادە دەکەن بەپێی پێویستیەکانت"
            },
            {
              question: "چۆن ڕێگاکانی وانە وتنەوەی کۆرسەکە جیاواز و بە چێژ و کاریگەرن؟",
              answer: ".کۆی کۆرسەکان لە توتڵج بە نوێترین و کاریگەرترین شێواز ئامادە کراون و پێشکەش دەکرێن. ڕێهێنەرە بە ئەزموونەکانمان هانی فێرخوازان دەدەن کە چەندین تەکنیکی جیاواز بەکار بهێنن بۆ بەرەوپێشبردنی توانای زمانەکەیان و زۆرترین چالاکی زیندوو چێژبەخش بەکار دەهێنن لەگەڵ فێرخوازان لە ماوەی کۆرسەکەدا وەک ڕاهێنان لەسەر گفتووگۆ کردن بە شێوازی تیم و گروپ و چالاکی هەمەچەشن بۆ زیاد کردنی کاتی گفتووگۆکردنی فێرخواز بە زمانی فێربوو"
            },
            {
              question: "میتۆدی توتڵج چییە و چۆن گرنتی بەرکەوتنێکی ڕاستەقینە دەکات لەگەڵ زمانەکەدا؟",
              answer: ".میتۆدی وانە وتنەوەی توتڵج پاڵپشت کراوە بە توێژینەوەیەکی چڕی ستافی ئەکادیمی توتڵج کە لەساڵی ٢٠٢٢ ئەنجام دراوە و دەستکەوتنەکانی توێژینەوەکە میتۆدی وانەوتنەوەی ئێمەی لێ بەرهەم هاتووە کە باشترین وکاریگەرترینە بۆ فێربوونی زمانێکی نوێ. فەلسەفەی ئێمە خوێندنێکی چێژبەخش و زیندووە بە دوور کەوتنەوە لەو کۆتوبەندانەی مەنهەجە تەقلیدیەکان لەسەر فێرخوازی زمانی دا ئەنێن. وە ئاشنا کردنی فێرخوازە بە کاریگەرترین و خێراترین تەکنیکەکانی گفتووگۆکردنێکی ڕاستەقینە کە فیرخواز بتوانێت زۆر بە ئاسانی لە دەرەوەی پۆلەکەی بەکاری بهێنێتەوە بۆ ژیانی ڕۆژانەی خۆی"
            },
            {
              question: "چی جۆرە فیدباکێک وەردەگرم لەسەر بەرەو پێشچوونم؟",
              answer: ".فیدباکی بەردەوام لە ڕاهێنەرە بە ئەزموونەکەت وەردەگریت لەسەر ئاستی زمان پاراویت کە تا چی ڕادەیەک بە ئاسانی و سروشتی قسە دەکەیت ، و هەروەها ئاستی دروستی ڕێزمان کە تا چەند یاسا ڕێزمانیەکان و وشەسازیت بە دروستی بەکار دەهێنیت کە ئەمانە وادەکەن لەماوەی کۆرسەکەدا بەدروستی بزانیت کە چیت لەسەر پێویستە و چیتر ئەنجام بدەیت . ئەم فیدباکانە بەردەوام وەردەگریت ئەگەرچی کۆرسی گروپات بێت یان تایبەتی یەک فێرخوازی "           
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
      },
      enroll : {
        title: "تۆماربوون",
        titleWithCourse: "لە",
        subtitle: "هەنگاوی یەکەم بنێ بۆ شارەزابوون لە ئینگلیزی. فۆڕمەکە لە خوارەوە پڕبکەرەوە و بە زوویی پەیوەندیت پێوە دەکەین.",
        form: {
          fullName: "ناوی تەواو",
          fullNamePlaceholder: "ناوی تەواوت بنووسە",
          email: "ئیمەیڵ",
          emailPlaceholder: "ئیمەیڵەکەت بنووسە",
          phone: "ژمارەی تەلەفۆن",
          phonePlaceholder: "ژمارەی تەلەفۆنەکەت بنووسە",
          age: "تەمەن",
          agePlaceholder: "تەمەنەکەت بنووسە",
          profession: "پیشە",
          professionPlaceholder: "پیشەکەت هەڵبژێرە",
          professionTooltip: "ئەو بژاردەیە هەڵبژێرە کە باشترین وەسفی دۆخی ئێستای خوێندن یان کارەکەت دەکات.",
          course: "کۆرس",
          coursePlaceholder: "کۆرسێک هەڵبژێرە",
          submitButton: "ناردنی تۆماربوون",
          submittingButton: "ناردن...",
          required: "*"
        },
        infoMessage: "تکایە ئەم فۆڕمە پڕبکەرەوە بۆ تۆماربوون لە کۆرسی هەڵبژێردراوت. تیمەکەمان بە زووترین کات لە ڕێگەی ئیمەیڵ یان تەلەفۆنەوە پەیوەندیت پێوە دەکات بۆ گفتوگۆ دەربارەی ئامانجەکانی فێربوون و خشتەکاتەکەت.",
        sidebar: {
          exploreOtherCourses: "گەڕان بۆ کۆرسەکانی تر",
          exploreDescription: "ڕێگای زیاتر بدۆزەرەوە بۆ باشترکردنی ئینگلیزیت",
          viewAllCourses: "بینینی هەموو کۆرسەکان",
          tryTutelageAI: "تاقیکردنەوەی توتڵج AI",
          aiDescription: "هۆشی دەستکرد بەهێز کە بۆ فێربوونی ئینگلیزی داڕێژراوە",
          aiContent: "ئەزموونی مامۆستای ئینگلیزی هۆشمەندمان بکە کە یارمەتیت دەدات بە متمانەتر فێربیت و قسە بکەیت. مەشقی گفتوگۆ بکە، گەڕاندنەوەی یەکسەر وەربگرە و خێراتر باشتر ببە.",
          launchAI: "دەستپێکردنی توتڵج AI",
          findYourLevel: "ئاستەکەت بدۆزەرەوە",
          levelDescription: "ئاستی پسپۆڕی ئینگلیزیت بدۆزەرەوە",
          levelContent: "تاقیکردنەوەی گشتگیری پلەبەندی زمانمان ئەنجام بدە بۆ دیاریکردنی ئاستی ئینگلیزیت لە ئێستادا و وەرگرتنی ڕاسپاردەی کەسیکراوی کۆرس.",
          takePlacementTest: "تاقیکردنەوەی پلەبەندی ئەنجام بدە",
          practiceTests: "تاقیکردنەوەی مەشق",
          practiceDescription: "لێهاتووییەکانت تاقی بکەرەوە لەگەڵ تاقیکردنەوە مەشقییەکانمان",
          freePracticeTests: "تاقیکردنەوەی مەشقی بێبەرامبەر",
          mockTests: "تاقیکردنەوەی نێودەوڵەتی/موک"
        },
        successDialog: {
          title: "تۆماربوون سەرکەوتووبوو! 🎉",
          description: "سوپاس بۆ تۆماربوونت لەگەڵ توتڵج! داواکاریەکەمان بە سەرکەوتوویی وەرگرتووە.",
          message: "تیمەکەمان لە ماوەی ٢٤ کاتژمێردا لە ڕێگەی ئیمەیڵ یان ژمارەی تەلەفۆنەوە پەیوەندیت پێوە دەکات بۆ گفتوگۆ دەربارەی ئامانجەکانی فێربوونت و یارمەتیدانت بۆ دەستپێکردنی گەشتی فێربوونی ئینگلیزیت.",
          button: "بەردەوامبوون لە گەڕان"
        }
      },
       ArabicCourse: {
        title: "کۆرسی زمانی عەرەبی",
        description: "بۆچی بەشداری لە کۆرسی زمانی عەرەبی توتڵج بکەم ؟ئەزموونی باشترین و بەچێژترین کۆرسی زمانی عەرەبی بکەن کە بە تەواوی دەتکاتە کەشی فێربوونی زمانەکەوە. بە کەمترین ماوە متمانە بەخۆبوون و کارامەییە پێویستەکانی زمانەکەت بەرەوپێش ببە. ئەم کۆرسە بۆهەر کەسێک گونجاوە کە بیەوێت توانای زمان پاراویی بەرەو پێش ببات لە زمانی عەرەبیدا",
        secondTitle: "دەربارەی کۆرسە نمونەییەکەت بزانە",
        classTypes: {
          online: {
            title: "کۆرسی تایبەتی ئۆناڵین",
            features: [
              "کۆرسی تایبەتی ئۆناڵین",
              "کۆرسی تایبەتی یەک فێرخوازی زمانی عەرەبی",
              "دانانی مەنهەجی تایبەت بە خۆت بەپێی ئامانجەکانت",
              "ناردنی فیدباک و ئەرکی ڕۆژانە بۆ فێرخواز لەگەڵ سەرچاوەی زیادە",
              "دانانی کاتەکانی کۆرسی ئۆناڵین بە پێی فێرخواز",
              "هاریکاری و پشتگیری بەردەوامی ڕاهێنەر بۆ فێرخواز",
              "پێدانای بڕوانامەی دانپێدانراوی توتڵج لەگەڵ تەواوبوونی کۆرس",
              "چێژ لە وانەکانت وەربگرە لە هەمووکات و شێوێنێکدا"
            ],
            buttonText: "داواکاری نرخ"
          },
          inPerson: {
            title: "کۆرسی تایبەتی ڕووبەڕووی",
            features: [
              "کۆرسی تایبەتی ڕووبەڕووی",
              "وانەی تایبەتی ڕووبەڕوو لەگەڵ مامۆستا",
              "پالنی وانەخوێندنی تایبەت بە فیرخواز بەپێی ئامانجەکانت",
              "بابەتی ڕۆژانە و ڕاهێنانی جۆراو جۆر و ئامادەکراو",
              "کاتی وانەخوێندن بە تایبەت لەگەڵ کاتی فیرخواز دەگونجێندرێت",
              "هاریکاری بەردەوامی مامۆستای وانە و هەڵسەنگاندن لە کاتی کۆرسدا",
              "وەرگرتنی بڕوانامەی فەرمی توتلج لە تەواوبوونی کۆرسەکەدا",
              "جێژ لە وانەکانت ببینە لە ژینگەیەکی تایبەت بە فێربوون",
              "تێبینی: ئەم وانەیە تەنها لە کوردستان – شاری سلێمانی بەردەستە"
            ],
            buttonText: "داواکاری نرخ"
          },
        },
        thirdTitle: "کۆرسی زمانی عەرەبی تایبەت بە هەموو تەمەنەکەن",
        thirdCard: {
          kids:{
            title: "تایبەت بە مندااڵن",
            desc: "چێژ وەربگرە لە وانەی زمانی عەرەبی تایبەت بە مندااڵن کە چەندین چاالکی جیاواز و یاری جۆراوجۆر و کورتە چیرۆک لەخۆ دەگریت. ئامانجی ئەم کۆرسە فێرکردنی زمانەکەیە بەشێوەیەکی سادە و ئاسان بۆ مندااڵن"
          },
          teens:{
            title: "تایبەت بە تازەپێگەیشتووان",
            desc: "کۆرسی تایبەت بە تەمەنی تازەپێگەیشتووان بە جۆرێک دیزاین کراون کە هاریکاری فێرخوازان بکەن بە بەهێزکردنی توانا زمانەوانییەکانیان و دروست کردنی بڕوابەخۆبوون بۆ گفتووگۆکردن بە زمانەکە وە هاریکارییەکی باشیان بکات تایبەت بە وانەکانی قوتابخانە"
          },
          adults:{
            title: "تایبەت بە تەمەنی گەورە",
            desc: "وانەی زمانی عەرەبی تایبەت بە گەوران جیاواز لە تەمەنەکانی تر، هاریکاری فیرخواز دەکات بۆ فێربوونی زۆرترین دەستەواژە و تەکنیکەکانی گفتووگۆکردنی ژیانی ڕۆژانە بە شێوازی عەرەبی جڵفی"
        }
                  },
        faq: {
          title: "پرسیارە باوەکان",
          subtitle: "دەربارەی کۆرسی زمانی عەرەبی توتڵج",
          questions: [
            {
              question: "کێ دەتوانێت بەشداری لەم کۆرسانەدا بکات ؟",
              answer: "کۆرسەکانمان بەردەستن بۆ سەرجەم ئاست و تەمەنە جیاوازەکان لە منداڵ و تازە پێگەشتووان و تەمەنی گەورە"
            },
            {
              question: "ئایا کۆرسەکان ڕووبەڕوون یاخود ئۆناڵین؟",
              answer: "کۆرسەکان بە هەردوو شێوازەکە بەردەستن ، بەاڵم کۆرسە ڕووبەڕووەکان تەنها لە شوێنی دیاریکراو بەردەستن"
            },
            {
              question: "هەر وانەیەک چەند کاتژمێرە ؟",
              answer: "کاتی وانەکان جێگیر نین و بەپێی پێویستی فێرخواز دادەنرێت"
            },
            {
              question: "ئایا سەرچاوە بۆ فیرخواز دابین دەکەن؟",
              answer: "بەڵێ، هەموو فێرخوازێک ڕۆژانە سەرچاوە و بابەتی تایبەت بە خۆی بۆ دابین دەکرێت لەگەڵ هەڵسەنگاندنی ئاستەکەی"
            },
            {
              question: "ئایا دەتوانم خۆم خشتەی وانەکانم ڕێکبخەم؟",
              answer: "ەڵێ، لە هەردوو کاڵسی ئۆنالین و ڕووبەڕوو فیرخواز سەرپشک دەکرێت لە هەڵبژاردنی کاتی وانەخویندنی تایبەت بە خۆی"
            },
            {
              question: "ئایا بڕوانامە وەردەگرم؟",
              answer: "بڕوانامەی فەرمی و تایبەت بە توتڵج دەدریت بە فێرخوازان بە تەواوبوونی کۆرسەکانمان"
            }
          ]
        },
        enrollForm: {
          title: "هەرئێستا خۆت تۆمار بکە",
          subtitle: "بەشداری بکە لە کۆرسی زمانی عەرەبی توتڵج و دەستپێبکە بە گەیشتن بە ئامانجەکانی فێربوونت",
          firstName: "ناوی یەکەم",
          lastName: "ناوی دووەم",
          age: "تەمەن",
          country: "وڵات",
          classType: "جۆری کڵاس",
          online: "ئۆنڵاین",
          inPerson: "ڕووبەڕوو",
          phone: "ژمارەتەلەفون",
          email: "ئیمەیڵ",
          interestedIn: "دەتەوێت فێری چ زمانێک بیت",
          kurdish: "کوردی",
          arabic: "عەرەبی",
          submitButton: "ناردن",
          submittingButton: "ناردن...",
          required: "*"
        }
      },
       KurdishCourse: {
        title: "دروس اللغة الكردية — تعليم احترافي لجميع المستويات",
        description: "تعل اللغة الكردية بثقة... أينما كنت!  نقّدم درو ًسا خصوصية في اللغة الكردية حضورًيا وعبر اإلنترنت، بإشراف معلم مؤهل ومنهج متكامل مص ّمم ف ّعا وممت ًعا منذ الدرس األول. اًل بعناية ليالئم احتياجاتك، ويضمن لك تعل ًما،لماذا تختار دراسة اللغة الكردية مع Tutelage؟ تتميز دوراتنا بأنها: تفاعلية ابة وجذّ تعتمد على الممارسة والشرح الواضح تساعدك على اكتساب الطالقة والثقة بالنفس بسرعة مناسبة لجميع األعمار والمستويات سواء كنت من أبناء الجالية الكردية أو مهت ًما بتعلم اللغة ألسباب شخصية أو مهنية، فهذه الدورة مصممة خصي ًصا لك",
        secondTitle: "اختر نوع الصف المناسب لك",
        classTypes: {
          online: {
            title: "الدروس الخاصة عبر اإلنترنت",
            features: [
             " تعليم فردي مباشر مع معلم مختص",
              "خطة دراسية مصممة حسب أهدافك",
              "مواد تعليمية يومية + واجبات منزلية + مالحظات متابعة",
              "جدول دراسي مرن ومريح",
              "متابعة لتطّور مستوى الطالب",
              "شهادة معتمدة عند إتمام الدورة",
            ],
            buttonText: "اسأل عن األسعار"
          },
          inPerson: {
            title: "الدروس الخاصة الحضورية",
            features: [
            " دروس فردية داخل الصف مع تدريب عملي",
           " خطة تعليمية شخصية",
            " مواد مطبوعة وأنشطة داخل الصف",
            " جدول مناسب للطالب الحضوريين",
            " متابعة مباشرة وتقييم مستمر",
            " شهادة توجيهية عند إتمام الدورة",
            " مالحظة: متوفرة في مواقع محددة فقط"
            ],
            buttonText: "اسأل عن األسعار"
          },
        },
        thirdTitle: "برامج مناسبة لكل الفئات",
        thirdCard: {
          kids:{
            title: "لألطفال",
            desc: ". دروس ممتعة وتفاعلية مع ألعاب وأنشطة تجعل تعلم الكردية سهالً ومشوقًا"
          },
          teens:{
            title: "للمراهقين",
            desc: "صفوف مشوقة تعزز مهارات التواصل والثقة بالنفس والطالقة"
          },
          adults:{
            title: "للبالغين",
            desc: "دروس عملية تساعدك على تحسين التواصل اليومي وتطوير طالقتك في اللغة بسرعة"
        }
                  },
        faq: {
          title: "األسئلة الشائعة",
          subtitle: "تعرف على المزيد حول دورة اللغة الكردية مع Tutelage",
          questions: [
            {
              question: "من يمكنه االنضمام إلى الدروس؟",
              answer: "يمكن لألطفال والمراهقين والبالغين التسجيل في أي مستوى"
            },
            {
              question: "هل الصفوف متاحة حضورًيا أو عبر اإلنترنت؟",
              answer: "نعم، نوفر كال الخيارين"
            },
            {
              question: "ما مدة كل درس؟",
              answer: "مدة الدرس مرنة ويتم ترتيبها حسب وقت الطالب"
            },
            {
              question: "ل توفرون مواد تعليمية؟",
              answer: "نعم، جميع الطالب يحصلون على مواد، واجبات، مالحظات يومية"
            },
            {
              question: "هل أستطيع اختيار الجدول؟",
              answer: "بالتأكيد، نوفر جداول مرنة تناسب الجميع"
            },
            {
              question: "هل أحصل على شهادة؟",
              answer: "نعم، يحصل الطالب على شهادة عند إتمام الدورة"
            }
          ]
        },
        enrollForm: {
          title: "س ّجل اآلن!",
          subtitle: "امأل المعلومات التالية للبدء:",
          firstName: "االسم األول",
          lastName: "سم العائلة",
          age: "العمر",
          country: "البلد",
          classType: "نوع الصف",
          online: "عبر اإلنترنت",
          inPerson: "حضوري",
          phone: "رقم الهاتف",
          email: "البريد اإللكتروني",
          interestedIn: "مهتم بـ",
          kurdish: "الكردية",
          arabic: "العربية",
          submitButton: "إرسال",
          submittingButton: "إرسال...",
          required: "*"
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
