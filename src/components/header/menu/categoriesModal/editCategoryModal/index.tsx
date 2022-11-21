import { FC, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { ICategory } from '../../../../../utils';

interface Props {
    category: ICategory | null,
    createCategory: (name: string) => void,
    toggleModal: () => void,
    editCategoryName: (category: ICategory, name: string) => void,
    deleteCategory: (category: ICategory) => void
}

const EditCategoryModal: FC<Props> = ({ category, createCategory, toggleModal, editCategoryName, deleteCategory }) => {

    const [catName, setCatName] = useState<string>(category ? category.name : '');

    const handleClick: (name:string) => void = (name) => {
        if (!name) return;

        if (!category) createCategory(name);
        else editCategoryName(category, name)

        toggleModal();
    }

    const handleDeleteClick: () => void = () => {
        if(category !== null) deleteCategory(category);
        toggleModal();
    }

    return(
        <View>
            <ScrollView style={styles.container}>
                <TextInput style={styles.input} value={catName} placeholder='Insira o nome da categoria...' onChangeText={text => setCatName(text)} />
            </ScrollView>
            <View style={styles.footer}>

                {category ?
                    <Pressable onPress={handleDeleteClick} style={{...styles.button, ...styles.deleteButton}}>
                        <Text style={{...styles.buttonText, color:'red'}}>Excluir categoria</Text>
                    </Pressable> : <></>
                }

                <Pressable style={styles.button} onPress={() => handleClick(catName)}>
                    <Text style={styles.buttonText}>{category ? 'Confirmar alterações' : 'Criar categoria'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20
    },
    footer: {
        width:'100%',
        paddingBottom:10,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:20
    },
    button: {
        backgroundColor:'purple',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        padding:12,
        width:'100%'
    },
    buttonText: {
        fontWeight:'300',
        color:'#F2F2F2'
    },
    input: {
        borderBottomColor:'#F2F2F2',
        borderBottomWidth:1,
        paddingVertical:10,
        fontWeight:'300'
    },
    deleteButton: {
        backgroundColor:'white',
        marginVertical:5,
        borderColor:'red',
        borderWidth:1
    }
});

export default EditCategoryModal;