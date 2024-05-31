import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Col, Container, Form, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ExpenseApi from "../api/ExpenseApi";
import { ExpenseItem } from "../models/models";
import "./AddExpenseForm.css";

interface FormData {
  payeeName: string;
  expenseDescription: string;
  price: number;
  date: string;
}

interface FormErrors {
  payeeName: string;
  expenseDescription: string;
  price: string;
  date: string;
}

const AddExpenseForm: React.FC = () => {
  const navigate = useNavigate();

  const initialFormData: FormData = {
    payeeName: "",
    expenseDescription: "",
    price: 0,
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({
    payeeName: "",
    expenseDescription: "",
    price: "",
    date: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      payeeName: "",
      expenseDescription: "",
      price: "",
      date: "",
    };

    let isValid = true;

    if (!formData.payeeName.trim()) {
      newErrors.payeeName = "Choose a name who paid the bill.";
      isValid = false;
    }

    if (!formData.expenseDescription.trim()) {
      newErrors.expenseDescription = "Product purchased cannot be empty.";
      isValid = false;
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
      isValid = false;
    }

    const selectedDate = new Date(formData.date);
    const currentMonth = new Date();
    currentMonth.setDate(1);
    if (selectedDate < currentMonth) {
      newErrors.date = "Date cannot be less than the current month.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const newExpense: ExpenseItem = { id: uuidv4(), ...formData, date : new Date(formData.date), price : +formData.price };
      await ExpenseApi.addExpenseItem(newExpense);
      setFormData(initialFormData);
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Container fluid="sm" className="container">
      <Col xs={12} md={8}>
        <div className="header p-3 rounded-2 mb-3">
          <p className="text-center fs-5">Add New Item</p>
          <p className="text-danger">Read the instructions before proceeding.</p>
          <p>Ensure all fields marked with * are filled.</p>
        </div>
        <Form onSubmit={handleSubmit}>
          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Data has been submitted successfully!
            </Alert>
          )}
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              An error occurred while submitting the data.
            </Alert>
          )}

          <Form.Group className="mb-3 px-4 py-2 border rounded-3" controlId="formName">
            <Form.Label>
              Name <strong className="text-danger">*</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleChange as any}
              isInvalid={!!errors.payeeName}
            >
              <option value="">Choose</option>
              <option value="Rahul">Rahul</option>
              <option value="Ramesh">Ramesh</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.payeeName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 px-4 py-2 border rounded-3" controlId="formExpenseDescription">
            <Form.Label>
              Product Purchased <strong className="text-danger">*</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="expenseDescription"
              value={formData.expenseDescription}
              onChange={handleChange as any}
              isInvalid={!!errors.expenseDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.expenseDescription}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 px-4 py-2 border rounded-3" controlId="formPrice">
            <Form.Label>
              Price <strong className="text-danger">*</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange as any}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 px-4 py-2 border rounded-3" controlId="formDate">
            <Form.Label>
              Date <strong className="text-danger">*</strong>
            </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange as any}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="btn_div">
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => navigate("/")}>Close</Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default AddExpenseForm;
