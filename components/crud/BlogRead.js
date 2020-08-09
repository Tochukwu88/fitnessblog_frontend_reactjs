import { useState, useEffect } from "react"
import { getCookie, isAuth } from "../../actions/auth"
import { list, removeBlog } from "../../actions/blog"
import moment from "moment"

const BlogRead =({username})=>{
    const [blogs ,setBlogs] = useState([])
    const [ message, setMessage] = useState([])
    const token = getCookie('token')

    useEffect(()=>{
        loadBlogs()
    },[])
   const loadBlogs = () =>{
       list(username).then(data=>{
           if(data.error){
               console.log(data.error)
           }else{
              
               setBlogs(data)
           }
       })
   }
   const deleteBlog =(slug)=>{
       removeBlog(slug,token).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
           
            setMessage(data.message)
            loadBlogs()
        }
    }
       )

   }

   const deleteConfirm = (slug)=>{
       let answer = window.confirm('Are you sure you want to delete your blog')
       if(answer){
           deleteBlog(slug)
       }
   }
   const showUpdateButton = (blog)=>{
       if(isAuth() && isAuth().role === 0){
           return(
               <a href={`/user/crud/${blog.slug}`}>
                  <button className='btn-update-del btn-update'> update</button>
               </a>
           )
       }else{
        if(isAuth() && isAuth().role === 1){
            return(
                
                <a  href={`/admin/crud/${blog.slug}`}>
               <button className='btn-update-del btn-update'> update</button>
                </a>
                
                  
            )
        }
       }

   }
 const showALLBlogs =() =>{
     return blogs.map((blog,i)=>{
       return  <div className='card show-all-blogs' key={i}>
             <h3>{blog.title}</h3>
             <p>written by {blog.postedBy.name} | published  {moment(blog.updatedAt).fromNow()}</p>
             <button className='btn-update-del btn-delete' onClick={()=>{deleteConfirm(blog.slug)}}>delete</button>
             {showUpdateButton(blog)}

         </div>
     })
 }

    return(
        <>
           <div  >
           {message && <div>{message}</div>}
               {showALLBlogs()}
           </div>
        </>
    )
}
export default BlogRead