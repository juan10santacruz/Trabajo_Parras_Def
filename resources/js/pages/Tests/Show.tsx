import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Question {
    id: number;
    text: string;
}

interface Props {
    test: {
        id: number;
        name: string;
        description: string;
        questions: Question[];
    };
}

export default function Show({ test }: Props) {
    return (
        <AppLayout>
            <Head title={`Ver Test - ${test.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">{test.name}</h2>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción</h3>
                                <p className="text-gray-600 dark:text-gray-400">{test.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Preguntas</h3>
                                <div className="space-y-4">
                                    {test.questions.map((question, index) => (
                                        <div 
                                            key={question.id} 
                                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                        >
                                            <p className="text-gray-800 dark:text-gray-200">
                                                <span className="font-medium">{index + 1}. </span>
                                                {question.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}