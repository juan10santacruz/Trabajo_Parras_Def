import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User } from '@/types';
import { PropsWithChildren, useState, useEffect } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import axios from 'axios';

interface AdminDashboardProps {
    auth: {
        user: User;
    };
}

interface Test {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}

interface Question {
    id: number;
    text: string;
    rating: string;
}

function AdminAuthenticatedLayout({ user, header, children }: PropsWithChildren<{ user: User; header?: React.ReactNode }>) {
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

export default function AdminDashboard({ auth }: AdminDashboardProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        questions: [{ text: '' }] as Question[]
    });
    const [showCreateTest, setShowCreateTest] = useState(false);
    const [showTests, setShowTests] = useState(false);
    const [tests, setTests] = useState<Test[]>([]);


    useEffect(() => {
        if (showTests) {
            axios.get('/tests', {
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.data && Array.isArray(response.data.data)) {
                        setTests(response.data.data);
                    } else {
                        console.error('Formato de respuesta inválido: se esperaba un array en response.data.data');
                        setTests([]);
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los tests:', error);
                    setTests([]);
                });
        }
    }, [showTests]);

    const addQuestion = () => {
        setData('questions', [...data.questions, { text: '' }]);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = data.questions.filter((_, i) => i !== index);
        setData('questions', updatedQuestions);
    };

    const updateQuestion = (index: number, text: string) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[index] = { text };
        setData('questions', updatedQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tests.store'), {
            onSuccess: () => {
                setShowCreateTest(false);
                setShowTests(true);
                setData({
                    name: '',
                    description: '',
                    questions: [{ text: '' }]
                });
                axios.get('/tests', {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.data && Array.isArray(response.data.data)) {
                        setTests(response.data.data);
                    }
                });
            },
            onError: (errors) => {
                console.error('Error al crear el test:', errors);
            }
        });
    };

    return (
        <>
            <Head title="Panel de Administrador" />

            <AdminAuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de Administrador</h2>}
            >
                <div className="py-12">
                    <div className="max-w-full mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="w-full">
                                <section>
                                    <header>
                                        <h2 className="text-2xl font-medium text-gray-900">Panel de Control</h2>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Bienvenido al panel de control de administrador.
                                        </p>
                                    </header>
                                    
                                    <div className="mt-8 space-y-6">
                                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                                            <h3 className="text-md font-medium text-gray-900">Gestión de Tests</h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Cree y administre tests de evaluación docente basados en competencias.
                                            </p>
                                            <div className="mt-3 flex space-x-3">
                                                <button
                                                    onClick={() => setShowTests(!showTests)}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    {showTests ? 'Ocultar Tests' : 'Ver Tests'}
                                                </button>
                                                <button
                                                    onClick={() => setShowCreateTest(!showCreateTest)}
                                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Crear Nuevo Test
                                                </button>
                                            </div>
                                            {showTests && (
                                                <div className="mt-4 overflow-x-auto bg-white rounded-lg shadow">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                                                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
                                                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Preguntas</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {tests.map((test, index) => (
                                                                <tr key={test.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{test.name}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500">{test.description}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                                        <ul className="list-disc list-inside space-y-2 max-h-60 overflow-y-auto pr-4">
                                                                            {test.questions.map((question, qIndex) => (
                                                                                <li key={qIndex} className="py-1 border-b border-gray-100 last:border-0">{question.text}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                            {showCreateTest && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                    <div className="bg-white rounded-lg w-full max-w-5xl p-8 max-h-[90vh] overflow-y-auto">
                                                        <h4 className="text-2xl font-medium text-gray-900 mb-6">Crear Nuevo Test</h4>
                                                        <form onSubmit={handleSubmit} className="space-y-6">
                                                            <div>
                                                                <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">Nombre del Test</label>
                                                                <input
                                                                    type="text"
                                                                    id="testName"
                                                                    value={data.name}
                                                                    onChange={(e) => setData('name', e.target.value)}
                                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                                                                    placeholder="Ingrese el nombre del test"
                                                                />
                                                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="testDescription" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                                                <textarea
                                                                    id="testDescription"
                                                                    value={data.description}
                                                                    onChange={(e) => setData('description', e.target.value)}
                                                                    rows={4}
                                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                                                                    placeholder="Describa el propósito y objetivos del test"
                                                                />
                                                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <label className="block text-sm font-medium text-gray-700">Preguntas ({data.questions.length}/20)</label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={addQuestion}
                                                                        disabled={data.questions.length >= 20}
                                                                        className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                        Agregar Pregunta
                                                                    </button>
                                                                </div>
                                                                <div className="space-y-4">
                                                                    {data.questions.map((question, index) => (
                                                                        <div key={index} className="p-4 border rounded-md bg-gray-50">
                                                                            <div className="flex items-start gap-4">
                                                                                <div className="flex-grow">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                        <span className="font-medium text-gray-700">Pregunta {index + 1}</span>
                                                                                    </div>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={question.text}
                                                                                        onChange={(e) => updateQuestion(index, e.target.value)}
                                                                                        placeholder="Escriba su pregunta aquí"
                                                                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 mb-2"
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                {data.questions.length > 1 && (
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => removeQuestion(index)}
                                                                                        className="text-red-600 hover:text-red-800"
                                                                                        title="Eliminar pregunta"
                                                                                    >
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                                        </svg>
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowCreateTest(false)}
                                                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    disabled={processing}
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm disabled:opacity-50"
                                                                >
                                                                    Guardar Test
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}