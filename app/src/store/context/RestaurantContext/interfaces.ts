export interface Dish {
  _id: string;
  title: string;
  category: string;
  price: number;
  cookTime: number;
  imagesHref: Array<string>;
  isAvailable: boolean;
  isActive: boolean;
}

export interface Order {
  userId: string;
  date: Date;
  dishes: Array<Dish>;
  isDelivered: boolean;
  isPaid: boolean;
  imageUrl: string;
}

export interface Restaurant {
  name: string;
  password: string;
  avatarUrl: string;
  Address: {
    Street: string;
    Number: string;
    aditionalData: string;
    City: string;
    Country: string;
  };
  Contact: {
    Phone: string;
    Email: string;
    Website: string;
  };
  orders: Order;
  dishes: Array<Dish>;
}

export interface RestaurantState {
  restaurant: Restaurant | undefined;
}

export interface RestaurantContextProps {
  restaurantState: RestaurantState;
  loadRestaurant: (restaurant: Restaurant) => void;
}
