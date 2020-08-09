import {useState,useEffect} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie,isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import {CreateBlog} from '../../actions/blog'
const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false})


const BlogCreate =({router})=>{
    const blogFromLocalstorage = ()=>{
        if(typeof window === 'undefined'){
            return false
        }
        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        }else{
            return false
        }
    }

     const [categories,setCategories] = useState([])
     const [tags,setTags] = useState([])

       const [checked, setChecked] = useState([])
       const [tagchecked, setTagChecked] = useState([])

    const [body, setBody] = useState(blogFromLocalstorage())
    const [values, setValues] = useState({
        error:'',
        sizeError:'',
        success:'',
        formData:'',
        title:'',
        hidePublishBUtton:false
    })
    const {error,sizeError,success,formData,title,hidePublishBUtton} = values
    const token = getCookie('token')


    useEffect(()=>{
        setValues({...values,formData: new FormData()})
        initCategories()
        initTags()
    },[router])
     
    const initCategories =()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setCategories(data)
            }
        })
    }
    const initTags=()=>{
        getTags().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setTags(data)
            }
        })
    }


    const publishBlog = (e)=>{
        e.preventDefault()
        // console.log('ready')
        CreateBlog(formData,token).then(data=>{
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error})
                console.log(error)
            }else{
                setValues({...values,error:'',success:`a new blog title "${data.title}" is created`})
                setBody('')
                setCategories([])
                setTags([])
            }
        })
            
    }

     const handleToggle = (c)=>()=>{
        setValues({...values,error:''})

        const  clickCategory =checked.indexOf(c)
        const all = [...checked]
        if(clickCategory === -1){
            all.push(c)

        }else{
            all.splice(clickCategory,1)
        }
        console.log(all)
        setChecked(all)
        formData.set('categories',all)
     }
     const handleTag = (t)=>()=>{
        setValues({...values,error:''})

        const  clickTag = checked.indexOf(t)
        const allTag = [...tagchecked]
        if(clickTag === -1){
            allTag.push(t)

        }else{
            allTag.splice(clickTag,1)
        }
        console.log(allTag)
        setTagChecked(allTag)
        formData.set('tags',allTag)
     }
    const showCategories =()=>{
        return(
            categories && categories.map((c,i)=>{
                return <li key={i}>
                <input onChange={handleToggle(c._id)} type='checkbox'></input>
                <label>{c.name}</label>
                </li>
            })
        )
    }
    const showTags =()=>{
        return(
            tags && tags.map((t,i)=>{
                return <li key={i}>
                <input onChange={handleTag(t._id)} type='checkbox'></input>
                <label>{t.name}</label>
                </li>
            })
        )
    }
const handleChange=(name)=>e=>{
    // console.log(e.value.target)
    const value = name === 'photo' ? e.target.files[0]:e.target.value
    formData.set(name,value)
    setValues({...values,[name]:value,formData,error:''})

}
const handleBody = e =>{
    console.log(e)
    setBody(e)
    formData.set('body',e)
    if(typeof window !== 'undefined'){
        localStorage.setItem('blog',JSON.stringify(e))
    }
}
 const showError = ()=>(
     <div className='showError' style={{display:error?'':'none'}}>{error}</div>
 )
 const showSuccess = ()=>(
     <div className='showSuccess' style={{display:success?'':'none'}}>{success}</div>
)
    const createBlogForm =()=>{
        return(   <form onSubmit={publishBlog} className="blog-form">
               
               
               <div>
               <label >title</label>
               <input value={title} onChange={handleChange('title')} type="text" className="title" />
               </div>
              

               <div>
                   <ReactQuill modules={BlogCreate.modules} formats={BlogCreate.formats} value={body} theme='snow' placeholder='write a blog' onChange={handleBody}/>
               </div>
               
               <button  type='submit' className="btn">publish</button>
               
              
               
           </form>
        )
       }
    return <div className='blogcreate-container'>
        
        <div className='blogcreate-container-item1'>
        {showSuccess()}
        {showError()}
        {createBlogForm()}
       
        </div>
        
        
        <br></br>
        <div className='blogcreate-container-item2'>
        <div>
            
            
            <input  onChange={handleChange('photo')} name="file" id="file" className="inputfile" type='file' accept='image/*'/>
          
            <label htmlfor="file"> <i className="fas fa-file-upload"></i> upload featured image</label>
        </div>
            <h2>cataegories</h2><hr></hr>
            <ul className='category-list' style={{maxHeight:'200px', overflowY:'scroll'}}>{showCategories()}</ul>
            <h2>Tags</h2><hr></hr>
            <ul  className='category-list' style={{maxHeight:'200px', overflowY:'scroll'}}> {showTags()}</ul>
           
        </div>
      
    </div>
}
BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];
export default withRouter(BlogCreate)