"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PaymentCard } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Carakerja({ paymentMethod, isLoading, nameCard }: { paymentMethod: PaymentCard[], isLoading: boolean, nameCard: string }) {
    const filteredMethod = paymentMethod.find((method) => method.nameCard === nameCard)
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className="w-full pt-[100px] px-10">
            <div className="flex flex-col items-center border-gray-300 border-2 h-auto rounded-lg">
                <div className="p-5 bg-gray-100/25 w-fit h-fit mt-10 rounded-lg">
                    <div className="bg-gray-100/25 text-center p-5 rounded-lg">
                        <SkeletonWrapper isLoading={isLoading}>
                            <img
                                alt="img"
                                src={filteredMethod?.imageCard || ''}
                                className="block outline-none border-none rounded-lg"
                                width="250"
                            />
                        </SkeletonWrapper>
                    </div>
                </div>
                <table
                    className="max-w-full mx-auto w-[648px] relative"
                    align="center"
                    role="presentation"
                >
                    <tbody>
                        <tr className="w-full">
                            <td>
                                <SkeletonWrapper isLoading={isLoading}>
                                    <Accordion type="single" collapsible className="text-white">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Bayar dengan nomor rekening {filteredMethod?.nameCard}</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="list-disc pl-5">
                                                    <li>Buka aplikasi {filteredMethod?.nameCard} anda</li>
                                                    <li>masukkan nomor sebagai rekening tujuan</li>
                                                    <li>Periksa detail transaksi Anda pada aplikasi, lalu tap tombol Bayar.</li>
                                                    <li>Masukkan PIN Anda.</li>
                                                    <li>Transaksi Anda sudah selesai.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>Bayar dengan kode QR {filteredMethod?.nameCard}</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="list-disc pl-5">
                                                    <li>Buka aplikasi {filteredMethod?.nameCard} anda</li>
                                                    <li>Pindai kode QR yang ada pada monitor anda</li>
                                                    <li>Periksa detail transaksi Anda pada aplikasi, lalu tap tombol Bayar.</li>
                                                    <li>Masukkan PIN Anda.</li>
                                                    <li>Transaksi Anda sudah selesai.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <p className="text-xs leading-6 m-0 text-center text-gray-500">
                                        Bayar pesanan ke Virtual Account diatas sebelum membuat pesanan
                                        kembali dengan Virtual Account agar nomor tetap sama
                                    </p>
                                    <div className="flex justify-end mb-4">
                                        <button type="button" onClick={handleBackClick} className="text-blue-700 duration-200 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Kembali</button>
                                    </div>
                                </SkeletonWrapper>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
