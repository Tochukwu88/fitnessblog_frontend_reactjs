import { useState, useEffect } from "react"
import {signin, authenticate, isAuth} from '../../actions/auth'
import Router from "next/router"
import LoginGoogle from './LoginGoogle'


const SigninComponent = ()=>{

    const [values , setValues]= useState({
        
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true

    })
    const {email,password,error,loading,message,showForm} = values
    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, loading:true, error:false})
        const user = {email,password}
        signin(user).then(data=>{
            
           
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,loading:false})
            }else{
                console.log(data.message)
                authenticate(data,()=>{
                    if(isAuth() && isAuth().role===1){
                     Router.push('/admin')
                    }else{
                     Router.push('/user')
                    }
                 })
              
            }
        })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,[name]:e.target.value})
        
    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage=()=>(loading?<div><p>{message}</p></div>:'')
    const signinForm=()=>{
        return(
          <div className='form-div'>
          
          <form className='auth-form' onSubmit={handleSubmit} >
          <div className='container'>
             <div>
             <LoginGoogle/>
             </div>

                  
            <label className='label-email'> <b>email</b> </label>
             <input value={email} onChange={handleChange('email')} type="email" className="text"  placeholder="Email"  required/>
             <label className="label-password"><b>password</b> </label>
         
             <input value={password}  onChange={handleChange('password')} type="password" className="text"  placeholder="Password"  required />
             <a href='/auth/password/forgot'>forgot password?</a>
            <button className='form-button'  type="submit">login</button>
       </div>
         
               
          
              
              
          
          </form>
          </div>
            
        )
    }
    return(
        <>
        {showError()}
        {showLoading()}
        {showMessage()}
    
         {showForm &&  signinForm()}
        </>
    )
}
export default SigninComponent



