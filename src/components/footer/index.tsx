import { FC, useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

interface Props {
    toggleModal: () => void,
    balance: number,
    shipping: number
}

const Footer: FC<Props> = ({toggleModal, balance, shipping}) => {

    const calcPercentage: (part:number, total:number) => number = (part, total) => {
      if (total === 0) return 100;
      return (100 * part) / total;
    } 

    const [balanceColor, setBalanceColor] = useState<string>('#000');
    const [balancePercentage, setBalancePercentage] = useState<number>(0);

    useEffect(() => {
        if (balance > 0) setBalanceColor('darkgreen');
        if (balance === 0) setBalanceColor('#000');
        if (balance < 0) setBalanceColor('darkred');

        const newBalancePercentage = calcPercentage(balance, shipping);
        setBalancePercentage(isNaN(newBalancePercentage) ? 0 : newBalancePercentage);
    }, [balance]);

    return (
        <View style={styles.footer}>
            <View style={styles.balanceContainer}>
                <Text style={{...styles.balanceText, color:balanceColor}}>
                    Saldo:
                </Text>
                <Text style={{...styles.balanceText, color:balanceColor}}>
                    R${(balance.toFixed(2)).replace('.', ',')} ({(balancePercentage.toFixed(1)).replace('.', ',')}%)
                </Text>
            </View>
            <Pressable style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>Nova despesa</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width:'100%',
        height:90,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:20
    },
    button: {
        backgroundColor:'#A4243B',
        height:'70%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    },
    buttonText: {
        color:'#f2f2f2',
        fontSize:24,
        fontWeight:'300'
    },
    balanceContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingVertical:5
    },
    balanceText: {
        fontSize:24,
        fontWeight:'300'
    }
})

export default Footer;
