import * as THREE from 'three'
import { useRef } from 'react'
import { Controls } from '../../App.tsx'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useCharacterStore } from '../../../stores/character.store.ts'
import CharacterModel from './CharacterModel.tsx'

const MOVEMENT_SPEED = 0.1
const MAX_SPEED = 3
const RUN_VEL = 1.5

const CharacterController = () => {
  const rigidbody = useRef<any>()
  const character = useRef<any>()
  const { characterState, setCharacterState } = useCharacterStore((state) => ({
    characterState: state.characterState,
    setCharacterState: state.setCharacterState,
  }))

  // Controls
  const leftPressed = useKeyboardControls((state) => state[Controls.left])
  const rightPressed = useKeyboardControls((state) => state[Controls.right])
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward])
  const backwardPressed = useKeyboardControls((state) => state[Controls.backward])

  // Character logic
  useFrame((state, delta) => {
    const impulse = { x: 0, y: 0, z: 0 }
    const linvel = rigidbody.current?.linvel()
    let changeRotation = false

    // Movement
    if (rightPressed && linvel.x < MAX_SPEED) {
      impulse.x += MOVEMENT_SPEED
      changeRotation = true
    }
    if (leftPressed && linvel.x > -MAX_SPEED) {
      impulse.x -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (forwardPressed && linvel.z > -MAX_SPEED) {
      impulse.z -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (backwardPressed && linvel.z < MAX_SPEED) {
      impulse.z += MOVEMENT_SPEED
      changeRotation = true
    }

    rigidbody.current?.applyImpulse(impulse, true)

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (characterState !== 'Run') {
        setCharacterState('Run')
      }
    } else {
      if (characterState !== 'Idle') {
        setCharacterState('Idle')
      }
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z)
      character.current.rotation.y = angle
    }

    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())

    const targetCameraPosition = new THREE.Vector3(
      characterWorldPosition.x + 3,
      characterWorldPosition.y + 4,
      characterWorldPosition.z + 7
    )

    state.camera.position.lerp(targetCameraPosition, delta * 2)

    const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)

    const direction = new THREE.Vector3()
    state.camera.getWorldDirection(direction)

    const position = new THREE.Vector3()
    state.camera.getWorldPosition(position)

    const currentLookAt = position.clone().add(direction)
    const lerpedLookAt = new THREE.Vector3()

    lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2)

    state.camera.lookAt(lerpedLookAt)
  })

  return (
    <group>
      <RigidBody ref={rigidbody} colliders={false} scale={[0.5, 0.5, 0.5]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <CharacterModel />
        </group>
      </RigidBody>
    </group>
  )
}

export default CharacterController
