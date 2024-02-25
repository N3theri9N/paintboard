import { ShapeType } from "@/types/shape";
import { getLocalStorageShapeData } from "@/util/LocalStorageDTO";
import { act, renderHook } from "@testing-library/react";
import useShapes from "@/hooks/useShapes";

const shape1: ShapeType = {
  shape: "square",
  left: 0,
  top: 0,
  width: 100,
  height: 100,
};

const shape2: ShapeType = {
  shape: "square",
  left: 100,
  top: 0,
  width: 100,
  height: 100,
};

const shape3: ShapeType = {
  shape: "square",
  left: 200,
  top: 0,
  width: 100,
  height: 100,
};

describe("useShapes훅", () => {
  const { result } = renderHook(() => useShapes("draw"));

  beforeEach(() => {
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
    });
  });
  describe("도형 추가", () => {
    test("도형 추가", () => {
      expect(result.current.drawnShapes).toStrictEqual([shape1, shape2, shape3]);
    });

    test("로컬 저장소 동기화", () => {
      expect(getLocalStorageShapeData()).toStrictEqual([shape1, shape2, shape3]);
    });

    test("초기화", () => {
      expect(result.current.drawnShapes).toStrictEqual([shape1, shape2, shape3]);
      new Promise(() => {
        result.current.clearShapes();
      }).then(() => {
        expect(result.current.drawnShapes).toStrictEqual([]);
        expect(getLocalStorageShapeData()).toStrictEqual([]);
      });
    });
  });
});

describe("도형 편집", () => {
  test("맨앞으로 ( 0에서 2로 )", async () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
      result.current.setIndex(0);
    });
    expect(result.current.index).equal(0);
    act(() => {
      result.current.modifyShape.top();
    });
    expect(result.current.drawnShapes).toStrictEqual([shape2, shape3, shape1]);
  });

  test("앞으로 ( 0에서 1로 )", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
      result.current.setIndex(0);
    });
    expect(result.current.index).equal(0);
    act(() => {
      result.current.modifyShape.forward();
    });
    expect(result.current.drawnShapes).toStrictEqual([shape2, shape1, shape3]);
  });

  test("뒤로 ( 2에서 1로 )", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
      result.current.setIndex(2);
    });
    expect(result.current.index).equal(2);
    act(() => {
      result.current.modifyShape.backward();
    });
    expect(result.current.drawnShapes).toStrictEqual([shape1, shape3, shape2]);
  });
  test("맨 뒤로 ( 2에서 0로 )", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
      result.current.setIndex(2);
    });
    expect(result.current.index).equal(2);
    act(() => {
      result.current.modifyShape.bottom();
    });
    expect(result.current.drawnShapes).toStrictEqual([shape3, shape1, shape2]);
  });
  test("색 변환", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.setIndex(0);
    });
    expect(result.current.index).equal(0);
    act(() => {
      result.current.modifyShape.color("#ffffff");
    });
    expect(result.current.drawnShapes).toStrictEqual([{ ...shape1, color: "#ffffff" }]);
  });

  test("도형 이동", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
    });
    expect(result.current.drawnShapes).toStrictEqual([shape1]);
    act(() => {
      result.current.moveShape(0, { ...shape1, top: 200, left: 200 });
    });
    expect(result.current.drawnShapes).toStrictEqual([{ ...shape1, top: 200, left: 200 }]);
  });

  test("도형 삭제", () => {
    const { result } = renderHook(() => useShapes("modify"));
    act(() => {
      result.current.addShapes(shape1);
      result.current.addShapes(shape2);
      result.current.addShapes(shape3);
    });
    expect(result.current.drawnShapes).toStrictEqual([shape1, shape2, shape3]);
    act(() => {
      result.current.setIndex(1);
    });
    expect(result.current.index).toEqual(1);
    act(() => {
      result.current.modifyShape.delete();
    });
    expect(result.current.drawnShapes).toStrictEqual([shape1, shape3]);
    expect(result.current.index).toEqual(-1);
  });
});
