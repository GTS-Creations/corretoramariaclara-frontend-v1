"use client";

import { Plus } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storePropertySchema } from "@/schemas/property.schema";
import { StoreProperty } from "@/services/catalog.service";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeWords } from "@/utils/capitalize-words";
import { formatCurrency } from "@/utils/format-currency";

type CreatePropertyFormInput = z.input<typeof storePropertySchema>;
type CreatePropertyFormData = z.output<typeof storePropertySchema>;

export default function DialogStoreProperty() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePropertyFormInput, any, CreatePropertyFormData>({
    resolver: zodResolver(storePropertySchema),

    defaultValues: {
      name: "",
      value: "",
      bedrooms: "",
      bathrooms: "",
      garage: "",
      squareMeters: "",
      location: "",
      type: "",
      purpose: "",
      description: "",
      canFinance: false,
      images: undefined,
    },
  });

  const resetForm = () => {
    reset({
      name: "",
      value: "",
      bedrooms: "",
      bathrooms: "",
      garage: "",
      squareMeters: "",
      location: "",
      type: "",
      purpose: "",
      description: "",
      canFinance: false,
      images: undefined,
    });
  };

  const createMutation = useMutation({
    mutationFn: async (data: CreatePropertyFormData) => {
      const formData = new FormData();

      formData.append("name", capitalizeWords(data.name));
      formData.append("value", String(data.value ?? 0));
      formData.append("bedrooms", String(data.bedrooms ?? 0));
      formData.append("bathrooms", String(data.bathrooms ?? 0));
      formData.append("garage", String(data.garage ?? 0));
      formData.append("squareMeters", String(data.squareMeters ?? 0));
      formData.append("location", capitalizeWords(data.location));
      formData.append("type", data.type);
      formData.append("purpose", data.purpose);
      formData.append("description", data.description);
      formData.append("canFinance", data.canFinance.toString());

      if (data.images && data.images.length > 0) {
        if (data.images.length === 1) {
          formData.append("image", data.images[0]);
        } else {
          formData.append("image", data.images[0]);
          data.images.forEach((file) => {
            formData.append("images", file);
          });
        }
      }

      return await StoreProperty(formData);
    },

    onSuccess: () => {
      toast.success("Imóvel criado com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
      resetForm();
      setIsDialogOpen(false);
    },

    onError: () => {
      toast.error("Erro ao criar imóvel");
    },
  });

  const onSubmit = (data: CreatePropertyFormData) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);

        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-gray-200 px-6 py-3 cursor-pointer text-black border border-gray-300 font-urban">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Imóvel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto font-urban">
        <DialogHeader>
          <DialogTitle>Adicionar Imóvel</DialogTitle>
          <DialogDescription>
            Preencha os dados do imóvel para adicioná-lo ao catálogo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input {...register("name")} />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Valor *</Label>
              <Controller
                control={control}
                name="value"
                render={({ field }) => (
                  <Input
                    type="text"
                    value={formatCurrency((field.value as number) || 0)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");

                      field.onChange(Number(rawValue) / 100);
                    }}
                  />
                )}
              />

              {errors.value && (
                <p className="text-sm text-red-500">{errors.value.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Quartos *</Label>
              <Input
                type="number"
                {...register("bedrooms", {
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
              />

              {errors.bedrooms && (
                <p className="text-sm text-red-500">
                  {errors.bedrooms.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Banheiros *</Label>
              <Input
                type="number"
                {...register("bathrooms", {
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
              />

              {errors.bathrooms && (
                <p className="text-sm text-red-500">
                  {errors.bathrooms.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Garagem *</Label>
              <Input
                type="number"
                {...register("garage", {
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
              />

              {errors.garage && (
                <p className="text-sm text-red-500">{errors.garage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Metros Quadrados *</Label>
              <Input type="number" {...register("squareMeters")} />

              {errors.squareMeters && (
                <p className="text-sm text-red-500">
                  {errors.squareMeters.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Finalidade *</Label>
              <Select
                value={watch("purpose") || "none"}
                onValueChange={(value) =>
                  setValue("purpose", value === "none" ? "" : value)
                }
              >
                <SelectTrigger id="purpose" className="w-full cursor-pointer">
                  <SelectValue placeholder="Selecione a finalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Selecione...</SelectItem>
                  <SelectItem value="Venda">Venda</SelectItem>
                  <SelectItem value="Aluguel">Aluguel / Locação</SelectItem>
                  <SelectItem value="Temporada">Temporada</SelectItem>
                </SelectContent>
              </Select>

              {errors.purpose && (
                <p className="text-sm text-red-500">{errors.purpose.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo do Imóvel *</Label>
              <Select
                value={watch("type") || "none"}
                onValueChange={(value) =>
                  setValue("type", value === "none" ? "" : value)
                }
              >
                <SelectTrigger id="type" className="w-full cursor-pointer">
                  <SelectValue placeholder="Selecione o tipo do imóvel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Selecione...</SelectItem>

                  <SelectGroup>
                    <SelectLabel className="font-bold text-muted-foreground">
                      Residencial
                    </SelectLabel>
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                    <SelectItem value="Casa-Condominio">
                      Casa em Condomínio
                    </SelectItem>
                    <SelectItem value="Cobertura">Cobertura</SelectItem>
                    <SelectItem value="Kitnet">Kitnet / Loft</SelectItem>
                  </SelectGroup>

                  <SelectGroup className="mt-2">
                    <SelectLabel className="font-bold text-muted-foreground">
                      Comercial / Outros
                    </SelectLabel>
                    <SelectItem value="Sala-Comercial">
                      Sala Comercial
                    </SelectItem>
                    <SelectItem value="Galpao">Galpão / Depósito</SelectItem>
                    <SelectItem value="Terreno">Terreno / Lote</SelectItem>
                    <SelectItem value="Chacara">Chácara / Sítio</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Localidade *</Label>
              <Input {...register("location")} />

              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Label>Financiável?</Label>
              <Switch
                className="cursor-pointer"
                checked={watch("canFinance")}
                onCheckedChange={(checked) => setValue("canFinance", checked)}
              />
            </div>
          </div>

          <div className="block pt-2">
            <div className="w-full space-y-2">
              <Label htmlFor="description">Descrição do Imóvel *</Label>
              <Textarea
                id="description"
                {...register(`description` as const, {
                  required:
                    "Descreva o imóvel para que os clientes possam conhecê-lo melhor",
                  minLength: {
                    value: 20,
                    message: "Escreva pelo menos 20 caracteres",
                  },
                })}
                placeholder="Descreva o imóvel..."
                maxLength={5000}
                className={`min-h-30 resize-none wrap-break-word ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.description ? (
                  <p className="text-red-500">{errors.description.message}</p>
                ) : (
                  <span></span>
                )}

                <p className="text-[10px] text-gray-400 break-all">
                  {watch("description")?.length || 0}/5000
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="images">Imagens da Propriedade * - Máx. 5</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="cursor-pointer"
            />
            {errors.images && (
              <p className="text-sm text-red-500">{errors.images.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
              className="cursor-pointer"
            >
              Cancelar
            </Button>

            {createMutation.isPending ? (
              <Button
                disabled
                type="submit"
                className="cursor-pointer bg-green-700 hover:bg-green-800 text-white"
              >
                Carregando...
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer bg-green-700 hover:bg-green-800 text-white"
              >
                Adicionar Imóvel
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
