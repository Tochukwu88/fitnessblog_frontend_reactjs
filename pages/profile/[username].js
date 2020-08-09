import Layout from '../../components/Layout'
import {userPublicProfile} from '../../actions/user'
import moment from 'moment'
import { API } from '../../config'
import ContactForm from '../../components/form/ContactForm'


const UserProfile = ({user,blogs}) =>{
    const showUserBlogs = () =>{
        return blogs.map((blog,i)=>{
            return(
                <div key={i}>
                    <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                </div>
            )
        })
    }
    return (
        <>
            <Layout>
                <div>
                    <h1>{user.name}</h1>
                    <img src={`${API}/user/photo/${user.username}`} alt='profile photo'></img>
                    <p>joined {moment(user.createdAt).fromNow()}</p>
                </div>
                <div>
                    <h5>recent blogs by {user.name}</h5>
                    <br></br>
                    <p>{showUserBlogs()}</p>
                </div>
                <div>
                    <h5>message {user.name}</h5>
                    <br/>
                    <ContactForm authorEmail={user.email}/>
                </div>
            </Layout>
        </>

    )
}
UserProfile.getInitialProps = ({query}) =>{
    return userPublicProfile(query.username).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            
            return {
                user:data.user,
                blogs:data.blogs
            }
        }
    })
}
export default UserProfile