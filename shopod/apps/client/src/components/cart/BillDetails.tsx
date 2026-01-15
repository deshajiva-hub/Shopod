
import React from 'react';

interface BillDetailsProps {
    itemTotal: number;
    deliveryFee: number;
    tax: number;
    platformFee?: number;
    restaurantCharges?: number;
    discount?: number;
    className?: string;
}

export const BillDetails: React.FC<BillDetailsProps> = ({
    itemTotal,
    deliveryFee,
    tax,
    platformFee = 0,
    restaurantCharges = 0,
    discount = 0,
    className = "",
}) => {
    const toPay = itemTotal + deliveryFee + tax + platformFee + restaurantCharges - discount;

    return (
        <div className={`bg-white rounded-lg p-4 space-y-3 ${className}`}>
            <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Bill Details</h3>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                </div>

                {deliveryFee > 0 ? (
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                    </div>
                ) : (
                    <div className="flex justify-between text-green-600">
                        <span>Delivery Fee</span>
                        <span>FREE</span>
                    </div>
                )}

                {platformFee > 0 && (
                    <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>₹{platformFee}</span>
                    </div>
                )}

                {restaurantCharges > 0 && (
                    <div className="flex justify-between">
                        <span>Restaurant Charges</span>
                        <span>₹{restaurantCharges}</span>
                    </div>
                )}

                <div className="flex justify-between">
                    <span>Govt Taxes & Other Charges</span>
                    <span>₹{tax}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-800 pt-3 mt-2 flex justify-between items-center font-bold text-gray-900 text-lg">
                <span>To Pay</span>
                <span>₹{toPay}</span>
            </div>
        </div>
    );
};
