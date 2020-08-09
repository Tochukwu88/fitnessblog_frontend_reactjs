import Layout from '../../components/Layout'
import { singleCategory } from '../../actions/category'
import Card from '../../components/blog/Card'
import moment from 'moment'

const Category = ({Category,blogs}) =>{
    return(
        <>
        <Layout>
            <main>
                <div className=' cat-tag-container'>
                    <h1>{Category.name}</h1>
                    {console.log(blogs)}
                    {blogs.map((b,i)=>{
                        return <Card key={i} blog={b}/>
                    })}
                </div>
            </main>
        </Layout>
        </>
    )
}


Category.getInitialProps = ({query}) =>{
    return singleCategory(query.slug).then(data =>{
        if(data.error){
            console.log(data.error)
        }else{
            return {
                Category:data.category,
                blogs:data.blogs
            }
        }
    })

}

export default Category