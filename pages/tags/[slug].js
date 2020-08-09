import Layout from '../../components/Layout'
import { singleTag } from '../../actions/tag'
import Card from '../../components/blog/Card'
import moment from 'moment'

const Tag = ({tag,blogs}) =>{
    return(
        <>
        <Layout>
            <main>
                <div className='cat-tag-container'>
                    <h1>{tag.name}</h1>
                    {blogs.map((b,i)=>{
                        return <Card key={i} blog={b}/>
                    })}
                </div>
            </main>
        </Layout>
        </>
    )
}


Tag.getInitialProps = ({query}) =>{
    return singleTag(query.slug).then(data =>{
        
        if(data.error){
            console.log(data.error)
        }else{
            return {
                tag:data.tag,
                blogs:data.blogs
            }
        }
    })

}

export default Tag