"use client"
import React from "react";
import Faq from "./_components/Faq";
import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/_actions/get-user";
import { getAllPayment } from "@/app/_actions/get-all-payment";

const FaqPage = async () => {
    const user = await getCurrentUser()
    const payment = await getAllPayment()
    return (
        <div>
            <div><Navbar user={user} payment={payment}/></div>
            <div><Faq /></div>
        </div>
    );
}

export default FaqPage