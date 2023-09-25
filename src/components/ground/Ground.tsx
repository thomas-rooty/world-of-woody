import { CuboidCollider, RigidBody } from '@react-three/rapier'
import Grass from './Grass.tsx'

const Ground = () => {
  return (
    <RigidBody type="fixed" colliders={false} friction={1} name="ground">
      <Grass scale={0.1} />
      <CuboidCollider args={[50, 0, 50]} position={[0, 0, 0]} />
    </RigidBody>
  )
}

export default Ground
