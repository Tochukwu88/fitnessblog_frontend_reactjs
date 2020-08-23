import Layout from '../components/Layout'
import {list} from '../actions/blog'
import { useState,useEffect } from 'react'
import moment from "moment"
import parse from 'html-react-parser';


const Index=()=>{
    const [blogs,setBlogs] = useState([])
    useEffect(()=>{
        loadBlogs()
    },[])
    const loadBlogs = () =>{
        list().then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
            }else{
               
                setBlogs(data)
            }
        })
    }
    const showALLBlogs =() =>{
        return blogs.map((blog,i)=>{
          return  <div className='home-blogs' key={i}>
                  <div className='home-blog-content'>
                    <a href={`/blogs/${blog.slug}`}><h2>{blog.title}</h2></a>
                    <p>written by <a href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</a>| Published {moment(blog.updatedAt).fromNow()}</p>
                    <div className='blog-excerpt'> {parse(`${blog.excerpt}`)}</div> 
                    </div>
                 
                  
                
   
            </div>
        })
    }
    return(
        <Layout>
         <div className='lm home-page'>
         <section className="intro">
         
         <div> <h1> learn and share experinces about finess and health</h1>
          <a href='/blogs'> <button className="btn">learn from others</button></a>
         
          <a href='/user/crud/blog'><button className="btn">share your experince</button></a>
          </div>
          
         </section>

       <h4>latest article</h4>
       <hr></hr>
         <section className="home-post">

         {showALLBlogs()}
          
          <a href='/blogs' className='seeMore'>see more</a>

         </section>
        

         </div>
        </Layout>
       
    )
    
}
export default Index