import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        phone: '',
        institution_type: '',
        country: '',
        city: ''
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
                                    <Input
                                        id="institution_type"
                                        type="text"
                                        value={data.institution_type}
                                        onChange={e => setData('institution_type', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
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

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancelar
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