import {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'

import Layout from '../../../../components/Layout'
import { signup } from '../../../../actions/auth'
import { withRouter } from 'next/router'
const ActivateAccount = ({router}) =>{
    const [values, setValues] = useState({
        fullname:'',
        token:'',
        loading:false,
        error:'',
        success:'',
        showButton:true,
    })
    const {fullname,token,loading,error,success,showButton} = values

    useEffect(()=>{
        let token = router.query.id
        if(token){
            const {name} = jwt.decode(token)
            
            setValues({...values,token,fullname:name})
        }

    },[router])

    const clickSubmit = e =>{
        e.preventDefault()
        setValues({...values,loading:true,error:false})
        signup({token}).then(data =>{
            if(data.error){
                setValues({...values,error:data.error, loading:false,showButton:false})
            }else{
                setValues({...values,loading:false,success:true,showButton:false})
            }
        })
    }
    const showLoading =()=>(loading?<div><p>loading...</p></div>:'')
    return(
        <Layout>
            <div>
                <h3>Hey {fullname}, ready to activate your account?</h3>
                {showLoading()}
                {error && error}
                {success && 'you have successfully activated your account'}
                {showButton && (
                    <button onClick={clickSubmit}>Activate Account</button>
                )}
            </div>
        </Layout>
    )

}
export default withRouter(ActivateAccount)
