
import moment from 'moment'

import parse from 'html-react-parser';
import {API} from '../../config'
import { useState } from 'react';
import { listSearch } from '../../actions/blog';

const Search = () =>{
    const [values,setValues] = useState({
        search:undefined,
        result:[],
        searched:false,
        message:''
    })
    const {search,result,searched,message} = values
    const searchSubmit = e =>{
        e.preventDefault()
        listSearch({search}).then(data =>{
            setValues({...values,result:data,searched:true,message:`${data.length} blogs found`})
        })
    }
    const handleChange = e=>{
      setValues({...values,search:e.target.value,searched:false,result:[]})
    }
    const searchedBlogs = (result = [])=>{
        return(
            <div>
                {message && <p>{message}</p>}
                {result.map((blogs,i)=>{
                    return <div key={i}>
                        <a href={`/blogs/${blogs.slug}`}>{blogs.title}</a>
                    </div>

                })}
            </div>
        )

    }
    const searchForm = ()=>(
        <div>
            <form className='search-form desk-ser' onSubmit={searchSubmit}>
         <input type='text' className='searchTerm' placeholder='search' onChange={handleChange}></input>
       <button type='submit' className="searchButton"><i className="fa fa-search"/></button>

        </form>
        


        
        </div>
        
        
        
    )
    return (
        <div>
            {searchForm()}
            {searched && <div>{searchedBlogs(result)}</div>}
        </div>
    )
}
export default Search




