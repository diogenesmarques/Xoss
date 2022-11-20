import { FC } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { IMenuOption } from '../../../../utils';

interface Props {
    option:IMenuOption
}

const MenuOption: FC<Props> = ({ option }) => {

    const { label, action } = option;

    return(
        <Pressable style={styles.optionContainer} onPress={action}>
                <Text style={styles.option}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
        paddingVertical:15
    },
    option: {
        fontWeight:'300'
    }
});

export default MenuOption;