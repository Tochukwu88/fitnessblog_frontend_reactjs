import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogUpdate from '../../../components/crud/BlogUpdate'
const Blog=()=>{
    return(
        <Layout>
           <Admin>
           <p>Update blog</p>
           <div><BlogUpdate/></div>
           
           </Admin>
         
        </Layout>
       
    )
    
}
export default Blog