import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, ScrollView, Modal, Text } from 'react-native';
import { useState } from 'react';

import { ICategoryList, IExpenseList } from './src/utils';

import Card from './src/components/card';
import Header from './src/components/header';
import ExpenseList from './src/components/expenseList';
import Footer from './src/components/footer';
import ModalTemplate from './src/components/Modal';
import NewExpenseModal from './src/components/Modal/NewExpenseModal';

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
        id:1,
        amount: 200,
        categoryId:1
      },
      {
        id:2,
        amount:400,
        categoryId:2
      }
    ]
  }

  const [newExpenseModalVisibility, setNewExpenseModalVisibility] = useState<boolean>(false);

  const toggleModal: () => void = () => setNewExpenseModalVisibility(!newExpenseModalVisibility);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View>
          <Header startDate={new Date()} value={2000} />
          <View style={styles.body}>
            <Card>
              <ExpenseList expenseList={expenses} categoryList={categories}/>
            </Card>
          </View>
        </View>
        <Modal 
          visible={newExpenseModalVisibility} 
          animationType='fade' 
          transparent={true} 
          onRequestClose={toggleModal}          
        >
          <ModalTemplate toggleModal={toggleModal}> 
            <NewExpenseModal categoryList={categories}/>
          </ModalTemplate>
        </Modal>
      </ScrollView>

      <View>
        <Footer toggleModal={toggleModal}/>
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