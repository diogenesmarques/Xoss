export interface IShipping {
    startDate?: Date,
    endDate?: Date,
    value: number
}

export interface ICategory {
    id: number,
    name: string,
    color: string
}

export interface ICategoryList {
    categories: ICategory[]
}

export interface IExpense {
    id: number,
    createdAt?: Date,
    categoryId: number,
    amount: number,
}

export interface IExpenseList {
    expenses: IExpense[]
}

export interface IMenuOption {
    id: number,
    label: string,
    action: () => void
}