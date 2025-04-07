import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface Teacher {
    id: number;
    name: string;
    lastname: string;
}

interface CreateProps extends PageProps {
    teachers: Teacher[];
}

export default function Create({ auth, teachers }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        phone: '',
        institution_type: '',
        country: '',
        city: '',
        teachers: [] as number[]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('institutions.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Institución</h2>}
        >
            <Head title="Crear Institución" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="address">Dirección</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="institution_type">Tipo de Institución</Label>
                                    <select
                                        id="institution_type"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={data.institution_type}
                                        onChange={e => setData('institution_type', e.target.value)}
                                    >
                                        <option value="">Seleccione un tipo</option>
                                        <option value="Colegio">Colegio</option>
                                        <option value="Universidad">Universidad</option>
                                    </select>
                                    {errors.institution_type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.institution_type}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="country">País</Label>
                                    <Input
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={e => setData('country', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.country && (
                                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="city">Ciudad</Label>
                                    <Input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="teachers">Profesores</Label>
                                    <select
                                        id="teachers"
                                        multiple
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-h-[100px]"
                                        value={data.teachers}
                                        onChange={e => {
                                            const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                            setData('teachers', selectedOptions);
                                        }}
                                    >
                                        {teachers.map((teacher) => (
                                            <option key={teacher.id} value={teacher.id}>
                                                {teacher.name} {teacher.lastname}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-sm text-gray-500 mt-1">Mantén presionada la tecla Ctrl (Windows) o Command (Mac) para seleccionar múltiples profesores</p>
                                    {errors.teachers && (
                                        <p className="text-red-500 text-sm mt-1">{errors.teachers}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Crear Institución
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}