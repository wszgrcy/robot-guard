// import { enumToObject } from "../util/enum-to-object";
import { objectToOptions } from "../util/object-to-options";

export enum ActionTypeEnum {
  goto,
  query,
  click,
  input,
  wait,
  getElementProperty
}

// let actionType = Object.values(ActionTypeEnum).filter((value) => typeof value === "number");
export const ActionTypeObject = {
  [ActionTypeEnum.goto]: { name: ActionTypeEnum[ActionTypeEnum.goto], enum: ActionTypeEnum.goto, label: "跳转" },
  [ActionTypeEnum.query]: { name: ActionTypeEnum[ActionTypeEnum.query], enum: ActionTypeEnum.query, label: "查询" },
  [ActionTypeEnum.click]: { name: ActionTypeEnum[ActionTypeEnum.click], enum: ActionTypeEnum.click, label: "点击" },
  [ActionTypeEnum.input]: { name: ActionTypeEnum[ActionTypeEnum.input], enum: ActionTypeEnum.input, label: "输入" },
  [ActionTypeEnum.wait]: { name: ActionTypeEnum[ActionTypeEnum.wait], enum: ActionTypeEnum.wait, label: "等待" },
  [ActionTypeEnum.getElementProperty]: { name: ActionTypeEnum[ActionTypeEnum.getElementProperty], enum: ActionTypeEnum.getElementProperty, label: "查询元素属性" },
};

export const ActionOptions = objectToOptions(ActionTypeObject, ["label", "label"], ["value", "enum"]);
