import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { User } from '@/types';
import { PropsWithChildren, useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

interface TeacherDashboardProps {
    auth: any;
}

function TeacherAuthenticatedLayout({ user, header, children }: PropsWithChildren<{ user: User; header?: React.ReactNode }>) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <AppLogoIcon className="block h-9 w-auto fill-current text-gray-800" />
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        {user.name}
                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg">
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                            >
                                                Cerrar sesión
                                            </Link>
                                        </div>
                                    )}
                                </div>
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

export default function TeacherDashboard({ auth }: TeacherDashboardProps) {
    return (
        <>
            <Head title="Panel de Profesores" />

            <TeacherAuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de Profesores</h2>}
            >
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="max-w-xl">
                                <section>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">Panel de Control</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Bienvenido al panel de control de profesores.
                                        </p>
                                    </header>
                                </section>
                            </div>
                        </div>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="max-w-xl">
                                <section>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">Tests Asignados</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Aquí encontrarás los tests asignados a tu institución.
                                        </p>
                                    </header>
                                    <div className="mt-6 space-y-4">
                                        {auth.tests && auth.tests.map((test: any) => (
                                            <div key={test.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                                <h3 className="text-md font-medium text-gray-900">{test.name}</h3>
                                                <p className="text-sm text-gray-600">{test.description}</p>
                                                <div className="mt-2">
                                                    <Link
                                                        href={route('tests.show', test.id)}
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        Ver detalles →
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                        {(!auth.tests || auth.tests.length === 0) && (
                                            <p className="text-sm text-gray-600">No hay tests asignados actualmente.</p>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </TeacherAuthenticatedLayout>
        </>
    );
}