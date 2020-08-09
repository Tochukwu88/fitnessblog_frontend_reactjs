import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/tag'

const CategoryTag=()=>{
    return(
        <Layout>
           <Admin>
           <p>manage category and tag</p>
           <div><Category></Category></div>
           <div><Tag></Tag></div>
           </Admin>
         
        </Layout>
       
    )
    
}
export default CategoryTag