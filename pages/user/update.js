import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import ProfileUpdate from '../../components/auth/profileUpdate'

const UserProfileUpdate =()=>{
    return(
        <Layout>
          <Private>
         
         <div>
             <ProfileUpdate/>
         </div>
         
          
          </Private>
          {/* <p>user dash</p> */}
            
        </Layout>
       
    )
    
}
export default UserProfileUpdate