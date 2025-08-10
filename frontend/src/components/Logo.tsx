
import { Link } from "react-router-dom"

function Logo() {
  return (<div>
    <Link to='/' style={{ textDecoration:'underline', color: 'inherit' , display: "flex", alignItems: "center", gap: "8px",backgroundColor:"blue"}}>
        <img src="trial.png" alt="vite" height="30px" width="30px" className="image-inverted" /> 
    </Link>  </div>
  )
}
export default Logo
