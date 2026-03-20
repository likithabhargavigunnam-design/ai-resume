'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/Button';
import { Github, Chrome } from 'lucide-react';

export default function SocialButtons() {
    const supabase = createClient();

    const handleLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('Error logging in:', error.message);
            alert('Could not authenticate with ' + provider);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => handleLogin('google')}
            >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
            </Button>
            <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => handleLogin('github')}
            >
                <Github className="w-5 h-5 mr-2" />
                Continue with GitHub
            </Button>
        </div>
    );
}
