import {combineReducers} from "@reduxjs/toolkit";
import { MaincategoryReducer } from "./MaincategoryReducer";
import { SubcategoryReducer } from "./SubcategoryReducer";
import { BrandReducer } from "./BrandReducer";
import { FeatureReducer } from "./FeatureReducer";
import { FaqReducer } from "./FAQReducer";
import { ProductReducer } from "./ProductReducer";
import {SettingReducer} from "./SettingReducer";
import { CartReducer } from "./CartReducer";
import { WishListReducer } from "./WishListReducer";
import {CheckoutReducer} from "./CheckoutReducer";
import {TestimonialReducer} from'./Testimonial';
import {NewsletterReducer} from'./NewsletterReducer';
import {ContactReducer} from'./ContactUsReducer';
export default combineReducers(
    { 
        MaincategoryStateData:MaincategoryReducer,
        SubcategoryStateData:SubcategoryReducer,
        BrandStateData:BrandReducer,
        FeatureStateData:FeatureReducer,
        FAQStateData:FaqReducer,
        ProductStateData:ProductReducer,
        SettingStateData:SettingReducer,
        CartStateData:CartReducer,
        WishListStateData:WishListReducer,
        CheckoutStateData:CheckoutReducer,
        TestimonialStateData:TestimonialReducer,
        NewsletterStateData:NewsletterReducer,
        ContactReducerStateData:ContactReducer,
    })


    