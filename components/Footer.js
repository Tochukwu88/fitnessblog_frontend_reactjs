const Footer = () =>{
    let d= new Date();
  let n = d.getFullYear()
    return(
        <>
       

<footer className="footer-distributed">

    <div className="footer-right">

        <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a>
        <a href="#"><i class="fa fa-linkedin"></i></a>
        <a href="#"><i class="fa fa-github"></i></a>

    </div>

    <div className="footer-left">

        <p className="footer-links">
            <a className="link-1" href="/">Home</a>

            <a href="/blogs">articles</a>

            <a href="/user/crud/blog">write a post</a>

            

            <a href="/contacts">Contact</a>
        </p>

        <p>Helmov &copy; {`${n}`}</p>
    </div>

</footer>
        </>
    )
}
export default Footer
