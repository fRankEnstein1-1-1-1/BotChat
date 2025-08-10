import { Box,Avatar,Typography,Button,IconButton} from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { red } from "@mui/material/colors";
import { ChatItem } from "../components/chats/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DeleteChats, GetMessaged, SendMessages } from "../components/apihelpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type Message={
role:"user"  | "assistant";
content:String
}

export const Chats = () => {
const auth = useAuth()
const inputRef = useRef<HTMLInputElement | null>(null);
const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login")
    }
  }, [auth]);

const[chatmessages,setchatmessages] = useState<Message[]>([])
const handleSubmit = async ()=>{
const content = inputRef.current?.value as string;


if(inputRef && inputRef.current){
  inputRef.current.value = ""
}
const newmessages:Message = {role:"user",content};
setchatmessages((prev)=>[...prev,newmessages])
const chatData = await SendMessages(content);
setchatmessages([...chatData.chats])
}

 const initials = (() => {
  const name = auth?.user?.name || "";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";
  return first + second;
})();

const isFetched = useRef(false);

useLayoutEffect(() => {
  if (auth?.isLoggedIn && auth.user && !isFetched.current) {
    isFetched.current = true;
    toast.loading("Loading Messages", { id: "loadchats" });
    GetMessaged()
      .then((data) => {
        setchatmessages([...data.chats]);
        toast.success("Chats Loaded Sucessfully!",{id:"loadchats"});
      })
      .catch((error) => {
        toast.error("Messages Couldn't be Loaded", { id: "loadchats" });
      });
  }
}, [auth?.isLoggedIn, auth?.user?.email]);



  async function handleDelete(){
    try{
      toast.loading("Deleting Chats",{id:"loaddelete"})
      await DeleteChats();
      setchatmessages([])
      toast.success("Deleted Chats",{id:"loaddelete"})
    }
    catch(error){
      console.log("Unable to delete Chats");
      toast.error("Cant delete messages",{id:"loaddelete"})
    }
  }
  return (
   <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "90vh",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            marginRight:3
          }}
        >

           <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
             <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3, }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
           <Button
          onClick={handleDelete}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              backgroundColor:red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
        </Box>
         <Box
        sx={{
          display: "flex",
          flex: { md: 1, xs: 1, sm: 1 },
          flexDirection: "column",
          height:"100%",
          gap:5,
          border:"1px solid white",
          px: 3,
        }}
      >
     
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flex:1,
            gap:4,
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            
            scrollBehavior: "smooth",
          }}
        >
        {chatmessages.map((x, index) => (
            //@ts-ignore
            <ChatItem content={x.content}  role={x.roles === "user" ? "user" : "assistant"} key={index} />
          ))}
        </Box>
        
   <div
          style={{
            width: "100%",
           
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginBottom: 12,
            border:"1px solid white"
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
               alignSelf:"flex-end",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>

</Box>
        </Box>// main 
  )//return
}
