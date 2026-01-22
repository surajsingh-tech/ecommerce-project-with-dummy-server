import {all} from "redux-saga/effects";
import { MaincategorySagas } from "./Services/MaincategorySagas";
import { SubcategorySagas } from "./Services/SubcategorySagas";
import { BrandSagas } from "./Services/BrandSagas";
import { FeatureSagas } from "./Services/FeatureSagas";
import { FaqSagas } from "./Services/FAQSagas";
import { ProductSagas } from "./Services/ProductSagas";
import { SettingSagas } from "./Services/SettingSagas";
import { CartSagas } from "./Services/CartSagas";
import { WishlistSagas } from "./Services/WishListSagas";
import { CheckoutSagas } from "./Services/CheckoutSagas";
import {TestimonialSagas} from "./Services/TestimonialSagas";
import {NewsletterSagas} from './Services/NewsletterSagas';
import {ContactSagas} from './Services/ContactUsSagas';
export default function* RootSagas() {
 yield all(
     [  
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        FeatureSagas(),
        FaqSagas(),
        ProductSagas(),
        SettingSagas(),
        CartSagas(),
        WishlistSagas(),
        CheckoutSagas(),
        TestimonialSagas(),
        NewsletterSagas(),
        ContactSagas(),
     ]
 )
}
