import { FC, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import commonStyles from '../../common/styles';
import { ICategory, ICategoryList, IShipping } from '../../utils'
import Menu from './menu';

interface Props {
    shipping: IShipping,
    newShipping: (value: number) => void,
    categories: ICategoryList,
    createCategory: (name: string) => void,
    editCategoryName: (category: ICategory, name: string) => void,
    deleteCategory: (category: ICategory) => void
}

const Header: FC<Props> = ({ shipping, newShipping, categories, createCategory, editCategoryName, deleteCategory }) => {

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
                <Text style={styles.text}>R$ 
                    {
                        value.toFixed(2)
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            .replace(/(.+)([.])(\d{2})/g, '$1,$3')
                    }
                </Text>
            </View>

            <Modal          
                visible={showMenu}
                animationType='fade' 
                transparent={true} 
                onRequestClose={toggleMenu}
            >
                <Menu toggleMenu={toggleMenu} newShipping={newShipping} categories={categories} createCategory={createCategory} editCategoryName={editCategoryName} deleteCategory={deleteCategory} />
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
        fontSize:24,
        color:'#f2f2f2'        
    },
    buttonContainer: {
        width:'90%',
        margin:'auto',
        height:55,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    button: {
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
        backgroundColor:'#45c6bd',
    }
});

export default Header;
