import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import {isAuth} from '../../actions/auth'
import { useState,useEffect } from 'react'
import { list } from '../../actions/blog'

const userIndex=()=>{
    const [blogs ,setBlogs] = useState([])
    let uname;
    
        if(isAuth()){
            console.log(isAuth().username)
            uname = isAuth().username
        }
        
    
    useEffect(()=>{
        loadBlogs()
    },[])
    const loadBlogs = () =>{
        list(uname).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
               
                setBlogs(data)
            }
        })
    }
   
    return(
        <Layout>
          <Private>
         <section className='dashboard'>
         <h1 className='dtitle'>Dashboard</h1>
           <div className='d1'>
            Total posts:{blogs.length}
                    
           </div>
         <div className='d2'><ul>
               
               <li>
                   <a className='btnn' href="/user/crud/blog">write a blog</a>
               </li>
               <li>
                   <a href="/user/crud/blogs">update/delete blogs</a>
               </li>
               <li>
                   <a href="/user/update">update profile</a>
               </li>
           </ul></div>
           <div className="d3">{`welcome to your dashboard your have ${blogs.length} posts`}
           <a className='btnn' href="/user/crud/blog">write a blog</a>
           
           </div>
         </section>
          
          </Private>
        
            
        </Layout>
       
    )
    
}
export default userIndex