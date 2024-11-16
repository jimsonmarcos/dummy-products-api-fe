export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};

export type ProductResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};
