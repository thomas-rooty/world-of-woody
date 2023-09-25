import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Círculo003: THREE.Mesh
    Cubo129: THREE.Mesh
  }
  materials: {
    ['Material.011']: THREE.MeshStandardMaterial
    ['N00_000_Hair_00_HAIR (Instance)']: THREE.MeshStandardMaterial
  }
}

const Grass = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/grass.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Círculo003.geometry}
        material={materials['Material.011']}
        position={[0.529, 0.432, 0]}
        scale={126.822}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cubo129.geometry}
        material={materials['N00_000_Hair_00_HAIR (Instance)']}
        position={[0.529, 2.882, 0]}
        rotation={[0, -0.247, 0]}
        scale={[1, 1.483, 1]}
      />
    </group>
  )
}

useGLTF.preload('/grass.gltf')

export default Grass
