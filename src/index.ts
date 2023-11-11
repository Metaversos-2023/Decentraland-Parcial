import { AvatarAnchorPointType, AvatarAttach, engine, Entity, GltfContainer, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, PBPointerEventsResult, PointerEvents, pointerEventsSystem, PointerEventType, Transform} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'


import { bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { BounceScaling, Spinner } from './components'
import { createCube } from './factory'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {

  PutChair(Vector3.create(6,0,0))
  PutChair(Vector3.create(6,0,2))
  PutChair(Vector3.create(6,0,4))
  PutChair(Vector3.create(6,0,6))
  PutChair(Vector3.create(6,0,8))
  PutChair(Vector3.create(6,0,10))
  PutChair(Vector3.create(6,0,12))

  PutChair(Vector3.create(16.37,0,0))
  PutChair(Vector3.create(16.37,0,2))
  PutChair(Vector3.create(16.37,0,4))
  PutChair(Vector3.create(16.37,0,6))
  PutChair(Vector3.create(16.37,0,8))
  PutChair(Vector3.create(16.37,0,10))
  PutChair(Vector3.create(16.37,0,12))

  PutAltair()

  PutFountain()

  PutChurch()

  PutRug()

  const leftDoor = engine.addEntity()
  GltfContainer.create(leftDoor, {
    src: 'Modelos/LeftDoor.glb'
  })
  Transform.create(leftDoor, {
    position: Vector3.create(15.05, 0, 20.1),
    scale: Vector3.create(0,0,0)
  })

  const closedLeftDoor = engine.addEntity()
  GltfContainer.create(closedLeftDoor, {
    src: 'Modelos/ClosedLeftDoor.glb'
  })
  Transform.create(closedLeftDoor, {
    position: Vector3.create(15, 0, 20),
  })
  
  const leftCollider = engine.addEntity()
  Transform.create(leftCollider, {
    position: Vector3.create(14.2, 0, 2.3),
    scale: Vector3.create(1.5, 7, .5)
  })
  MeshCollider.setBox(leftCollider)

  let leftOpen = false

  pointerEventsSystem.onPointerDown(
    {
      entity: leftCollider,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Press E to Open', maxDistance: 4},
    },
    function () {
      const t = Transform.getMutable(leftCollider)
      const m = Transform.getMutable(leftDoor)
      const n = Transform.getMutable(closedLeftDoor)
      const hoverFeedback = PointerEvents.getMutable(leftCollider)
      if(leftOpen){
        t.position.x = 14.2
        t.position.z = 2.3
        t.rotation.y = 0
        m.scale = Vector3.create(0,0,0)
        n.scale = Vector3.create(1,1,1)
        leftOpen = false
        if (hoverFeedback.pointerEvents[0].eventInfo){
          hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Press E to Open'
        }
      }else{
        t.position.x = 13.8
        t.position.z = 1.7
        t.rotation.y = 2
        m.scale = Vector3.create(1,1,1)
        n.scale = Vector3.create(0,0,0)
        leftOpen = true
        if (hoverFeedback.pointerEvents[0].eventInfo){
          hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Press E to Close'
        }
      }
    }
  )

  const rightDoor = engine.addEntity()
  GltfContainer.create(rightDoor, {
    src: 'Modelos/RightDoor.glb'
  })
  Transform.create(rightDoor, {
    position: Vector3.create(15, 0, 20.1),
    scale: Vector3.create(0,0,0)
  })

  const closedRightDoor = engine.addEntity()
  GltfContainer.create(closedRightDoor, {
    src: 'Modelos/ClosedRightDoor.glb'
  })
  Transform.create(closedRightDoor, {
    position: Vector3.create(15, 0, 20),
  })
  
  const rightCollider = engine.addEntity()
  Transform.create(rightCollider, {
    position: Vector3.create(15.9, 0, 2.3),
    scale: Vector3.create(1.5, 7, .5)
  })
  MeshCollider.setBox(rightCollider)

  let rightOpen = false

  pointerEventsSystem.onPointerDown(
    {
      entity: rightCollider,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Press E to Open', maxDistance: 4},
    },
    function () {
      const t = Transform.getMutable(rightCollider)
      const m = Transform.getMutable(rightDoor)
      const n = Transform.getMutable(closedRightDoor)
      const hoverFeedback = PointerEvents.getMutable(rightCollider)
      if(rightOpen){
        t.position.x = 15.9
        t.position.z = 2.3
        t.rotation.y = 0
        m.scale = Vector3.create(0,0,0)
        n.scale = Vector3.create(1,1,1)
        rightOpen = false
        if (hoverFeedback.pointerEvents[0].eventInfo)
        hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Press E to Open'
      }else{
        t.position.x = 16.1
        t.position.z = 1.7
        t.rotation.y = -1.5
        m.scale = Vector3.create(1,1,1)
        n.scale = Vector3.create(0,0,0)
        rightOpen = true
        if (hoverFeedback.pointerEvents[0].eventInfo){
          hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Press E to Close'
        }
      }

    }
  )

  const stepGenerator = createCube(2, 1, 30, true)
  let currentPosition = Vector3.create(2,1,30)
  pointerEventsSystem.onPointerDown(
    {
      entity: stepGenerator,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Press E to create steps'},
    },
    function () {
      const step = engine.addEntity()
      const newPosition = Vector3.create(currentPosition.x,currentPosition.y+1,currentPosition.z-1)
      Transform.create(step, {
        position: newPosition,
        scale: Vector3.create(2.5,1,1)
      })
      MeshRenderer.setBox(step)
      MeshCollider.setBox(step)
      currentPosition = newPosition
    }
  )

  const bible = engine.addEntity()
  Transform.create(bible, {
    position: Vector3.create(15, 14, 15),
    scale: Vector3.create(.25, .4, .15)
  })
  MeshRenderer.setBox(bible)
  MeshCollider.setBox(bible)
  let bibleGrabbed = false
  
  const altair = engine.addEntity()
  Transform.create(altair,{
    position: Vector3.create(15.25,1.27,27.55),
    scale: Vector3.create(.8,1.5,.8)
  })
  MeshCollider.setBox(altair)

  pointerEventsSystem.onPointerDown(
    {
      entity: bible,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Send it to altar'},
    },
    function () {
      if(!bibleGrabbed){
        const t = Transform.getMutable(bible)
        const m = Transform.getMutable(altair)
        t.position.x = m.position.x
        t.position.y = m.position.y + 1
        t.position.z = m.position.z
        bibleGrabbed = true
      }
    }
  )
  
  // Create an entity
	const cube = engine.addEntity()

	// Give the entity a position via a transform component
	Transform.create(cube, {
		position: Vector3.create(5, 1, 5)
	})

	// Give the entity a visible shape via a MeshRenderer component
	MeshRenderer.setBox(cube)
}

function PutChair(newPosition: Vector3) {
  const seats = engine.addEntity();
  GltfContainer.create(seats, {
    src: 'Modelos/Seats.glb'
  })
  Transform.create(seats, {
    position: newPosition,
  });
  const pillow = engine.addEntity()
  const back = engine.addEntity()
  Transform.create(pillow,{
    position: Vector3.create(newPosition.x + 4.3, newPosition.y, newPosition.z + 8.7),
    scale: Vector3.create(5.2,1.44,.8)
  })
  Transform.create(back,{
    position: Vector3.create(newPosition.x + 4.3, newPosition.y, newPosition.z + 8.35),
    scale: Vector3.create(5.2,2.6,.2)
  })
  MeshCollider.setBox(pillow)
  MeshCollider.setBox(back)
}

function PutAltair(){
  const altar = engine.addEntity();
  GltfContainer.create(altar, {
    src: 'Modelos/Altar.glb'
  })
  Transform.create(altar, {
    position: Vector3.create(15.27,0,12),
  });

  const altar_collider = engine.addEntity();
  GltfContainer.create(altar_collider, {
    src: 'Modelos/Altair_collider.glb'
  })
  Transform.create(altar_collider, {
    position: Vector3.create(15.27,0,12),
  });
}

// Define a System
function rotationSystem(dt: number) {

  // query for entities that include both MeshRenderer and Transform components	
  for (const [entity] of engine.getEntitiesWith(MeshRenderer, Transform)) {
    const transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(dt * 10, Vector3.Up()))
  }
}

// Add the system to the engine
engine.addSystem(rotationSystem)

function PutFountain() {
  const fountain = engine.addEntity();
  GltfContainer.create(fountain, {
    src: 'Modelos/Fountain.glb'
  })
  Transform.create(fountain, {
    position: Vector3.create(15,0,20),
  });

  const base = engine.addEntity()
  Transform.create(base,{
    position: Vector3.create(21.6,0,5.1),
    scale: Vector3.create(.8,2,.8)
  })
  MeshCollider.setCylinder(base)
}

function PutChurch() {
  const church = engine.addEntity();
  GltfContainer.create(church, {
    src: 'Modelos/Church.glb'
  })
  Transform.create(church, {
    position: Vector3.create(15,0,16.5),
    scale: Vector3.create(1,1,.8)
  });

  const south_1 = engine.addEntity()
  Transform.create(south_1,{
    position: Vector3.create(9,0,2.2),
    scale: Vector3.create(10,12,.2)
  })
  MeshCollider.setBox(south_1)

  const south_2 = engine.addEntity()
  Transform.create(south_2,{
    position: Vector3.create(21,0,2.2),
    scale: Vector3.create(10,12,.2)
  })
  MeshCollider.setBox(south_2)

  const south_3 = engine.addEntity()
  Transform.create(south_3,{
    position: Vector3.create(15,4.55,2.2),
    scale: Vector3.create(2,2,.2)
  })
  MeshCollider.setBox(south_3)

  const west = engine.addEntity()
  Transform.create(west,{
    position: Vector3.create(4.1,0,17.1),
    scale: Vector3.create(.3,19.5,29.6)
  })
  MeshCollider.setBox(west)

  const east = engine.addEntity()
  Transform.create(east,{
    position: Vector3.create(25.9,0,17.1),
    scale: Vector3.create(.3,19.5,29.6)
  })
  MeshCollider.setBox(east)

  const north = engine.addEntity()
  Transform.create(north,{
    position: Vector3.create(15,0,31.5),
    scale: Vector3.create(22,12,.5)
  })
  MeshCollider.setBox(north)

  const westRoof = engine.addEntity()
  Transform.create(westRoof,{
    position: Vector3.create(9.7,11.4,17.1),
    scale: Vector3.create(.3,12,29.6),
    rotation: Quaternion.create(0,0,1.3)
  })
  MeshCollider.setBox(westRoof)

  const eastRoof = engine.addEntity()
  Transform.create(eastRoof,{
    position: Vector3.create(20,11.4,17.1),
    scale: Vector3.create(.3,12,29.6),
    rotation: Quaternion.create(0,0,-1.3)
  })
  MeshCollider.setBox(eastRoof)
}

function PutRug() {
  const rug = engine.addEntity();
  GltfContainer.create(rug, {
    src: 'Modelos/Rug.glb'
  })
  Transform.create(rug, {
    position: Vector3.create(15,0,15),
    scale: Vector3.create(1,1,.8)
  });
}
