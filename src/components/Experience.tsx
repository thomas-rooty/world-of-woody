import Ground from './ground/Ground.tsx'
import { SoftShadows } from '@react-three/drei'
import { SampleSphere } from './objects/SampleSphere.tsx'
import CharacterController from './player/CharacterController.tsx'

const Experience = () => {
  return (
    <>
      {/* LIGHTS */}
      <SoftShadows size={10} samples={20} />
      <ambientLight intensity={1} />
      <directionalLight color={'#bcbffe'} intensity={0.5} position={[-10, 2, -6]} shadow-mapSize={[1024, 1024]} />
      <directionalLight
        castShadow
        color={'#feefc4'}
        intensity={2}
        position={[10, 12, 6]}
        shadow-mapSize={[1024, 1024]}
      />

      {/* CHARACTER */}
      <CharacterController />

      {/* STAGE */}
      <Ground />
      <SampleSphere />
    </>
  )
}

export default Experience
