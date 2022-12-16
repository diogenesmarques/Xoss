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

export const moneyMask = (value: string) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  );

  return 'R$ ' + result;
}
