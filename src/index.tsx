import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import type { CanvasConfigs, MenuColorProfile, RulerWrapperProps, SketchRuleProps } from './types/index'
import { StyledRuler } from './styles'
import RulerWrapper from './RulerWrapper'
import RulerContextMenu from './RulerContextMenu'

const DEFAULT_MENU = {
  bgColor: '#fff',
  dividerColor: '#DBDBDB',
  listItem: {
    textColor: '#415058',
    hoverTextColor: '#298DF8',
    disabledTextColor: 'rgba(65, 80, 88, 0.4)',
    bgColor: '#fff',
    hoverBgColor: '#F2F2F2',
  },
}

const SKETCH_RULE_DEFAULT_PROPS: Partial<SketchRuleProps> = {
  isOpenMenuFeature: false,
  isShowReferLine: true,
  handleShowRuler: () => { },
  handleShowReferLine: () => { },
  thick: 16,
  horLineArr: [100, 200],
  verLineArr: [100, 200],
  scale: 1,
  startX: 0,
  startY: 0,
  ratio: window.devicePixelRatio || 1,
  shadow: {
    x: 200,
    y: 100,
    width: 200,
    height: 400,
  },
  lang: 'zh-CN',
  palette: {
    bgColor: 'rgba(225,225,225, 0)',
    // ruler longer mark color
    longFGColor: '#BABBBC',
    // ruler shorter mark color
    shortFGColor: '#C8CDD0',
    // ruler font color
    fontColor: '#7D8694',
    // ruler shadow color
    shadowColor: '#E8E8E8',
    lineColor: '#EB5648',
    borderColor: '#DADADC',
    cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
    menu: DEFAULT_MENU,
  },
}

const SketchRule = (props: Partial<SketchRuleProps>) => {
  props = { ...SKETCH_RULE_DEFAULT_PROPS, ...props }
  const [canvasConfigs] = useState<CanvasConfigs>(() => {
    const { ratio, palette } = props
    const { bgColor, longFGColor, shortFGColor, fontColor, shadowColor, lineColor, borderColor, cornerActiveColor } = palette!
    return {
      ratio,
      bgColor,
      longFGColor,
      shortFGColor,
      shadowColor,
      fontColor,
      lineColor,
      borderColor,
      cornerActiveColor,
    } as CanvasConfigs
  })

  const [menuConfigs] = useState<MenuColorProfile>(() => {
    const { palette } = props
    const { menu = DEFAULT_MENU } = palette!
    const { bgColor, dividerColor, listItem = DEFAULT_MENU.listItem } = menu
    return { bgColor, dividerColor, listItem }
  })

  const [isShowMenu, setIsShowMenu] = useState(false)

  const [vertical, setVertical] = useState(false)

  const [positionRecord, setPositionRecord] = useState({ x: 0, y: 0 })

  const onHandleCloseMenu = () => setIsShowMenu(false)

  const onShowRightMenu = (left: number, top: number, vertical: boolean) => {
    setIsShowMenu(true)
    setVertical(vertical)
    setPositionRecord({ x: left, y: top })
  }

  const handleLineChange = (arr: number[], vertical: boolean) => {
    const { horLineArr, verLineArr, handleLine } = props
    const newLines = vertical
      ? { h: horLineArr, v: [...arr] }
      : { h: [...arr], v: verLineArr }
    handleLine && handleLine(newLines)
  }

  const handleStyleRulerContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
  }

  const render = () => {
    const { scale, isShowReferLine, thick, width, height, startX, startY, horLineArr, shadow, lang, verLineArr, cornerActive, isOpenMenuFeature, palette: { bgColor } = {}, onCornerClick, handleShowRuler, handleLine, handleShowReferLine } = props

    const commonProps = {
      scale,
      canvasConfigs,
      onLineChange: handleLineChange,
      onShowRightMenu,
      isShowReferLine,
      handleShowReferLine,
    } as RulerWrapperProps

    const { x, y, width: w, height: h } = shadow!

    const menuPosition = {
      left: positionRecord.x,
      top: positionRecord.y,
    }

    return <StyledRuler id="mb-ruler" className="mb-ruler" isShowReferLine={isShowReferLine!} thick={thick!} {...canvasConfigs}
      onContextMenu={handleStyleRulerContextMenu}>
      {/* 水平方向 */}
      <RulerWrapper {...commonProps} width={width!} height={thick!} start={startX!} lines={horLineArr!} selectStart={x!} selectLength={w!} />
      {/* 竖直方向 */}
      <RulerWrapper {...commonProps} width={thick!} height={height!} start={startY!} lines={verLineArr!} selectStart={y!} selectLength={h!} vertical />
      <a className={`corner${cornerActive ? ' active' : ''}`} style={{ backgroundColor: bgColor }} onClick={onCornerClick} />
      {isOpenMenuFeature && isShowMenu
        && <RulerContextMenu
          key={String(menuPosition.left) + String(menuPosition.top)}
          lang={lang!}
          vertical={vertical}
          handleLine={handleLine!}
          horLineArr={horLineArr!}
          verLineArr={verLineArr!}
          menuPosition={menuPosition}
          handleShowRuler={handleShowRuler!}
          isShowReferLine={isShowReferLine!}
          handleShowReferLine={handleShowReferLine!}
          onCloseMenu={onHandleCloseMenu}
          menuConfigs={menuConfigs}
        />
      }
    </StyledRuler>
  }
  return render()
}

export { SketchRule }
export { CanvasConfigs, CanvasRulerProps, SketchRuleProps, MenuColorProfile, PaletteColorProfile, Shadow } from './types'
