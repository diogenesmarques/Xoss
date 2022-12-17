import { FC, useState } from 'react';
import { Text, StyleSheet, Pressable, View, TextInput } from 'react-native';

interface Props {
    createShipping: (value: number) => void
}

const NewShippingModal: FC<Props> = ({ createShipping }) => {

    const [newShippingValue, setNewShippingValue] = useState<string>('')

    return(
        <View style={styles.modalContainer}>
            <TextInput onChangeText={value => setNewShippingValue(value)} placeholder='Insira o valor do novo frete...' keyboardType='numeric' style={styles.input} />
            <Text style={styles.warningText}>
                *Nessa versão do aplicativo, criar um novo frete resultará na exclusão de todas as despesas atuais
            </Text>
            <Pressable style={styles.button} onPress={() => createShipping(parseFloat(newShippingValue))}>
                <Text style={styles.buttonText}>Criar novo frete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        padding:10,
        paddingTop:0
    },
    input: {
        borderBottomColor:'#F2F2F2',
        borderBottomWidth:1,
        paddingVertical:5
    },
    button: {
        backgroundColor:'#A4243B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3,
        padding:12
    },
    buttonText: {
        fontWeight:'300',
        color:'#F2F2F2'
    },
    warningText: {
        color:'red',
        fontWeight:'300',
        paddingTop:5,
        paddingBottom:15,
        fontSize:12
    }
});

export default NewShippingModal;