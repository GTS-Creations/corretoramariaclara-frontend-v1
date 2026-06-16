export interface IProperty {
  id: string;
  name: string;
  value: string;
  location: string;
  purpose: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  squareMeters: number;
  description: string;
  canFinance: boolean;
  images?: string[];
  video_url?: string;
}
