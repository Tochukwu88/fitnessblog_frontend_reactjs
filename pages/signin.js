import Layout from '../components/Layout'
import SigninComponent from '../components/auth/signinComponent'
import { withRouter, Router } from 'next/router'
import { route } from 'next/dist/next-server/server/router'




const Signin=({router})=>{
    const showMsg = () =>{
        if(router.query.message){
            return <p>{router.query.message}</p>
        }else{
            return
        }
    }
    return(
        <Layout>
            
            {showMsg()}
            <SigninComponent></SigninComponent>
        </Layout>
       
    )
    
}
export default withRouter(Signin)