import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Teacher {
  id: number;
  name: string;
  lastname: string;
}

interface Institution {
  id: number;
  name: string;
  address: string;
  phone: string;
  institution_type: string;
  country: string;
  city: string;
  teachers: Teacher[];
}

interface Props extends PageProps {
  institution: Institution;
  teachers: Teacher[];
}

export default function EditInstitution({ auth, institution, teachers }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: institution.name,
    address: institution.address,
    phone: institution.phone,
    institution_type: institution.institution_type,
    country: institution.country,
    city: institution.city,
    teachers: institution.teachers?.map(teacher => teacher.id) || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("institutions.update", institution.id), {
      onSuccess: () => {
        // Podríamos agregar una notificación de éxito aquí
      },
      onError: () => {
        // Podríamos manejar errores específicos aquí
      }
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Institución</h2>}
    >
      <Head title="Editar Institución" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Nombre</Label>
                  <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 border-gray-300"
                  />
                  {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-700">Dirección</Label>
                  <Input
                    type="text"
                    id="address"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 border-gray-300"
                  />
                  {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700">Teléfono</Label>
                  <Input
                    type="text"
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 border-gray-300"
                  />
                  {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                </div>

                <div>
                  <Label htmlFor="institution_type" className="text-gray-700">Tipo de Institución</Label>
                  <select
                    id="institution_type"
                    value={data.institution_type}
                    onChange={(e) => setData("institution_type", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="Colegio">Colegio</option>
                    <option value="Universidad">Universidad</option>
                  </select>
                  {errors.institution_type && <div className="text-red-500 text-sm mt-1">{errors.institution_type}</div>}
                </div>

                <div>
                  <Label htmlFor="country" className="text-gray-700">País</Label>
                  <Input
                    type="text"
                    id="country"
                    value={data.country}
                    onChange={(e) => setData("country", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 border-gray-300"
                  />
                  {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
                </div>

                <div>
                  <Label htmlFor="city" className="text-gray-700">Ciudad</Label>
                  <Input
                    type="text"
                    id="city"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    className="mt-1 block w-full bg-white text-gray-900 border-gray-300"
                  />
                  {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                </div>

                <div className="col-span-2">
                  <Label htmlFor="teachers" className="text-gray-700">Profesores</Label>
                  <select
                    id="teachers"
                    multiple
                    value={data.teachers}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value));
                      setData("teachers", selectedOptions);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {teachers?.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} {teacher.lastname}
                      </option>
                    ))}
                  </select>
                  {errors.teachers && <div className="text-red-500 text-sm mt-1">{errors.teachers}</div>}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  href={route("institutions.index")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={processing}>Actualizar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}