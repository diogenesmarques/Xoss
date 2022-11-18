import { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import commonStyles from '../../common/styles';
import { IShipping } from '../../utils'

const Header: FC<IShipping> = ({ startDate, endDate, value }) => {
    return(
        <View style={styles.main}>
            <View style={styles.content}>
                <Text style={styles.text}>Frete:</Text>
                <Text style={styles.text}>R$ {value.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width:'100%',
        height:'35%',
        top:0,
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        margin:'auto',
        height:'100%',
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text: {
        ...commonStyles.text,
        fontSize:40
    }
});

export default Header;