import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <aside style={{width:240,background:'#0f172a',color:'#fff',padding:20}}>
        <div style={{fontWeight:700,fontSize:20,marginBottom:20}}>GoDesign</div>
        <nav style={{display:'flex',flexDirection:'column',gap:10}}>
          <Link to="/dashboard" style={{color:'#fff'}}>Dashboard</Link>
          <Link to="/account" style={{color:'#fff'}}>Account</Link>
        </nav>
      </aside>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <header style={{background:'#fff',padding:12,boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
          <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>GoDesign</div>
            <div>
              <a href="#" style={{marginRight:12}}>Help</a>
              <a href="#">Logout</a>
            </div>
          </div>
        </header>
        <main style={{flex:1,padding:20}}>
          <Outlet />
        </main>
        <footer style={{background:'#f8fafc',padding:12,textAlign:'center'}}>© {new Date().getFullYear()} GoDesign</footer>
      </div>
    </div>
  )
}
