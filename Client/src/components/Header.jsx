import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
         <header>
      <div className="blogger-cont">
        <div className="blogger-content">
          <div className="blogger-name">
            <h1>Blogger</h1>
          </div>
          <div className="blogger-nav">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/create_blog">Create Blog</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header