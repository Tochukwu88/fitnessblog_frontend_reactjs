import {APP_NAME} from '../config'
import Link from 'next/link'
import {signout,isAuth} from'../actions/auth'
import Router from 'next/router'

import NProgress from 'nprogress'
import Search from './blog/search'


Router.onRouteChangeStart = url=>NProgress.start()
Router.onRouteChangeComplete = url=>NProgress.done()
Router.onRouteChangeError = url=>NProgress.done()

const Header = (props)=> {
    let drawerClasses='nav'
    if(props.show){
       drawerClasses='nav open'
           }
    
   
        return(<>
            <section  id='head-section'>
            <div id='general-header'>

           
            <div className='headers'>
                <div className="logo">
               <a href="/"> {APP_NAME}</a>
               
                </div>
                <Search className='desk-ser'></Search>
                
                
               
               
                <button className="nav-toggle"  onClick={props.click}>
                    <span className='hamburger'></span>
                </button>
                <nav className={drawerClasses} >
                <ul className="nav-list">
                <li className='nav-item'><Link href='/' ><a className='nav-link'>home</a></Link></li>
                <li className='nav-item'><Link href='/blogs' ><a className='nav-link'>blogs</a></Link></li>
                <li className='nav-item'><Link href='/contact' ><a className='nav-link'>contact</a></Link></li>
                <li className='nav-item'><Link href='/user/crud/blog' ><a className='nav-link'>write a blog</a></Link></li>
                
                
                {!isAuth()  &&(
                    <>
                    <li className='nav-item'><Link  href="/signup" ><a className='nav-link'>sign up</a></Link></li>
                
                <li className='nav-item'> <Link  href="/signin" ><a className='nav-link'>sign in</a></Link></li>
                    </>
                )}
               
                {isAuth() && isAuth().role ===1 && (<li className='nav-item'> <Link  href="/admin" ><a className='nav-link'
               >Dashboard</a></Link></li>
                )}
                {isAuth() && isAuth().role ===0 && (<li className='nav-item'> <Link  href="/user" ><a className='nav-link'
               >Dashboard</a></Link></li>
                )}
                {isAuth() && (<li className='nav-item'> <Link  href="/signin" ><a className='nav-link' onClick={()=>{
                    signout(()=>{Router.replace(`/signin`)})
                }}>sign out</a></Link></li>
                )}
               
               

                </ul>
               

                </nav>
                <nav className='desktop-nav'>
                <ul className="desktop-nav-list">
                <li className='desktop-nav-item'><Link href='/' ><a className='desktop-nav-link'>home</a></Link></li>
                <li className='desktop-nav-item'><Link href='/blogs' ><a className='desktop-nav-link'>blogs</a></Link></li>
                <li className='desktop-nav-item'><Link href='/contact' ><a className='desktop-nav-link'>contact</a></Link></li>
                <li className='desktop-nav-item'><Link href='/user/crud/blog' ><a className='desktop-nav-link'>write a blog</a></Link></li>
               
               
                
                {!isAuth()  &&(
                    <>
                    <li className='desktop-nav-item'><Link  href="/signup" ><a className='desktop-nav-link'>sign up</a></Link></li>
                
                <li className='desktop-nav-item'> <Link  href="/signin" ><a className='desktop-nav-link'>sign in</a></Link></li>
                    </>
                )}
               
                {isAuth() && isAuth().role ===1 && (<li className='desktop-nav-item'> <Link  href="/admin" ><a className='desktop-nav-link'
               >{`${isAuth().name}'s Dashboard`}</a></Link></li>
                )}
                {isAuth() && isAuth().role ===0 && (<li className='desktop-nav-item'> <Link  href="/user" ><a className='desktop-nav-link'
               >{`${isAuth().name}'s Dashboard`}</a></Link></li>
                )}
                {isAuth() && (<li className='desktop-nav-item'> <Link  href="/signin" ><a className='desktop-nav-link' onClick={()=>{
                    signout(()=>{Router.replace(`/signin`)})
                }}>sign out</a></Link></li>
                )}
              
                
               
                </ul>
               

                </nav>
                
                </div>
               
                </div>
                
              
                
            </section>
           
           
        </>)
    

}
export default Header