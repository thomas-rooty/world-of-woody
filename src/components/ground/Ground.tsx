import { RigidBody } from '@react-three/rapier'
import Grass from './Grass.tsx'
import Heightmap from './Heightmap.tsx'

const Ground = () => {
  return (
    <RigidBody type="fixed" colliders={'trimesh'} friction={1} name="ground" position={[0, -3, 0]}>
      <Heightmap />
    </RigidBody>
  )
}

export default Ground
