import { FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ICategoryList } from '../../../../utils';
import CategoryItem from './categoryItem';

interface Props {
    categoryList: ICategoryList,
    setCategory: React.Dispatch<React.SetStateAction<number | null>>,
    toggleSelect: () => void
}

const CategorySelectModal: FC<Props> = ({ categoryList, setCategory, toggleSelect }) => {

    return(
        <View style={styles.modalBody}>
            <ScrollView>
                {categoryList.categories.map(cat => {
                    return <CategoryItem key={cat.id} category={cat} setCategory={setCategory} toggleSelect={toggleSelect} /> 
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalBody: {
        padding:10,
        minHeight:250
    }
});

export default CategorySelectModal;