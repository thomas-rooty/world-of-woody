import * as THREE from 'three'
import { useRef } from 'react'
import { Controls } from '../../App.tsx'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useCharacterStore } from '../../../stores/character.store.ts'
import CharacterModel from './CharacterModel.tsx'

const JUMP_FORCE = 0.5
const MOVEMENT_SPEED = 0.1
const MAX_SPEED = 3
const RUN_VEL = 1.5

const CharacterController = () => {
  const rigidbody = useRef<any>()
  const character = useRef<any>()
  const isOnFloor = useCharacterStore((state) => state.isOnFloor)
  const setIsOnFloor = useCharacterStore((state) => state.setIsOnFloor)
  const { characterState, setCharacterState } = useCharacterStore((state) => ({
    characterState: state.characterState,
    setCharacterState: state.setCharacterState,
  }))

  // Controls
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump])
  const leftPressed = useKeyboardControls((state) => state[Controls.left])
  const rightPressed = useKeyboardControls((state) => state[Controls.right])
  const forwardPressed = useKeyboardControls((state) => state[Controls.forward])
  const backwardPressed = useKeyboardControls((state) => state[Controls.backward])

  // Character logic
  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 }
    const linvel = rigidbody.current?.linvel()
    let changeRotation = false

    // Movement
    if (jumpPressed && isOnFloor) {
      impulse.y += JUMP_FORCE
    }
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

    if ( Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL ) {
      if (characterState !== 'Run') {
        setCharacterState('Run')
      }
    } else {
      if (characterState !== 'Idle') {
        setCharacterState('Idle')
      }
    }

    if (changeRotation) {
      character.current.rotation.y = Math.atan2(linvel.x, linvel.z)
    }

    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())
    state.camera.position.x = characterWorldPosition.x + 3
    state.camera.position.y = characterWorldPosition.y + 4
    state.camera.position.z = characterWorldPosition.z + 7

    const targetLookAt = new THREE.Vector3(characterWorldPosition.x, characterWorldPosition.y, characterWorldPosition.z)

    state.camera.lookAt(targetLookAt)
  })

  return (
    <group>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === 'ground') {
            setIsOnFloor(true)
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject?.name === 'ground') {
            setIsOnFloor(false)
          }
        }}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={character}>
          <CharacterModel />
        </group>
      </RigidBody>
    </group>
  )
}

export default CharacterController
