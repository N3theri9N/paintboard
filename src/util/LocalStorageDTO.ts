import { ShapeType } from "@/types/shape";

export const getLocalStorageShapeData = () => JSON.parse(localStorage.getItem("shapes") ?? "[]");

export const setLocalStorageShapeData = (shapes: ShapeType[]) => {
  localStorage.setItem("shapes", JSON.stringify(shapes));
};

// export const deleteLocalStorageShapeData = () => {
//   localStorage.removeItem("shapes");
// };
