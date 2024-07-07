// class to store individual expenses
export class Expense {
    date: string;
    category: string;
    title: string;
    amount: number;
    notes: string;

    constructor(date: string, category: string, title: string, amount: number, notes: string) {
        this.date = date;
        this.category = category;
        this.title = title;
        this.amount = amount;
        this.notes = notes;
    }
}