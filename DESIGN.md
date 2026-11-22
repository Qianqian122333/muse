# Muse Design System

设计文档，用于后续功能与界面改动时保持一致风格。  
**Source of truth：** `src/app/muse.css`（Muse UI tokens）、`src/app/globals.css`（shadcn 映射）、`src/app/layout.tsx`（字体加载）。

---

## 1. Product feel

Muse 是一个 **light-only、干净、偏工具感** 的灵感保存 / 画布原型。

| Do | Don’t |
|---|---|
| 白底、浅灰面、深灰字 | 深色主题 / 大面积暗色背景 |
| 黑白为主，绿色作点缀 | 紫色渐变、霓虹 glow、多色装饰 |
| 细边框 + 轻阴影 | 多层厚重阴影 |
| 圆角克制（8–14px），药丸仅用于芯片/开关 | 到处 `rounded-full` 大按钮堆叠 |
| 一个区域一件事 | 首屏塞满 stats / chips / 促销块 |
| 选中态用 **黑底白字** 分段控件 | 选中态乱用绿色大底 |

气质关键词：**quiet, editorial-tool, calm contrast**。

---

## 2. Color

### 2.1 Core tokens（`muse.css`）

| Token | Hex | 用途 |
|---|---|---|
| `--bg` | `#FFFFFF` | 页面背景 |
| `--surface` | `#F7F7F7` | 面板、浮层、次级底 |
| `--ink` | `#282828` | 主文字、主控件、选中底 |
| `--muted` | `#7A7A7A` | 次要文字、占位、图标默认色 |
| `--line` | `#E8E8E8` | 边框、分割线 |
| `--chip` | `#EEEEEE` | 芯片底、hover 浅底 |
| `--accent` | `#CBD77E` | 品牌绿：logo 圆点、主 CTA（`.btn.primary`）、焦点环、扩展角标 |
| `--accent-2` | `#E6CA9A` | 次强调（沙色）：`.btn.secondary` |
| `--on-accent` | `#282828` | 强调色上的文字 |
| `--note` | `#282828` | 笔记相关文字 / 边线（黑白） |
| `--note-bg` | `#F0F0F0` | 笔记块背景 |
| `--dot` | `#E0E0E0` | 画布点阵 |

**状态色（非 token，但固定使用）：**

| 用途 | 色值 |
|---|---|
| 未保存 / dirty | `#E8913A`（橙色文字，不用绿点） |
| Toast 成功标记 | `--accent` |
| Toast / 错误强调 | `#E8913A` |

### 2.2 Brand accent rules

- **绿色只做点缀**：logo 句点、少量 primary CTA、焦点 outline、选中 tag 高亮。
- **笔记 UI 必须黑白**：卡片 note、详情 `note-area`、「有笔记」圆点、图例 note 指示。不要用绿色笔记块。
- **分段选中态用黑白**：steps / browse-switch / 工具选中圆 = `--ink` 底 + `--bg` 字。

### 2.3 shadcn 映射（`globals.css`）

| shadcn | Muse |
|---|---|
| `--background` | `--bg` |
| `--foreground` | `--ink` |
| `--primary` / `--accent` | `#CBD77E` |
| `--secondary` | `#E6CA9A` |
| `--muted-foreground` | `#7A7A7A` |
| `--border` / `--input` | `#E8E8E8` |
| `--radius` | `0.625rem`（≈10px） |

新增组件优先复用 CSS 变量，避免硬编码新色。

---

## 3. Typography

### 3.1 Fonts

| Role | Family | 加载 |
|---|---|---|
| UI / body / display（当前统一） | **Inter** | `layout.tsx` → `--font-inter` |
| Fallback / shadcn sans | Geist | `--font-sans` |

CSS：

```css
--display: var(--font-inter), Inter, system-ui, …;
--body:    var(--font-inter), Inter, system-ui, …;
```

标题与正文目前同一字体家族；层级靠 **字号、字重 500、负字距** 区分，不要突然换衬线大标题（Capture 页模拟站点内容除外）。

### 3.2 Scale（常用）

| 用途 | Size | Weight | Tracking |
|---|---|---|---|
| Logo 词标 | 26px | 500 | -0.03em |
| Capture H1 / 空态标题 | 28–32px | 500 | -0.02～-0.03em |
| 搜索输入 | 22px（桌面）/ 16px（移动） | 450 | -0.02em |
| 面板 / 正文 | 13–14px | 400–500 | 默认 |
| 标签 / 辅助 | 11–12.5px | 400–500 | 标签可略紧 |
| 角标 | 9.5–10.5px | 600 | — |

正文默认：`body { font-size: 14px; }`。  
移动端输入框 ≥ **16px**，避免 iOS 聚焦放大。

### 3.3 Writing tone

界面文案：**英文、短句、工具口吻**。  
示例：Save / Unsaved / Browse inspiration / Manage inspiration / Add a thought *optional*。

---

## 4. Shape & elevation

### 4.1 Radius

| 场景 | Radius |
|---|---|
| 小控件、图标按钮 | 7–8px |
| 默认按钮 `.btn` | 10px |
| 浮层面板 / 浏览器壳 | 12–14px |
| 分段容器（steps） | 12px 外框 + 9px 内项；browse-switch 用 **999px** 药丸外框 |
| 芯片 / 角标 / 工具圆 | 999px |

### 4.2 Shadow

```css
--shadow:    0 1px 2px rgba(40,40,40,.04), 0 4px 14px rgba(40,40,40,.05);
--shadow-up: 0 2px 6px rgba(40,40,40,.05), 0 14px 32px rgba(40,40,40,.08);
```

浮层（toast、pop、panel、dock）用 `--shadow` / `--shadow-up`，不要额外叠多层彩色阴影。

### 4.3 Borders

默认 `1px solid var(--line)`。  
Hover 可升到 `var(--muted)`。  
**选中 / 焦点**：黑边或 `outline: 2px solid var(--accent)`（focus-visible）。

---

## 5. Components (patterns)

### 5.1 Buttons

| 变体 | 样式 |
|---|---|
| Default | surface 底 + line 边 |
| Primary（品牌） | accent 底 + on-accent 字 |
| **Save / 关键动作 pill** | **黑底白字**；hover **反相**（白底黑边黑字） |
| Ghost | 透明，muted 字 |
| Tool dock 图标 | 40×40 圆；hover / pressed / expanded → 黑色圆底 + 白图标 |

Save / Browse 关键动作优先走 **黑白 pill**，不要默认做成大绿按钮。

### 5.2 Segmented controls

参考 `.steps` / `.browse-switch`：

- 白底 + line 边 + 轻阴影
- 未选：透明 / muted 字
- 选中：`--ink` 底 + `--bg` 字
- browse-switch 外框与内按钮 `border-radius: 999px`

### 5.3 Floating panels

画布浮层（cv-panel、tool-dock、legend、toast）：

- `background: var(--surface)` 或白
- `border: 1px solid var(--line)`
- `border-radius: 12–14px`
- 轻阴影

### 5.4 Cards & notes

- 卡片：白/浅底、细边、圆角约 12–14px
- **Note 块**：`--note-bg` 灰底 + 左侧 **3px `--ink`** 竖线；标签 “NOTE” 用黑色
- **有笔记标记**：右上黑圆点（不是绿色）
- 选中卡片 outline：可用 accent（搜索命中 / 多选）

### 5.5 Forms

- 输入框：`border: 1px solid var(--line)`，focus → `--ink`
- 搜索：底边线风格；长文用 textarea，**仅溢出时**出现纵向滚动条；滚动区域不得压住语音/清除按钮
- 下拉：复用 `MuseSelect`，高度紧凑（约 28px trigger）

### 5.6 Feedback

| 类型 | 表现 |
|---|---|
| 未保存 | 橙色文字 “Unsaved” / “Unsaved changes”，**不要绿点** |
| Toast | 深底浅字，居中；移动端小条，勿拉满宽 |
| 扩展角标 | accent 底；**仅在 Save 成功后**增加 |

---

## 6. Layout & density

- 画布点阵：24px grid，`--dot` 色点
- 工具栏 / dock：底部居中药丸 dock；图标等大（约 40px）
- 左侧 Canvases 面板：约 230px 宽；完整显示名称，**不要 ellipsis 截断**
- 桌面 vs 移动（`max-width: 820px`）：
  - 移动强制 Browse 流，隐藏画布工具 dock / 面板
  - 禁止页面缩放（viewport `maximumScale: 1`）以免输入时整页放大

---

## 7. Motion

- 默认过渡：`150–200ms`，ease
- 工具选中：轻微 `translateY(-0.5px)` + 底圆淡入
- 语音 demo：麦克风 `listening` 脉冲即可
- `prefers-reduced-motion: reduce` 时关闭动画

少即是多：每屏 2–3 个有意动效，不做装饰性粒子 / glow。

---

## 8. Iconography

- 线性 SVG，`stroke-width` 约 2–2.4，`currentColor`
- 工具栏位图（pen / eraser / sticky）用 **mask + currentColor**，以便黑底上变白
- Logo：`/logo.png` + 词标 “Muse” + **绿色圆点**

---

## 9. Sticky & ink (canvas tools)

| 项 | 约定 |
|---|---|
| Sticky 默认色 | Soft yellow 等色板；文字深色可读 |
| 画笔色 | 禁止纯白；现用 `#282828 / #CBD77E / #E6CA9A / #7A7A7A` |
| 工具选中 | 黑色圆 + 底部绿色小点（accent tip） |

---

## 10. Content & demo conventions

- UI 语言：English
- Capture 页是「被浏览的网站」模拟；Muse 页才是产品壳
- 语音搜索等演示功能：允许模拟，但视觉仍走同一套控件（麦克风按钮、搜索框、toast）

---

## 11. Checklist for new UI

做新界面前过一遍：

1. 颜色是否只来自现有 token？新色是否必要？
2. 主操作是不是黑白 pill / 分段黑选中，而不是大绿块？
3. 笔记相关是否保持黑白？
4. 圆角 / 阴影是否落在本文档档位？
5. 移动端输入是否 ≥16px？Toast / 浮层是否过宽过大？
6. 字体是否仍是 Inter，层级是否靠字号/字重而非换字体？
7. 是否避免了：紫渐变、奶油衬线海报风、报纸密栏、深色霓虹风？

---

## 12. File map

| 文件 | 职责 |
|---|---|
| `src/app/muse.css` | Muse 主视觉与组件样式 |
| `src/app/globals.css` | Tailwind / shadcn token 桥接 |
| `src/app/layout.tsx` | Inter + Geist 加载、`data-theme="light"` |
| `src/components/muse/markup.ts` | 结构标记 |
| `src/components/muse/engine.js` | 行为与动态 DOM |
| `public/logo.png` | 品牌标 |

改视觉时优先改 **CSS 变量**，再落到组件；避免在 `engine.js` 内联大量颜色。
