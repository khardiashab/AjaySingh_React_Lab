import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";
import ExpenseTable from "./ExpenseTable";
import SummaryTable from "./SummaryTable";
import ExpenseApi from "../api/ExpenseApi";
import { ExpenseItem } from "../models/models";
import { generateNameColorMap, getTotalAndEachPaidAmount } from "../Utils";

const MainPage: React.FC = () => {
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ExpenseApi.getExpenseItems();
      setExpenseItems(data);
    } catch (error) {
      setError("Failed to fetch expense items. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpenseClick = () => {
    navigate("/add-expense");
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner animation="border" variant="success" />;
    } else if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else {
      return (
        <>
          <ExpenseTable
            expenseItems={expenseItems}
            nameColorMap={generateNameColorMap(expenseItems)}
          />
          <div className="hr"></div>
          <hr />
          <SummaryTable
            totalAndSepratedAmountPaidByEach={getTotalAndEachPaidAmount(
              expenseItems
            )}
            nameAndColorMap={generateNameColorMap(expenseItems)}
          />
        </>
      );
    }
  };

  return (
    <Container fluid className="main-page">
      <h1 className="text-center bg-grey py-3 text-success">Expense Tracker</h1>
      <Row className="mb-4 d-flex justify-content-around ">
        <Col md={8} sm={12}>
          {renderContent()}
        </Col>
        <Col md={3} sm={12} className="my-4">
          <Button
            variant="success"
            size="lg"
            className="bg-success-secondary add-item-button"
            onClick={handleAddExpenseClick}
          >
            Add New Expense
          </Button>
        </Col>
      </Row>
      <div className="hr"></div>
    </Container>
  );
};

export default MainPage;
