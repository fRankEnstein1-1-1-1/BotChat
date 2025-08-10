import { Link } from "react-router-dom"

type Props ={
    to:string;
    bg:string;
    text:string;
    textcolor:string;
    onClick? : ()=> Promise<void>
}

export const Navigation = (props:Props) => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center", height:"50px",width:"auto",background:props.bg, borderRadius:"9px",border:"1px solid whitesmoke" ,
              marginTop: 20,
              marginBottom: 20,
              fontSize:"20px",
              padding:'5px'}}>
    <Link to={props.to} style={{color:props.textcolor,textDecoration:"none",fontSize:"24px"}}> {props.text}
    </Link>
    </div>
  )
}
