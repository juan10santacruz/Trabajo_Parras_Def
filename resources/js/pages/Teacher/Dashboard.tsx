import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

interface Test {
  id: number;
  name: string;
  is_completed: boolean;
}

interface Props extends PageProps {
  tests: Test[];
  message?: string;
}

export default function Dashboard({ auth, tests, message }: Props) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Evaluaciones Disponibles</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{test.name}</h3>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          test.is_completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {test.is_completed ? 'Completado' : 'Pendiente'}
                      </span>
                      {!test.is_completed && (
                        <Link
                          href={`/teacher/evaluation/${test.id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                          Responder
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}