"use client"
import React from "react";
import { User } from "lucide-react";
import Faq from "./_components/Faq";
import Navbar from "@/components/Navbar";

const FaqPage = () => {
    return (
        <div>
            <div><Navbar user={User} /></div>
            <div><Faq /></div>
        </div>
    );
}

export default FaqPage