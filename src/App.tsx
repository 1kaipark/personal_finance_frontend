import { useState, useEffect, SetStateAction } from "react";

import TopBar from "./components/TopBar";
import ExpenseSummary from "./components/ExpenseSummary";
import NewExpenseForm from "./components/NewExpenseForm";
import AllExpensesView from "./components/AllExpensesView";
import YesNoConfirmation from "./components/YesNoConfirmation";

import { Expense } from "./models/Expense";

import {
  getUserName,
  getMonthlyHeights,
  getAllExpenses,
  getMonths,
  getMonthlyTotals,
  getMonthlySum,
  addExpense,
  deleteExpense,
  refreshData,
  establishSession,
} from "./services/apiService";

import { downloadDataAsCSV } from "./services/downloadService";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

establishSession();

function App() {
  // TODOS: 'download' option
  // NOTE: MOCK DATA /////////////
  // sample heights, to be replaced by request get
  // actual data needed:
  // userName -- endpoint: '/api/user_name'
  // heights -- endpoint: '/api/get_monthly_heights' params = month
  // data (all expenses) -- endpoint: '/api/get_all_expenses'
  // months -- endpoint:'/api/months_list'
  // monthlyTotals -- endpoint: '/api/get_monthly_totals' params = month
  // sum -- endpoint: '/api/get_monthly_sum' params = month

  // methods (post)
  // addExpense -- endpoint: '/api/add_expense'
  // deleteExpense -- endpoint: '/api/delete_expense' params = index
  // refreshData -- endpoint: '/api/refresh_data'
  /// handle form submission

  // handle month dropdown change
  const [month, setMonth] = useState("ALL");
  const handleMonthClick = (index: any, month: SetStateAction<string>) => {
    console.log(index, month);
    setMonth(month);
  };

  const [userName, setUserName] = useState("");
  const [heights, setHeights] = useState<
    { category: string; amount: string }[]
  >([]);
  const [expenses, setExpenses] = useState<{ [key: string]: Expense }>({});
  const [months, setMonths] = useState(["ALL"]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [sum, setSum] = useState("0");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState({
    index: "",
    title: "",
  });

  const handleYesClick = () => {
    console.log(`expense ${expenseToDelete.title} will be deleted`);
    try {
      const deleteResponse = deleteExpense(expenseToDelete.index);
      console.log(deleteResponse);
      refreshEverything();
    } catch (error) {
      console.log("error deleting expense", error);
    }
    setIsModalVisible(false);
  };
  const handleNoClick = () => {
    console.log("expense will NOT be deleted");
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        refreshData();
        const userNameData = await getUserName();
        setUserName(userNameData);
        const monthsListData = await getMonths();
        setMonths(monthsListData);
        const monthlyHeightsData = await getMonthlyHeights(month);
        setHeights(monthlyHeightsData);
        const expensesData = await getAllExpenses();
        setExpenses(expensesData);
        const monthlyTotalsData = await getMonthlyTotals(month);
        setMonthlyTotals(monthlyTotalsData);
        const monthlySumData = await getMonthlySum(month);
        setSum(monthlySumData.sum);
        console.log(monthlySumData.sum);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };
    fetchData();
  }, [month]);

  const refreshEverything = async () => {
    const refreshedData = await refreshData();
    setExpenses(refreshedData);
    const newMonthsListData = await getMonths();
    setMonths(newMonthsListData);
    const newMonthlyHeightsData = await getMonthlyHeights(month);
    setHeights(newMonthlyHeightsData);
    const newMonthlyTotalsData = await getMonthlyTotals(month);
    setMonthlyTotals(newMonthlyTotalsData);
    const newMonthlySumData = await getMonthlySum(month);
    setSum(newMonthlySumData.sum);
  };

  const handleFormSubmit = async (expense: Expense) => {
    // Handle the form submission data here
    console.log("Form data received in App component:", expense);
    console.log("month", month);
    try {
      const newExpense = await addExpense(expense);
      console.log(newExpense);
      // update all data
      refreshEverything();

      console.log(newExpense);
    } catch (error) {
      console.error("error adding expense:", error);
    }

    // You can send the data to the backend or update the state as needed
  };

  const handleDeleteExpense = async (index: string, title: string) => {
    setIsModalVisible(true);
    console.log(isModalVisible, index, title);
    setExpenseToDelete({ index, title });
  };

  const handleDownloadButtonClicked = () => {
    downloadDataAsCSV(expenses, `expenses_${userName}`);
  };

  /////////////

  return (
    <>
      <TopBar userName={userName} />
      <ExpenseSummary
        months={months}
        onMonthClick={handleMonthClick}
        heights={heights}
        sum={sum}
        monthlyTotals={monthlyTotals}
      />
      <NewExpenseForm onSubmit={handleFormSubmit} />
      <AllExpensesView
        data={expenses}
        onRowClick={(index, title) => console.log(index, title)}
        onDeleteButtonClick={(index, title) =>
          handleDeleteExpense(index, title)
        }
        onDownloadButtonClick={handleDownloadButtonClicked}
      />

      {isModalVisible && (
        <YesNoConfirmation
          title="Delete"
          text={`Confirm delete: ${expenseToDelete.title}?`}
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
          isVisible={isModalVisible}
        />
      )}
    </>
  );
}

export default App;
