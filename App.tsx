import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { ICategoryList, IExpenseList } from './src/utils';

import Card from './src/components/card';
import Header from './src/components/header';
import ExpenseList from './src/components/expenseList';

export default function App() {

  const categories: ICategoryList = {
    categories: [
      {
        id:1,
        color:'red',
        name:'Gasolina'
      },
      {
        id:2,
        color:'blue',
        name:'Alimentação'
      }
    ]
  }

  const expenses: IExpenseList = {
    expenses: [
      {
        amount: 200,
        categoryId:1
      },
      {
        amount:400,
        categoryId:2
      }
    ]
  }

  return (
    <SafeAreaView>
      <Header startDate={new Date()} value={2000} />
      <View style={styles.body}>
        <Card>
          <ExpenseList expenseList={expenses} categoryList={categories}/>
        </Card>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems:'center'
  }
})