import { AppBar, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Navigation } from "./Navigation";
export const Header = () => {
  const auth = useAuth()
  return (
    <div> 
      <AppBar sx={{backgroundColor:"black",position:"fixed" ,borderRadius:'7px'}}>
<Toolbar sx={{ display: "flex"}}>
  <div style={{ marginLeft: "8px", fontWeight: "bold", fontSize: "48px",fontFamily:"Arial" }}>
    <span style={{color:'blueviolet'}}>B</span>ot<span style={{color:"greenyellow"}}>C</span>hat
  </div>

  {/* This pushes the right side all the way to the end */}
  <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
    {auth?.isLoggedIn ? (
      <>
      
        <Navigation
        bg="black"
          to="/chats"
          text="Go to Chats"
          textcolor="whitesmoke"
        />
        <Navigation
          bg="black"
          to="/"
          text="Logout"
          textcolor="whitesmoke"
          onClick={auth.logout}
        />
      </>
    ) : (
      <>
        <Navigation
          bg="#000000ff"
          to="/login"
          text="Login"
          textcolor="whitesmoke"
        />
        <Navigation
          bg="#000000ff"
          to="/sign"
          text="Signup"
          textcolor="whitesmoke"
        />
      </>
    )}
  </div>
</Toolbar>

      </AppBar>
    </div>
  )
}
