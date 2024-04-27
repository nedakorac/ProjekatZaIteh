export class Order {
    constructor(
        public id :number,
        public user_id: number ,
        public product_id: number,
        public order_date: string
    ){

    }
}
