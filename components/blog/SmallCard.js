import moment from 'moment'

import parse from 'html-react-parser';
import {API} from '../../config'

const SmallCard = ({blog})=>{
    
   

    return(
        <>
         <div className="card">
             <img className='card-img' src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}></img>
              <div className="containerc">
              <a href={`/blogs/${blog.slug}`}><h2>{blog.title}</h2></a>
              <p>written by <a href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</a>| Published {moment(blog.updatedAt).fromNow()}</p>
              <div className ='blog-excerpt'>{parse(`${blog.excerpt}`)}</div>
              <a href={`/blogs/${blog.slug}`} className='read-more'>Read more</a>  
            </div>
      </div>
       
        </>
    )
}
export default SmallCard