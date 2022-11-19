import { FC } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import { IMenuOption } from '../../../utils';
import MenuOption from './menuOption';

const Menu: FC = () => {    

    const options: IMenuOption[] = [
        {
            id:1,
            label:'Novo frete',
            action:() => {}
        },
        {
            id:2,
            label:'Gerenciar categorias',
            action:() => {}
        }
    ];

    return(
        <SafeAreaView>
            <View style={styles.container}>
                {options.map(opt => <MenuOption key={opt.id} option={opt} />)}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20
    }
})

export default Menu;