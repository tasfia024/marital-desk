import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import { apiClient } from "../../../config/api";
import { BASE_URL } from '../../../config/baseUrl';

const CertificateView = () => {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const [groomUser, setGroomUser] = useState(null);
    const [brideUser, setBrideUser] = useState(null);
    const [kazi, setKazi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        setLoading(true);
        try {
            const res = await apiClient(`api/v1/marital-desk/marriage-applications/${id}`);
            const app = res.application;
            setApplication(app);
            // Backend already includes groom, bride, kazi, and proposedByUser objects
            setGroomUser(app.groom);
            setBrideUser(app.bride);
            setKazi(app.kazi);
        } catch (err) {
            setError("Failed to fetch application details");
            console.error(err);
        }
        setLoading(false);
    };


    const generateCertificateNumber = (groom, bride) => {
        if (!groom || !bride || !groom.nid || !bride.nid || !bride.name) {
            return 'N/A';
        }

        const groomNidLast6 = groom.nid.toString().slice(-6);
        const groomFirstLetter = groom.name.charAt(0).toUpperCase();
        const brideFirstLetter = bride.name.charAt(0).toUpperCase();
        const brideNidLast6 = bride.nid.toString().slice(-6);
        return `${groomFirstLetter}${brideFirstLetter}-${groomNidLast6}-${brideNidLast6}`;
    };

    const groomName = groomUser?.name || "N/A";
    const brideName = brideUser?.name || "N/A";
    const volumeNo = '01/25';
    const bookNo = '"A"';
    const certificateRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadPDF = async () => {
        if (isGenerating) return;
        if (!certificateRef.current) {
            alert('Certificate content not ready yet. Please wait a moment and try again.');
            return;
        }

        setIsGenerating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                allowTaint: true,

            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 8;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            const safeGroom = groomName.replace(/[^a-zA-Z0-9]/g, '_');
            const safeBride = brideName.replace(/[^a-zA-Z0-9]/g, '_');
            pdf.save(`Marriage_Certificate_${safeGroom}_and_${safeBride}.pdf`);
        } catch (error) {
            console.error('PDF generation failed:', error);
            toast.error('Sorry, something went wrong while creating the PDF.\nPlease check the console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <div
                ref={certificateRef}
                className="max-w-4xl mx-auto  bg-white shadow-2xl border-4 border-[#0a7d2c] rounded-sm font-serif overflow-hidden"
            >
                {/* Header border simulation */}
                <div className="relative border-b-4 border-[#0a7d2c] pb-1">
                    <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none text-[8rem] leading-none font-black text-center text-green-900">
                        গণপ্রজাতন্ত্রী বাংলাদেশ
                    </div>

                    <div className="text-center pt-6 pb-4 px-10 bg-gradient-to-b from-blue-50 to-white">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0a7d2c] tracking-wide">
                            Government of the People's Republic of Bangladesh
                        </h1>
                        <p className="text-lg font-semibold mt-1">
                            Office of The Muslim Marriage & Divorce Registrar & Kazi
                        </p>
                        {/* <p className="text-base mt-1 font-medium">{wardNo}</p> */}

                        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-green-700 to-transparent mx-auto my-3"></div>

                        <h2 className="text-4xl md:text-5xl font-bold text-orange-700 mt-4 tracking-wider uppercase">
                            MARRIAGE CERTIFICATE
                        </h2>
                    </div>
                </div>

                {/* Main content */}
                <div className="pl-8 pb-8 pr-8 pt-4 md:pl-12 md:pr-12 md:pb-12 bg-white relative">
                    <div className="space-y-5 text-lg leading-relaxed">
                        {/* Certification Text and Photos */}
                        <div className="flex items-center justify-between mb-8">
                            {/* Certification Text - Centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <p className="text-center font-semibold text-xl underline decoration-2 decoration-green-800 whitespace-nowrap">
                                    This is to certify that,
                                </p>
                            </div>

                            {/* Photos Container - Right Side */}
                            <div className="ml-auto flex items-center gap-0">
                                {/* Groom Photo */}
                                <div className="flex-shrink-0">
                                    {groomUser?.image ? (
                                        <img
                                            src={`${BASE_URL}${groomUser.image}`}
                                            alt="Groom" crossOrigin="anonymous"
                                            className="w-25 h-30 object-cover border-4 border-gray-400 rounded-sm shadow-md"
                                        />
                                    ) : (
                                        <div className="w-25 h-30 border-4 border-gray-400 rounded-sm bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                            No Photo
                                        </div>
                                    )}
                                </div>

                                {/* Bride Photo */}
                                <div className="flex-shrink-0">
                                    {brideUser?.image ? (
                                        <img
                                            src={`${BASE_URL}${brideUser.image}`}
                                            alt="Bride" crossOrigin="anonymous"
                                            className="w-25 h-30 object-cover border-4 border-gray-400 rounded-sm shadow-md"
                                        />
                                    ) : (
                                        <div className="w-25 h-30 border-4 border-gray-400 rounded-sm bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-4 gap-y-5">
                            <div className="font-semibold whitespace-nowrap">Groom:</div>
                            <div>
                                <span className="font-bold">{groomUser?.name}</span> Son of{' '}
                                <span className="font-bold">{application?.groomFather}</span>
                                {' '} and {' '}
                                <span className="font-bold">{application?.groomMother}</span>
                                <br />
                                of {application?.groomAddress || groomUser?.address}
                                <br />
                                Date of Birth: <span className="font-medium">{groomUser?.dob ? new Date(groomUser.dob).toLocaleDateString() : "N/A"}</span>
                                <br />
                                NID No.: <span className="font-medium">{groomUser?.nid || "N/A"}</span>
                            </div>

                            <div className="font-semibold mt-4">Married with:</div>
                            <div>
                                <span className="font-bold">{brideUser?.name} </span>Daughter of <span className="font-bold">{application?.brideFather}</span> and{' '}
                                <span className="font-bold">{application?.brideMother}</span>
                                <br />
                                of {application?.brideAddress || brideUser?.address}
                                <br />
                                Date of Birth: <span className="font-medium">{brideUser?.dob ? new Date(brideUser.dob).toLocaleDateString() : "N/A"}</span>
                                <br />
                                NID No.: <span className="font-medium">{brideUser?.nid || "N/A"}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-300">
                            <p>
                                The marriage was solemnized on <strong>{application?.marriageDate ? new Date(application.marriageDate).toLocaleDateString() : "N/A"}</strong>{' '}
                                and registration was solemnized on <strong>{application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString() : "N/A"}</strong>
                            </p>
                            <p className="mt-4">
                                in my office and registered in <strong>Volume No. {volumeNo}</strong>, Book No.{' '}
                                <strong>{bookNo}</strong>, Serial No. <strong>{generateCertificateNumber(groomUser, brideUser)}</strong> in the year{' '}
                                <strong>{application?.approvalDate ? new Date(application.approvalDate).getFullYear() : ""}</strong>
                            </p>
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-12">
                            <div className="text-center">
                                <p className="italic text-gray-700">I wish them every success in life</p>
                                <div className="mt-10">
                                    <div className="w-48 h-0.5 bg-black mx-auto mb-1"></div>
                                    <p className="font-semibold">{kazi?.name}</p>
                                    <p className="text-sm text-gray-600">Muslim Marriage & Divorce Registrar</p>
                                    <p className="text-sm text-gray-600">
                                        {kazi?.officeAddress || kazi?.address || "N/A"}
                                    </p>
                                    <p className="text-sm text-gray-600">Reg. No. {kazi?.registrationNo || "N/A"}</p>
                                </div>
                            </div>

                            {/* Right side - attested & stamps */}
                            <div className="text-right space-y-3">
                                <p className="font-bold text-xl italic text-blue-800 rotate-[-8deg] transform origin-bottom-right">
                                    ATTESTED
                                </p>
                                <p className="text-sm font-medium">Date of Issue: {application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString() : ""}</p>

                                <div className="relative inline-block mt-4">
                                    <div className="w-40 h-40 rounded-full border-8 border-blue-700/70 flex items-center justify-center rotate-[-6deg] opacity-80">
                                        <div className="text-center">
                                            <div className="text-xs font-bold">GOVT. OF BANGLADESH</div>
                                            <div className="text-lg font-black mt-1">REGISTERED</div>
                                            <div className="text-xs mt-1">{application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString() : ""}</div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center text-blue-800/40 font-black text-5xl rotate-[-10deg]">
                                        SEAL
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-4 bg-gradient-to-t from-[#0a7d2c] to-green-900"></div>
            </div>

            {/* Download button */}
            <div className="mt-8 text-center">
                <button
                    onClick={downloadPDF}
                    disabled={isGenerating}
                    className={`inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg shadow-lg transition-colors text-lg ${isGenerating
                        ? 'bg-green-500 cursor-wait'
                        : 'bg-green-700 hover:bg-green-800'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"></span>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Download Certificate (PDF)
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CertificateView;