import { FC } from 'react';
import { Text } from 'react-native';
import { IMenuOption } from '../../../../utils';

interface Props {
    option:IMenuOption
}

const MenuOption: FC<Props> = ({ option }) => {

    const { id, label, action } = option;

    return(
        <Text>{id} - {label}</Text>
    );
}

export default MenuOption;