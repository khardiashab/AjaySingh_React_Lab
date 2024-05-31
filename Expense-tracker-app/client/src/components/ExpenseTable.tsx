import React from "react";
import { Table } from "react-bootstrap";
import { ExpenseItem } from "../models/models";

type PropsType = {
  expenseItems: ExpenseItem[];
  nameColorMap: Map<string, string>;
};

const ExpenseTable: React.FC<PropsType> = (props) => {
  const { expenseItems, nameColorMap } = props;

  return (
    <div>
      <Table responsive className="expense_table">
        <thead className="expense_table_head">
          <tr>
            <th>Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
          </tr>
        </thead>

        {
          <tbody>
            {expenseItems.map((item) => (
              <tr key={item.id}>
                <td style={{ backgroundColor: "lightblue" }}>
                  {new Date(item.date).toISOString().split("T")[0]}
                </td>
                <td style={{ backgroundColor: "lightgreen" }}>
                  {item.expenseDescription}
                </td>
                <td style={{ backgroundColor: "lightcoral" }}>{item.price}</td>
                <td
                  style={{
                    backgroundColor:
                      nameColorMap.get(item.payeeName) || "white",
                  }}
                >
                  {item.payeeName}
                </td>
              </tr>
            ))}
          </tbody>
        }
      </Table>
    </div>
  );
};

export default ExpenseTable;
