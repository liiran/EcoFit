// Import necessary modules from THREE and React Three Fiber
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Define a custom geometry class that extends THREE.PlaneGeometry
class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius, ...args) {
    super(...args)  
    let p = this.parameters  
    let hw = p.width * 0.5  // Half-width of the plane
    //Three Points
    let a = new THREE.Vector2(-hw, 0) 
    let b = new THREE.Vector2(0, radius)  
    let c = new THREE.Vector2(hw, 0)  
    
    //vectors going from one point to another (forms a triangle)
    let ab = new THREE.Vector2().subVectors(a, b)
    let bc = new THREE.Vector2().subVectors(b, c)
    let ac = new THREE.Vector2().subVectors(a, c)
    let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac))) //formula for a circumcircle


    let center = new THREE.Vector2(0, radius - r)  // Center of the arc- Ensures it peaks at point B

    let baseV = new THREE.Vector2().subVectors(a, center)
    console.log(baseV.angle)
    let baseAngle = baseV.angle() - Math.PI * 0.5 
    console.log(baseAngle)
    let arc = baseAngle * 2  // Total arc angle

    //Placing vertices along arc and adjusting texture accordingly
    let uv = this.attributes.uv  // UV coordinates for texture mapping
    let pos = this.attributes.position  // Position attribute of the geometry
    let mainV = new THREE.Vector2()
    // Update vertex positions to bend the plane into a curved shape
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i)  // Ratio of UV x-coordinate
      let y = pos.getY(i)
      mainV.copy(c).rotateAround(center, arc * uvRatio)  // Rotate vertex around the center by calculated arc
      pos.setXYZ(i, mainV.x, y, -mainV.y)  // Update vertex position
    }
    pos.needsUpdate = true  // Flag the position attribute to be updated on the GPU
  }
}


extend({ BentPlaneGeometry })
