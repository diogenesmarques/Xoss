import { FC, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import commonStyles from '../../common/styles';
import { ICategoryList, IShipping } from '../../utils'
import Menu from './menu';

interface Props {
    shipping: IShipping,
    newShipping: (value: number) => void,
    categories: ICategoryList
}

const Header: FC<Props> = ({ shipping, newShipping, categories }) => {

    const { value } = shipping;

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const toggleMenu: () => void = () => setShowMenu(!showMenu)

    return(
        <View style={styles.main}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={toggleMenu} style={styles.button}>
                    <View style={styles.hambButton}></View>
                    <View style={styles.hambButton}></View>
                    <View style={styles.hambButton}></View>
                </Pressable>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Frete:</Text>
                <Text style={styles.text}>R$ {value.toFixed(2)}</Text>
            </View>

            <Modal          
                visible={showMenu}
                animationType='fade' 
                transparent={true} 
                onRequestClose={toggleMenu}
            >
                <Menu toggleMenu={toggleMenu} newShipping={newShipping} categories={categories}/>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width:'100%',
        height:80,
        top:0,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:5,
    },
    content: {
        margin:'auto',
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    text: {
        ...commonStyles.text,
        fontSize:24
    },
    buttonContainer: {
        width:'90%',
        margin:'auto',
        height:55,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    button: {
        color:'purple',
        fontSize:48,
        justifyContent:'space-evenly',
        alignItems:'flex-end',
        padding:0,
        marginTop:8,
        width:'100%',
        height:'50%'
    },
    hambButton: {
        height:2,
        width:23,
        backgroundColor:'purple',
    }
});

export default Header;