import { useState,useEffect } from "react"
import {signup,isAuth,preSignup} from '../../actions/auth'
import Router from "next/router"
import LoginGoogle from './LoginGoogle'


const SignupComponent = ()=>{

    const [values , setValues]= useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        success:false,
        showForm:true

    })
    const {name,email,password,error,loading,success,showForm} = values
    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, loading:true, error:false})
        const user = {name,email,password}
        preSignup(user).then(data=>{
            
           
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,loading:false})
            }else{
                console.log(data.message)
               
                setValues({
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    loading:false,
                    success:true,
                    showForm:false
                })
            }
        })
       
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,[name]:e.target.value})
        
    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    const showError =()=>(error?<div><p>{error}</p></div>:'')
    const showMessage=()=>(success?<div><p>a link has been sent to your email. please click the link to activate your account <a href='/signin'>log in</a></p></div>:'')
    const signupForm=()=>{
        return(
        
        <div className='form-div'>
        <form className='auth-form' onSubmit={handleSubmit} >
        <div className='container'>


           <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr/>
          <div>
             <LoginGoogle/>
             </div>
           <label className='label-email'> <b>name</b> </label>
           <input value={name} onChange={handleChange('name')} type="text" className="text"  placeholder="name"  required/>
          <label className='label-email'> <b>email</b> </label>       
     
           <input value={email} onChange={handleChange('email')} type="email" className="text"  placeholder="Email"  required/>
           <label className="label-password"><b>password</b> </label>
       
           <input value={password}  onChange={handleChange('password')} type="password" className="text"  placeholder="Password"  required />
          <button className='form-button'  type="submit">sign up</button>
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
         {showForm &&  signupForm()}
        </>
    )
}
export default SignupComponent