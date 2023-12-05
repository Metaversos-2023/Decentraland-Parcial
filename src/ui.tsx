import { engine, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { createCube } from './factory'

export function setupUi(task: string, poap: number) {
  ReactEcsRenderer.setUiRenderer(() => uiComponent(task, poap))
}

const uiComponent = (task: string, poap: number) => (
  <UiEntity
    uiTransform={{
      width: 300,
      height: poap > 0 ? 140 : 100,
      margin: '10px 0 8px 240px',
      padding: 4
    }}
    uiBackground={{ color: Color4.create(1.0, 1.0, 1.0, 0.4) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      uiBackground={{ color: Color4.fromHexString('#ffffff40') }}
    >
      <Label
        onMouseDown={() => {
          console.log('Player Position clicked !')
        }}
        value={'Task:'}
        fontSize={18}
        color={Color4.fromHexString('#000000')}
        uiTransform={{ width: '100%', height: 30 }}
      />
      <Label
        onMouseDown={() => {
          console.log('# Cubes clicked !')
        }}
        value={task}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 }}
      />
      {
        [
          <Label value="" />,
          <Button
            onMouseDown={() => {
              console.log('Button clicked !')
            }}
            value={'Claim Bible POAP: z0sdm6'}
            variant="secondary"
            fontSize={14}
            uiTransform={{ width: 200, height: 24, margin: 10 }}
          />,
          <Button
            onMouseDown={() => {
              console.log('Button clicked !')
            }}
            value={'Claim Complete POAP: qgajty'}
            variant="secondary"
            fontSize={14}
            uiTransform={{ width: 220, height: 24, margin: 10 }}
          />
        ][poap]
      }
    </UiEntity>
  </UiEntity>
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}
