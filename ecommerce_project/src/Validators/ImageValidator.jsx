import React from 'react'
export default function imageValidator(e) {

  
  let pic;
    if(e.target.files[0])
    {
      pic=e.target.files[0];
    if(!["image/jpeg","image/jpg","image/png","image/gif","image/webp","image/avif"].includes(pic.type))
          {
            return "File Type can be only '.jpg','.png','.jpeg','.gif','webp','avif'"
          }
          else if(pic.size>1048576*2)
          {
            return "Pic Size cannot be more then 1 MB"
          }
          else{
            return ''
          }
}}
