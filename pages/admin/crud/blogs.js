import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogRead from '../../../components/crud/BlogRead'
const Blogs=()=>{
    return(
        <Layout>
           <Admin>
           <div>
               <h1>manage blogs</h1>
           </div>
           <div><BlogRead/></div>
           
           </Admin>
         
        </Layout>
       
    )
    
}
export default Blogs