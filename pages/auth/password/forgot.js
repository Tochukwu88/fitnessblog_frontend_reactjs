import {useState} from 'react'
import Layout from '../../../components/Layout'
import { forgotPassword } from '../../../actions/auth'
 

const ForgotPassword = ( ) =>{
    const [values, setValues] = useState({
        email:'',
        message:'',
        error:'',
        showForm:true,
    })
    const {email,message,error,showForm} = values
    const handleChange=name=>(e)=>{
        setValues({...values,error:'', message:  '' ,[name]:e.target.value})
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, message:'', error:''})
      forgotPassword({email}).then(data =>{
          if(data.error){
            setValues({...values, message:'', error:data.error})
          }else{
            setValues({...values, message:data.message, error:'',showForm:false})
          }
      })
       
    }
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage=()=>(message?<div><p>{message}</p></div>:'')
    const passwordForgotForm = ()=>{
       return <form onSubmit={handleSubmit}>
            <input value={email} onChange={handleChange('email')} type="email"   placeholder="Email"  required/>

            <button>send</button>
        </form>
    }
    return(
        <Layout>
        <h2>Forgot Password</h2>
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}

        </Layout>
    )
}
export default ForgotPassword