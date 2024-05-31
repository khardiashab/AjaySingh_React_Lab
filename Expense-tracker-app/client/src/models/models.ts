interface ExpenseItem {
  id: string;
  payeeName: string;
  expenseDescription: string;
  price: number;
  date: Date | string;
}

export type { ExpenseItem };
