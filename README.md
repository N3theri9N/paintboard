# 에이치디 정션 과제 소개

# 환경

## 패키지

- **프레임워크** : NextJS v14
- **UI 라이브러리** : ReactJS v18
- **트랜스파일러**
  - TypeScript v5 : 타입의 유동성이 있는 자바스크립트의 디버깅 솔루션으로 사용.
- **스타일**
  - TailwindCSS : 레이아웃 구성에 사용.
  - Styled-Component : 도형 컴포넌트에 변수를 주려면 CSS in JS 를 사용해야하여 그 중 스타일 컴포넌트 채택
- **테스트코드** : github action 과 연동.
  - vitest : 커스텀 훅 유닛테스트에 활용.
  - playwright : 기능 테스트 구현에 UI 가 보이지 않아 코드를 만들기가 어려운 점이 있어 E2E 테스트로 활용.
- **그외 라이브러리** :
  - clsx : 조건별 클래스네임 구현에 사용.
  - html2canvas : 이미지 다운로드 기능 구현에 사용.

---

## 실행

> 설치

```
npm install
```

```
yarn
```

> 실행

```
npm run dev
```

```
yarn dev
```

> vitest 테스트

```
npm run test
npm run test --ui
```

```
yarn test
yarn test --ui
```

> playwright 테스트

- 내부 테스트

```
npx playwright test
```

- UI 모드 테스트

```
npx playwright test --ui
```

- ( \* playwright 가 설치되지 않았을 경우 )

```
npx playwright install --with-deps
```

# 프로젝트 구조

## ROOT

```
├─.gitignore
├─next.config.mjs
├─package.json
├─tailwind.config.ts
├─tsconfig.json
├─vite.config.ts
├─playwright.config.ts
├─public
├─test
│ ├─playwright
│ └─vitest
└─src
  ├─ (...)
(...)
```

- next.config.mjs : NextJS 설정 파일.
- tailwind.config.ts : Tailwind 스타일 설정 파일.
- playwright.config.ts : tailwind 테스트 설정 파일.
- vite.config.ts : vite 번들러 설정 파일.
- test : 테스트코드 설정 파일 폴더
  - `playwright/**.spen.ts` : playwright 테스트 코드
  - `vitest/**.test.tsx` : vitest 테스트 코드

## src

```
  ├─app
  ├─components
  │  ├─paintboard
  │  │  ├─canvas
  │  │  ├─DrawnShapes
  │  │  └─ToolBar
  │  └─UI
  ├─hooks
  ├─types
  └─util
```

- app : nextJS 라우팅 파일 폴더
- components : React 컴포넌트 폴더
  - UI : 공통 UI 폴더
  - paintboard : 루트 컴포넌트
    - canvas : 캔버스 구역
    - drawnShapes : 그려진 도형들
    - ToolBar : 그림판 상단 도구모음
- hooks : 커스텀 훅 폴더
- types : 타입스크립트 객체 타입 선언
- utils : 공통적으로 사용할 함수, 로컬 저장소 DTO 기능으로 구성

# 기능 설명

## 전체 구조

일단 전체적인 컴포넌트는 툴박스와, 그리기 영역, 그리고 그려진 도형들에 대한 컴포넌트로 각각 `<ToolBox>`, `<Canvas>`, `<DrawnShapes>` 로 서로서로 상호작용을 해야한다고 생각하여 3개로 나누었습니다.

`paintboard/index.tsx` 의 구조

```
<div>
  <div id="Toolbar">
    <div className="flex">
      <ToolBar.Draw />
      <ToolBar.Clear />
      <ToolBar.Modify />
    </div>
    <ToolBar.Download />
  </div>
  <Canvas>
    <DrawnShapes />
    {mode === "draw" && <DrawEventComponent />}
    {mode === "modify" && <ModifyEventComponent />}
  </Canvas>
</div>
```

---

## drawnShape 상태값

<u>그려진</u> 도형들의 목록은 shapes 의 배열구조인 drawnShapes 상태값으로 관리하고 있습니다.

```
const [drawnShapes, setDrawnShapes] = useState<ShapeType[]>([]);

type ShapeType = {
  shape: "square" | "circle"; // 도형 모양 : 사각형 | 동그라미
  color?: string;             // 색
  width: number;              // 너비
  height: number;             // 높이
  left: number;               // 가로 위치 ( 창 기준 )
  top: number;                // 세로 위치 ( 창 기준 )
}
```

예시 :

```
[
  {"left":111,"top":126,"width":264,"height":250,"shape":"square"},
  {"left":198,"top":218,"width":335,"height":333,"shape":"circle"}
]
```

도형의 앞 뒤 배열은 처음에는 level 이란 값으로 대응을 했었지만, DOM 구조상으로 나중에 온 도형은 나중에 그려지기 때문에 나중에 배열된 도형일수록 위에 배치되므로, 현재 데이터 구조를 갖추게 되었습니다.

전체적인 상태 값과 브라우저 로컬 저장소에서는 이 구조로 관리합니다.

---

## 커스텀 훅 useShapes

**Toolbox**와 **Canvas**의 행동의 결과가 **DrawnShapes**에 반영하는 구조가 되었습니다. 그러므로 위의 모든 컴포넌트가 그려진 도형들의 상태값을 접근할 수 있어야했습니다. 다양한 상태 변화 기능을 갖춰야하므로 코드가 복잡해질 수도 있어, 기능 단위로 커스텀 훅을 제작하였습니다.

`useShapes.tsx`

```

const useShapes = (mode: Modes) => {
  const [drawnShapes, setDrawnShapes] = useState<ShapeType[]>([]);
  const [index, setIndex] = useState<number>(-1); // 선택한 도형의 번호

  const initShapes : Function
  const resetIndex : Function
  const addShapes : Function
  const clearShapes : Function
  const modifyShapes : {
    invoke : Function
    top : Function
    forward : Function
    backward : Function
    bottom : Function
    delete : Function
    color : Function
  }
  const moveShape : Function

  return { drawnShapes, initShapes, addShapes, moveShape, clearShapes, index, setIndex, modifyShape };
}
```

메소드 설명

- initShapes : 로컬 저장소에서 가져온 데이터로 초기화.
- resetIndex : 선택한 도형 index 번호 초기화.
- addShapes : 도형 추가.
- clearShapes : 캔버스 초기화.
- modifyShapes : 선택한 도형의 편집기능의 모음. ToolBox 중 modify 컴포넌트에만 이하의 메소드들이 필요하여 따로 묶었습니다.
  - invoke : 도형 편집 기능의 기능 시행전에 공통적으로 실행하는 메소드
  - top : 맨 앞으로 이동
  - forward : 앞으로 이동
  - backward : 뒤로 이동
  - bottom : 맨 뒤로 이동
  - delete : 지우기
  - color : 색칠

---

## 로컬저장소 동기화

로컬 저장소로의 접근은 `LocalStorageDTO.ts` 에서만 관리하고 있으며, useShapes 훅에서만 사용하고 있습니다.

> 컴포넌트 ↔ useShapes.tsx ↔ LocalStorageDTO.ts ↔ 로컬 저장소

### 로컬 저장소로 저장

useShapes 훅 내부의 useEffect 를 활용하여 그려진 도형 데이터가 변경이 일어났다면, 저장 기능이 상시적으로 동작합니다.

```
import { setLocalStorageShapeData } from "@/util/LocalStorageDTO";

useEffect(
  function synchronizeLocalStorage() {
    setLocalStorageShapeData(drawnShapes);
  },
  [drawnShapes]
);
```

### 로컬 저장소에서 불러오기

`<Canvas>` 의 하이드레이션이 완료되어 로컬 저장소에 접근 가능한 상태가 되었을때 실행하도록 ref 속성에 `initShape` 메소드를 걸었습니다.

```
const initShapes = useCallback((node: HTMLDivElement) => {
  if (node == null) {
    return;
  }
  setDrawnShapes(getLocalStorageShapeData());
}, []);

<div
  ref={initShapes}
  id="canvas"
  className="w-full h-[calc(100vh-40px)] overflow-hidden"
  onClick={onClickHandler}
>
  {children}
</div>

```

### 로컬 저장소 삭제 ( 삭제됨 )

기존에 DTO 에서는 초기화할때 같이 실행하는 `deleteLocalStorageShapeData` 가 있었지만 초기화하면 빈 배열이 drawnShapes 에 저장되며 이 데이터가 로컬에 저장됩니다. 그러므로 꼭 필요한 내용이 아니라 제외하였습니다.

```
const deleteLocalStorageShapeData = () => {
  localStorage.removeItem("shapes");
};

const clearShapes = useCallback((): void => {
  setDrawnShapes([]);
  deleteLocalStorageShapeData();
}, []);
```

---

## 도형 컴포넌트

도형 컴포넌트는 스타일드 컴포넌트로 적용하였습니다.
레이아웃은 직관성을 위해 tailwind 를 적용했습니다. 다만 `tailwind` 는 빌드시 프로젝트에 존재하는 클래스 값들을 `globals.css` 에 반영하는 구조로 진행되므로 구체적인 변수가 필요한 도형 컴포넌트에 넣는건 불가능에 가까웠습니다.

그러므로 CSS in JS 로 대응할 필요가 있었으며, Styled-component 로 컴포넌트를 제작하였습니다.

```
const ShapeComponent = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $shape: Shapes;
}>`
  cursor: move;
  border: solid red 2px;
  border-radius: ${(props) => (props.$shape === "circle" ? "9999%" : "0%")};
  position: absolute;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
`;

<ShapeComponent $top={top} $left={left} $width={width} $height={height} $shape={shape} />
```

---

## 그리기

상태값 중 `mode === "draw"` 일때 캔버스의 마우스는 그리기 기능으로 동작하며 이때 나오는 `<DrawEventComponent>` 컴포넌트에서 이벤트를 트리거합니다.

해당 컴포넌트에 mousedown, mouseup 의 이벤트로 시작지점, 끝지점의 위치을 계산하여 도형을 그릴 수 있었습니다.

그 과정에서 계산과정이 자주 일어나, util 로 함수를 따로 빼면서 이를 클래스로 제작하였습니다.
`shapeDataCalculator.tsx`

```
export class DrawingShapeDataCalculator {
  private downX;
  private downY;
  constructor() { ... }
  public setMouseDownPosition(x: number, y: number) { ... }
  public calcShapeData(x: number, y: number) { ... }
}
```

`onmousedown` 일때 `setMouseDownPosition` 을 실행하여 시작 위치를 지정하고 `mouseup` 이벤트에서 `calcShapeData` 로 `shepeType` 에 맞춘 데이터를 리턴, 해당 데이터로 `addShape` 에 매개변수로 전달하여 도형을 추가합니다.

```
const { left, top, width, height } = shapeDataCalculator.calcShapeData(e.clientX, e.clientY);

if (width > 20 && height > 20) {
  addShapes({ left, top, width, height, shape });
}
```

### 미리보기

해당 이벤트는 `onMouseDown` 과 `onMouseUp` 사이에 실행되는 `onMouseMove`이벤트로 트리거 했습니다.

이 이벤트는 원래 해당 요소에 마우스를 올렸을때 실행되지만, 마우스를 클릭한 중이면 `event.buttons` 가 `1` 인 점을 활용하였습니다.

가장 중요한 건 이 컴포넌트는 절대로 drawnShapes 상태값과 엮여선 안됩니다. 원래 `onMouseMove` 이벤트는 꽤 자주 트리거되는에 리랜더링을 너무 많이 발생시킬 수도 있기 때문입니다.

그래서 미리보기 기능은 `useRef` 를 활용한 비제어 컴포넌트로 제작하여, 별개의 동작으로 구현하였습니다.

```
const setPreview = ({ left, top, width, height }: ShapeAttributes) => {
  previewRef.current?.setAttribute(
    "style",
    ` position: absolute;
      left: ${left}px;
      top: ${top}px;
      width: ${width}px;
      height: ${height}px;
      display: block;`
  );
};
 ...

  onMouseMove={(e) => {
    e.preventDefault();
    if (e.buttons === 1) {
      // 왼쪽 마우스버튼을 클릭 중인 경우
      setPreview(shapeDataCalculator.calcShapeData(e.clientX, e.clientY));
    }
  }}
  onMouseUp={(e) => {
    previewRef.current?.style.setProperty("display", "none");
    // 마우스를 놓을 때 미리보기가 안보이도록 한다.
  }}
```

---

## 편집

상태값 중 `mode === "modify"` 일때 캔버스의 마우스는 편집 기능으로 동작합니다.

### 도형 선택

이미 그려진 도형을 클릭한 경우 `setIndex`가 동작합니다.

빨간 외곽전으로 그려진 컴포넌트 `<ModifyEventComponent>` 가 화면에 표시되어 어떤 도형이 선택되었는지 표시됩니다.

### 선택 제외

어떤 도형이 선택된 상태일 경우, 아무 도형이 안그려진 곳을 클릭하면 선택이 해제됩니다. 즉 `<Canvas>` 컴포넌트를 클릭했을 때 입니다.

```
<Canvas initShapes={initShapes} onClickHandler={() => {setIndex(-1)}>
    { ... }
</Canvas>
```

그런데 이벤트 버블링으로 인해 하위 컴포넌트인 `<DrawnShapes>` 컴포넌트도 클릭 이벤트가 발생하는 문제가 일어났습니다. 이를 해결하기 위해 `stopPropagation()` 을 적용하였습니다.

```
<ShapeComponent
  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIndex(idx);
  }}
/>
```

### 도형 이동

도형 선택 후에 `<ModifyEventComponent>` 컴포넌트에서 이벤트를 트리거합니다. 이 또한 그리기와 동일하게, 비제어 컴포넌트로 구현하였습니다.

이미 그려진 도형을 대응해야하므로, 드래그&드롭 시점의 좌표값을 다르게 활용해야하고 해당 컴포넌트는 항상 보여야한단 점은 정도의 다른 점이 있습니다.
( \* ModifyEventComponent.tsx 코드 전체 참고 )

### ModifyShape

선택한 `index` 에 대응하는 도형의 데이터를 바꾸는 구조이므로 해당 기능들은 `useShapes.tsx` 의 `modifyShape`에서 담당합니다.

#### 앞으로/뒤로 이동

도형의 앞 뒤는 `drawnShapes` 배열의 배치 순서를 바꿔서 기능 반영이 가능했습니다.

관련된 모든 메소드에선 `invoke` 를 발생하여 해당 index 의 도형이 제외된 배열인 `remainShapes`와 대상 도형 `targetShape` 로 추출한 다음 재배치하여 `setDrawnShapes` 를 트리거합니다.
invoke

```
invoke: () => {
  const targetShape = drawnShapes[index];
  const remainShapes = [...drawnShapes];
  remainShapes.splice(index, 1);
  return { targetShape, remainShapes };
},
```

맨 앞으로

```
newState = [...remainShapes, targetShape];
```

앞으로

```
newState = [...remainShapes.slice(0, toIndex), targetShape, ...remainShapes.slice(toIndex)]
```

뒤로

```
const newState = [...remainShapes.slice(0, toIndex), targetShape, ...remainShapes.slice(toIndex)];
```

맨 뒤로

```
const newState = [targetShape, ...remainShapes];
```

#### 색칠

> 도형들을 겹쳤을때 어떤 도형이 위인지 아래인지를 파악하기가 어려워 해당 기능을 추가하였습니다.

ShapeType 에 color 값을 추가하였고 값이 없는 경우는 투명한 배경, 있을 경우는 해당 색으로 적용하도록 대응하였습니다.

다만 input 에서 onChange 이벤트에 대응하려니, 원래 HTML 과 다르게 동작하는 문제가 생겼습니다. 원래 input 선택창이 종료될 때 onChange 가 실행되어야하는데 React 에서는 팔레트에 드래그만 해도 onChange 가 동작하여 리랜더링을 많이 일으킬 수도 있었습니다.

그러므로 색을 선택한 다음 색 적용 버튼을 별도로 클릭해야 색칠이 되도록 구현하였습니다.

```
<input
  type="color"
  className="h-10 w-10"
  ref={colorRef}
/>
<ToolButton
  onClick={() => {
    if (colorRef.current !== null) {
      modifyShape.color(colorRef.current.value);
    }
  }}
>
  색 적용
</ToolButton>
```

### 지우기

지우기는 기존 array 의 index 에 해당 데이터를 splice 로 대응하여 완료했습니다.
선택된 도형이 지워졌으므로, 이 행동을 한 다음에는 index 는 초기화되어야합니다.

```
delete: () => {
  const remainShapes = [...drawnShapes];
  remainShapes.splice(index, 1);
  resetIndex();
  setDrawnShapes(remainShapes);
},
```

## 다운로드

해당 기능은 `html2canvas` 라이브러리를 활용하였습니다.

```
export const Download = memo(() => {
  const downloadButtonHandler = () => {
    let canvasDivElement = document.getElementById("canvas") as HTMLDivElement;
    html2canvas(canvasDivElement).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpg");
      link.download = `image_${Math.ceil(Math.random() * 1000000)}.jpg`;
      link.click();
    });
  };
  return (
    <WhiteBackground>
      <ToolButton onClick={downloadButtonHandler}>다운로드</ToolButton>
    </WhiteBackground>
  );
});
```

# 테스트코드

커스텀 훅의 기능 테스트는 vitest로 대응하였으며
전반적인 그림판 기능이 올바르게 작동하는지, 크로스브라우징도 커버할 수 있는 E2E 테스트는 playwright 로 대응하였습니다.

적용한 테스트는 아래와 같습니다.
vitest ( 경로는 test/vitest ) :

- 사각형 그리기
- 커스텀 훅 테스트
  - 로컬 저장소 동기화
  - 도형 추가
  - 초기화
  - 도형 편집
  - 색칠하기

playwright ( chrome, firefox, webkit 환경에 대응합니다. 경로는 test/playwright)

- 그리기
- 지우기
- 초기화
- 로컬 저장소 동기화
- 색칠하기
- 도형 앞뒤로 이동
  playwright의 테스트는 pull Request 를 생성하면 github Action에서 테스트를 진행합니다.

특이사항이 있다면 도형 이동을 테스트 코드로 구현해도 진행이 잘 되지 않았으며,
webkit 에서는 새로고침 테스트가 잘 되지 않았습니다.

# REMAIN ISSUES

## 1. vitest 테스트코드 Github Action 적용

Github Action 워크스페이스로 테스트코드와 연동을 시도해보았으나, 모듈을 찾을 수 없단 이유로 실패. 관련 레퍼런스도 찾을 수가 없어, 이 작업은 진행할 수가 없었습니다.

[작업 링크](https://github.com/N3theri9N/paintboard/pull/19)

## 2. 불필요한 리랜더링 해결

대부분의 상단 `<ToolBox>` 의 행동이 `<DrawnShapes>` 의 리랜더링을 일으키고
이미 그려진 도형을 클릭했을때 `<ToolBox>` 애 리랜더링을 발생시킵니다.

사실 모든 컴포넌트가 상태값을 공유하는거나 마찬가지이므로 한계는 존재합니다.
물론 메모이제이션을 이용하여, 일부 컴포넌트는 memo 로 감싸서, 관련 없는 값의 변화에 리랜더링을 막을 수는 있었습니다.

단 값을 저장하는 무분별한 메모이제이션은 성능저하를 일으킬 수도 있어 프로퍼티에 들어갈 경우의 수가 매우 많은 `<DrawnShapes>` 컴포넌트는 메모로 감쌀 수는 없었습니다. 그러므로 해당 컴포넌트가 리랜더링을 항상 해두게 두어야하는 건 아쉽다고 생각이 듭니다.
[memoization 관련 레퍼런스](https://d2.naver.com/helloworld/9223303)

만약 새로 제작할 경우, index, mode, shape 이 셋을 하나의 객체로 상태로 관리하도록 한 다음 얕은 복사, 깊은 복사를 병행하여 리랜더링을 컨트롤 해볼 수 있을거로 생각됩니다.

```
type Actions = {
  mode : Modes,
  shape ?: Shape,
  index : number,
}
const [action, setAction] = useState<Actions>({
  mode: "draw", shape: "square", index: -1
})
```
