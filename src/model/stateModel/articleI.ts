
export interface ArticleI  {
    id: string,
    img: string;
    title: string;
}

export interface ArticleAdvantageI extends ArticleI{
    description: string;
}

export interface AdvantagesI {
    articles: ArticleAdvantageI[];
}

export interface ArticleNewsI extends ArticleAdvantageI{
    date: string;
}

export interface ArticleFeaturedProductsI extends ArticleI{
    price: string;
    priceOff?: string;
}