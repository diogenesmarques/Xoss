import { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import commonStyles from '../../../common/styles';
import { ICategoryList, IExpense } from '../../../utils';

interface Props {
    categoryList: ICategoryList,
    expense: IExpense
}

const Expense: FC<Props> = ({categoryList, expense}) => {
    const { color, name } = categoryList.categories.find(cat => cat.id === expense.categoryId) ?? { color:'black', name:'Não informado'};
    return(
        <View style={styles.expense}>
            <View style={{...styles.color, backgroundColor:color}}>
                <Text style={{color}}> .</Text>
            </View>
            <View style={styles.expenseText}>
                <View>
                    <Text style={commonStyles.text}>{name}</Text>
                </View>
                <View>
                    <Text style={commonStyles.text}>R$ {expense.amount.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        width:'100%'
    },
    expense: {
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
    expenseText: {
        width:'95%',
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default Expense;