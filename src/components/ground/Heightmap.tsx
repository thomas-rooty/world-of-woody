import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { BufferAttribute } from 'three'
import useNoisyVertices from './hooks/useNoisyVertices'
import useFlipPlaneOnX from './hooks/useFlipPlaneOnX.ts'

// Define static control values for the height map
const STATIC_CONTROL_VALUES = {
  seed: 'react-three-fiber',
  resolution: 50,
  maxHeight: 2.5,
  frequency: 4,
  exponent: 3,
  octaves: 4,
  wireframe: false,
}

interface HeightMapProps {
  size?: number
}

const HeightMap: React.FC<HeightMapProps> = ({ size = 200 }) => {
  // Create references for the plane mesh and geometry
  const planeMesh = useRef<THREE.Mesh>(null)
  const planeGeo = useRef<THREE.PlaneGeometry>(null)

  // Use a custom hook to flip the plane on the X-axis
  useFlipPlaneOnX(planeMesh)

  // Use a custom hook to generate noisy vertices for the height map
  const vertices = useNoisyVertices(STATIC_CONTROL_VALUES, STATIC_CONTROL_VALUES)

  // Init the geometry
  useEffect(() => {
    if (!planeMesh.current || !planeGeo.current) {
      return
    }

    // Update the position attribute of the plane geometry with new vertices
    planeGeo.current.setAttribute('position', new BufferAttribute(vertices, 3))
    planeGeo.current.attributes.position.needsUpdate = true

    // Recalculate vertex normals for shading
    planeGeo.current.computeVertexNormals()
  }, [])

  return (
    <mesh ref={planeMesh} castShadow={true} receiveShadow={true}>
      <planeGeometry
        args={[size, size, STATIC_CONTROL_VALUES.resolution, STATIC_CONTROL_VALUES.resolution]}
        ref={planeGeo}
      />
      <meshLambertMaterial color={'#8ECA58'} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default HeightMap
