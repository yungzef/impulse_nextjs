"use client";

import { Info, Phone, ShieldCheck, FileText } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <div>
                <p>© {new Date().getFullYear()} Impulse PDR. Усі права захищено.</p>
            </div>
        </footer>
    );
}
