import { FindAllProperties, FindOneProperty } from "@/services/catalog.service";
import { useQuery } from "@tanstack/react-query";

interface UseFindOnePropertyProps {
  id: string;
  enabled?: boolean;
}

interface UseFindAllPropertiesProps {
  enabled?: boolean;
  page?: number;
  limit?: number;
  location?: string;
  type?: string;
  purpose?: string;
}

export function useFindOneProperty({
  id,
  enabled = true,
}: UseFindOnePropertyProps) {
  return useQuery({
    queryKey: ["property", id],

    queryFn: async () => {
      return await FindOneProperty(id);
    },

    enabled: enabled && !!id,
  });
}

export function useFindAllProperties({
  enabled = true,
  page,
  limit,
  location,
  type,
  purpose,
}: UseFindAllPropertiesProps = {}) {
  return useQuery({
    queryKey: ["properties", page, limit, location, type, purpose],

    queryFn: async () => {
      return await FindAllProperties(page, limit, location, type, purpose);
    },

    enabled,
  });
}
