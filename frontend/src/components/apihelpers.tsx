import axios from "axios";

export const loginUser = async (email:string , password:string) =>{
    let res = await axios.post('/user/login',{email,password});
    if(res.status!=200)
    {
        throw new Error("unable to login!")
    }
    const data = res.data;
    return data
}

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    // 🔍 Log the actual input before sending to backend
    console.log("SIGNUP INPUTS:", { name, email, password });

    const res = await axios.post("http://localhost:5000/api/v1/user/signup", {
      name,
      email,
      password,
    });

    if (res.status !== 201) {
      throw new Error("Unable to signup!");
    }

    return res.data;
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err.message);
    console.error("RESPONSE DATA:", err.response?.data);
    throw err;
  }
};


export const AuthUser = async () =>{
    let res = await axios.get('/user/auth-status');
    if(res.status!=200)
    {
        throw new Error("unable to login!")
    }
    const data = res.data;
    return data
}
export const SendMessages = async (message:string) =>{
    let res = await axios.post('/chat/new',{message});
    if(res.status!=200)
    {
        throw new Error("Unable to send chats!")
    }
    const data = res.data;
    return data
}
export const GetMessaged = async () =>{
    let res = await axios.get('/chat/allchats');
    if(res.status!=200)
    {
        throw new Error("Unable to send chats!")
    }
     const data = res.data;
    return data
}
export const DeleteChats = async () =>{
    let res = await axios.delete('/chat/deletechats');
    if(res.status!=200)
    {
        throw new Error("Unable to send chats!")
    }
     const data = res.data;
    return data
}

export const Logout = async () =>{
    let res = await axios.get('/user/logout');
    if(res.status!=200)
    {
        throw new Error("Unable to logout!")
    }
     const data = res.data;
    return data
}