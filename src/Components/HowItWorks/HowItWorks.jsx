import { CheckCircle, UserPlus, FileText, ClipboardCheck, Download, Shield } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  const steps = [
    {
      id: 1,
      icon: <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
      title: "Create an Account",
      desc: "Register with your NID, email, and password.",
    },
    {
      id: 2,
      icon: <FileText className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
      title: "Apply for Service",
      desc: "Choose marriage or divorce and fill the form.",
    },
    {
      id: 3,
      icon: <ClipboardCheck className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
      title: "Kazi Verification",
      desc: "Your Kazi reviews and verifies documents.",
    },
    {
      id: 4,
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
      title: "Admin Approval",
      desc: "Admin validates and approves application.",
    },
    {
      id: 5,
      icon: <Download className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
      title: "Get Certificate",
      desc: "Download official certificate with QR code.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-900 dark:text-green-300 mb-3 md:mb-4"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          How to Use MaritalDesk
        </h2>
        <p
          className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2"
          data-aos="fade-down"
        >
          Follow these simple steps to apply for your marriage or divorce certificate online. 
          The process is secure, transparent, and paperless.
        </p>
      </div>

      {/* Steps container - responsive grid */}
      <div className="max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="150">
        {/* Desktop view - horizontal line */}
        <div className="hidden lg:block relative mb-8">
          <div className="absolute top-[3.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
        </div>

        {/* Cards grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-3 justify-items-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center w-full max-w-[280px] sm:max-w-none mx-auto group relative"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 100}
            >
              {/* Icon circle with number badge */}
              <div className="relative mb-4">
                <div className="p-4 md:p-5 rounded-full bg-white dark:bg-gray-800 shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <div className="text-yellow-500 transition-transform duration-300 group-hover:rotate-6">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Title - responsive font sizes */}
              <h3 className="text-base md:text-lg font-semibold text-green-900 dark:text-green-300 mb-2 group-hover:text-green-700 dark:group-hover:text-green-200 transition-colors px-2">
                {step.title}
              </h3>

              {/* Description - condensed for better fit */}
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-2 max-w-[220px] sm:max-w-[180px] md:max-w-[200px] group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                {step.desc}
              </p>

              {/* Connector dot for mobile (visual only) */}
              {index < steps.length - 1 && (
                <div className="sm:hidden w-full flex justify-center mt-4">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;