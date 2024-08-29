

export interface post {
    id:number,
    title:string,
    cost :number,
    category:string,
    description:string,
    location:string,
    imgUrls:string[]
}

export interface filterData{
    locations:string[],
    priceFrom:number,
    priceTo:number,
    category:string
}