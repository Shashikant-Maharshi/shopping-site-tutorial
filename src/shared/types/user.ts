export enum UserRole {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
}

export type User = {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  avatar: string;
  email: string;
  address: {
    country: string;
    city: string;
    zip: string;
    street: string;
  };
  orders: {
    id: number;
    products: {
      id: number;
      quantity: number;
    }[];
  };
  role: UserRole; // Role is based on i % 2
};