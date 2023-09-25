import Ground from './ground/Ground.tsx'
import { SampleSphere } from './objects/SampleSphere.tsx'
import CharacterController from './player/CharacterController.tsx'
import Tractor from './vehicle/Vehicle.tsx'

const Experience = () => {
  return (
    <>
      {/* LIGHTS */}
      <ambientLight intensity={1} />

      {/* CHARACTER */}
      <Tractor />

      {/* STAGE */}
      <Ground />
      <SampleSphere />
    </>
  )
}

export default Experience
