export interface College {
  id: string;

  name: string;

  city: string | null;
  state: string | null;
  type: string | null;

  fees: number | null;
  rating: number | null;
  nirfRank: number | null;
  averagePackage: number | null;

  website: string | null;
  image: string | null;
  description: string | null;

  createdAt: Date;
}