"use client";
import React from "react";
import About from "./_components/About";
import Navbar from "@/components/Navbar";
import Hero from "../hero/Hero";
import Footer from "@/app/_components/Footer";
import { getAllPayment } from "@/app/_actions/get-all-payment";
import getCurrentUser from "@/app/_actions/get-user";
const AboutPage = async() => {
    const payment = await getAllPayment()
    const user = await getCurrentUser()
    return (
        <div>
            <div><Navbar user={user} payment={payment} /></div>
            <div><Hero /></div>
            <div><About /></div>
            <div><Footer /></div>
        </div>
    );
}

export default AboutPage;
