import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { BufferAttribute } from 'three'
import useNoisyVertices from './hooks/useNoisyVertices'
import useFlipPlaneOnX from './hooks/useFlipPlaneOnX.ts'

// Define your static control values
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
  const planeMesh = useRef<THREE.Mesh>(null)
  const planeGeo = useRef<THREE.PlaneGeometry>(null)
  useFlipPlaneOnX(planeMesh)

  const vertices = useNoisyVertices(STATIC_CONTROL_VALUES, STATIC_CONTROL_VALUES)

  useEffect(() => {
    if (!planeMesh.current || !planeGeo.current) {
      return
    }
    planeGeo.current.setAttribute('position', new BufferAttribute(vertices, 3))
    planeGeo.current.attributes.position.needsUpdate = true
    planeGeo.current.computeVertexNormals()
  }, [vertices, planeMesh, planeGeo])

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
