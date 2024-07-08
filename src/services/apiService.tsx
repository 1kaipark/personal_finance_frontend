import axios from "axios";
import { Expense, convertToExpense } from "../models/Expense";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(API_BASE_URL);

export const getUserName = async () => {
  const response = await axios.get(`${API_BASE_URL}/user_name`);
  return response.data;
};

export const getMonthlyHeights = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_heights`, {
    params: { month },
  });
  return response.data;
};

export const getAllExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/get_all_expenses`);

  const expensesData = response.data;
  // convert to Expense instances
  const expenses: { [key: string]: Expense } = {}; // define expenses 'dict'
  Object.entries(expensesData).forEach(([key, value]) => {
    expenses[key] = convertToExpense(value);
  });

  return expenses;
};

export const getMonths = async () => {
  const response = await axios.get(`${API_BASE_URL}/months_list`);
  return response.data;
};

export const getMonthlyTotals = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_totals`, {
    params: { month },
  });
  return response.data;
};

export const getMonthlySum = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_sum`, {
    params: { month },
  });
  return response.data;
};

export const addExpense = async (expenseData: Expense) => {
  const response = await axios.post(`${API_BASE_URL}/add_expense`, expenseData);
  return response.data;
};

export const deleteExpense = async (index: string) => {
  const response = await axios.post(`${API_BASE_URL}/delete_expense`, null, {
    params: { index },
  });
  return response.data;
};

export const refreshData = async () => {
  const response = await axios.post(`${API_BASE_URL}/refresh_data`);
  return response.data;
};

export const establishSession = async () => {
  const response = await axios.post(`${API_BASE_URL}/establish_session`);
  console.log(response.data);
  return response.data;
};
