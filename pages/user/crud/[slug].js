import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogUpdate from '../../../components/crud/BlogUpdate'
const Blog=()=>{
    return(
        <Layout>
           <Private>
          
           <div><BlogUpdate/></div>
           
           </Private>
         
        </Layout>
       
    )
    
}
export default Blog