import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'
const Blog=()=>{
    return(
        <Layout>
           <Admin>
           <p>Create  a new blog</p>
           <div><BlogCreate/></div>
           
           </Admin>
         
        </Layout>
       
    )
    
}
export default Blog