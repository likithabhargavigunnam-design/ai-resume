'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/Button';
import { Github, Chrome, Loader2 } from 'lucide-react';

export default function SocialButtons() {
    const supabase = createClient();
    const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | null>(null);

    const handleLogin = async (provider: 'google' | 'github') => {
        setLoadingProvider(provider);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (error: any) {
            console.error('Error logging in:', error.message);
            alert('Could not authenticate with ' + provider);
            setLoadingProvider(null);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 relative"
                onClick={() => handleLogin('google')}
                isLoading={loadingProvider === 'google'}
                disabled={loadingProvider !== null && loadingProvider !== 'google'}
            >
                <Chrome className="w-5 h-5 mr-2" />
                {loadingProvider === 'google' ? 'Connecting...' : 'Continue with Google'}
            </Button>
            <Button
                type="button"
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 relative"
                onClick={() => handleLogin('github')}
                isLoading={loadingProvider === 'github'}
                disabled={loadingProvider !== null && loadingProvider !== 'github'}
            >
                <Github className="w-5 h-5 mr-2" />
                {loadingProvider === 'github' ? 'Connecting...' : 'Continue with GitHub'}
            </Button>
        </div>
    );
}
