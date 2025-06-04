"use client";

import {LayoutDashboard, UserCircle} from "lucide-react";
import SearchBar from "@/app/components/SearchBar";
import UserMenu from "@/app/components/UserMenu";

export default function Navbar({session, onSearch}: { session: any; onSearch: (query: string) => void }) {
    return (
        <div className="navbar backdrop-blur-xl bg-base-100/01 shadow-md sticky top-0 z-50 px-4">
            <div className="flex-1">
                <label className="toggle text-base-content">
                    <input type="checkbox" value="forest" className="theme-controller" />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
                <a className="btn btn-ghost normal-case text-xl gap-2">
                    Impulse PDR
                </a>
            </div>

            <div className="flex-none flex items-center gap-4">
                {/*<div className="hidden lg:block">*/}
                {/*    <SearchBar onSearch={onSearch} />*/}
                {/*</div>*/}

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            {session?.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt="User Avatar"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    </div>

                    <UserMenu session={session} />
                </div>
            </div>

        </div>
    );
}
