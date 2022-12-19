import MaskInput, { Masks } from 'react-native-mask-input';
import { FC, useState, useEffect } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ModalTemplate from '..';
import { ICategoryList, ICategory } from '../../../utils';
import CategorySelectModal from './categorySelectModal';

interface Props {
    categoryList: ICategoryList,
    createExpense: (value:number, categoryId:number) => void,
    toggleModal: () => void
}

const NewExpenseModal: FC<Props> = ({ categoryList, createExpense, toggleModal }) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categorySelectModalVisibility, setCategorySelectModalVisibility] = useState<boolean>(false);    
    const [selectedCategoryColor, setSelectedCategoryColor] = useState<string | null>(null);
    const [expenseAmount, setExpenseAmount] = useState<string>(' ');

    useEffect(() => {
        if(selectedCategoryId === null) return;

        const selectedCategory: ICategory | null = categoryList.categories.find(cat => cat.id === selectedCategoryId) ?? null;
        if (selectedCategory) setSelectedCategoryColor(selectedCategory.color);

    }, [selectedCategoryId]);

    const toggleSelect: () => void = () => setCategorySelectModalVisibility(!categorySelectModalVisibility);

    const handleClick: (value:string | null, categoryId:number | null) => void = (value, categoryId) => {
        if (value === null || categoryId === null) return;
        console.log(value);

        createExpense(parseFloat(value.substring(3).replace(',', '.')), categoryId);
        toggleModal();
    }

    return(
        <View>
            <ScrollView contentContainerStyle={styles.modalBody}>

                <MaskInput 
                    style={styles.valueInput} 
                    keyboardType='numeric'
                    value={expenseAmount}
                    onChangeText={setExpenseAmount}
                    mask={Masks.BRL_CURRENCY}
                />

                <TextInput 
                    value={categoryList.categories.find(cat => cat.id === selectedCategoryId)?.name ?? ''} 
                    onPressIn={toggleSelect}
                    style={{...styles.valueInput, borderBottomColor:selectedCategoryColor ?? '#3e4853'}} 
                    placeholder='Selecione a categoria...' 
                    editable={false}
                    placeholderTextColor='lightgrey'
                />
                
            </ScrollView>
            
            <View style={styles.modalFooter}>
                <Pressable onPress={() => handleClick(expenseAmount, selectedCategoryId)} style={styles.createButton}>
                    <Text style={styles.createButtonText} >Criar despesa</Text>
                </Pressable>
            </View>

            <Modal  
                visible={categorySelectModalVisibility} 
                animationType='fade'
                transparent={true} 
                onRequestClose={toggleSelect}
            >
                <ModalTemplate toggleModal={toggleSelect}>
                    <CategorySelectModal 
                        categoryList={categoryList} 
                        setCategory={setSelectedCategoryId} 
                        toggleSelect={toggleSelect} 
                    />
                </ModalTemplate>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    modalFooter: {
        width:'100%',
        height:70,
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    createButton: {
        backgroundColor:'#45c6bd',
        height:'80%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    },
    createButtonText: {
        color:'#F2F2F2'
    },
    modalBody: {
        padding:10,
        justifyContent:'space-between'
    },
    valueInput: {
        borderBottomColor:'#3e4853',
        borderBottomWidth:1,
        paddingVertical:10,
        borderRadius:2,
        color:'#f2f2f2'
    }
})
    
export default NewExpenseModal;
