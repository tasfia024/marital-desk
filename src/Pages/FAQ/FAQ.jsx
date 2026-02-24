import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const FAQ = () => {
  const faqs = [
    {
      question: 'What is MaritalDesk?',
      answer:
        'MaritalDesk is a centralized digital platform that allows citizens to apply for marriage, divorce, and certificates online with verified processing by Kazi and administrators.'
    },
    {
      question: 'Is the online application legally valid?',
      answer:
        'Yes. All applications go through Kazi verification and admin approval, ensuring every certificate issued is legally recognized.'
    },
    {
      question: 'How does the verification process work?',
      answer:
        'Once a bride or groom submits the form, a Kazi reviews the provided information, adds verification details, and forwards it to the admin for final approval.'
    },
    {
      question: 'Can I download my marriage certificate?',
      answer:
        'Yes. Once approved by the admin, users can download the digital marriage certificate directly from their dashboard.'
    },
    {
      question: 'How much does it overall cost for marriage?',
      answer:
        'The total cost for marriage registration through the platform is 2,500 BDT, broken down as follows:\n\n- Registry fee: 700 BDT\n- Kazi fee: 1,500 BDT\n- Service fee: 250 BDT\n- Charge: 50 BDT\n\n**Total: 2,500 BDT**. However, Cost is subject to change depending on the area and regulations.'
    },
    {
      question: 'What happens if my application is rejected?',
      answer:
        'Rejected applications include a reason provided by the Kazi or admin. Users can correct the information and resubmit.'
    },
    {
      question: 'Do I need to visit a physical office after applying online?',
      answer:
        'In most cases, no. However, physical presence may be required for identity verification depending on local regulations.'
    }
  ]

  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div
      className='p-8 md:p-12 lg:p-15 
                    bg-gradient-to-r from-[#013223] via-[#006747] to-[#014B34] 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    max-w-6xl mx-auto rounded-2xl my-8 md:my-12'
    >
      <div className='text-center max-w-4xl mx-auto space-y-4 mb-8'>
        <h2 className='text-white text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-105'>
          Frequently Asked Questions (FAQ)
        </h2>
        <p className='text-gray-200 dark:text-gray-300 mb-3 text-lg'>
          Frequently asked questions about our centralized digital marital
          services, helping citizens understand the full process from submission
          to certification
        </p>
      </div>

      <div className='w-full max-w-3xl mx-auto space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 
                               ${
                                 openIndex === index
                                   ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 shadow-lg transform scale-[1.02]'
                                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-1'
                               }`}
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className='w-full flex justify-between items-center p-5 text-left 
                                   font-medium text-green-900 dark:text-green-300 
                                   transition-all duration-300 
                                   hover:bg-green-50 dark:hover:bg-gray-700/50 rounded-t-xl'
            >
              <span className='text-lg font-semibold'>{faq.question}</span>
              <FiChevronDown
                className={`transition-all duration-500 
                                        ${
                                          openIndex === index
                                            ? 'transform rotate-180 text-green-700 dark:text-green-400'
                                            : 'text-gray-500 dark:text-gray-400'
                                        }`}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div
                className='px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed 
                                        animate-fadeIn'
                style={{ animation: 'fadeIn 0.3s ease-in-out' }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add CSS for fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default FAQ
