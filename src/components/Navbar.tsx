import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from './ui/Button';
import { logout } from '@/app/login/actions';
import { Sparkles } from 'lucide-react';

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

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
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Dashboard</Button>
                            </Link>
                            <form action={logout}>
                                <Button variant="secondary" size="sm">Sign out</Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                Log in
                            </Link>
                            <Link href="/login">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
