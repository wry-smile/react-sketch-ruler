import type { MouseEventHandler } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import type { CanvasRulerProps, RulerOptions } from '../types/index'
import { drawHorizontalRuler, drawVerticalRuler } from './utils'

const getValueByOffset = (offset: number, start: number, scale: number) => Math.round(start + offset / scale)

const CanvasRuler = (props: CanvasRulerProps) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)

  const [canvasContext, setCanvasContext] = useState<Nullable<CanvasRenderingContext2D>>()

  const updateCanvasContext = () => {
    const { width, height, canvasConfigs } = props
    const { ratio } = canvasConfigs

    // 比例宽高
    canvasEl.current!.width = width * ratio
    canvasEl.current!.height = height * ratio

    const ctx = canvasEl.current!.getContext('2d')!
    ctx.font = `${12 * ratio}px -apple-system, "Helvetica Neue", ".SFNSText-Regular", "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
    ctx.lineWidth = 1
    ctx.textBaseline = 'middle'
  }

  const drawRuler = () => {
    const { start, scale, width, height, selectStart, selectLength, canvasConfigs, vertical } = props
    const options: RulerOptions = { scale, width, height, canvasConfigs }
    if (vertical)
      drawVerticalRuler(canvasContext!, start, { y: selectStart, height: selectLength }, options)
    else
      drawHorizontalRuler(canvasContext!, start, { x: selectStart, width: selectLength }, options)
  }

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { vertical, scale, start, onAddLine } = props
    const offset = vertical ? event.nativeEvent.offsetY : event.nativeEvent.offsetX
    onAddLine(getValueByOffset(offset, start, scale))
  }

  const handleEnter: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { vertical, scale, start, onIndicatorShow } = props
    const offset = vertical ? event.nativeEvent.offsetY : event.nativeEvent.offsetX
    onIndicatorShow(getValueByOffset(offset, start, scale))
  }

  const handleRightMenu: MouseEventHandler<HTMLCanvasElement> = (event) => {
    event.stopPropagation()
    if (event.button === 2) {
      const { onHandleShowRightMenu } = props
      const clickLeft = event.clientX
      const clickTop = event.clientY
      onHandleShowRightMenu(clickLeft, clickTop)
    }
  }

  const handleMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { vertical, scale, start, onIndicatorMove } = props
    const offset = vertical ? event.nativeEvent.offsetY : event.nativeEvent.offsetX
    onIndicatorMove(getValueByOffset(offset, start, scale))
  }

  const handleLeave = () => {
    props.onIndicatorHide()
  }

  useEffect(() => {
    setCanvasContext(canvasEl.current?.getContext('2d'))
    updateCanvasContext()
    drawRuler()
  }, [])

  useEffect(() => {
    updateCanvasContext()
  }, [props.width, props.height])

  useEffect(() => {
    drawRuler()
  })

  return <canvas className="ruler"
    ref={canvasEl}
    onClick={handleClick}
    onMouseEnter={handleEnter}
    onMouseDown={handleRightMenu}
    onMouseMove={handleMove}
    onMouseLeave={handleLeave}
  ></canvas>
}

export default memo(CanvasRuler)
