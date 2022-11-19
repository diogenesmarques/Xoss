import { FC, useState, useEffect } from 'react';
import { ICategoryList, IExpenseList } from '../../utils';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import Category from './category';

interface Props {
    expenseList: IExpenseList,
    categoryList: ICategoryList,
    shipping: number
}

const ExpenseList: FC<Props> = ({ expenseList, categoryList, shipping }) => {

    const calcPercentage: (part: number, total: number) => number = (part, total) => (100 * part) / total

    const [total, setTotal] = useState<number>(0);
    const [totalPercentage, setTotalPercentage] = useState<number>(0);

    useEffect(() => {
        const newTotal: number = expenseList.expenses.reduce((prev, curr) => curr.amount + prev, 0);
        const newPercentage = calcPercentage(newTotal, shipping);

        setTotal(newTotal);
        setTotalPercentage(newPercentage);
    }, [expenseList.expenses.length, shipping]);

    return(
        <View>
            <ScrollView>
                {categoryList.categories.filter(cat => expenseList.expenses.some(exp => exp.categoryId === cat.id)).map(cat => {
                    return(
                        <Category category={cat} expenseList={expenseList} key={cat.id} />
                    )
                })}
            </ScrollView>
            <View style={styles.cardFooter}>
                <Text>
                    Total:
                </Text>
                <Text>
                    R$ {(total.toFixed(2)).replace('.', ',')} ({(totalPercentage.toFixed(1)).replace('.', ',')}%)
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardFooter: {
        flexDirection:'row',
        marginTop:5,
        width:'100%',
        justifyContent:'space-between'
    }
});

export default ExpenseList;