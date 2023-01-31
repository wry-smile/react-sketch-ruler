export interface CanvasRulerProps {
  vertical: boolean
  start: number
  scale: number
  width: number
  height: number
  canvasConfigs: CanvasConfigs
  selectStart: number
  selectLength: number
  onAddLine: Fn
  onIndicatorShow: Fn
  onIndicatorMove: Fn
  onIndicatorHide: Fn
  onHandleShowRightMenu: Fn
}
export interface SketchRuleProps {
  scale: number
  ratio: number
  thick: number
  width: number
  height: number
  startX: number
  startY: number
  shadow: Shadow
  horLineArr: number[]
  verLineArr: number[]
  cornerActive: boolean
  lang: 'zh-CN' | 'en'
  isOpenMenuFeature: boolean
  palette: PaletteColorProfile
  isShowReferLine: boolean
  handleLine: Fn
  onCornerClick: Fn
  handleShowRuler: Fn
  handleShowReferLine: Fn
}

export interface LineProps {
  index: number
  start: number
  vertical: boolean
  scale: number
  value: number
  onRemove: Fn
  onMouseDown: Fn
  onRelease: Fn
}

export interface RulerContextMenuProps {
  vertical: boolean
  menuPosition: Record<'left' | 'top', number>
  isShowReferLine: boolean
  horLineArr: number[]
  verLineArr: number[]
  lang: 'zh-CN' | 'en'
  menuConfigs: MenuColorProfile
  handleShowRuler: Fn
  handleShowReferLine: Fn
  handleLine: Fn<[Record<'h' | 'v', number[]>]>
  onCloseMenu: Fn
}

export interface RulerWrapperProps {
  vertical: boolean
  scale: number
  width: number
  height: number
  start: number
  lines: number[]
  selectStart: number
  selectLength: number
  canvasConfigs: CanvasConfigs
  isShowReferLine: boolean
  onLineChange: Fn
  onShowRightMenu: Fn
  handleShowReferLine: Fn
}

export interface RulerOptions {
  scale: number
  width: number
  height: number
  canvasConfigs: CanvasConfigs
}

export interface CanvasConfigs {
  bgColor: string
  fontColor: string
  shadowColor: string
  ratio: number
  longFGColor: string
  shortFGColor: string
  lineColor: string
  borderColor: string
  cornerActiveColor: string
}

export interface Shadow {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface PaletteColorProfile {
  bgColor?: string
  longFGColor?: string
  shortFGColor?: string
  fontColor?: string
  shadowColor?: string
  lineColor?: string
  borderColor?: string
  cornerActiveColor?: string
  menu?: MenuColorProfile
}

export interface MenuColorProfile {
  bgColor?: string
  dividerColor?: string
  listItem?: {
    textColor?: string
    hoverTextColor?: string
    disabledTextColor?: string
    bgColor?: string
    hoverBgColor?: string
  }
}
