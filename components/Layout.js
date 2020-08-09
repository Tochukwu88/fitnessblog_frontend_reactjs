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
        <div >
         <Header  show={sideDrawer} click={handleChange}  close={closeDrawer}  />
          {children }
          {/* <Footer /> */}

        </div>
    
        </>
    )
    
}
export default Layout