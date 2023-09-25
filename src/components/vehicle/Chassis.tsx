import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_body: THREE.Mesh
    Mesh_body_1: THREE.Mesh
    Mesh_body_2: THREE.Mesh
    Mesh_body_3: THREE.Mesh
    Mesh_body_4: THREE.Mesh
    skirts: THREE.Mesh
  }
  materials: {
    paintBlue: THREE.MeshStandardMaterial
    plastic: THREE.MeshStandardMaterial
    window: THREE.MeshStandardMaterial
    lightFront: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    carTire: THREE.MeshStandardMaterial
    paintYellow: THREE.MeshStandardMaterial
  }
}

export default function Chassis(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/vehicle/tractor.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.17, -0.04]} scale={1.12}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh_body.geometry} material={materials.paintBlue} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_body_1.geometry} material={materials.plastic} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_body_2.geometry} material={materials.window} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_body_3.geometry} material={materials.lightFront} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_body_4.geometry} material={materials._defaultMat} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.skirts.geometry}
        material={materials.plastic}
        position={[-0.5, 0.28, 1.17]}
        scale={1.12}
      />
    </group>
  )
}

useGLTF.preload('/vehicle/tractor.glb')
