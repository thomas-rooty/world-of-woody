import Ground from './ground/Ground.tsx'
import CharacterController from './player/CharacterController.tsx'
import { SampleSphere } from './objects/SampleSphere.tsx'

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
