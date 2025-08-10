import { Box,  Typography ,Button} from "@mui/material"
import Customizedip from "../components/Customizedip"
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const Auth = useAuth();
async  function handleSubmit(event:React.FormEvent<HTMLFormElement>){
event.preventDefault();
const formData = new FormData(event.currentTarget)
const email = formData.get('email') as string
const password = formData.get('password') as string
try {
  toast.loading("Signing In",{id:"login"});
  await Auth?.login(email,password)
  toast.success("Signed in Sucessfully",{id:'login'})
} catch (error) {
  toast.error("Cant Log You in",{id:'login'})
}
  }
const navigate = useNavigate()
useEffect(()=>{
  if(Auth?.isLoggedIn)
  {
navigate('/chats')
  }
},[Auth?.isLoggedIn])

  return (
    <Box width={'100%'} height={'100vh'} display={'flex'} flex={1} justifyContent={"center"} alignContent={"center"}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginRight={'48px'} alignSelf={"center"}>
        <form onSubmit={handleSubmit} style={{
          width:"550px",
          border:"1px solid whitesmoke",
          borderRadius:'10px',
          margin:'5px',
          padding:"15px",
           boxShadow: "-5px -5px 105px #8d0de2ff",
              marginTop: 20,
              marginBottom: 20,
        }}>
          <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
            <Typography variant="h4" textAlign={'center'} fontWeight={600} padding={2}>Login</Typography>
            <Customizedip name="email" label="Email" type="email"/>
            <Customizedip name="password" label="Password" type="password"/>
            <Button type="submit" endIcon={<IoMdLogIn/>} style={{backgroundColor:"lavender", color:"blue"}}>Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
