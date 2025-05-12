import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenido">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat p-6 text-white">
                <header className="fixed top-0 right-0 p-6 w-full">
                    <nav className="flex items-center justify-end gap-4 max-w-7xl mx-auto">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-white/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-white/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <main className="flex items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4">
                    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
                            Bienvenido al Sistema de Evaluación de Docentes
                        </h1>
                        <p className="text-xl text-center text-white/90 max-w-2xl mx-auto">
                            Una plataforma integral diseñada para facilitar y mejorar el proceso de evaluación docente
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
