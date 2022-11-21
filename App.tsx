import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, ScrollView, Modal, Text } from 'react-native';
import { useState, useEffect } from 'react';

import { ICategoryList, IExpenseList, IShipping } from './src/utils';

import Card from './src/components/card';
import Header from './src/components/header';
import ExpenseList from './src/components/expenseList';
import Footer from './src/components/footer';
import ModalTemplate from './src/components/Modal';
import NewExpenseModal from './src/components/Modal/NewExpenseModal';

export default function App() {
  
  const [categories, setCategories] = useState<ICategoryList>({
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
  });
  const [expenses, setExpenses] = useState<IExpenseList>({
    expenses: [
      {
        id:1,
        amount: 200,
        categoryId:1
      },
      {
        id:2,
        amount:400,
        categoryId:2
      },
      {
        id:3,
        amount:300,
        categoryId:1
      }
    ]
  });
  const [balance, setBalance] = useState<number>(0);
  const [shipping, setShipping] = useState<IShipping>({value:2000, startDate: new Date()});
  const [newExpenseModalVisibility, setNewExpenseModalVisibility] = useState<boolean>(false);
  useEffect(() => {
    const newBalance: number = shipping.value - (expenses.expenses.reduce((prev, curr) => curr.amount + prev, 0));
    setBalance(newBalance);
  }, [expenses.expenses.length, shipping]);
  const createExpense: (value:number, categoryId:number) => void = (value, categoryId) => {
    expenses.expenses.push({
      id: expenses.expenses.length === 0 ? 1 : expenses.expenses[expenses.expenses.length - 1].id + 1,
      amount: value,
      categoryId,
      createdAt: new Date()
    });
  }

  const toggleModal: () => void = () => setNewExpenseModalVisibility(!newExpenseModalVisibility);
  const newShipping: (value: number) => void = (value) => {
    if (value < 0 || !value) return;

    setShipping({value, startDate:new Date()});
    expenses.expenses = [];
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header categories={categories} shipping={shipping} newShipping={newShipping}/>
      <ScrollView>
        <View>
          <View style={styles.body}>
            {expenses.expenses.length > 0 ? <Card>
              <ExpenseList shipping={shipping.value} expenseList={expenses} categoryList={categories}/>
            </Card> : <></>}
          </View>
        </View>
        <Modal 
          visible={newExpenseModalVisibility}
          animationType='fade' 
          transparent={true} 
          onRequestClose={toggleModal}
        >
          <ModalTemplate toggleModal={toggleModal}> 
            <NewExpenseModal categoryList={categories} createExpense={createExpense} toggleModal={toggleModal} />
          </ModalTemplate>
        </Modal>
      </ScrollView>
      <View>
        <Footer toggleModal={toggleModal} balance={balance} shipping={shipping.value} />
      </View>
    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'space-between',
      height:'100%'
    },
    body: {
      alignItems:'center'
    }
  })