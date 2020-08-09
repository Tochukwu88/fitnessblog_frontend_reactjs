import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'

const adminIndex=()=>{
    return(
        <Layout>
           <Admin>
           <p>admin</p>
           <div><ul>
               <li>
                   <a href="/admin/crud/category-tag">create category</a>
               </li>
               <li>
                   <a href="/admin/crud/category-tag">create tag</a>
               </li>
               <li>
                   <a href="/admin/crud/blog">create blog</a>
               </li>
               <li>
                   <a href="/admin/crud/blogs">update/delete blogs</a>
               </li>
               <li>
                   <a href="/user/update">update profile</a>
               </li>
           </ul></div>
           <div>right</div>
           </Admin>
         
        </Layout>
       
    )
    
}
export default adminIndex