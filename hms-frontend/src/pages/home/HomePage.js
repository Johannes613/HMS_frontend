import React from 'react'
import { Link, useNavigate } from "react-router-dom";


export default function HomePage() {
  return (
    <div>
       <p>home page</p>
     <Link to="/dashboard" className="nav-link">
                    <button className="watch-video py-2">Dashboard</button>
    </Link>


    </div>
  )
}
