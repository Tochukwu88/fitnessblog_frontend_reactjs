import { useState, useEffect } from "react"
import { withRouter } from "next/router"
import { singleBlog, updateBlog } from "../../actions/blog"
import dynamic from 'next/dynamic'
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { isAuth, getCookie } from "../../actions/auth"
import { DOMAIN, API } from "../../config"
const ReactQuill = dynamic(()=> import('react-quill'),{ssr:false})

const BlogUpdate =({router})=>{
   
    const [body, setBody] = useState('')
    const [values, setValues] = useState({
        error:'',
       
        success:'',
        formData:'',
        title:'',
      
    })
    const [categories,setCategories] = useState([])
     const [tags,setTags] = useState([])

       const [checked, setChecked] = useState([])
       const [tagchecked, setTagChecked] = useState([])
    const {error,success,formData,title} = values
    const token = getCookie('token')
    useEffect(()=>{
        setValues({...values, formData: new FormData()})
        initBlog()
        initCategories()
        initTags()
    },[router])

    const  initBlog =()=>{
        if(router.query.slug){
            singleBlog(router.query.slug).then(data =>{
                if(data.error){
                    console.log(data.error)
                }else{
                   
                    setValues({...values, title:data.title})
                    setBody(data.body)
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }
        
    }
    const setCategoriesArray = blogCategories =>{
        let ca = []
        blogCategories.map((c,i)=>{
            return ca.push(c._id)
        })
        setChecked(ca)
        

    }
    const setTagsArray = blogTags =>{
        let ta = []
        blogTags.map((t,i)=>{
            return ta.push(t._id)
        })
        setChecked(ta)
        
    }
    const initCategories =()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setCategories(data)
            }
        })
    }
    const findOutCategory =(c)=>{
        const result = checked.indexOf(c)
        if(result === -1){
            return true
        }else{
            return false
        }
    }
    const findOutTag =(t)=>{
        const result = checked.indexOf(t)
        console.log(result)
        if(result === -1){
            return true
        }else{
            return false
        }
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
    const handleToggle = (c)=>()=>{
        setValues({...values,error:''})

        const  clickCategory =checked.indexOf(c)
        const all = [...checked]
        if(clickCategory ===-1){
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

        const  clickTag =tagchecked.indexOf(t)
        const allTag = [...tagchecked]
        if(clickTag ===-1){
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
                <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type='checkbox'></input>
                <label>{c.name}</label>
                </li>
            })
        )
    }
    const showTags =()=>{
        return(
            tags && tags.map((t,i)=>{
                return <li key={i}>
                <input onChange={handleTag(t._id)} checked={findOutTag(t._id)} type='checkbox'></input>
                <label>{t.name}</label>
                </li>
            })
        )
    }

    const handleBody = e =>{
        setBody(e)
        formData.set('body',e)
    }
    const handleChange=(name)=>e=>{
        // console.log(e.value.target)
        const value = name === 'photo' ? e.target.files[0]:e.target.value
        formData.set(name,value)
        setValues({...values,[name]:value,formData,error:''})
    
    } 
    const editBlog =(e)=>{
        e.preventDefault()
       updateBlog(formData, token, router.query.slug).then(data =>{
           if(data.error){
               setValues({...values,error:data.error})
           }else{
            setValues({...values,title:'',success:`blog title "${data.title}" has been updated`})
            if(isAuth() && isAuth().role === 1){
                // Router.replace(`/admin/crud/${router.query.slug}`)
            }else  if(isAuth() && isAuth().role === 0){
                // Router.replace(`$/user/crud/${router.query.slug}`)
            }
           }
       })
    }
    const showError = ()=>(
        <div  className='showError' style={{display:error?'':'none'}}>{error}</div>
    )
    const showSuccess = ()=>(
        <div className='showSuccess' style={{display:success?'':'none'}}>{success}</div>
   )
    const updateBlogForm =()=>{
        return(   <form onSubmit={editBlog} className="blog-form">
               
               
               <div>
               <label >title</label>
               <input value={title} onChange={handleChange('title')} type="text" className="title" />
               </div>
              

               <div>
                   <ReactQuill modules={BlogUpdate.modules} formats={BlogUpdate.formats} value={body} theme='snow' placeholder='write a blog' onChange={handleBody}/>
               </div>
               <button  type='submit' className="blogcreate-button">publish</button>
              
               
           </form>
        )
       }
    return(
        <div className='blogcreate-container'>
        
        <div  className='blogcreate-container-item1'>
        {showError()}
      {showSuccess()}
      {updateBlogForm()}
      
        </div>
        {body && <img src={`${API}/blog/photo/${router.query.slug} alt={title} `}></img>
     }
        <div className='blogcreate-container-item2'>
        <div>
        <input  onChange={handleChange('photo')} name="file" id="file" className="inputfile" type='file' accept='image/*'/>
          
          <label for="file"> <i class="fas fa-file-upload"></i> upload featured image</label>
        </div>
            <h2>cataegories</h2><hr></hr>
            <ul   className='category-list' style={{maxHeight:'200px', overflowY:'scroll'}}>{showCategories()}</ul>
            <h2>Tags</h2><hr></hr>
            <ul className='category-list' style={{maxHeight:'200px', overflowY:'scroll'}}> {showTags()}</ul>
           
        </div>
       
    </div>
    )
}
BlogUpdate.modules = {
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
 
BlogUpdate.formats = [
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
export default  withRouter(BlogUpdate)