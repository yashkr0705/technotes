import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <>
      <div className="public public-div">
        <h1>complaintPortal</h1>
      </div>
      <Link className="btn btn1 btn-primary" to="/login">
        Login
      </Link>
    </>
  );
  return content;
};
export default Public;
{
  /* <footer className="public">
<header>
  <h1>
    <span className="nowrap">complaintPortal</span>
  </h1>
</header>
<main className="public__main">
  <p>Located in *****, This is Portal to filled complaint</p>
  <address className="public__addr">
    **Place***
    <br />
    **Street**
    <br />
    <br />
    <a href="tel:+919999999999">99999-99999</a>
  </address>
  <br />
  <p>Owner: YASH KUMAR</p>
</main>
<footer> */
}
