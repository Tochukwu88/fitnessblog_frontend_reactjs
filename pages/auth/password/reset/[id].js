import {useState} from 'react'

import Layout from '../../../../components/Layout'
import { resetPassword } from '../../../../actions/auth'
import { withRouter } from 'next/router'
 const ResetPassword = ({router}) =>{

    const [values, setValues] = useState({
        name:'',
        newPassword:'',
        message:'',
        error:'',
        showForm:true,
    })
    const {name,message,error,showForm,newPassword} = values
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, message:'', error:''})
        resetPassword({newPassword,resetPasswordLink: router.query.id}).then(data =>{
          if(data.error){
            setValues({...values, message:'', error:data.error,showForm:false,newPassword:''})
          }else{
            setValues({...values, message:data.message, error:'',showForm:false, newPassword:''})
          }
      })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:'', message:  '' ,[name]:e.target.value})
        
    }
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage=()=>(message?<div><p>{message}</p></div>:'')
    const resetForgotForm = ()=>{
       return <form onSubmit={handleSubmit}>
            <input value={newPassword} onChange={handleChange('newPassword')} type="password"   placeholder="type new password"  required/>

            <button>send</button>
        </form>
    }
    return(
        <Layout>
        <h2>reset Password</h2>
        {showError()}
        {showMessage()}
        {showForm && resetForgotForm()}

        </Layout>
    )

 }
 export default withRouter(ResetPassword)