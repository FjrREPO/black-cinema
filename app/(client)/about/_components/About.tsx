"use client";
import { useState, useEffect } from 'react';
import Parallax from './Parallax';
import { AnimatePresence, motion } from 'framer-motion';

const About = () => {
    const [visibleAnswer, setVisibleAnswer] = useState(null);

    const toggleAnswer = (index : any) => {
        setVisibleAnswer(visibleAnswer === index ? null : index);
    };

    const faqs = [
        { question: "Dimanakah Lokasi Bioskopnya", answer: "Lokasi bioskop berada di Jalan Raya Cempaka Utara no 13 Sambilegi Lor Maguwoharjo Sleman." },
        { question: "Apakah Bisa Membayar Dengan Uang Cash", answer: "Tentu bisa dengan uang cash,tetapi anda harus datang langsung ke tempat kami." },
        { question: "Apakah Bisa Memesan Beberapa Ruang Sekaligus", answer: "Iya bisa.Kami menyediakan fitur untuk memesan beberapa ruang bioskop sekaligus." }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate');

            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (isInViewport) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures effect is only run once on component mount

    return (
        <div>
            <Parallax />
            <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                <section className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                    <section className="text-center py-12 px-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white animate">Profil kami</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-400 max-w-2xl mx-auto animate">Binema adalah website penyedia layanan pemesanan ruang mini bioskop secara online agar memudahkan pelanggan untuk melakukan pemesanan kapanpun dan dimanapun.</p>
                        <div className="flex justify-center space-x-8 mt-8 animate">
                            <div className="transition transform hover:scale-110 animate">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">18</h3>
                                <p className="text-blue-600 dark:text-blue-400">Ruang</p>
                            </div>
                            <div className="transition transform hover:scale-110 animate">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">3</h3>
                                <p className="text-blue-600 dark:text-blue-400">Pilihan Paket</p>
                            </div>
                            <div className="transition transform hover:scale-110 animate">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">500+</h3>
                                <p className="text-blue-600 dark:text-blue-400">Pilihan Film</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white py-12 px-4">
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white animate">Misi kami</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 animate">
                                <h3 className="text-lg text-blue-600 dark:text-blue-400 font-semibold">Memantau Penjualan dan Stok Tiket</h3>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">Bioskop dapat dengan mudah memantau penjualan tiket dan mengelola stok tiket secara efektif.</p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 animate">
                                <h3 className="text-lg text-blue-600 dark:text-blue-400 font-semibold">Meningkatkan Kepuasan Pelanggan</h3>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">Membantu bioskop dalam meningkatkan kepuasan pelanggan dengan memberikan informasi yang akurat dan up-to-date tentang jadwal tayang film dan penjualan tiket.</p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 animate">
                                <h3 className="text-lg text-blue-600 dark:text-blue-400 font-semibold">Memudahkan Transaksi Online</h3>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">Memudahkan pelanggan dalam melakukan transaksi online tanpa harus mengantri di loket penjualan tiket.</p>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="text-center flex flex-col w-full items-center py-12 px-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white animate">Pilihan Paket</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-8 mt-8 animate">
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">REGULER</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">VIP</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">VVIP</h3>
                        </div>
                    </div>
                    </section>

                <section className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-300 py-12 px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white animate">Fasilitas Yang Didapat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">REGULAR</h3>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">Tv 50 inch, fasilitas untuk 6 orang</p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">VIP</h3>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">Tv 55 inch, fasilitas untuk 8 orang</p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow animate">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">VVIP</h3>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">Tv 60 inch , fasilitas untuk 10 orang</p>
                        </div>
                    </div>
                </section>

                <section className="text-center py-12 px-4 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white animate">Tanya Jawab Umum</h2>
                    <div className="mt-8">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                onClick={() => toggleAnswer(index)}
                                className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4 bg-white dark:bg-gray-800 cursor-pointer animate"
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                                <AnimatePresence>
                                    {visibleAnswer === index && (
                                        <motion.p
                                            className="mt-2 text-gray-700 dark:text-gray-400"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
