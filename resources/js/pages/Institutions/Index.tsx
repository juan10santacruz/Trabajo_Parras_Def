import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Institution } from '@/types';
import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

interface Props extends PageProps {
    institutions: Institution[];
}

export default function Index({ auth, institutions }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInstitutions = institutions.filter(institution =>
        institution.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('¿Está seguro de que desea eliminar esta institución?')) {
            router.delete(route('institutions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Instituciones</h2>}
        >
            <Head title="Instituciones" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        placeholder="Buscar institución..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="mr-4"
                                    />
                                </div>
                                <Button
                                    onClick={() => router.get(route('institutions.create'))}
                                    variant="default"
                                >
                                    Crear Institución
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredInstitutions.map((institution) => (
                                            <tr key={institution.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{institution.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Button
                                                        onClick={() => router.get(route('institutions.edit', institution.id))}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(institution.id)}
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}