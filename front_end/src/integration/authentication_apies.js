import axios from 'axios';

export const login=async (data)=>{
    try{
        const response = await axios.post('http://127.0.0.1:8000/authentication/login', {
        email: data.email,
        password: data.password,
      });
      console.log(response)
    return response
    }
    catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data); 
          throw new Error('Server Error'); 
        } else if (error.request) {
          console.error('No Response:', error.request); 
          throw new Error('No Response');
        } else {
          console.error('Error:', error.message);
          throw new Error('Request Error');
        }
    }

}
export const signUp=async (data)=>{
    try{
        const response = await axios.post('http://127.0.0.1:8000/authentication/createUser',data);
        return response

    }
    catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data); 
          throw new Error('Server Error'); 
        } else if (error.request) {
          console.error('No Response:', error.request); 
          throw new Error('No Response');
        } else {
          console.error('Error:', error.message);
          throw new Error('Request Error');
        }
    }
}
export const resetPassword=async (data)=>{
    try{
        const result= await axios.post("http://127.0.0.1:8000/authentication/confirmPassword",data)
        return result

    }
    catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data); 
          throw new Error('Server Error'); 
        } else if (error.request) {
          console.error('No Response:', error.request); 
          throw new Error('No Response');
        } else {
          console.error('Error:', error.message);
          throw new Error('Request Error');
        }
    }
}
export const forgotPassword=async (data)=>{
    try{
    const result=await axios.put("http://127.0.0.1:8000/authentication/forgotPassword/" +data)
    return result
    }
    catch (error) {
        if (error.response) {
          console.error('Server Error:', error.response.data); 
          throw new Error('Server Error'); 
        } else if (error.request) {
          console.error('No Response:', error.request); 
          throw new Error('No Response');
        } else {
          console.error('Error:', error.message);
          throw new Error('Request Error');
        }
    }

}
export const addingWeaverProduct=async (data)=>{

  try{
    let productData=
      {
        email: localStorage.getItem("email"),
        productName: data.name,
        productImage:data.image,
        price: data.price ,
        color: data.color,
        description: data.desc
      }
    
    const result= await axios.post("http://127.0.0.1:8000/weaver/createProduct",productData)
    return result

}
catch (error) {
    if (error.response) {
      console.error('Server Error:', error.response.data); 
      throw new Error('Server Error'); 
    } else if (error.request) {
      console.error('No Response:', error.request); 
      throw new Error('No Response');
    } else {
      console.error('Error:', error.message);
      throw new Error('Request Error');
    }
}
}
export const getWeaverProductByEmail=async (email)=>{

  try{
    
    
    const result= await axios.get("http://127.0.0.1:8000//weaver/getProductsByEmail/"+email)
    return result

}
catch (error) {
    if (error.response) {
      console.error('Server Error:', error.response.data); 
      throw new Error('Server Error'); 
    } else if (error.request) {
      console.error('No Response:', error.request); 
      throw new Error('No Response');
    } else {
      console.error('Error:', error.message);
      throw new Error('Request Error');
    }
}
}