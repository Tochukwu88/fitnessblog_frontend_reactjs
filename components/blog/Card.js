import moment from 'moment'
// import renderHTML from 'react-render-html'
// import stripHtml from "string-strip-html";
import parse from 'html-react-parser';
import {API} from '../../config'

const Card = ({blog})=>{
    const showBlogCategories = blog =>
         blog.categories.map((c,i)=>{
           return( <a className='cat-tag' key={i} href={`/categories/${c.slug}`}>{c.name}</a>)
        })
    
    const showBlogTags = blog =>
      blog.tags.map((t,i)=>{
           return ( <a className='cat-tag' key={i} href={`/tags/${t.slug}`}>{t.name}</a>)
        })
   

    return(
        <>
      
        <div className="card">
        
                     <div className='flex-wrapper'>
                         <div className='flex-img'>
                         <img className='card-img' src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}></img>

                         </div>
                         <div className="containerc">
                         <div  className='category-tag'>
                      {showBlogCategories(blog)}
                      {showBlogTags(blog)} 

                     </div>  
                    <a href={`/blogs/${blog.slug}`}><h2>{blog.title}</h2></a>
                   <p>written by <a href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</a>| Published {moment(blog.updatedAt).fromNow()}</p>
                  <div className='blog-excerpt'> {parse(`${blog.excerpt}`)}</div>
                   <a href={`/blogs/${blog.slug}`} className='read-more'>Read more</a>
              
                  </div>
                     </div>
            
             
      </div>

        
        
            {/* <div className='wrapper'>
                    <div className='img-container'>
                         <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}></img>
                     </div>
                  
                  <div className='articles'>
                      <div>
                      {showBlogCategories(blog)}
                      {showBlogTags(blog)} 

                     </div>
                     <a href={`/blogs/${blog.slug}`}><h2>{blog.title}</h2></a>
                     <p>written by <a href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</a>| Published {moment(blog.updatedAt).fromNow()}</p>
                  
                     {parse(`${blog.excerpt}`)}
                     <a href={`/blogs/${blog.slug}`}>Read more</a>


                  </div>
                
        
                
             </div> */}
                  
        </>
    )
}
export default Card
