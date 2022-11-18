import { FC } from 'react';
import { ICategoryList, IExpenseList } from '../../utils';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Props {
    expenseList: IExpenseList,
    categoryList: ICategoryList
}

const ExpenseList: FC<Props> = ({ expenseList, categoryList }) => {

    const expense: FC<any> = ({item}) => {

        const color: string = categoryList.categories.find(cat => cat.id === item.categoryId)?.color ?? 'black';

        return(
            <View>
                <Text style={{color}}>{item.amount}</Text>
            </View>
        )
    }

    return(
        <View>
            <FlatList data={expenseList.expenses} renderItem={expense}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default ExpenseList;