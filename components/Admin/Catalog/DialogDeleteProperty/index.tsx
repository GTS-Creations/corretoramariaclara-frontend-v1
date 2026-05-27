import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProperty } from "@/services/catalog.service";

interface DialogDeleteCleanProps {
  id: string;
  name: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogDeleteProperty({
  id,
  name,
  open,
  onOpenChange,
}: DialogDeleteCleanProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return await DeleteProperty(id);
    },

    onSuccess: () => {
      toast.success("Imóvel excluído com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },

    onError: () => {
      toast.error("Erro ao excluir imóvel");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-urban">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Imóvel</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir o imóvel <strong>{name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            Confirmar Exclusão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
