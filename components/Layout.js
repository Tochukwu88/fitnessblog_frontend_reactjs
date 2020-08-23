import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
const Layout=({children})=>{

  const[sideDrawer,setDrawer] = useState(false)
   const handleChange = ()=>{

    setDrawer(!sideDrawer)
   }
   const closeDrawer =()=>{
     setDrawer(false)
   }

    return(
        <>
        
         <Header  className='lheader' show={sideDrawer} click={handleChange}  close={closeDrawer}  />
         
        <div className='llcontainer'> {children  }</div>
       
       
    
        </>
    )
    
}
export default Layout