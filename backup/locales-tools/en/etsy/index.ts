import { product_title_generator } from "./product-title-generator";
import { product_description_generator } from "./product-description-generator";
import { shop_announcement_generator } from "./shop-announcement-generator";

export const etsy = {
    ...product_title_generator,
    ...product_description_generator,
    ...shop_announcement_generator,
};
