import { User } from '@/types';
import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

interface Props {
    user: User;
    header?: React.ReactNode;
}

export default function AuthenticatedLayout({ user, header, children }: PropsWithChildren<Props>) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')}>
                                    <AppLogoIcon className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <span className="inline-flex rounded-md">
                                    <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                        {user.name}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}