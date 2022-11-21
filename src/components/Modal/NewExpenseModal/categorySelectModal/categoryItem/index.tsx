import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import commonStyles from '../../../../../common/styles';
import { ICategory } from '../../../../../utils';

interface Props {
    category: ICategory,
    setCategory: React.Dispatch<React.SetStateAction<number | null>>,
    toggleSelect: () => void
}

const CategoryItem: FC<Props> = ({category, setCategory, toggleSelect}) => {

    const handleClick: (id:number) => void = id => {
        setCategory(id);
        toggleSelect();
    }

    const { id, name, color } = category;

    return(
        <Pressable onPress={() => handleClick(id)} style={{...styles.item, borderLeftColor:color}}>
            <Text style={commonStyles.text}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
        borderLeftWidth:3,
        paddingLeft:10,
        borderRadius:5
    }
});

export default CategoryItem;