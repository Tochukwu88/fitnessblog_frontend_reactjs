import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogRead from '../../../components/crud/BlogRead'
import {isAuth} from '../../../actions/auth'
const Blogs=()=>{
    const username = isAuth() && isAuth().username
    return(
        <Layout>
           <Private>
           <div className='blog-read'>
               <h1>manage blogs</h1>
           
           <div><BlogRead username={username}/></div>
           </div>
           
           </Private>
         
        </Layout>
       
    )
    
}
export default Blogs