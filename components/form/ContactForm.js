import {useState} from 'react'
import {emailContactForm} from '../../actions/form'

const ContactForm =({authorEmail}) =>{
    const [values,setValues] = useState({
        message:'',
        name:'',
        email:'',
        sent:false,
        buttonText:'send message',
        success:false,
        error:false
    })
    const {message,name,email,sent,buttonText,success,error} = values
    const handleChange=(name)=>e=>{
        // console.log(e.value.target)
      
        setValues({...values,[name]:e.target.value,error:false,buttonText:'send message', success:false})
    
    }
    const showError = ()=>(
        <div className='showError' style={{display:error?'':'none'}}>{error}</div>
    )
    const showSuccess = ()=>(
        <div className='showSuccess' style={{display:success?'':'none'}}>thank you for contacting us</div>
   )
    const clickSubmit = (e)=>{
        e.preventDefault()
        setValues({...values,buttonText:'sending...'})
        emailContactForm({authorEmail,name,email,message}).then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            } else{
                setValues({
                    ...values,
                    message:'',
                    name:'',
                    email:'',
                    sent:true,
                    buttonText:'sent',
                    success:data.success,
                  
                })
            }
        })

    }
    const contactForm =() =>{
        return (
            <div className="form-div">
            <form  className='auth-form' onSubmit={clickSubmit}>
            <div className="contianer">
              
               <label>name</label>
               <input onChange={handleChange('name')} className="text" type='text' value={name} required></input>

               <label>email</label>
               <input onChange={handleChange('email')} type='email' value={email} required></input>
               <label>message</label>
               <textarea onChange={handleChange('message')} className="text txta" type='text' value={message}  required></textarea>

               <button  className='form-button'  type='submit'>{buttonText}</button>
               </div>

            </form>
            </div>
        )
    }

    return(
        <>
        {showError()}
        {showSuccess()}
           {contactForm()}
        </>
    )
}
export default ContactForm