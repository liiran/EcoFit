import "../index.css"
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, useScroll } from '@react-three/drei'
import { easing } from 'maath'
import styled from 'styled-components'
import '../assets/util'
import '../assets/popup.css'


//handles the rotation of the carousel based on scroll interaction
function Rig(props) {
    const ref = useRef() //store values between renders
    const scroll = useScroll()
    useFrame((state, delta) => {
        ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate the contents full circle based on scroll offset
        state.events.update()
        easing.damp3(state.camera.position, [8, state.pointer.y + 0.02, 5], 0, delta) 
        state.camera.lookAt(0, 0, 0) // Always look at the center
    })
    return <group ref={ref} {...props} />
}

// Carousel component creates an array of Card components positioned in a circular layout
function Carousel({ radius = 1.4, count = 9, onCardClick }) {
    return Array.from({ length: count }, (_, i) => (
        <Card
        key={i}
        url={`/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        onClick={() => onCardClick(i)}
        />
    ))
}

// Card component displays an image and handles mouse interactions
function Card({ url, onClick, ...props }) {
    const ref = useRef()
    const [hovered, hover] = useState(false)

    const pointerOver = (e) => {
        e.stopPropagation()
        hover(true)
    }
    const pointerOut = () => hover(false)

    const handleClick = (e) => {
        e.stopPropagation()
        onClick()
    }

    
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta) // Scale animation on hover
        easing.damp(ref.current.material, 'radius', hovered ? 0.1 : 0.25, 0.2, delta) // Material radius animation on hover 
    })

    return (
        <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} onClick={handleClick} {...props}>
            <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
        </Image>
    )
}


function renderButton(index,messages) {
    const links = ["https://global-standard.org/","","https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100","https://fairtrade.ca/", "https://www.bcorporation.net/en-us/", "https://fsc.org/en","https://www.projectcece.com/blog/586/recycling-in-fashion/", "https://www.goclimate.com/blog/sustianable-fashion-material-guide/","https://www.betterpackaging.com/"] 
    if (messages[index].props.children[0].props.alt === "Criteria") {
      return null;
    } else {
      return (
        <button onClick={() => window.open(links[index], '_blank')} className="learn-more-btn">
          Learn More
        </button>
      );
    }
  }

// Main component setting up the scene and canvas
const Criteria = () => {
    const [showPopup, setShowPopup] = useState(false)
    const [clickedIndex, setClickedIndex] = useState(null)
    const messages = [
        <><img src="./img1_.png" alt="Global Organic Textile Standard" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>The Global Organic Textile Standard (GOTS) is a comprehensive certification for textiles made from organic fibers, ensuring they meet stringent ecological and social criteria throughout the entire supply chain. It covers every step of the production process, from the harvesting of raw materials to responsible manufacturing and labeling, providing a credible assurance of organic quality to consumers. GOTS certification helps in maintaining a transparent, sustainable, and ethical fashion industry by setting a globally recognized benchmark for organic textiles.</p></>,
        <><img src="./img2_.png" alt="Criteria" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>In today's world, with the rise of fast fashion companies such as "Shein" and "H&M", many people are substituting the environment and safe work conditions for cost and efficiency. According to Earth.org (2023), 92 million tonnes of textile waste is produced every year. That is equivalent to a garbage truck full of clothes ending up in landfills every second.  Our criteria uses multiple different metrics to combat such practices by promoting sustainable companies. We compiled a list of both ethical and environmentally friendly companies using various criterion and certifications.  Here is the list of certifications that we use to filter companies. </p></>,
        <><img src="./img3_.png" alt="OEKO-TEX" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>The OEKO-TEX Standard 100 is a globally recognized certification for textiles and materials. It sets the benchmark for textile safety, from yarn to finished product, ensuring that every item bearing the Standard 100 label is certified as having passed safety tests for the presence of harmful substances. This certification promotes health and safety by ensuring that OEKO-TEX-certified products are free from harmful chemicals, making them safe for both you and the environment..</p></>,
        <><img src="./img4_.png" alt="Fair Trade" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>Fair Trade is a trading partnership, based on dialogue, transparency, and respect, that seeks greater equity in international trade. It contributes to sustainable development by offering better trading conditions to, and securing the rights of, marginalized producers and workers.</p></>,
        <><img src="./img5_.png" alt="B Corp" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>B Corp, is a for-profit corporation that is certified by B Lab for its social impact. B Corp certification is conferred by B Lab, a global non-profit organization, and it signifies that the company has voluntarily met the highest standards for social and environmental performance. This certification is officially recognized in most states of the U.S., and it operates for the benefit of stakeholders such as employees and the larger community rather than simply for its shareholders.</p></>,
        <><img src="./img6_.png" alt="Forest Stewardship Council" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>The Forest Stewardship Council (FSC) promotes environmentally sound, socially beneficial, and economically prosperous management of the world's forests. Its certification ensures that products come from responsibly managed forests that provide environmental, social, and economic benefits.</p></>,
        <><img src="./img7_.png" alt="Recycled Materials" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>In the fashion industry, recycled materials involve reprocessing textile waste and old garments into new fabrics. This approach significantly reduces waste and resource consumption, lowering the environmental impact associated with raw material extraction and processing.</p></>,
        <><img src="./img8_.png" alt="Natural Materials" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>In fashion, natural materials like organic cotton, wool, and silk are sourced directly from nature and minimally processed. These materials are prized not only for their low environmental impact but also for their breathability, durability, and biodegradability in apparel.</p></>,
        <><img src="./img9_.png" alt="Eco-Friendly Packaging" style={{ width: '200px', display: 'block', margin: '0 auto', transform: 'scaleX(-1)' }} /><p>Eco-friendly packaging is designed to reduce the environmental impact and ecological footprint. It often involves using recycled or renewable materials, minimizing packaging, and designing for improved reusability and recyclability.</p></>
    ]   

    const handleCardClick = (index) => {
        console.log("Card clicked:", index)
        setClickedIndex(index)
        setShowPopup(true)     
        document.body.style.overflow = 'hidden'
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        document.body.style.overflow = 'auto'
    }

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <>
            {showPopup && (
                <>
                    <div className="overlay" onClick={handleClosePopup}>
                        <div className="popup">
                            {clickedIndex !== null && messages[clickedIndex]}
                            {clickedIndex !== null && renderButton(clickedIndex,messages)}
                        </div>
                    </div>
                </>
            )}
            <Canvas style={{ width: "100vw", height: "100vh" }} camera={{ position: [0, 0, 100], fov: 15 }}>
                <fog attach="fog" args={['#a79', 8.5, 12]} />
                <ScrollControls pages={4} damping={0.5} infinite>
                    <Rig rotation={[0, 0, 0]}>
                        <Carousel onCardClick={handleCardClick} />
                    </Rig>
                </ScrollControls>
            </Canvas>
        </>
    )
}

export default Criteria