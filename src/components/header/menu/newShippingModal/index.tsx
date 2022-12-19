import MaskInput, { Masks } from 'react-native-mask-input';
import { FC, useState } from 'react';
import { Text, StyleSheet, Pressable, View, TextInput } from 'react-native';

interface Props {
    createShipping: (value: number) => void
}

const NewShippingModal: FC<Props> = ({ createShipping }) => {

    const [newShippingValue, setNewShippingValue] = useState<string>(' ');

    return(
        <View style={styles.modalContainer}>
            <MaskInput 
                value={newShippingValue}
                onChangeText={setNewShippingValue} 
                mask={Masks.BRL_CURRENCY}
                keyboardType='numeric' 
                style={styles.input} 
            />
            <Pressable style={styles.button} onPress={() => createShipping(parseFloat(newShippingValue.substring(3).replace(',', '.').replace('.', '')))}>
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
        borderBottomColor:'#3e4853',
        borderBottomWidth:1,
        paddingVertical:5,
        color:'#f2f2f2',
        marginBottom:15,
    },
    button: {
        backgroundColor:'#45c6bd',
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
