import { FC, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from '../../../common/styles';
import { ICategory, IExpense, IExpenseList } from '../../../utils';

interface Props {
    category: ICategory,
    expenseList: IExpenseList
}

const Category: FC<Props> = ({category, expenseList}) => {
    const { color, name } = category;

    const [categoryTotalAmount, setCategoryTotalAmount] = useState<number>(0);
    const [categoryPercentage, setCategoryPercentage] = useState<number>(0);

    const calcPercentage: (part:number, total:number) => number = (part, total) => (100 * part) / total;

    useEffect(() => {
        const categoryExpenses: IExpense[] = expenseList.expenses.filter(exp => exp.categoryId === category.id)
        const totalCategoryAmount: number = categoryExpenses.reduce((prev, curr) => curr.amount + prev, 0);
        const totalAmount: number = expenseList.expenses.reduce((prev, curr) => curr.amount + prev, 0);
        const percentage: number = calcPercentage(totalCategoryAmount, totalAmount);

        setCategoryTotalAmount(totalCategoryAmount);
        setCategoryPercentage(percentage);

    }, [expenseList.expenses.length]);


    return(
        <View style={styles.category}>
            <View style={{...styles.color, backgroundColor:color}}>
                <Text style={{color}}> .</Text>
            </View>
            <View style={styles.categoryText}>
                <View>
                    <Text style={commonStyles.text}>{name}</Text>
                </View>
                <View>
                    <Text style={commonStyles.text}>
                        R$ {(categoryTotalAmount.toFixed(2).replace('.', ','))} ({(categoryPercentage.toFixed(1).replace('.', ','))}%)
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        width:'100%'
    },
    category: {
        paddingVertical:2,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#d4d4d4',
        borderBottomWidth:1
    },
    color: {
        width:'3%',
        height:'60%',
        marginRight:5,
        borderRadius:100
    },
    categoryText: {
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default Category;