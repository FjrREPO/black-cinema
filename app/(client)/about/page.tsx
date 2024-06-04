"use client";
import React from "react";
import About from "./_components/About";
import Navbar from "@/components/Navbar";
import { User } from "lucide-react";

const AboutPage = () => {
    return (
        <div>
            <div><Navbar user={User}/></div>
            <div><About /></div>
x        </div>
    );
}

export default AboutPage;
