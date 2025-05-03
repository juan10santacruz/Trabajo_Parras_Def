import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Question {
    text: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        questions: [{ text: '' }] as Question[]
    });

    const addQuestion = () => {
        setData('questions', [...data.questions, { text: '' }]);
    };

    const updateQuestion = (index: number, text: string) => {
        const updatedQuestions = [...data.questions];
        updatedQuestions[index] = { text };
        setData('questions', updatedQuestions);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = data.questions.filter((_, i) => i !== index);
        setData('questions', updatedQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tests.store'));
    };

    return (
        <AppLayout>
            <Head title="Crear Nuevo Test" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Crear Nuevo Test</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Nombre del Test
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                        Preguntas
                                    </label>
                                    {data.questions.map((question, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
                                                placeholder={`Pregunta ${index + 1}`}
                                                value={question.text}
                                                onChange={e => updateQuestion(index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(index)}
                                                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                    {errors.questions && <div className="text-red-500 text-xs mt-1">{errors.questions}</div>}
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        type="button"
                                        onClick={addQuestion}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Agregar Pregunta
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                                    >
                                        Guardar Test
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}