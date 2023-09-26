import Ground from './ground/Ground.tsx'
import { SampleSphere } from './objects/SampleSphere.tsx'
import CharacterController from './player/CharacterController.tsx'

const Experience = () => {
  return (
    <>
      {/* LIGHTS */}
      <ambientLight intensity={1} />

      {/* CHARACTER */}
      <CharacterController />

      {/* STAGE */}
      <Ground />
      <SampleSphere />
    </>
  )
}

export default Experience
