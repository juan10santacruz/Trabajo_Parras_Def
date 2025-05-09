import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

interface Question {
  id: number;
  text: string;
  test_id: number;
}

interface Test {
  id: number;
  name: string;
  questions: Question[];
}

interface Props extends PageProps {
  test: Test;
}

export default function TeacherEvaluation({ auth, test }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string>('');

  const optionsEnum = ['Malo', 'Regular', 'Bueno', 'Excelente'];

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    // Verificar que todas las preguntas estén respondidas
    const unansweredQuestions = test.questions.some(
      question => !answers[question.id]
    );

    if (unansweredQuestions) {
      setError('Por favor, responde todas las preguntas antes de continuar.');
      return;
    }

    // Preparar los datos para enviar
    const formData = test.questions.map(question => ({
      question_id: question.id,
      value: answers[question.id]
    }));

    // Enviar las respuestas al servidor
    router.post('/teacher/evaluation/submit', {
      test_id: test.id,
      answers: formData
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Evaluación Docente" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">{test.name}</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {test.questions.map(question => (
              <div key={question.id} className="mb-6">
                <p className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 hover:text-blue-600 transition-colors">{question.text}</p>
                <div className="grid grid-cols-4 gap-4">
                  {optionsEnum.map(option => (
                    <label
                      key={option}
                      className={`
                        flex items-center justify-center p-3 rounded-lg border
                        ${answers[question.id] === option
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
                        cursor-pointer transition-colors
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="hidden"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Enviar Respuestas
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}