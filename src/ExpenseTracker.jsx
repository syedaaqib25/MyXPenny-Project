import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [savingTip, setSavingTip] = useState("Loading...");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const categories = ["Groceries", "Rent", "Transport", "Entertainment", "Utilities", "Other"];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

  const expenseData = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
    return { name: cat, value: total };
  }).filter((d) => d.value > 0);

  useEffect(() => {
    setSavingTip("Track your daily expenses to avoid end-of-month surprises.");
  }, []);

  const addExpense = () => {
    if (!amount || !category) return;
    setExpenses([...expenses, { amount, category, note }]);
    setAmount("");
    setCategory("");
    setNote("");
  };

  const prevDay = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const nextDay = () => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="italic text-xl font-bold">MyXpenny</h1>
        <nav className="flex gap-4">
          <Button variant="ghost">Income</Button>
          <Button variant="ghost">Expense</Button>
          <Button variant="ghost">Transfer</Button>
        </nav>
        <Input type="text" placeholder="Search..." className="w-1/4" />
      </div>
      
      <div className="flex justify-center items-center mb-4 gap-4">
        <Button variant="ghost" onClick={prevDay}><ChevronLeft /></Button>
        <span className="text-lg font-semibold">{`${selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}</span>
        <Button variant="ghost" onClick={nextDay}><ChevronRight /></Button>
      </div>
      
      <Card className="mb-4">
        <CardContent>
          <p className="font-semibold">Tips and Suggestions:</p>
          <p>{savingTip}</p>
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Expense List:</h2>
        <div className="max-h-40 overflow-y-auto border p-2 rounded-md">
          <ul className="list-disc pl-5">
            {expenses.slice(-5).map((exp, idx) => (
              <li key={idx} className="py-1 border-b last:border-b-0">{exp.category}: ₹{exp.amount}</li>
            ))}
          </ul>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold mb-2">Expense Breakdown:</h2>
          {expenseData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500">No data to show yet.</p>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="rounded-full p-3 text-white bg-black border-black">
              <Plus size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center text-lg font-bold">Add Expense</DialogTitle>
            <div className="flex justify-between gap-4 mb-4">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-1/2"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-1/2 p-2 border rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <Input
              type="text"
              placeholder="Add Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-2"
            />
            <Button onClick={addExpense} className="w-full">Add Expense</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
