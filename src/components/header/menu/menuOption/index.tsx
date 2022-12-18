import { FC } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import commonStyles from '../../../../common/styles';
import { IMenuOption } from '../../../../utils';

interface Props {
    option:IMenuOption
}

const MenuOption: FC<Props> = ({ option }) => {

    const { label, action } = option;

    return(
        <Pressable style={styles.optionContainer} onPress={action}>
                <Text style={commonStyles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        borderBottomWidth:1,
        borderBottomColor:'#3e4853',
        paddingVertical:15
    },
});

export default MenuOption;
