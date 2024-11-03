type Pagination<T> = {
    page: number;
    limit: number;
    sort: string;
    keyword: string;

    total_items: number;
    total_pages: number;
    current_page: number;
    entities: T[];
};

export type ParamPagination = Pick<
    Pagination<any>,
    "page" | "limit" | "sort" | "keyword"
>;

export type ResponsePagination<T> = Pick<
    Pagination<T>,
    "total_items" | "total_pages" | "current_page" | "entities"
>;

export type ParamProduct = {
    brand_id: string;
    category_id: string;
    keyword: string;
};
