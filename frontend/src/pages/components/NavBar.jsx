import { useLocation, Link } from 'react-router-dom'
import "../../index.css"
import ecoFitLogo from '../../assets/ecofit.svg'

const NavBar = () => {
    const location = useLocation();
    const isRoot = location.pathname === '/'

    // Assign different CSS classes based on whether it is the root or not
    const navClass = isRoot ? "NavBar animate" : "NavBar final"
    const buttonClass = isRoot ? "nav-button animate" : "nav-button final"

    return (
        <div className={navClass}>
            {!isRoot && (
                <div className="nav-logo">
                    <img src={ecoFitLogo} alt="EcoFit" style={{ position: 'absolute', top: '-22%', left: '50.85%', transform: 'translateX(-50%) scale(0.85)', zIndex: 6}} />
                </div>
            )}
            <div style={{ position: 'relative', left: '8vw'}}> 
                <Link to="/home">
                    <button className={buttonClass} style={{  marginRight: '1vw'}}>Home</button>
                </Link>
                <Link to="/tool">
                    <button className={buttonClass} style={{  marginRight: '10vw'}}>Tool</button>
                </Link>
                <Link to="/criteria">
                    <button className={buttonClass} style={{  marginRight: '1vw'}}>Criteria</button>
                </Link>
                <Link to="/about-us">
                    <button className={buttonClass} >About Us</button>
                </Link>
            </div>
        </div>
    );
}

export default NavBar
