"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePropertySchema } from "@/schemas/property.schema";
import { UpdateProperty } from "@/services/catalog.service";
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
import { useFindOneProperty } from "@/hooks/usePropertyQuery";
import { capitalizeWords } from "@/utils/capitalize-words";
import { formatCurrency } from "@/utils/format-currency";

interface DialogEditCompanyProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UpdatePropertyFormInput = z.input<typeof updatePropertySchema>;
type UpdatePropertyFormData = z.output<typeof updatePropertySchema>;

const MAX_UPLOAD_TOTAL_SIZE_MB = 45;
const MAX_UPLOAD_TOTAL_SIZE_BYTES = MAX_UPLOAD_TOTAL_SIZE_MB * 1024 * 1024;

export default function DialogUpdateProperty({
  id,
  open,
  onOpenChange,
}: DialogEditCompanyProps) {
  const [selectedPreviews, setSelectedPreviews] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdatePropertyFormInput, any, UpdatePropertyFormData>({
    resolver: zodResolver(updatePropertySchema),

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
      video_url: "",
      canFinance: false,
      images: [],
    },
  });

  const updateImages = (nextImages: File[]) => {
    setSelectedImages(nextImages);
    setValue("images", nextImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const { data, isLoading } = useFindOneProperty({
    id,
    enabled: open,
  });

  useEffect(() => {
    if (selectedImages.length > 0) {
      const objectUrls = selectedImages.map((file) => URL.createObjectURL(file));

      setSelectedPreviews(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    }

    setSelectedPreviews([]);
  }, [selectedImages]);

  const removeImage = (index: number) => {
    updateImages(selectedImages.filter((_, currentIndex) => currentIndex !== index));
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) {
      return;
    }

    const nextImages = [...selectedImages];
    const [draggedImage] = nextImages.splice(fromIndex, 1);
    nextImages.splice(toIndex, 0, draggedImage);

    updateImages(nextImages);
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        value: data.value.toString() || "",
        bedrooms: data.bedrooms.toString() || "",
        bathrooms: data.bathrooms.toString() || "",
        garage: data.garage.toString() || "",
        squareMeters: data.squareMeters.toString() || "",
        location: data.location || "",
        type: data.type || "",
        purpose: data.purpose || "",
        description: data.description || "",
        video_url: data.video_url || "",
        canFinance: data.canFinance || false,
        images: [],
      });

      setSelectedImages([]);
      setSelectedPreviews([]);
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdatePropertyFormData) => {
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
      formData.append("video_url", data.video_url || "");

      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      return await UpdateProperty(id, formData);
    },

    onSuccess: () => {
      toast.success("Imóvel atualizado com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["property", id],
      });

      onOpenChange(false);
    },

    onError: () => {
      toast.error("Erro ao atualizar imóvel");
    },
  });

  const onSubmit = (data: UpdatePropertyFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setSelectedImages([]);
          setSelectedPreviews([]);
          reset();
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto font-urban">
        <DialogHeader>
          <DialogTitle>Atualizar Imóvel</DialogTitle>
          <DialogDescription>
            Preencha os dados do imóvel para atualizá-lo no catálogo.
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

            <div className="space-y-2">
              <Label>Url do vídeo</Label>
              <Input {...register("video_url")} />

              {errors.video_url && (
                <p className="text-sm text-red-500">
                  {errors.video_url.message}
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
            <Label htmlFor="images">Imagens da Propriedade * - Máx. 10</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);

                if (files.length > 0) {
                  const nextImages = [...selectedImages, ...files];

                  if (nextImages.length > 10) {
                    toast.error("Você pode enviar no máximo 10 imagens.");
                    event.target.value = "";
                    return;
                  }

                  const totalSize = nextImages.reduce(
                    (acc, file) => acc + file.size,
                    0,
                  );

                  if (totalSize > MAX_UPLOAD_TOTAL_SIZE_BYTES) {
                    toast.error(
                      `O total das imagens deve ser no máximo ${MAX_UPLOAD_TOTAL_SIZE_MB}MB.`,
                    );
                    event.target.value = "";
                    return;
                  }

                  updateImages(nextImages);
                }

                event.target.value = "";
              }}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              A primeira imagem da lista será usada como capa do imóvel.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Imagens do Imóvel</Label>

            {selectedPreviews.length > 0 ? (
              <div>
                <p className="text-xs text-amber-600 mb-2">
                  Novas imagens selecionadas (substituirão as atuais ao salvar):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedPreviews.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      draggable
                      onDragStart={(event) => {
                        setDraggedImageIndex(index);
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", String(index));
                      }}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (draggedImageIndex === null) {
                          return;
                        }

                        reorderImages(draggedImageIndex, index);
                        setDraggedImageIndex(null);
                      }}
                      onDragEnd={() => setDraggedImageIndex(null)}
                      className="rounded-lg border bg-muted/30 p-2 space-y-2 cursor-grab active:cursor-grabbing"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-md border bg-background">
                        <img
                          src={url}
                          alt={`Nova ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                            Capa
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          Posição {index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon-sm"
                            onClick={() => removeImage(index)}
                            aria-label="Remover imagem"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : data && data.images && data.images.length > 0 ? (
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Imagens atualmente salvas no banco de dados:
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {data.images.map((url: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                    >
                      <img
                        src={url}
                        alt={`Salva ${index}`}
                        className="w-full h-full object-cover"
                      />
                      {url === data.image && (
                        <span className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-[9px] text-center py-0.5 font-semibold">
                          Foto Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Nenhuma imagem cadastrada.
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancelar
            </Button>

            {isLoading || updateMutation.isPending ? (
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
                Atualizar Imóvel
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
