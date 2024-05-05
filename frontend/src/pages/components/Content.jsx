

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../../index.css";
import "./content.css";

const Content = () => {
    const [addClass, setAddClass] = useState(false);
    const fastFashionRef = useRef(null);  // Step 2: Create the ref

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Trigger animation when the element is in view
                if (entries[0].isIntersecting) {
                    setAddClass(true);
                } else {
                    setAddClass(false);
                }
            },
            {
                threshold: 0.5 // Adjust this value based on when you want the animation to start
            }
        );

        if (fastFashionRef.current) {
            observer.observe(fastFashionRef.current); 
        }

        return () => {
            if (fastFashionRef.current) {
                observer.unobserve(fastFashionRef.current); // Clean up the observer
            }
        };
    }, []);

    return (
        <>
            <div className="first" style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <svg
                width="600"
                height="200"
                viewBox="0 0 600 200"
                version="1.1"
                
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontFamily: "Rockwell", letterSpacing: "2px" }}
                >
                    <defs />
                    <g>
                        <path
                            className="path"
                            style={{
                                fontSize: "74.6667px",
                                stroke: "#abbd95",
                                strokeWidth: "2",
                            }}
                             d="m 225.37311,211.20092 q 0,-11.04688 7.21875,-18.48439 7.21876,-7.4375 18.81251,-7.4375 11.70313,0 19.06772,7.4375 7.36459,7.43751 7.36459,18.63022 0,11.41146 -7.51042,18.84897 -7.47397,7.40104 -19.03126,7.40104 -7.36459,0 -13.56251,-3.5 -6.16146,-3.53646 -9.26042,-9.8073 -3.09896,-6.30729 -3.09896,-13.08854 z m 8.34896,0.0365 q 0,8.34897 4.88542,14.00001 4.88542,5.65104 12.83334,5.65104 7.875,0 12.94271,-5.76041 5.06772,-5.79688 5.06772,-13.81772 0,-8.09375 -5.17709,-13.67188 -5.14063,-5.61459 -12.94271,-5.61459 -7.76563,0 -12.68751,5.50521 -4.92188,5.50521 -4.92188,13.70834 z m 64.16837,-18.81251 v 25.37502 q 0,5.90625 0.58333,8.16667 0.61979,2.26042 3.02604,3.86458 2.40625,1.56771 6.19792,1.56771 4.52084,0 6.92709,-1.34896 2.40625,-1.38541 3.17187,-3.68229 0.80209,-2.33334 0.80209,-8.20313 v -25.7396 h -5.8698 v -6.34375 h 19.83335 v 6.34375 h -6.34376 v 26.50523 q 0,5.35937 -0.47396,7.80208 -0.4375,2.40625 -2.4427,5.06771 -2.00521,2.625 -5.65105,4.22917 -3.64583,1.56771 -8.85938,1.56771 -5.76042,0 -9.58854,-1.45833 -3.82813,-1.49479 -5.76042,-3.97396 -1.9323,-2.47917 -2.58855,-5.28646 -0.61979,-2.8073 -0.61979,-8.71355 v -25.7396 h -6.27083 v -6.34375 h 19.94271 v 6.34375 z m 44.99127,38.02606 v -38.02606 h -6.96355 v -6.34375 h 20.59897 q 6.45313,0 10.2448,1.02084 3.79167,0.98437 6.27083,4.22916 2.47917,3.20834 2.47917,8.02084 0,10.06251 -10.46355,12.65105 l 8.96876,18.44792 h 6.19792 v 6.34376 H 369.2411 L 357.6838,213.0968 h -7.14584 v 17.35417 h 6.48959 v 6.34376 h -21.10939 v -6.34376 z m 7.65625,-23.69792 h 5.97917 q 4.33854,0 6.38021,-0.54688 2.07813,-0.58333 3.39063,-2.29687 1.3125,-1.75001 1.3125,-4.66667 0,-2.47917 -1.34896,-4.19271 -1.3125,-1.71355 -3.28125,-2.15105 -1.93229,-0.47396 -5.94271,-0.47396 h -6.48959 z m 68.28984,30.55209 -17.02605,-44.88023 h -6.27084 v -6.34375 h 20.01563 v 6.34375 h -5.86979 l 12.90626,34.0521 12.57813,-34.0521 h -5.90626 v -6.34375 h 19.46876 v 6.34375 h -6.16146 l -16.69792,44.88023 z m 39.01209,-6.85417 v -38.02606 h -5.50521 v -6.34375 h 18.66667 v 6.34375 h -5.50521 v 38.02606 h 5.50521 v 6.34376 h -18.66667 v -6.34376 z m 19.5798,6.34376 v -18.41147 h 6.34375 v 4.48438 q 4.5573,8.27604 11.92188,8.27604 3.75521,0 6.34376,-2.29687 2.58854,-2.29688 2.58854,-6.01563 0,-3.60938 -2.11459,-5.17709 -2.11458,-1.60416 -7.98437,-3.17187 -6.81772,-1.82292 -10.09897,-3.42709 -3.28125,-1.64062 -5.25,-4.63021 -1.93229,-3.02604 -1.93229,-7.14584 0,-6.38021 4.22917,-10.17188 4.26562,-3.82812 10.68229,-3.82812 6.08855,0 11.30209,3.9375 v -3.39063 h 6.19792 v 15.38543 h -6.19792 v -3.53646 q -3.90104,-5.8698 -10.75521,-5.8698 -4.15625,0 -6.38021,1.9323 -2.22396,1.89583 -2.22396,4.55729 0,2.04167 1.13021,3.60938 1.13021,1.53125 2.88021,2.26041 1.75,0.72917 6.89062,2.04167 6.70834,1.75 9.73438,3.28125 3.02605,1.4948 5.21355,5.03126 2.1875,3.53646 2.1875,8.13021 0,6.48958 -4.59375,10.71875 -4.5573,4.22917 -11.30209,4.22917 -6.92709,0 -12.46876,-4.99479 v 4.19271 z m 46.34021,-6.34376 v -38.02606 h -5.50521 v -6.34375 h 18.66668 v 6.34375 h -5.50521 v 38.02606 h 5.50521 v 6.34376 h -18.66668 v -6.34376 z m 20.71001,-19.25 q 0,-11.04688 7.21875,-18.48439 7.21876,-7.4375 18.81251,-7.4375 11.70313,0 19.06772,7.4375 7.36459,7.43751 7.36459,18.63022 0,11.41146 -7.51042,18.84897 -7.47396,7.40104 -19.03126,7.40104 -7.36459,0 -13.56251,-3.5 -6.16146,-3.53646 -9.26042,-9.8073 -3.09896,-6.30729 -3.09896,-13.08854 z m 8.34896,0.0365 q 0,8.34897 4.88542,14.00001 4.88542,5.65104 12.83334,5.65104 7.87501,0 12.94272,-5.76041 5.06771,-5.79688 5.06771,-13.81772 0,-8.09375 -5.17709,-13.67188 -5.14063,-5.61459 -12.94271,-5.61459 -7.76563,0 -12.68751,5.50521 -4.92188,5.50521 -4.92188,13.70834 z m 56.8767,19.21355 v -38.02606 h -7.25521 v -6.34375 h 17.31772 l 22.23959,39.41148 v -33.06773 h -7.1823 v -6.34375 h 20.81772 v 6.34375 h -7.47396 v 44.88023 h -7.875 l -24.31772,-43.27606 v 36.42189 h 7.25521 v 6.34376 h -20.78126 v -6.34376 z"
                            id="text1"
                            aria-label="OUR VISION"
                            transform='translate(-130,-60)'
                        />
                        <path className="line" d="M 0 200 L 600 200" stroke="#abbd95" strokeWidth="2"/>
                       
                    </g>    
                </svg>
                <div className="visionText">
                    <div>
                        <p>
                        EcoFit is a platform for shopping when the need for sustainable and ethical practices in the fashion industry have never been more apparent. Our mission is to revolutionize the way people shop for clothes by making it easier to choose environmentally friendly and ethically produced clothes. EcoFit curates a selection of apparel exclusively from companies that hold certifications such as Bcorp, Fair Trade, GOTS (Global Organic Textile Standard), and Oeko-Tex.
                        </p>
                    </div>
                    <div>
                        <p>
                        The fashion industry has long been criticized for its unsustainable practices as well as questionable labor conditions. Fast fashion thrives on the rapid production of high volumes of low-cost garments, encouraging disposable consumer culture. In contrast, EcoFit advocates for slow fashion enabling consumers to make informed choices, promoting a shift from mindless consumption to conscious, ethical purchasing habits.
                        </p>
                    </div>
                    <div>
                        <p>
                        Sustainable shopping is crucial for reducing our environmental impact. EcoFit enables consumers to support brands that minimize pollution and conserve biodiversity, helping to set new standards for the future of fashion. By choosing EcoFit, customers advocate for a healthier planet and a fairer fashion industry, inspiring a global movement towards greater ecological and ethical responsibility.
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <svg
                    ref={fastFashionRef} // Step 4: Attach the ref
                    className={`path2 ${addClass ? 'animate' : ''}`} 
                    width="600"
                    height="200"
                    viewBox="0 0 600 200"
                    version="1.1"
                    id="svg1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                     <g>
                        <path className='path2'
                        style={{ fontSize: "74.6667px", fontFamily: "Rockwell", letterSpacing: "1.46px", fill: "#abbd95", stroke: "#abbd95", strokeWidth: "2" }}
                        d="M 181.99942,243.67206 V 205.646 h -6.41667 v -6.34376 h 39.33856 v 15.27605 h -6.27083 V 205.646 h -18.9948 v 15.02084 h 16.3698 v 6.34375 h -16.3698 v 16.66147 h 6.48958 v 6.34375 h -20.56251 v -6.34375 z M 245.548,232.18767 h -18.22918 l -3.90104,11.48439 h 6.16146 v 6.34375 h -19.97918 v -6.34375 h 6.125 l 13.85418,-38.64586 h -6.16146 v -5.72396 h 25.92188 v 5.72396 h -6.30729 l 14.1823,38.64586 h 5.6875 v 6.34375 h -19.8698 v -6.34375 h 6.30729 z m -1.89584,-5.94271 -6.74479,-21.21876 h -0.69271 l -7.00001,21.21876 z m 22.71522,23.77085 v -18.41147 h 6.34376 v 4.48438 q 4.55729,8.27604 11.92188,8.27604 3.75521,0 6.34375,-2.29687 2.58854,-2.29688 2.58854,-6.01563 0,-3.60938 -2.11458,-5.17709 -2.11459,-1.60416 -7.98438,-3.17187 -6.81771,-1.82292 -10.09896,-3.42709 -3.28126,-1.64062 -5.25001,-4.63021 -1.93229,-3.02604 -1.93229,-7.14583 0,-6.38022 4.22917,-10.17188 4.26563,-3.82813 10.6823,-3.82813 6.08854,0 11.30208,3.9375 v -3.39063 h 6.19792 v 15.38543 h -6.19792 V 210.896 q -3.90104,-5.8698 -10.75521,-5.8698 -4.15625,0 -6.38021,1.9323 -2.22396,1.89583 -2.22396,4.55729 0,2.04167 1.13021,3.60938 1.13021,1.53125 2.88021,2.26041 1.75,0.72917 6.89063,2.04167 6.70833,1.75 9.73438,3.28125 3.02604,1.4948 5.21354,5.03126 2.1875,3.53646 2.1875,8.13021 0,6.48958 -4.59375,10.71875 -4.55729,4.22917 -11.30209,4.22917 -6.92709,0 -12.46875,-4.99479 v 4.19271 z m 56.11107,-6.34375 V 205.646 H 312.0149 v 12.94271 h -6.27084 v -19.28647 h 41.08857 v 19.28647 h -6.27084 V 205.646 H 330.1347 v 38.02606 h 6.59896 v 6.34375 h -20.7448 v -6.34375 z m 54.54502,0 V 205.646 h -6.41667 v -6.34376 h 39.33856 v 15.27605 h -6.27083 V 205.646 h -18.9948 v 15.02084 h 16.36979 v 6.34375 h -16.36979 v 16.66147 h 6.48958 v 6.34375 H 370.6068 v -6.34375 z m 63.54857,-11.48439 h -18.22917 l -3.90105,11.48439 h 6.16147 v 6.34375 h -19.97918 v -6.34375 h 6.125 l 13.85418,-38.64586 h -6.16147 v -5.72396 h 25.92189 v 5.72396 h -6.30729 l 14.1823,38.64586 h 5.6875 v 6.34375 h -19.8698 v -6.34375 h 6.30729 z m -1.89583,-5.94271 -6.7448,-21.21876 h -0.6927 l -7.00001,21.21876 z m 22.71522,23.77085 v -18.41147 h 6.34375 v 4.48438 q 4.5573,8.27604 11.92188,8.27604 3.75521,0 6.34376,-2.29687 2.58854,-2.29688 2.58854,-6.01563 0,-3.60938 -2.11458,-5.17709 -2.11459,-1.60416 -7.98438,-3.17187 -6.81772,-1.82292 -10.09897,-3.42709 -3.28125,-1.64062 -5.25,-4.63021 -1.93229,-3.02604 -1.93229,-7.14583 0,-6.38022 4.22917,-10.17188 4.26562,-3.82813 10.68229,-3.82813 6.08855,0 11.30209,3.9375 v -3.39063 h 6.19792 v 15.38543 h -6.19792 V 210.896 q -3.90104,-5.8698 -10.75521,-5.8698 -4.15625,0 -6.38021,1.9323 -2.22396,1.89583 -2.22396,4.55729 0,2.04167 1.13021,3.60938 1.13021,1.53125 2.88021,2.26041 1.75,0.72917 6.89062,2.04167 6.70834,1.75 9.73438,3.28125 3.02605,1.4948 5.21355,5.03126 2.1875,3.53646 2.1875,8.13021 0,6.48958 -4.59375,10.71875 -4.5573,4.22917 -11.30209,4.22917 -6.92709,0 -12.46876,-4.99479 v 4.19271 z m 46.2673,-6.34375 V 205.646 h -5.76042 v -6.34376 h 19.39584 v 6.34376 h -5.97917 v 14.51042 h 22.0573 V 205.646 h -5.94271 v -6.34376 h 19.39584 v 6.34376 h -5.79687 v 38.02606 h 5.79687 v 6.34375 h -19.39584 v -6.34375 h 5.94271 v -17.17189 h -22.0573 v 17.17189 h 5.97917 v 6.34375 h -19.39584 v -6.34375 z m 54.39753,0 V 205.646 h -5.50521 v -6.34376 h 18.66667 v 6.34376 h -5.50521 v 38.02606 h 5.50521 v 6.34375 h -18.66667 v -6.34375 z m 20.71001,-19.25001 q 0,-11.04688 7.21875,-18.48439 7.21875,-7.4375 18.81251,-7.4375 11.70313,0 19.06772,7.4375 7.36458,7.43751 7.36458,18.63022 0,11.41146 -7.51042,18.84897 -7.47396,7.40104 -19.03125,7.40104 -7.36459,0 -13.56251,-3.5 -6.16146,-3.53646 -9.26042,-9.8073 -3.09896,-6.30729 -3.09896,-13.08854 z m 8.34896,0.0364 q 0,8.34897 4.88542,14.00001 4.88542,5.65105 12.83334,5.65105 7.875,0 12.94271,-5.76042 5.06771,-5.79688 5.06771,-13.81772 0,-8.09375 -5.17708,-13.67188 -5.14063,-5.61459 -12.94272,-5.61459 -7.76563,0 -12.6875,5.50521 -4.92188,5.50522 -4.92188,13.70834 z m 56.8767,19.21356 V 205.646 h -7.25522 v -6.34376 h 17.31772 l 22.2396,39.41148 V 205.646 h -7.1823 v -6.34376 h 20.81772 v 6.34376 h -7.47396 v 44.88023 h -7.87501 l -24.31772,-43.27607 v 36.4219 h 7.25521 v 6.34375 h -20.78126 v -6.34375 z"
                        id="text1"
                        aria-label="FAST FASHION"
                        transform='translate(-130,-60)'
                        />
                    </g>
                </svg>
                <div className="grid-container">
                    <div className="grid-item">100 billion items of clothing are produced each year. That equates to roughly 14 items per person.</div>
                    <div className="grid-item">Fast fashion companies produce more pollution than the combined total of international aviation and maritime transport.</div>
                    <div className="grid-item">Every year 92 million tonnes of textile waste is generated by the fashion industry</div>
                    <div className="grid-item">59% of all sustainability claims by European fashion brands are inaccurate</div>
                    <div className="grid-item">The fashion industry consumes around 93 billion cubic metres of water every year</div>
                    <div className="grid-item">These Facts were published by earth.org in 2022</div>
                </div>
            </div>
        </>
    );
};

export default Content;