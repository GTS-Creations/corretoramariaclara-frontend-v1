"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import DialogStoreProperty from "@/components/Admin/Catalog/DialogStoreProperty";
import { useFindAllProperties } from "@/hooks/usePropertyQuery";
import DialogUpdateProperty from "@/components/Admin/Catalog/DialogUpdateProperty";
import DialogDeleteProperty from "@/components/Admin/Catalog/DialogDeleteProperty";
import { IProperty } from "@/interfaces/property";
import { formatCurrency } from "@/utils/format-currency";

export default function Properties() {
  const [updatePropertyId, setUpdatePropertyId] = useState<string | null>(null);
  const [deleteProperty, setDeleteProperty] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isFetching } = useFindAllProperties({
    page,
    limit,
  });

  const properties: IProperty[] = data?.data;
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;
  const hasNextPage = data?.meta?.hasNextPage ?? false;
  const hasPreviousPage = data?.meta?.hasPreviousPage ?? false;

  return (
    <main className="space-y-6 font-urban">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Imóveis</h1>
          <p className="text-gray-600">Gerencie seus imóveis</p>
        </div>

        <DialogStoreProperty />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="text-sm text-gray-600">
          {isFetching
            ? "Atualizando..."
            : `${properties ? properties.length : 0} de ${total} imóveis encontrados`}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de imóveis</CardTitle>
          <CardDescription>
            Gerencie todos os imóveis da sua lista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Finalidade</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Financiável</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(limit)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : properties?.length > 0 ? (
                  properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">
                        {property.name}
                      </TableCell>

                      <TableCell>{formatCurrency(property.value)}</TableCell>

                      <TableCell>{property.location}</TableCell>

                      <TableCell>{property.purpose}</TableCell>

                      <TableCell>{property.type}</TableCell>
                      <TableCell>
                        {property.canFinance ? "Sim" : "Não"}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => setUpdatePropertyId(property.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() =>
                              setDeleteProperty({
                                id: property.id,
                                name: property.name,
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground"
                    >
                      Nenhum imóvel encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPreviousPage || isFetching}
              className="cursor-pointer"
            >
              Anterior
            </Button>

            <span className="px-2 text-sm flex items-center">
              Página {page} de {totalPages || 1}
            </span>

            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage || isFetching}
              className="cursor-pointer"
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>

      {updatePropertyId && (
        <DialogUpdateProperty
          id={updatePropertyId}
          open={!!updatePropertyId}
          onOpenChange={(open) => {
            if (!open) {
              setUpdatePropertyId(null);
            }
          }}
        />
      )}

      {deleteProperty && (
        <DialogDeleteProperty
          id={deleteProperty.id}
          name={deleteProperty.name}
          open={!!deleteProperty}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteProperty(null);
            }
          }}
        />
      )}
    </main>
  );
}
