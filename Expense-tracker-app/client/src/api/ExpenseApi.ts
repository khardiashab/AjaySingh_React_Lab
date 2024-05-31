import axios, { AxiosInstance } from "axios";
import { ExpenseItem } from "../models/models";
class ExpenseApi {
    private static instance: AxiosInstance = axios.create({
      baseURL: process.env.BASE_SERVER_URL || 'http://localhost:3333',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    static async getExpenseItems(): Promise<ExpenseItem[]> {
      try {
        const response = await this.instance.get<ExpenseItem[]>('/expenses');
        return response.data;
      } catch (error) {
        console.error("Error fetching expense items:", error);
        throw new Error('Could not fetch expense items');
      }
    }

    static async addExpenseItem(expenseItem : ExpenseItem) : Promise<any> {
      try {
        const response = await this.instance.post("/expenses", expenseItem);
        return response;
      } catch (error) {
        console.error("Error in adding the expense item to the server.");
        throw new Error('Could not add expense item.');
      }
    }
  }
  
  export default ExpenseApi;
