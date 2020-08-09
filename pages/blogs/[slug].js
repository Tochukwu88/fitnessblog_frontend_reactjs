import Head from 'next/head'
import Layout from '../../components/Layout'
import { singleBlog, listRelated } from '../../actions/blog'
import moment from 'moment'
import SmallCard from '../../components/blog/SmallCard'
// import renderHTML from 'react-render-html'
// import stripHtml from "string-strip-html";
import parse from 'html-react-parser';

import { APP_NAME , DOMAIN, API, DISQUS_SHORTNAME} from '../../config'

import { useState, useEffect } from 'react'
import DisqusThread from '../../components/DisqusThread'


const SingleBlog = ({blog})=>{


    const[related, setRelated] = useState([])
    const relatedBlog = () =>{
        listRelated({blog}).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setRelated(data)
            }
        })
    }

    useEffect(()=>{
        relatedBlog()
    },[])
    const showBlogCategories = blog =>
    blog.categories.map((c,i)=>{
      return( <a className='cat-tag' key={i} href={`/categories/${c.slug}`}>{c.name}</a>)
   })

const showBlogTags = blog =>
 blog.tags.map((t,i)=>{
      return ( <a className='cat-tag' key={i} href={`/tags/${t.slug}`}>{t.name}</a>)
   })
   const showRelatedBlog =() =>{
       return related.map((blog,i)=>{
           return <article key={i}>
               <SmallCard blog={blog}></SmallCard>
           </article>
       })
   }
   const showComments = () =>{
       return (
           <div>
               <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`}/>
           </div>
       )
   }
    return(
        <>
            <Layout>
              <div className='single-blog-content'>
              <div className='img-div'>
               <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className='featured-img'></img>
                </div>
                <h1>{blog.title}</h1>
                <p>written by <a href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.username}</a> | Published {moment(blog.updatedAt).fromNow()}</p>
               <hr/>
                <div >
                                   { parse(`${blog.body}`)}
                </div>
                <div className='singleblog-category-tag'>
                    
                    {showBlogCategories(blog)}
                              {showBlogTags(blog)} 
                </div>
                <hr/>
                <div>
                           {showComments()}
                        </div>
                        <div className='smallcard-related-blog'>
                            <h4> related blogs</h4>
                            {showRelatedBlog()}
                        </div>
                        

              </div>
           
                
            </Layout>
        </>
    )
}
SingleBlog.getInitialProps = ({query})=>{
    return singleBlog(query.slug).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            return {
                blog:data
            }
        }
    })
}
export default SingleBlog