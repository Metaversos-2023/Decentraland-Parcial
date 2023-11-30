import { engine, Font, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEvents, pointerEventsSystem, Transform} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'


import { bounceScalingSystem, circularSystem } from './systems'
import { TextShape } from "@dcl/sdk/ecs"

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

  const welcome = engine.addEntity()
  Transform.create(welcome, {
    position: Vector3.create(15,4.55,1.7),
  })
  TextShape.create(welcome, {
    text: 'Welcome to the church, please go to the altair',
    textColor: Color4.create(0, 0, 0, 1)
  })
  let missionActive = false

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

  const sign = engine.addEntity()
  Transform.create(sign, {
    position: Vector3.create(15.25,3.2,31),
  })
  TextShape.create(sign, {
    text: '',
    textColor: Color4.create(0, 0, 0, 1),
    fontSize: 5
  })

  const altairPosition = Vector3.create(15.25,1.27,27.55)
  const altairScale = Vector3.create(.8,1.5,.8)

  const altair = engine.addEntity()
  Transform.create(altair,{
    position: altairPosition,
    scale: altairScale
  })
  MeshCollider.setBox(altair)

  const altair2 = engine.addEntity()
    Transform.create(altair2,{
      position: altairPosition,
      scale: Vector3.create(0,0,0)
    })
  MeshCollider.setBox(altair2)

  pointerEventsSystem.onPointerDown(
    {
      entity: altair,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Reveal quest', maxDistance: 4},
    },
    function () {
      missionActive = true
      const mutableText = TextShape.getMutable(sign)
      mutableText.text = 'Find the bible. \nFor hints, look in the fountain'
      const mutableWelcome = TextShape.getMutable(welcome)
      mutableWelcome.text = ''
      const t = Transform.getMutable(altair)
      t.scale = Vector3.create(0,0,0)
      const t2 = Transform.getMutable(altair2)
      t2.scale = altairScale
      const x = Transform.getMutable(angel)
      x.scale = Vector3.create(1,1,1)
      const y = Transform.getMutable(angel_collider)
      y.scale = Vector3.create(2.4,2,1)
    }
  )

  const hint = engine.addEntity()
  Transform.create(hint, {
    position: Vector3.create(21.6,0.95,5.1),
    rotation: Quaternion.create(1,0,0)
  })
  TextShape.create(hint, {
    text: '',
    fontSize: 0.5
  })

  const fountain = engine.addEntity()
  Transform.create(fountain,{
    position: Vector3.create(21.6,0,5.1),
    scale: Vector3.create(.8,2,.8)
  })
  MeshCollider.setCylinder(fountain)

  pointerEventsSystem.onPointerDown(
    {
      entity: fountain,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Reveal hint', maxDistance: 4},
    },
    function () {
      const mutableText = TextShape.getMutable(hint)
      if(missionActive == true){
        if(bibleGrabbed == false){
          mutableText.text = 'Look in the Heavens\nFind the angel'
        }else if(demonAwake == false){
          mutableText.text = 'Evil lurks in the shadows\nFind the devil'
        }else{
          mutableText.text = 'Nowhere is safe, nor inside, \nnor outside, nor the heavens'
        }
      }else{
        mutableText.text = 'Nothing to show'
      }
      
    }
  )

  const angel = engine.addEntity()
  GltfContainer.create(angel, {
    src: 'Modelos/Angel.glb'
  })
  Transform.create(angel, {
    position: Vector3.create(2.5,1.2,4),
    scale: Vector3.create(0,0,0)
  });

  const angel_collider = engine.addEntity()
  Transform.create(angel_collider, {
    position: Vector3.create(2,1,30.5),
    scale: Vector3.create(0,0,0),
  });
  MeshCollider.setBox(angel_collider)

  let currentCloudPosition = Vector3.create(2.5,1.2,4)
  let currentColliderPosition = Vector3.create(2,0,29)
  pointerEventsSystem.onPointerDown(
    {
      entity: angel_collider,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Create steps for Heaven', maxDistance: 5},
    },
    function () {
      const step = engine.addEntity()
      GltfContainer.create(step, {
        src: 'Modelos/Cloud.glb'
      })
      const newCloudPosition = Vector3.create(currentCloudPosition.x,currentCloudPosition.y+1,currentCloudPosition.z-1)
      Transform.create(step, {
        position: newCloudPosition,
      })
      currentCloudPosition = newCloudPosition

      const cloud_collider = engine.addEntity()
      const newColliderPosition = Vector3.create(currentColliderPosition.x,currentColliderPosition.y+1,currentColliderPosition.z-1)
      Transform.create(cloud_collider, {
        position: newColliderPosition,
        scale: Vector3.create(3.4,1,1),
      });
      MeshCollider.setBox(cloud_collider)
      currentColliderPosition = newColliderPosition
    }
  )

  const bible = engine.addEntity()
  GltfContainer.create(bible, {
    src: 'Modelos/Bible.glb'
  })
  Transform.create(bible, {
    position: Vector3.create(14,8.5,2),
  });
  const bible_colider = engine.addEntity()
  GltfContainer.create(bible_colider, {
    src: 'Modelos/Bible_collider.glb'
  })
  Transform.create(bible_colider, {
    position: Vector3.create(14,8.5,2),
  });
  let bibleGrabbed = false
  
  const congratulations1 = engine.addEntity()
  Transform.create(congratulations1, {
    position: Vector3.create(15,14.5,20),
    rotation: Quaternion.create(0,180,0)
  })
  TextShape.create(congratulations1, {
    text: '',
    fontSize: 0.5,
    textColor: Color4.create(1, 0.843, 0, 1),
    font: Font.F_SANS_SERIF,
  })

  const altair3 = engine.addEntity()
  Transform.create(altair3,{
    position: altairPosition,
    scale: Vector3.create(0,0,0)
  })
  MeshCollider.setBox(altair3)

  const altair4 = engine.addEntity()
  Transform.create(altair4,{
    position: altairPosition,
    scale: Vector3.create(0,0,0)
  })
  MeshCollider.setBox(altair4)

  pointerEventsSystem.onPointerDown(
    {
      entity: bible_colider,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Send it to altar', maxDistance: 4},
    },
    function () {
        const t = Transform.getMutable(bible)
        const m = Transform.getMutable(bible_colider)
        t.position.x = 14.25
        t.position.y = -4
        t.position.z = 9.75
        m.scale = Vector3.create(0,0,0)
        bibleGrabbed = true
        missionActive = false
        const d = TextShape.getMutable(congratulations1)
        d.text = 'Well done, now return to the altair'
        const v = TextShape.getMutable(sign)
        v.text = 'Time to claim your reward'
        const c = TextShape.getMutable(hint)
        c.text = ''
        const x = Transform.getMutable(altair2)
        x.scale = Vector3.create(0,0,0)
        const y = Transform.getMutable(altair3)
        y.scale = altairScale
    }
  )

  const devil = engine.addEntity()
  GltfContainer.create(devil, {
    src: 'Modelos/Devil.glb'
  })
  Transform.create(devil, {
    position: Vector3.create(5.25,1,2),
    scale: Vector3.create(0,0,0)
  });

  const devil_collider = engine.addEntity()
  Transform.create(devil_collider, {
    position: Vector3.create(29,1,28.5),
    scale: Vector3.create(0,0,0),
  });
  MeshCollider.setBox(devil_collider)
  let demonAwake = false

  const devil_collider2 = engine.addEntity()
    Transform.create(devil_collider2, {
      position: Vector3.create(29,1,28.5),
      scale: Vector3.create(0,0,0),
  
    });
  MeshCollider.setBox(devil_collider2)

  const devil_collider3 = engine.addEntity()
    Transform.create(devil_collider3, {
      position: Vector3.create(29,1,28.5),
      scale: Vector3.create(0,0,0),
  
    });
  MeshCollider.setBox(devil_collider3)

  pointerEventsSystem.onPointerDown(
    {
      entity: altair3,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Claim Reward', maxDistance: 4},
    },
    function () {
        const x = Transform.getMutable(altair3)
        x.scale = Vector3.create(0,0,0)
        const y = Transform.getMutable(altair4)
        y.scale = altairScale
        missionActive = true
        const d = TextShape.getMutable(congratulations1)
        d.text = ''
        const v = TextShape.getMutable(sign)
        v.text = "Something's wrong.\nAn evil entity is around us.\nFind it"
        const c = TextShape.getMutable(hint)
        c.text = ''
        const x1 = Transform.getMutable(devil_collider)
        x1.scale = Vector3.create(1.25,2,1)
        const y1 = Transform.getMutable(devil)
        y1.scale = Vector3.create(1,1,1)
    }
  )

  const warning = engine.addEntity()
  Transform.create(warning, {
    position: Vector3.create(26.25,5,28),
    rotation: Quaternion.create(0,-1,0)
  })
  TextShape.create(warning, {
    text: '',
    fontSize: 8,
    textColor: Color4.create(1, 0, 0, 1),
    font: Font.F_SANS_SERIF,
  })
  let amount = 0

  pointerEventsSystem.onPointerDown(
    {
      entity: devil_collider,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Reveal Mystery', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(devil_collider)
      x.scale = Vector3.create(0,0,0)
      const y = Transform.getMutable(devil_collider2)
      y.scale = Vector3.create(1.25,2,1)
      demonAwake = true
      const d = TextShape.getMutable(warning)
      d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      const v = TextShape.getMutable(sign)
      v.text = ""
      const c = TextShape.getMutable(hint)
      c.text = ''
      const x1 = Transform.getMutable(crusifix1)
      x1.scale = Vector3.create(1,1,1)
      const y1 = Transform.getMutable(crusifixCollider1)
      y1.scale = Vector3.create(1,1,1)
      const x2 = Transform.getMutable(crusifix2)
      x2.scale = Vector3.create(1,1,1)
      const y2 = Transform.getMutable(crusifixCollider2)
      y2.scale = Vector3.create(1,1,1)
      const x3 = Transform.getMutable(crusifix3)
      x3.scale = Vector3.create(1,1,1)
      const y3 = Transform.getMutable(crusifixCollider3)
      y3.scale = Vector3.create(1,1,1)
      const x4 = Transform.getMutable(crusifix4)
      x4.scale = Vector3.create(1,1,1)
      const y4 = Transform.getMutable(crusifixCollider4)
      y4.scale = Vector3.create(1,1,1)
      const x5 = Transform.getMutable(crusifix5)
      x5.scale = Vector3.create(1,1,1)
      const y5 = Transform.getMutable(crusifixCollider5)
      y5.scale = Vector3.create(1,1,1)
    }
  )

  const crusifix1 = engine.addEntity()
  GltfContainer.create(crusifix1, {
    src: 'Modelos/Crusifix.glb'
  })
  Transform.create(crusifix1, {
    position: Vector3.create(4,-5,-15),
    scale: Vector3.create(0,0,0)
  });
  const crusifixCollider1 = engine.addEntity()
  GltfContainer.create(crusifixCollider1, {
    src: 'Modelos/Crusifix_collider.glb'
  })
  Transform.create(crusifixCollider1, {
    position: Vector3.create(4,-5,-15),
    scale: Vector3.create(0,0,0)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: crusifixCollider1,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Grab', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(crusifixCollider1)
      x.scale = Vector3.create(0,0,0)
      const crusifixCollider = engine.addEntity()
      GltfContainer.create(crusifixCollider, {
        src: 'Modelos/Crusifix_collider.glb'
      })
      Transform.create(crusifixCollider, {
        position: Vector3.create(28,-5,12)
      });
      const y = Transform.getMutable(crusifix1)
      y.position = Vector3.create(28,-5,12)
      amount = amount + 1
      const d = TextShape.getMutable(warning)
      if(amount == 5){
        d.text = `Well done,\n now exorcise it.`
        missionActive=false
        const v = Transform.getMutable(devil_collider2)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(devil_collider3)
        c.scale = Vector3.create(1.25,2,1)
      }else{
        d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      }
    }
  )

  const crusifix2 = engine.addEntity()
  GltfContainer.create(crusifix2, {
    src: 'Modelos/Crusifix.glb'
  })
  Transform.create(crusifix2, {
    position: Vector3.create(14,8.5,2),
    scale: Vector3.create(0,0,0)
  });
  const crusifixCollider2 = engine.addEntity()
  GltfContainer.create(crusifixCollider2, {
    src: 'Modelos/Crusifix_collider.glb'
  })
  Transform.create(crusifixCollider2, {
    position: Vector3.create(14,8.5,2),
    scale: Vector3.create(0,0,0)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: crusifixCollider2,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Grab', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(crusifixCollider2)
      x.scale = Vector3.create(0,0,0)
      const crusifixCollider = engine.addEntity()
      GltfContainer.create(crusifixCollider, {
        src: 'Modelos/Crusifix_collider.glb'
      })
      Transform.create(crusifixCollider, {
        position: Vector3.create(26,-5,11)
      });
      const y = Transform.getMutable(crusifix2)
      y.position = Vector3.create(26,-5,11)
      amount = amount + 1
      const d = TextShape.getMutable(warning)
      if(amount == 5){
        d.text = `Well done,\n now exorcise it.`
        missionActive=false
        const v = Transform.getMutable(devil_collider2)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(devil_collider3)
        c.scale = Vector3.create(1.25,2,1)
      }else{
        d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      }
    }
  )

  const crusifix3 = engine.addEntity()
  GltfContainer.create(crusifix3, {
    src: 'Modelos/Crusifix.glb'
  })
  Transform.create(crusifix3, {
    position: Vector3.create(14.25,-4.75,10.25),
    scale: Vector3.create(0,0,0)
  });
  const crusifixCollider3 = engine.addEntity()
  GltfContainer.create(crusifixCollider3, {
    src: 'Modelos/Crusifix_collider.glb'
  })
  Transform.create(crusifixCollider3, {
    position: Vector3.create(14.25,-4.75,10.25),
    scale: Vector3.create(0,0,0)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: crusifixCollider3,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Grab', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(crusifixCollider3)
      x.scale = Vector3.create(0,0,0)
      const crusifixCollider = engine.addEntity()
      GltfContainer.create(crusifixCollider, {
        src: 'Modelos/Crusifix_collider.glb'
      })
      Transform.create(crusifixCollider, {
        position: Vector3.create(30,-5,11)
      });
      const y = Transform.getMutable(crusifix3)
      y.position = Vector3.create(30,-5,11)
      amount = amount + 1
      const d = TextShape.getMutable(warning)
      if(amount == 5){
        d.text = `Well done,\n now exorcise it.`
        missionActive=false
        const v = Transform.getMutable(devil_collider2)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(devil_collider3)
        c.scale = Vector3.create(1.25,2,1)
      }else{
        d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      }
    }
  )

  const crusifix4 = engine.addEntity()
  GltfContainer.create(crusifix4, {
    src: 'Modelos/Crusifix.glb'
  })
  Transform.create(crusifix4, {
    position: Vector3.create(1,-5,13.5),
    scale: Vector3.create(0,0,0)
  });
  const crusifixCollider4 = engine.addEntity()
  GltfContainer.create(crusifixCollider4, {
    src: 'Modelos/Crusifix_collider.glb'
  })
  Transform.create(crusifixCollider4, {
    position: Vector3.create(1,-5,13.5),
    scale: Vector3.create(0,0,0)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: crusifixCollider4,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Grab', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(crusifixCollider4)
      x.scale = Vector3.create(0,0,0)
      const crusifixCollider = engine.addEntity()
      GltfContainer.create(crusifixCollider, {
        src: 'Modelos/Crusifix_collider.glb'
      })
      Transform.create(crusifixCollider, {
        position: Vector3.create(29,-5,10),
      });
      const y = Transform.getMutable(crusifix4)
      y.position = Vector3.create(29,-5,10)
      amount = amount + 1
      const d = TextShape.getMutable(warning)
      if(amount == 5){
        d.text = `Well done,\n now exorcise it.`
        missionActive=false
        const v = Transform.getMutable(devil_collider2)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(devil_collider3)
        c.scale = Vector3.create(1.25,2,1)
      }else{
        d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      }
    }
  )

  const crusifix5 = engine.addEntity()
  GltfContainer.create(crusifix5, {
    src: 'Modelos/Crusifix.glb'
  })
  Transform.create(crusifix5, {
    position: Vector3.create(20,-5,-2),
    scale: Vector3.create(0,0,0)
  });
  const crusifixCollider5 = engine.addEntity()
  GltfContainer.create(crusifixCollider5, {
    src: 'Modelos/Crusifix_collider.glb'
  })
  Transform.create(crusifixCollider5, {
    position: Vector3.create(20,-5,-2),
    scale: Vector3.create(0,0,0)
  });
  pointerEventsSystem.onPointerDown(
    {
      entity: crusifixCollider5,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Grab', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(crusifixCollider5)
      x.scale = Vector3.create(0,0,0)
      const crusifixCollider = engine.addEntity()
      GltfContainer.create(crusifixCollider, {
        src: 'Modelos/Crusifix_collider.glb'
      })
      Transform.create(crusifixCollider, {
        position: Vector3.create(27,-5,10),
      });
      const y = Transform.getMutable(crusifix5)
      y.position = Vector3.create(27,-5,10)
      amount = amount + 1
      const d = TextShape.getMutable(warning)
      if(amount == 5){
        d.text = `Well done,\n now exorcise it.`
        missionActive=false
        const v = Transform.getMutable(devil_collider2)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(devil_collider3)
        c.scale = Vector3.create(1.25,2,1)
      }else{
        d.text = `Find the \ncrusifixes to \nend this.\n ${amount}/5 Found`
      }
    }
  )

  const altair5 = engine.addEntity()
  Transform.create(altair5,{
    position: altairPosition,
    scale: Vector3.create(0,0,0)
  })
  MeshCollider.setBox(altair5)

  pointerEventsSystem.onPointerDown(
    {
      entity: devil_collider3,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Exorcise', maxDistance: 4},
    },
    function () {
      const x = Transform.getMutable(devil_collider3)
      x.scale = Vector3.create(0,0,0)
      const y = Transform.getMutable(devil)
      y.scale = Vector3.create(0,0,0)
      const d = TextShape.getMutable(warning)
      d.text = `Excellent,\n go claim \n your prize.`
        missionActive=false
        const v = Transform.getMutable(altair4)
        v.scale = Vector3.create(0,0,0)
        const c = Transform.getMutable(altair5)
        c.scale = altairScale
    }
  )

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
    scale: Vector3.create(1,1,1.007)
  });
}

/*// Define a System
function rotationSystem(dt: number) {

  // query for entities that include both MeshRenderer and Transform components	
  for (const [entity] of engine.getEntitiesWith(MeshRenderer, Transform)) {
    const transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(dt * 10, Vector3.Up()))
  }
}

// Add the system to the engine
engine.addSystem(rotationSystem)
*/

function PutFountain() {
  const fountain = engine.addEntity();
  GltfContainer.create(fountain, {
    src: 'Modelos/Fountain.glb'
  })
  Transform.create(fountain, {
    position: Vector3.create(15,0,20),
  });
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
