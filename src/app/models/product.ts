export class Product {

    constructor(
        public id: number,
        public title: string,
        public price: number,
        public description: string,
        public theme: string,
        public author: string,
        public downloadCount: number,
        public freeVersion: string,
        public paidVersion: string,
        public displayImage: string
      ) {}
}

