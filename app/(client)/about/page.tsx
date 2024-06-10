"use client";
import React from "react";
import About from "./_components/About";
import Navbar from "@/components/Navbar";
import { User } from "lucide-react";
import Hero from "../hero/Hero";
import Footer from "@/app/_components/Footer";
const AboutPage = () => {
    return (
        <div>
            <div><Navbar user={User} payment={undefined} /></div>
            <div><Hero /></div>
            <div><About /></div>
            <div><Footer /></div>
        </div>
    );
}

export default AboutPage;
