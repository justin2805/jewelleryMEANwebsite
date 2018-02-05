export class Orders {
    userId: number;
    name: string;
    email: string;
    mobileNo: string;
    address: string;
    total_cost: number;
    order_status: string;
    order_comments: string;
    payment_reference_no: string;
    ordered_date: Date;
    order: OrderArray[];
}

export class OrderArray {
    productId: number;
    prod_name: string;
    prod_ordered_qty: number;
    prod_cost: number;
    prod_cost_total: number;
}