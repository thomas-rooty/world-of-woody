import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useCharacterStore } from '../../../stores/character.store.ts'

type GLTFResult = GLTF & {
  nodes: {
    Editable_Poly001: THREE.SkinnedMesh
    N_woody0: THREE.SkinnedMesh
    N_woody1: THREE.SkinnedMesh
    char_root: THREE.Bone
    N_woody_leg: THREE.Bone
    N_woody: THREE.Bone
    N_woodyEye02: THREE.Bone
  }
  materials: {
    N_woody03: THREE.MeshPhysicalMaterial
    N_woody01: THREE.MeshPhysicalMaterial
  }
}

const CharacterModel = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<any>()
  const { nodes, materials, animations } = useGLTF('/woody.gltf') as GLTFResult
  const { actions } = useAnimations<any>(animations, group)

  const characterState = useCharacterStore((state) => state.characterState)

  useEffect(() => {
    const action = actions[characterState]
    if (action) {
      action.reset().fadeIn(0.2).play()
      return () => {
        action.fadeOut(0.2)
      }
    }
  }, [characterState])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Scene_Root">
          <skinnedMesh
            name="Editable_Poly001"
            geometry={nodes.Editable_Poly001.geometry}
            material={materials.N_woody03}
            skeleton={nodes.Editable_Poly001.skeleton}
          />
          <skinnedMesh
            name="N_woody0"
            geometry={nodes.N_woody0.geometry}
            material={materials.N_woody01}
            skeleton={nodes.N_woody0.skeleton}
          />
          <skinnedMesh
            name="N_woody1"
            geometry={nodes.N_woody1.geometry}
            material={materials.N_woody01}
            skeleton={nodes.N_woody1.skeleton}
          />
          <primitive object={nodes.char_root} />
          <primitive object={nodes.N_woody_leg} />
          <primitive object={nodes.N_woody} />
          <primitive object={nodes.N_woodyEye02} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/woody.gltf')

export default CharacterModel
