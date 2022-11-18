import { FC } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

interface Props {
    toggleModal: () => void
}

const Footer: FC<Props> = ({toggleModal}) => {

    return (
        <View style={styles.footer}>
            <Pressable style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>Nova despesa</Text>
            </Pressable>
        </View>
    );
}



const styles = StyleSheet.create({
    footer: {
        backgroundColor:'#f2f2f2',
        width:'100%',
        height:70,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:10
    },
    button: {
        backgroundColor:'purple',
        height:'90%',
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    buttonText: {
        color:'#f2f2f2',
        fontSize:24
    }
})

export default Footer;