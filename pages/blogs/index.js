import Head from 'next/head'
import Layout from '../../components/Layout'
import { listBlogWithCategoriesAndTags } from '../../actions/blog'
import Card from '../../components/blog/Card'
import { APP_NAME , DOMAIN} from '../../config'
import { withRouter } from 'next/router'
import { useState } from 'react'


const Blogs = ({blogs,categories,tags,totalBlogs,blogSkip,blogsLimit, router}) =>{
    const[limit,setLimit] = useState(blogsLimit)
    const [skip,setSkip] = useState(blogSkip)
    const [size,setSize] = useState(totalBlogs)
    const [loadedBlogs,setLoadedBlogs] = useState([])
    const loadMore =()=>{
        let toSkip = skip + limit
        listBlogWithCategoriesAndTags(toSkip,limit).then( data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setLoadedBlogs([...loadedBlogs,...data.blog]);
                setSize(data.size)
                setSkip(toSkip);
            }
        })
    }
    const loadMoreButton = ()=>{
        return(
            size > 0 && size >= limit && (<button className ='load-more' onClick={loadMore}>load more</button>)
        )
    }
    const head = ()=>{
        <Head>
            <title>fitness | {APP_NAME}</title>
            <meta name="description" content="fitness tutorial and experience from people who have done it"></meta>
            <link rel='canonical' href={`${DOMAIN}${router.pathname}`}></link>
        </Head>
    }
   
    const showALLCategories = ()=>{
        return categories.map((c,i)=>{
            return <a  href={`/categories/${c.slug}`}key={i}><button className='category-button'>{c.name}</button></a>
        })
    }
    const showALLTags = ()=>{
        return tags.map((t,i)=>{
            return <a href={`/tags/${t.slug}`} key={i}><button className='tag-button'>{t.name}</button></a>
        })
    }
   
     const showAllBlogs = ()=>{
         return blogs.map((b,i)=>{
             return <article key={i}>
             <Card blog={b}></Card>
             </article>
         })
     }
     const showLoadedBlogs = ()=>{
        return loadedBlogs.map((b,i)=>{
            return <article key={i}>
            <Card blog={b}></Card>
            </article>
        })
    }
        
     
    return (
        <> 
             {head()}
            <Layout>
            <div className='blog-container'>
             <div className='container-header'>
             
            <div className='container-cat-tag'>
                {showALLCategories()}
               
                {showALLTags()}
            </div>


             </div>
             <div className='container-body'>
                 {showAllBlogs()}

                 {showLoadedBlogs()}
                 {loadMoreButton()}
                 
             </div>
             
            </div>
            
            

    
          
            
           
        

            </Layout>
        </>
    )
}
Blogs.getInitialProps = ()=>{
    let skip = 0
    let limit = 2
    return  listBlogWithCategoriesAndTags(skip,limit).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            return {
                blogs:data.blog,
                categories:data.categories,
                tags:data.tags,
                totalBlogs:data.size,
                blogsLimit:limit,
                blogSkip:skip
            }
        }
    })
}

  

export default withRouter( Blogs)