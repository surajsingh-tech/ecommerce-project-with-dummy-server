
export const createRecord=async(collection,payload)=>{
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`,{
            method:"post",
            headers:{
              "content-type":"application/json"
               },
               body:JSON.stringify(payload)
             })
          return  response=await response.json()
      }
      catch(error)
      {
        console.log(error);
      }
}

//if we create any record with images (backend)
 {/*
export const createMultipartRecord=async(collection,payload)=>{
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`,{
            method:"post",
            headers:{
              
               },
               body:payload,
             })
             response=await response.json()
      }
      catch(error)
      {
        console.log(error);
        
      }
}*/}


export const getRecord=async(collection)=>{
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`,{
            method:"GET",
            headers:{
              "content-type":"application/json"
               },
             })
             return response=await response.json()
      }
      catch(error)
      {
        console.log(error);
      }
}

export const updateRecord=async(collection,payload)=>{
  
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`,{       
            method:"PUT",
            headers:{
              "content-type":"application/json"
               },
               body:JSON.stringify(payload)
             }) 
            
           return  response=await response.json()  
      }
      catch(error)
      {
        console.log(error);
      }
}
//for backend if we create record with images
{/*export const updateRecord=async(collection,payload)=>{
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.get(id)}`,{
            method:"PUT",
            headers:{
             
               },
               body:JSON.stringify(payload)
             }) 
             response=await response.json()
      }
      catch(error)
      {
        console.log(error);
        
      }
}
*/}

export const deleteRecord=async(collection,payload)=>{
      try{
              let response=await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`,{
            method:"DELETE",
            headers:{
              "content-type":"application/json"
               },
             })
           return response=await response.json()  
      }
      catch(error)
      {
        console.log(error);
      }
}

export const deletePIC = async (collection, payload) => {
  try {
    // पहले पूरा product fetch करो
    let getRes = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`);
    let product = await getRes.json();

    // pic array से image हटाओ
    product.pic = product.pic.filter((_, i) => i !== payload.indx);

    // updated product को PATCH करो
    let updateRes = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pic: product.pic })
    });

    let final = await updateRes.json();
    return final;
  } catch (error) {
    console.log("Delete PIC Error:", error);
    return { error: true, message: error.message };
  }
}
