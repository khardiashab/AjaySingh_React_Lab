import React from "react";
import { Table } from "react-bootstrap";

type Props = {
  totalAndSepratedAmountPaidByEach: Map<string, number>;
  nameAndColorMap: Map<string, string>;
};

const SummaryTable: React.FC<Props> = ({
  totalAndSepratedAmountPaidByEach,
  nameAndColorMap,
}) => {
  const totalAmount = totalAndSepratedAmountPaidByEach.get("total") || 0;
  const eachPart = totalAmount / (totalAndSepratedAmountPaidByEach.size - 1);
  return (
    <div>
      <Table responsive className="expense_table">
        <tbody>
          {Array.from(totalAndSepratedAmountPaidByEach).map(
            ([name, amount]) => (
              <tr key={name}>
                <td
                  style={{
                    backgroundColor: name === "total" ? "violet" : "lightblue",
                    fontWeight: name === "total" ? "bolder" : "normal",
                  }}
                >
                  {name === "total" ? name : `${name} paid:`}
                </td>
                <td
                  style={{
                    backgroundColor: nameAndColorMap.get(name) || "violet",
                  }}
                >
                  {amount}
                </td>
              </tr>
            )
          )}
          {Array.from(totalAndSepratedAmountPaidByEach).map(
            ([name, amount]) => {
              if (name === "total") return null;
              if (amount > eachPart) {
                return (
                  <tr key={name}>
                    <td
                      style={{
                        backgroundColor: "purple",
                        fontWeight: "bold",
                      }}
                    >{`Pay ${name} :`}</td>
                    <td
                      style={{
                        backgroundColor: "purple",
                        fontWeight: "bold",
                      }}
                    >
                      {amount - eachPart}
                    </td>
                  </tr>
                );
              }
              return null;
            }
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default SummaryTable;
