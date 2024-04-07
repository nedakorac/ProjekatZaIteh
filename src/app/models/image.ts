export class Image {
    constructor(
      public id: number,
      public title: string,
      public price: number,
      public description: string,
      public theme: string,
      public author: string,
      public downloadCount: number,
      public lowQualityImage: string,
      public originalImage: string
    ) {}
  }
  