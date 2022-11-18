import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
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
            <Text>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical:15,
        paddingLeft:5,
        borderRadius:5,
        borderLeftWidth:2        
    }
});

export default CategoryItem;