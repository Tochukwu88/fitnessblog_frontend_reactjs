import { useState, useEffect } from "react"
import { getCookie,updateUser } from "../../actions/auth"

import { getProfile,update } from "../../actions/user"

const ProfileUpdate = () =>{

    const [values,setValues] = useState({
        username:'',
        name:'',
        email:'',
        password:'',
        error:'',
        success:'',
        loading:'',
        photo:'',
        userData:'',
        about:''
    })
    const token = getCookie('token')
    const {userData,username,name,error,email,password,photo,success,loading,about} = values


  const init = () =>{
    getProfile(token).then(data =>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,username:data.username,name:data.name,email:data.email,about:data.about})
        }
    })
  }

    useEffect(()=>{
        
        init()
    },[])
     const handleChange = name => (e) =>{
        const value = name === 'photo' ? e.target.files[0]:e.target.value
       let userFormData = new FormData()
       userFormData.set(name, value)
        
      
       
        setValues({...values,[name]:value,userData:userFormData,error:false,success:false})
        
    
     }
     const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values,loading:true})
        console.log(userData)
        update(token,userData).then(data => {
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error,success:false,loading:false})
            }else{
                updateUser(data,()=>{
                    setValues({...values,username:data.username,name:data.name,email:data.email,about:data.about,success:true,loading:false})

                })
                
            }
        })
    }
    const showError = ()=>(
        <div  className='showError' style={{display:error?'':'none'}}>all files are required</div>
    )
    const showSuccess = ()=>(
        <div className='showSuccess' style={{display:success?'':'none'}}>profile updated</div>
   )
   const showLoading = ()=>(
    <div style={{display:loading? true :'none'}}>loading...</div>
)
    const profileUpdateForm = () =>(
        <div className='profile-update-container' >

       
        <form className='profile-update-form' onSubmit={handleSubmit}>
              <div>
              {showError()}
               {showSuccess()}
              </div>
            <div>
                <label>profile photo</label>
                <input onChange={handleChange('photo')} type='file' accept='image/*' ></input>
            </div>
            <div >
                <label><b>username</b></label>
                <input onChange={handleChange('username')} type='text'  value={username} ></input>
            
            
                <label><b>name</b></label>
                <input onChange={handleChange('name')} type='text'   value={name} ></input>
        
                <label><b>email</b></label>
                <input onChange={handleChange('email')} type='email' value={email} ></input>
          
                <label><b>about</b></label>
                <input onChange={handleChange('about')} type='text'  value={about} ></input>
         
                <label><b>password</b></label>
                <input onChange={handleChange('password')}   type='password' value={password} ></input>
          
                <button className='profile-button' type='submit'>submit</button>
            </div>
        </form>
        </div>
    )
    return (
       <>
     
       {showLoading()}
           {profileUpdateForm()}
       </>
    )
}
export default ProfileUpdate