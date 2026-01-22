
import passwordValidator from 'password-validator';
import { useState } from 'react';

export default function FromValidator(e) {
        // Create a schema
        var schema = new passwordValidator();
        // Add properties to it
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(12)                                  // Maximum length 100
        .has().uppercase(1)                              // Must have 1 uppercase letters
        .has().lowercase(1)                              // Must have 1 lowercase letters
        .has().digits(1)                                // Must have at least 1 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123','Admin123','1234']); // Blacklist these values
    let {name,value}=e.target;    
    switch(name){
        case "name":
        case "username":     
             if(!value||value.length==0)
                 {return name+"Field is Mandatory"}
            else if(value.length<3||value.length>50)
            {
               return name+"Length must be between 3-50"
            }
            else
                return "";
        case "icon":
            if(!value){
                return name+"Icon is Mandatory"
            }
            else
             return ""
        case "email":
        case "address":
            if(!value){
                return name+"Email is Mandatory"
            }
            else if(value.length<14)
            { 
                return name+"Length must be > 14"
            }
            else
             return ""
          
            case "password":
            case "newPass":
            case "newpass":
            case "cnfNewPass":
            
            if(!value){
                return name+" is Mandatory"
            }
            else if(!schema.validate(value))
            { 
                return "Invalid Password!,It must contain max 12 characters and must have ,1 uppercase ,1 lowercase ,no spaces, 1 digit"
            }
            else
            {
             return ""}
         case "cnfpassword":
             if(!value)
                return "Please Renter Password"
             else
             {
                return ""
             }
            
        case "phone":
            if(!value||value.length==0)
                 {return name+"Field is Mandatory"}
            else if(value.length!==10)
            {
               return name+"Number must be 10 digits for mobile number"
            }
            else if(!value.startsWith("9")&&!value.startsWith("8")&&!value.startsWith("7")&&!value.startsWith("6"))
            {
                   return "Invalid Number"
            }
            else
                return ""; 

        case "shortDescription":
            if(!value||value.length==0)
                 {return name+"Field is Mandatory"}
            else if(value.length<50||value.length>150)
            {
               return name+"Length must be between 50-150 Charactor"
            }
            else
                return "";

        case "question":
            if(!value||value.length==0)
                 {return name+"Field is Mandatory"}
            else if(value.length<10||value.length>250)
            {
               return name+"Length must be between 10-250 Charactor"
            }
            else
                return ""; 

        case "answer":
            if(!value||value.length==0)
                 {return name+"Field is Mandatory"}
            else if(value.length<5)
            {
               return name+"Length must be between 10-250 Charactor"
            }
            else
                return "";

        case "basePrice":
             
            if(!value)
                 {return name+"Field is Mandatory"}
            else if(value<10)
            {
               return name+"Length must be greater > 10"
            }
            else return ""

        case "stockQuantity":
          if(!value)
                {
                    return name+"is Mandatory"
                }
                if(value<=0)
                {
                    return name+" Can't have negative stock >=0"
                }
                else 
                {
                    return ""
                }
        case "discount":   
                 if(!value)
                {
                    return name+"is Mandatory"
                }
                if(value<0 )
                {
                   return "Enter Discount Between 0-100 %";
                }
                else if(value>100)
                {
                     return "Enter Discount Between 0-100 %";
                }
                else 
                {
                    return ""
                }

            default:return name;
}
}
