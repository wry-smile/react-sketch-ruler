import { useState } from 'react'
import CanvasRuler from './CanvasRuler/index'
import Line from './Line'
import type { RulerWrapperProps } from './types/index'

const RulerWrapper = (props: RulerWrapperProps) => {
  const [isDraggingLine, setIsDraggingLine] = useState(false)

  const [showIndicator, setShowIndicator] = useState(false)

  const [value, setValue] = useState(0)

  const handleIndicatorShow = (value: number) => !isDraggingLine && (setShowIndicator(true), setValue(value))

  const handleIndicatorMove = (value: number) => showIndicator && setValue(value)

  const handleIndicatorHide = () => setShowIndicator(false)

  const handleNewLine = (value: number) => {
    const { vertical, lines, onLineChange, handleShowReferLine, isShowReferLine } = props
    lines.push(value)
    onLineChange(lines, vertical)
    !isShowReferLine && handleShowReferLine()
  }

  const handleLineDown = () => setIsDraggingLine(true)

  const handleLineRemove = (index: number) => {
    const { vertical, lines, onLineChange } = props
    lines.splice(index, 1)
    onLineChange(lines, vertical)
  }

  const handleLineRelease = (value: number, index: number) => {
    setIsDraggingLine(false)
    // 左右或上下超出时, 删除该条对齐线
    const { vertical, start, scale, width, height } = props
    const offset = value - start
    const maxOffset = (vertical ? height : width) / scale

    if (offset < 0 || offset > maxOffset) {
      handleLineRemove(index)
    }
    else {
      const { lines, onLineChange } = props
      lines[index] = value
      onLineChange(lines, vertical)
    }
  }

  const onHandleShowRightMenu = (left: number, top: number) => {
    const { onShowRightMenu, vertical } = props
    onShowRightMenu(left, top, vertical)
  }

  const render = () => {
    const { vertical, scale, width, height, start, selectStart, selectLength, lines, canvasConfigs, isShowReferLine } = props
    const className = vertical ? 'v-container' : 'h-container'

    const indicatorOffset = (value - start) * scale
    const indicatorStyle = vertical ? { top: indicatorOffset } : { left: indicatorOffset }

    return <div className={className} >
      <CanvasRuler
        vertical={vertical}
        scale={scale}
        width={width}
        height={height}
        start={start}
        selectStart={selectStart}
        selectLength={selectLength}
        canvasConfigs={canvasConfigs}
        onAddLine={handleNewLine}
        onIndicatorShow={handleIndicatorShow}
        onIndicatorMove={handleIndicatorMove}
        onIndicatorHide={handleIndicatorHide}
        onHandleShowRightMenu={onHandleShowRightMenu}
      />
      {
        isShowReferLine
        && <div className="lines">
          {
            lines.map((v, i) =>
              <Line
                key={v + i}
                index={i}
                value={v >> 0}
                scale={scale}
                start={start}
                vertical={vertical}
                onRemove={handleLineRemove}
                onMouseDown={handleLineDown}
                onRelease={handleLineRelease}
              />,
            )
          }
        </div>
      }
      {
        showIndicator
        && <div className="indicator" style={indicatorStyle}>
          <span className="value">{value}</span>
        </div>
      }
    </div>
  }

  return render()
}

export default RulerWrapper
