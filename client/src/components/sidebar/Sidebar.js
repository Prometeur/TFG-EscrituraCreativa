import React from "react";
import { Link} from "react-router-dom";


export default function Sidebar(props) {

  let {links,url} = props;

      return(
           <div style={{ display: "flex" }}>
                <div   style={{
                    padding: "10px",
                    width: "20%",
                    background: "#f0f0f0"
                }}>
                   <ul style={{ listStyleType: "none", padding: 0 }}>
                        {links.map((link)=>(
                            <li>
                                <Link key={link.id} to={`${url}${link.path}`}>{link.name}</Link>
                            </li>
                        ))}
                   </ul>
                </div>
           </div>
      ); 
}