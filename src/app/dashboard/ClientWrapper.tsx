"use client";
import {useEffect, useState} from "react";
import ModeCards from "@/app/dashboard/components/ModeCards";
import Navbar from "@/app/dashboard/components/Navbar";
import HeroSection from "@/app/dashboard/components/HeroSection";
import UserProgress from "@/app/dashboard/components/UserProgress";
import UserDetailedStats from "@/app/dashboard/components/UserDetailedStats";
import Footer from "@/app/components/FooterSection";

import DashboardPage from "@/app/dashboard/page";

export default function DashboardPage() {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("user_name");
        const id = localStorage.getItem("user_id");
        if (name) setUserName(name);
        if (id) setUserId(id);
    }, []);

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar/>
            <HeroSection name={userName}/>

            {/* ⬇️ Только когда userId есть */}
            {userId && <UserProgress userId={userId}/>}

            <ModeCards/>

            <UserDetailedStats userId={userId}/>
            <Footer/>
        </div>
    );
}
