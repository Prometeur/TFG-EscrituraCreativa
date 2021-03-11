import React from "react";
import { Link} from "react-router-dom";
<<<<<<< HEAD
import '../../styles/styleSidebar.css';
import '../../styles/styleGeneral.css';
=======

>>>>>>> luis

export default function Sidebar(props) {

  let {links,url} = props;

      return(
<<<<<<< HEAD
          <div className="sidebar-left">

                <ul style={{ listStyleType: "none", padding: 0 }}>
                        {links.map((link)=>(
                            <li>
                                <Link key={link.id} to={`${url}${link.path}`}>{link.name}</Link>
                            </li>
                        ))}
                </ul>
=======
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
>>>>>>> luis
           </div>
      ); 
}