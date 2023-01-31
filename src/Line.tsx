import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import type { LineProps } from './types/index'

const Line = (props: LineProps) => {
  const [value, setValue] = useState(props.value)

  const handleDown: MouseEventHandler<HTMLDivElement> = (event) => {
    const { vertical, index, scale, onMouseDown, onRelease } = props

    const startD = vertical ? event.clientY : event.clientX

    onMouseDown()

    const onMove = (event: MouseEvent) => {
      const currentD = vertical ? event.clientY : event.clientX
      const newValue = Math.round(value + (currentD - startD) / scale)
      setValue(newValue)
    }

    const onEnd = () => {
      onRelease(value, index)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
  }

  const handleRemove = () => {
    const { index, onRemove } = props
    onRemove(index)
  }

  const render = () => {
    const { vertical, start, scale } = props
    const offset = (value - start) * scale
    if (offset < 0) return null

    const lineStyle = vertical ? { top: offset } : { left: offset }

    return <div className="line" style={lineStyle} onMouseDown={handleDown}>
      <div className="action">
        <span className="del" onClick={handleRemove}>&times;</span>
        <span className="value" >{value}</span>
      </div>
    </div>
  }

  return render()
}

export default Line
