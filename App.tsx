import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, ScrollView, Modal } from 'react-native';
import { useState, useEffect } from 'react';

import { ICategory, ICategoryList, IExpenseList, IShipping } from './src/utils';

import Card from './src/components/card';
import Header from './src/components/header';
import ExpenseList from './src/components/expenseList';
import Footer from './src/components/footer';
import ModalTemplate from './src/components/Modal';
import NewExpenseModal from './src/components/Modal/NewExpenseModal';

export default function App() {

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData: () => void = async () => {
    const categories: string | null = await AsyncStorage.getItem('categories');
    if (!categories) setCategories({categories:[]});
    else setCategories({categories:JSON.parse(categories)});

    const expenses: string | null = await AsyncStorage.getItem('expenses');
    if (!expenses) setExpenses({expenses:[]});
    else setExpenses({expenses:JSON.parse(expenses)});

    const shipping: string | null = await AsyncStorage.getItem('shipping');
    if (!shipping) setShipping({value:0});
    else setShipping(JSON.parse(shipping))
  }
  
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

  const createExpense: (value: number, categoryId: number) => void = (value, categoryId) => {
    expenses.expenses.push({
      id: expenses.expenses.length === 0 ? 1 : expenses.expenses[expenses.expenses.length - 1].id + 1,
      amount: value,
      categoryId,
      createdAt: new Date()
    });
    AsyncStorage.setItem('expenses', JSON.stringify(expenses.expenses));
  }

  const randomColor: () => string = () => `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`

  const createCategory: (name: string) => void = (name) => {
    categories.categories.push({
      id: categories.categories.length === 0 ? 1 : categories.categories[categories.categories.length - 1].id + 1,
      name,
      color:randomColor()
    });
    AsyncStorage.setItem('categories', JSON.stringify(categories.categories));
  }

  const editCategoryName: (category: ICategory, name: string) => void = (category, name) => {
    const index = categories.categories.indexOf(category);
    categories.categories[index].name = name;
    AsyncStorage.setItem('categories', JSON.stringify(categories.categories));
  }

  const deleteCategory: (category: ICategory) => void = (category) => {
    setCategories(prevState => {
      return({
        categories:[...prevState.categories.filter(cat => cat.id !== category.id)]
      });
    });
    setExpenses(prevState => {
      return({
        expenses:[...prevState.expenses.filter(exp => exp.categoryId !== category.id)]
      });
    });
    AsyncStorage.setItem('categories', JSON.stringify(categories.categories));
  }

  const toggleModal: () => void = () => setNewExpenseModalVisibility(!newExpenseModalVisibility);
  const newShipping: (value: number) => void = (value) => {
    if (value < 0 || !value) return;

    setShipping({value, startDate:new Date()});
    expenses.expenses = [];
    AsyncStorage.setItem('expenses', JSON.stringify([]));
    AsyncStorage.setItem('shipping', JSON.stringify({value, startDate:new Date()}));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header categories={categories} shipping={shipping} newShipping={newShipping} createCategory={createCategory} editCategoryName={editCategoryName} deleteCategory={deleteCategory} />
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