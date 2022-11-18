import { FC } from 'react';
import { ICategoryList, IExpenseList } from '../../utils';
import { View, ScrollView } from 'react-native';

import Expense from './expense'

interface Props {
    expenseList: IExpenseList,
    categoryList: ICategoryList
}

const ExpenseList: FC<Props> = ({ expenseList, categoryList }) => {
    return(
        <View>
            <ScrollView>
                {expenseList.expenses.map(exp => {
                    return <Expense key={exp.id} categoryList={categoryList} expense={exp}></Expense>
                })}
            </ScrollView>
        </View>
    );
}

export default ExpenseList;