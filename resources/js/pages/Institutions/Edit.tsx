import React from "react";
import { Head } from "@inertiajs/react";
import { AppShell } from "@/components/app-shell";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

interface Institution {
  id: number;
  name: string;
  address: string;
  phone: string;
  institution_type: string;
  country: string;
  city: string;
}

interface Props {
  institution: Institution;
}

export default function EditInstitution({ institution }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: institution.name,
    address: institution.address,
    phone: institution.phone,
    institution_type: institution.institution_type,
    country: institution.country,
    city: institution.city,
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
    <AppShell>
      <Head title="Editar Institución" />

      <div className="flex items-center justify-between mb-6">
        <Heading>Editar Institución</Heading>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>

            <div>
              <label htmlFor="institution_type" className="block text-sm font-medium text-gray-700">
                Tipo de Institución
              </label>
              <input
                type="text"
                id="institution_type"
                value={data.institution_type}
                onChange={(e) => setData("institution_type", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.institution_type && <div className="text-red-500 text-sm mt-1">{errors.institution_type}</div>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                type="text"
                id="country"
                value={data.country}
                onChange={(e) => setData("country", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                value={data.city}
                onChange={(e) => setData("city", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" type="button" href={route("institutions.index")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={processing}>
              Actualizar
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}