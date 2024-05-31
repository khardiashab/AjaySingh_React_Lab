import chroma from "chroma-js";
import { ExpenseItem } from "./models/models";

const getColorsArray = (numberOfColors: number): string[] => {
  const startColor = "#80ffff";
  const endColor = "teal";
  return chroma.scale([startColor, endColor]).colors(numberOfColors);
};

const getUniqueNames = (expenseItems : ExpenseItem[]) : string[] =>{
  let set = new Set<string>();
  expenseItems.forEach(item => {
    set.add(item.payeeName);
  });
  return Array.from(set);
}

const generateNameColorMap = (
  expenseItems: ExpenseItem[]
): Map<string, string> => {
  const resultMap = new Map<string, string>();

  // Populate map with unique payee names
  expenseItems.forEach((item) => {
    resultMap.set(item.payeeName, "");
  });

  const colorsArray = getColorsArray(resultMap.size);

  // Assign colors to each unique payee name
  Array.from(resultMap.keys()).forEach((key, index) => {
    resultMap.set(key, colorsArray[index]);
  });

  return resultMap;
};

const getTotalAndEachPaidAmount = (
  expenseItems: ExpenseItem[]
): Map<string, number> => {
  const resultMap = new Map<string, number>();
  resultMap.set('total', 0);
  let totalAmount = 0;
  expenseItems.forEach((item) => {
    let currentAmount = item.price;
    totalAmount += +currentAmount;
    let amount = resultMap.get(item.payeeName) ?? 0;
    resultMap.set(item.payeeName, amount + currentAmount);
  });
  resultMap.set("total", totalAmount);
  return resultMap;
};

export { generateNameColorMap, getTotalAndEachPaidAmount };
