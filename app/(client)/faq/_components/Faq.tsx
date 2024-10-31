"use client";
import { useState } from 'react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h6 className="text-lg font-large text-center mb-2">
                        FAQs
                    </h6>
                    <h2 className="text-4xl font-manrope text-center font-bold leading-[3.25rem]">
                        Pertanyaan pengguna
                    </h2>
                </div>

                <div className="accordion-group">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`accordion py-8 px-6 border-b border-solid border-gray-200 dark:border-white-400 transition-all rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-700 ${activeIndex === index ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between leading-8 w-full transition text-left font-medium"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <h5>{faq.question}</h5>
                                <svg
                                    className={`transition ${activeIndex === index ? 'rotate-180' : ''}`}
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <div
                                className={`accordion-content w-full px-0 overflow-hidden transition-max-height ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <p className="text-base leading-6 mt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const faqData = [
    {
        question: "Bagaimana cara membuat akun?",
        answer: "Untuk daftar akun. Klik icon profil pada navigasi bar, lalu klik tombol 'Sign Up'maka anda akan di arahkan untuk daftar dengan menginputkan email dan password selain itu kami juga memberikan pilihan untuk mendaftar dengan menggunakan google."
    },
    {
        question: "Bagaimana cara memesan ruang ?",
        answer: "Untuk memesan ruang pertama dengan mengklik film yang ingin anda toton selanjutnya klik order tiket pada halaman order tiker anda bisa memilih ruang / paket yang disediakan setelah memilih maka akan diarahkan ke halaman pembayaran."
    },
    {
        question: "Apa metode pembayaran yang disediakan?",
        answer: "Kami menawarkan banyak metode pembayaran yang tersedia seperti dengan ovo, dana, shopeepay, gopay, transfer bank dan juga tersedia pembayaran dengan cash. Adapun pembayaran dengan uang cash tidak tersedia secara online anda harus datang ke tempat untuk memesan dan membayar langsung .Anda dapat memilih metode pembayaran yang sesuai dengan kebutuhan anda."
    },
    {
        question: "Bagaimana cara membatalkan pemesanan?",
        answer: "Untuk pembatalan pesanan tidak bisa dilakukan akan tetapi anda bisa mengajukan refund untuk mendapatkan pengembalian dana"
    },
    {
        qustion: "Apa yang terjadi ketika saya tidak membayar",
        answer: "Sistem kami memiliki masa waktu pembayaran, jika pelanggan tidak melakukan pembayaran dalam waktu yang telah kami tentukan maka sistem akan membatalkan transaki tersebut"
    },
    {
        question:"Bisakah membawa makanan dan minuman untuk menonton",
        answer:"Boleh, kami memperbolehkan membawa makanan dan minuman untuk menonton film akan tetapi kami tidak memperbolehkan membawa makanan dan minuman dari luar. Solusinya anda bisa membeli makanan dan minuman yang telah kami sediakan"
    }
];

export default Faq;
