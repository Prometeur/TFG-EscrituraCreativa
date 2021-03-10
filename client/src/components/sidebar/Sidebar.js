import React from "react";
import { Link} from "react-router-dom";
import '../../styles/styleSidebar.css';
import '../../styles/styleGeneral.css';

export default function Sidebar(props) {

  let {links,url} = props;

      return(
          <div className="sidebar-left">

                <ul style={{ listStyleType: "none", padding: 0 }}>
                        {links.map((link)=>(
                            <li>
                                <Link key={link.id} to={`${url}${link.path}`}>{link.name}</Link>
                            </li>
                        ))}
                </ul>
           </div>
      ); 
}