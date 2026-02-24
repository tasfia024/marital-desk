import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import { apiClient } from "../../../config/api";
import { BASE_URL } from '../../../config/baseUrl';
import logoImg from '../../../assets/Maritaldesk.png';

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
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital@0;1&display=swap');
                .certificate-serif {
                    font-family: 'Crimson Text', Georgia, serif;
                }
            `}</style>
            <div
                ref={certificateRef}
                className="max-w-4xl mx-auto bg-white shadow-2xl border-4 border-[#0a7d2c] rounded-sm certificate-serif overflow-hidden"
            >
                {/* Header border simulation */}
                <div className="relative border-b-4 border-[#0a7d2c] pb-2">
                    <div className="absolute top-12 left-4 z-10">
                        <img
                            src={logoImg}
                            alt="Maritaldesk Logo"
                            className="h-20 w-auto"
                        />
                    </div>

                    <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none text-[8rem] leading-none font-black text-center text-green-900">
                        গণপ্রজাতন্ত্রী বাংলাদেশ
                    </div>

                    <div className="text-center pt-8 pb-6 px-10 bg-gradient-to-b from-blue-50 to-white">
                        <h1 className="text-2xl md:text-3xl font-semibold text-[#0a7d2c] tracking-wide">
                            Government of the People's Republic of Bangladesh
                        </h1>
                        <p className="text-base font-semibold mt-2">
                            Office of The Muslim Marriage & Divorce Registrar & Kazi
                        </p>

                        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#0a7d2c] to-transparent mx-auto my-4"></div>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#0a7d2c] mt-4 tracking-wider">
                            MARRIAGE CERTIFICATE
                        </h2>
                    </div>
                </div>

                {/* Main content */}
                <div className="px-8 py-8 md:px-12 md:py-12 bg-white relative">
                    <div className="space-y-4 text-xl leading-relaxed">
                        {/* Certification Text and Photos */}
                        <div className="flex items-center justify-between mb-4">
                            {/* Certification Text - Centered */}
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <p className="text-center font-semibold text-2xl italic text-[#0a7d2c] whitespace-nowrap">
                                    This is to certify that
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
                                            className="w-28 h-36 object-cover border-4 border-[#0a7d2c] rounded-sm shadow-md"
                                        />
                                    ) : (
                                        <div className="w-28 h-36 border-4 border-[#0a7d2c] rounded-sm bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
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
                                            className="w-28 h-36 object-cover border-4 border-[#0a7d2c] rounded-sm shadow-md"
                                        />
                                    ) : (
                                        <div className="w-28 h-36 border-4 border-[#0a7d2c] rounded-sm bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-6 gap-y-3">
                            <div className="font-bold text-lg text-[#0a7d2c] whitespace-nowrap">The Bridegroom:</div>
                            <div className="text-lg leading-relaxed">
                                <span className="font-bold">{groomUser?.name?.toUpperCase()}</span>, Son of{' '}
                                <span className="font-bold">{application?.groomFather?.toUpperCase() || 'N/A'}</span>
                                {' '}and{' '}
                                <span className="font-bold">{application?.groomMother?.toUpperCase() || 'N/A'}</span>
                                <br />
                                of {application?.groomAddress || groomUser?.address || 'N/A'}
                                <br />
                                Date of Birth: <span className="font-semibold">{groomUser?.dob ? new Date(groomUser.dob).toLocaleDateString('en-GB') : "N/A"}</span>
                                <br />
                                National ID No.: <span className="font-mono font-semibold">{groomUser?.nid || "N/A"}</span>
                            </div>

                            <div className="font-bold text-lg text-[#0a7d2c] mt-4">Has married:</div>
                            <div className="mt-4 text-lg leading-relaxed">
                                <span className="font-bold">{brideUser?.name?.toUpperCase()}</span>, Daughter of <span className="font-bold">{application?.brideFather?.toUpperCase() || 'N/A'}</span> and{' '}
                                <span className="font-bold">{application?.brideMother?.toUpperCase() || 'N/A'}</span>
                                <br />
                                of {application?.brideAddress || brideUser?.address || 'N/A'}
                                <br />
                                Date of Birth: <span className="font-semibold">{brideUser?.dob ? new Date(brideUser.dob).toLocaleDateString('en-GB') : "N/A"}</span>
                                <br />
                                National ID No.: <span className="font-mono font-semibold">{brideUser?.nid || "N/A"}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t-2 border-[#0a7d2c]">
                            <p className="mb-3 text-lg leading-relaxed">
                                The marriage was solemnized on <strong>{application?.marriageDate ? new Date(application.marriageDate).toLocaleDateString('en-GB') : "N/A"}</strong>{' '}
                                and registered on <strong>{application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString('en-GB') : "N/A"}</strong>.
                            </p>
                            <p className="text-lg leading-relaxed">
                                This marriage has been registered in <strong>Volume No. {volumeNo}</strong>, <strong>Book No. {bookNo}</strong>,
                                <strong> Serial No. {generateCertificateNumber(groomUser, brideUser)}</strong>, in the year <strong>{application?.approvalDate ? new Date(application.approvalDate).getFullYear() : ""}</strong>.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row justify-between items-end gap-12">
                            <div className="text-center">
                                <p className="italic text-gray-700 mb-5 text-lg">"May they live happily ever after"</p>

                                <div>
                                    {application?.kaziUser?.signature && (
                                        <img src={`${BASE_URL}${application.kaziUser.signature}`} alt="Kazi Signature" crossOrigin="anonymous" className="h-14 w-50 mb-1 m-auto" />
                                    )}
                                </div>
                                <div className="w-48 h-0.5 bg-gray-800 mx-auto mb-2"></div>
                                <p className="font-bold text-2xl">{kazi?.name || 'Kazi Name'}</p>
                                <p className="text-lg font-semibold text-[#0a7d2c]">Muslim Marriage Registrar & Kazi</p>
                                <p className="text-base text-gray-600 mt-1">{kazi?.officeAddress || kazi?.address || "N/A"}</p>
                                <p className="text-base text-gray-600">Reg. No. {kazi?.registrationNo || "N/A"}</p>
                            </div>

                            {/* Right side - attested & stamps */}
                            <div className="text-right space-y-3">
                                <p className="font-bold text-xl italic text-blue-800 rotate-[-8deg] transform origin-bottom-right">
                                    ATTESTED
                                </p>
                                <p className="text-lg font-medium">Date of Issue: {application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString('en-GB') : ""}</p>

                                <div className="relative inline-block mt-4">
                                    <div className="w-40 h-40 rounded-full border-8 border-blue-700/70 flex items-center justify-center rotate-[-6deg] opacity-80">
                                        <div className="text-center">
                                            <div className="text-xs font-bold">GOVT. OF BANGLADESH</div>
                                            <div className="text-lg font-black mt-1">REGISTERED</div>
                                            <div className="text-xs mt-1">{application?.approvalDate ? new Date(application.approvalDate).toLocaleDateString('en-GB') : ""}</div>
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

                <div className="h-4 bg-gradient-to-t from-[#0a7d2c] to-green-800"></div>
            </div>

            {/* Download button */}
            <div className="mt-8 text-center">
                <button
                    onClick={downloadPDF}
                    disabled={isGenerating}
                    className={`inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg shadow-lg transition-colors text-lg ${isGenerating
                        ? 'bg-green-500 cursor-wait'
                        : 'bg-[#0a7d2c] hover:bg-[#006d24]'
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