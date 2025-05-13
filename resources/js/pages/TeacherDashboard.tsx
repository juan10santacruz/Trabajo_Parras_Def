import { Head } from '@inertiajs/react';
import React from 'react';
import { User } from '@/types';
import { PropsWithChildren, useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

interface TeacherDashboardProps {
    auth: {
        user: User;
        tests?: Array<{
            id: number;
            name: string;
            description: string;
        }>;
    };
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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function TeacherDashboard({ auth }: TeacherDashboardProps) {
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const generateReport = async () => {
        try {
            const response = await axios.get('/teacher/report');
            setReportData({
                labels: response.data.labels,
                datasets: [{
                    label: 'Desempeño por Competencia',
                    data: response.data.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.3)',  // Rojo - Malo
                        'rgba(255, 206, 86, 0.3)',  // Amarillo - Regular
                        'rgba(54, 162, 235, 0.3)',  // Azul - Bueno
                        'rgba(75, 192, 192, 0.3)',  // Verde - Excelente
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 2,
                    pointBackgroundColor: [
                        'rgba(255, 99, 132, 1)',  // Rojo - Malo
                        'rgba(255, 206, 86, 1)',  // Amarillo - Regular
                        'rgba(54, 162, 235, 1)',  // Azul - Bueno
                        'rgba(75, 192, 192, 1)',  // Verde - Excelente
                    ],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    labels: ['Malo', 'Regular', 'Bueno', 'Excelente']
                }]
            });
            setRecommendations(response.data.recommendations);
            setShowReportModal(true);
        } catch (error) {
            console.error('Error al generar el reporte:', error);
        }
    };
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
                                        {auth.tests && auth.tests.map((test: { id: number; name: string; description: string }) => (
                                            <div key={test.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                                <h3 className="text-md font-medium text-gray-900">{test.name}</h3>
                                                <p className="text-sm text-gray-600">{test.description}</p>
                                                <div className="mt-2">
                                                    <Link
                                                        href={route('teacher.evaluation.show', test.id)}
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        Responder test →
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
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="max-w-xl">
                                <button
                                    onClick={generateReport}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Generar Reporte de Desempeño
                                </button>
                            </div>
                        </div>
                        {showReportModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold bg-blue-600 text-white px-4 py-2 rounded-lg">Reporte de Desempeño</h2>
                                        <button
                                            onClick={() => setShowReportModal(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {reportData && (
                                        <div className="mb-6">
                                            <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
                                                <Radar 
                                                    data={reportData}
                                                    options={{
                                                        plugins: {
                                                            legend: {
                                                                position: 'top',
                                                                labels: {
                                                                    font: {
                                                                        size: 14,
                                                                        weight: 'bold'
                                                                    },
                                                                    padding: 20,
                                                                    usePointStyle: true,
                                                                    pointStyle: 'circle',
                                                                    generateLabels: function(chart) {
                                                                        const datasets = chart.data.datasets;
                                                                        return datasets[0].labels.map((label, i) => ({
                                                                            text: label,
                                                                            fillStyle: datasets[0].pointBackgroundColor[i],
                                                                            strokeStyle: datasets[0].borderColor[i],
                                                                            lineWidth: 2,
                                                                            hidden: false,
                                                                            index: i,
                                                                            datasetIndex: 0
                                                                        }));
                                                                    }
                                                                }
                                                            },
                                                            tooltip: {
                                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                                padding: 12,
                                                                titleFont: {
                                                                    size: 14,
                                                                    weight: 'bold'
                                                                },
                                                                bodyFont: {
                                                                    size: 13
                                                                },
                                                                displayColors: true,
                                                                callbacks: {
                                                                    label: function(context) {
                                                                        return `${context.dataset.label}: ${context.formattedValue}%`;
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        scales: {
                                                            r: {
                                                                angleLines: {
                                                                    display: true,
                                                                    color: 'rgba(0,0,0,0.1)',
                                                                    lineWidth: 1
                                                                },
                                                                grid: {
                                                                    color: 'rgba(0,0,0,0.1)',
                                                                    circular: true
                                                                },
                                                                pointLabels: {
                                                                    font: {
                                                                        size: 12,
                                                                        weight: 'bold'
                                                                    },
                                                                    color: '#666'
                                                                },
                                                                ticks: {
                                                                    backdropColor: 'transparent',
                                                                    color: '#666',
                                                                    font: {
                                                                        size: 10
                                                                    }
                                                                },
                                                                suggestedMin: 0,
                                                                suggestedMax: 100
                                                            }
                                                        },
                                                        elements: {
                                                            line: {
                                                                tension: 0.4
                                                            }
                                                        },
                                                        responsive: true,
                                                        maintainAspectRatio: true
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-6">
                                        <h3 className="text-lg font-bold mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">Recomendaciones</h3>
                                        <div className="space-y-2">
                                            {recommendations.map((recommendation, index) => (
                                                <div key={index} className="p-3 bg-blue-100 text-blue-800 rounded-lg shadow-sm border border-blue-200">
                                                    {recommendation}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </TeacherAuthenticatedLayout>
        </>
    );
}