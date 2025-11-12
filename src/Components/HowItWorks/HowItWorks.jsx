import { CheckCircle, UserPlus, FileText, ClipboardCheck, Download, Shield } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const HowItWorks = () => {

    // animation
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
      icon: <UserPlus className="w-10 h-10 text-green-700" />,
      title: "Create an Account",
      desc: "Register with your NID, email, and password to access your secure dashboard.",
    },
    {
      id: 2,
      icon: <FileText className="w-10 h-10 text-green-700" />,
      title: "Apply for Marriage or Divorce",
      desc: "Choose the desired service and fill out the online application form accurately.",
    },
    {
      id: 3,
      icon: <ClipboardCheck className="w-10 h-10 text-green-700" />,
      title: "Kazi Verification",
      desc: "Your Kazi reviews and verifies the information and documents you submit.",
    },
    {
      id: 4,
      icon: <Shield className="w-10 h-10 text-green-700" />,
      title: "Admin Approval",
      desc: "The admin validates the application and approves or rejects it after review.",
    },
    {
      id: 5,
      icon: <Download className="w-10 h-10 text-green-700" />,
      title: "Get Your Certificate",
      desc: "Once approved, download your official marriage or divorce certificate with QR verification.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-900 mb-4" data-aos="fade-down" data-aos-delay="100">How to Use MaritalDesk</h2>
        <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-down" >
          Follow these simple steps to apply for your marriage or divorce certificate online. 
          The process is secure, transparent, and paperless.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-8" data-aos="fade-up" data-aos-delay="100">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center  p-6 rounded-2xl shadow-sm hover:shadow-md transition border-gray-200 border-1"
          >
            <div className=" p-4 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <CheckCircle className="w-10 h-10 text-green-700 inline-block mb-3" />
        <p className="text-gray-700">
          All data is protected and verified through official Kazi and Admin channels.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
