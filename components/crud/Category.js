const { useState, useEffect } = require("react")
const { getCookie } = require("../../actions/auth")
import {create ,getCategories,removeCategory} from '../../actions/category'



const Category =()=>{
    const [values, setValues] = useState({
        name:'',
        error:false,
        success:false,
        categories:[],
        removed:false,
        reload:false
    })
    const {name,error,success,categories,removed,reload} = values
    const token = getCookie('token')

    useEffect(()=>{
        loadCategories()
    },[reload])
    const loadCategories =() =>{
        getCategories().then(data =>{
            if(data.error){
               console.log(data.error)
            }else{
                setValues({...values,categories:data})
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
    const showCategories = ()=>{
        return(
            categories.map((category,i) =>{
                return <button onDoubleClick={()=>{deleteConfirm(category.slug)}} title='double click to delete' key={i}>{category.name}</button>
            })
        )
    }
    const deleteConfirm =(slug)=>{
        let answer = window.confirm('are you sure you want to delete this category?')
        if(answer){
            deleteCategory(slug)
        }

    }
    const deleteCategory =(slug)=>{
        console.log('delete' ,slug)
        removeCategory(slug,token).then(data=>{
            if(data.error){
               console.log(data.error)
            }else{
                setValues({...values,error:false,success:false,name:'',removed:!removed,reload:!reload})
            }
        })

    }
    const showSuccess = ()=>{
        if(success){
            return <p>category is created</p>
        }
    }
    const showerror = ()=>{
        if(error){
            return <p>category already exist</p>
        }
    }
    const showremove = ()=>{
        if(removed){
            return <p>category is removed</p>
        }
    }
   const mouseMoveHandler=e=>{
       setValues({...values,error:false,success:false,removed:''})
   }
    
    const newCategoryForm =()=>{
     return(   <form onSubmit={handleSubmit} className="category-form">
            
            
            
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
            {newCategoryForm()}
                {showCategories()}
            </div>
        </>
    )
}
export default Category