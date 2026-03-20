'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Sparkles, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/login/actions';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white group-hover:bg-zinc-200 transition-colors">
                        <Sparkles className="h-5 w-5 text-black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white font-display">
                        inten<span className="text-zinc-500">.pro</span>
                    </span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="hidden sm:flex">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <form action={logout}>
                                <Button variant="ghost" size="sm" type="submit" className="text-zinc-400 hover:text-white">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign In
                            </Button>
                        </Link>
                    )}
                    <Link href="/builder">
                        <Button size="sm" className="bg-white text-black hover:bg-zinc-200 font-bold">Build Resume</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
