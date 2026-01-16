import { LucideIcon } from "lucide-react";

export type RiderStatus = "Online" | "Offline" | "Busy";

export interface RiderStats {
    todayEarnings: number;
    weeklyEarnings: number;
    completedOrders: number;
    rating: number;
    onTimeRate: number;
}

export interface OrderLocation {
    address: string;
    lat: number;
    lng: number;
    name?: string;
}

export type OrderStatus = "Pending" | "Accepted" | "PickedUp" | "ArrivedAtCustomer" | "Delivered" | "Cancelled";

export interface RiderOrder {
    id: string;
    customerName: string;
    customerPhone: string;
    storeName: string;
    storeAddress: string;
    deliveryAddress: string;
    itemsCount: number;
    totalAmount: number;
    payout: number;
    distance: string;
    estimatedTime: string;
    status: OrderStatus;
    otp?: string;
    pickupLocation: OrderLocation;
    deliveryLocation: OrderLocation;
    createdAt: string;
}
