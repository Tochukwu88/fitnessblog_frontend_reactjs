import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'
const CreateBlog=()=>{
    return(
        <Layout>
           <Private>
           
           <div className='blogcreate-container'><BlogCreate/></div>
           
           </Private>
         
        </Layout>
       
    )
    
}
export default CreateBlog