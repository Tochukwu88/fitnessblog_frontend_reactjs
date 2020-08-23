import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Admin from '../components/auth/Admin'

const Signup=()=>{
    return(
        <Layout>
        <Admin>
            <SignupComponent></SignupComponent>
            </Admin>
        </Layout>
       
    )
    
}
export default Signup