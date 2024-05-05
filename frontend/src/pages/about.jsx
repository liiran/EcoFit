import NavBar from "./components/NavBar";
import "./components/profile.css"

const About = () => {
    return(
        <>
         <NavBar />
         <div style={{width: "100%", height: "50vh", paddingTop: "10vh", display: 'flex'}}>
            <div className="profile" style={{marginLeft: "5%", width: "40%", height: "100%"}}>
               <h2 style={{margin: '0 0 10px'}}>Carsten Singh</h2>
               <h3 style={{margin: '0 0 5px'}}>Front End Development</h3>
               <p>I am a 2nd year Software Engineering student at the University of Guelph with a passion for front end development.    </p>
            </div>   
            <div style={{width:"10%"}}></div>
            <div className="profile" style={{width: "40%", height: "100%"}}>
               <h2 style={{margin: '0 0 10px'}}>Dev Desai</h2>
               <h3 style={{margin: '0 0 5px'}}>Back End Development</h3>
               <p>This is another brief paragraph description. Perhaps describe different aspects or highlight specific achievements or projects relevant to the profile.</p>
            </div>   
         </div>
        </>
    )
}
export default About;