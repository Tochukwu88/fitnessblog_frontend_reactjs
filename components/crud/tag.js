const { useState, useEffect } = require("react")
const { getCookie } = require("../../actions/auth")
import {create ,getTags,removeTag} from '../../actions/tag'


const Tag =()=>{
    const [values, setValues] = useState({
        name:'',
        error:false,
        success:false,
        tags:[],
        removed:false,
        reload:false
    })
    const {name,error,success,tags,removed,reload} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadTags()
    },[reload])
    const loadTags =() =>{
        getTags().then(data =>{
            if(data.error){
               console.log(data.error)
            }else{
                setValues({...values,tags:data})
            }

        })
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("clhere" ,name)
        create({name},token).then(data =>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({...values,error:false,success:true,name:'',removed:false,reload:!reload})
            }
        })
    }
    const handleChange=name=>(e)=>{
        setValues({...values,error:false,success:false,removed:'',[name]:e.target.value})
        
    }
    const showTag = ()=>{
        return(
            tags.map((tag,i) =>{
                return <button onDoubleClick={()=>{deleteConfirm(tag.slug)}} title='double click to delete' key={i}>{tag.name}</button>
            })
        )
    }
    const deleteConfirm =(slug)=>{
        let answer = window.confirm('are you sure you want to delete this tag?')
        if(answer){
            deleteTag(slug)
        }

    }
    const deleteTag =(slug)=>{
        console.log('delete' ,slug)
        removeTag(slug,token).then(data=>{
            if(data.error){
               console.log(data.error)
            }else{
                setValues({...values,error:false,success:false,name:'',removed:!removed,reload:!reload})
            }
        })

    }
    const showSuccess = ()=>{
        if(success){
            return <p>tag is created</p>
        }
    }
    const showerror = ()=>{
        if(error){
            return <p>tag already exist</p>
        }
    }
    const showremove = ()=>{
        if(removed){
            return <p>tag is removed</p>
        }
    }
   const mouseMoveHandler=e=>{
       setValues({...values,error:false,success:false,removed:''})
   }
    
    const newTagForm =()=>{
     return(   <form onSubmit={handleSubmit} className="tag-form">
            
            
            
            <label >name</label>
            <input value={name} onChange={handleChange('name')} type="text" className="name" required/>
           
            <button  className="button">create</button>
        </form>
     )
    }
    return(
        <>
        {showSuccess()}
        {showerror()}
        {showremove()}
           
            <div onMouseMove={mouseMoveHandler}>
            {newTagForm()}
                {showTag()}
            </div>
        </>
    )
}
export default Tag