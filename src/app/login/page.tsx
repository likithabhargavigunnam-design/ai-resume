import { login, signup } from './actions'
import SocialButtons from '@/components/SocialButtons'

export default async function LoginPage(props: { searchParams: Promise<{ error: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black text-white selection:bg-blue-500/30">
            <div className="w-full max-w-md space-y-8 glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Background glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-500"></div>

                <div className="relative z-10">
                    <h2 className="mt-6 text-center text-4xl font-black tracking-tight text-white mb-2 italic">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-zinc-400">
                        Sign in to continue your resume journey
                    </p>
                </div>

                {searchParams?.error && (
                    <div className="relative z-10 bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-4 rounded-2xl text-center backdrop-blur-sm animate-shake">
                        {searchParams.error}
                    </div>
                )}

                <div className="relative z-10 space-y-6">
                    <form className="space-y-4">
                        <div className="space-y-3">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-600"
                                placeholder="Email address"
                            />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-600"
                                placeholder="Password"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                formAction={login}
                                className="flex-1 rounded-2xl bg-white text-black px-4 py-3 text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                Sign in
                            </button>
                            <button
                                formAction={signup}
                                className="flex-1 rounded-2xl bg-zinc-800 text-white px-4 py-3 text-sm font-bold hover:bg-zinc-700 border border-white/5 transition-all active:scale-95"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink mx-4 text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">OR CONTINUE WITH</span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    <SocialButtons />
                </div>

                <p className="relative z-10 mt-8 text-center text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
                    Secured by Supabase Auth
                </p>
            </div>
        </div>
    )
}
