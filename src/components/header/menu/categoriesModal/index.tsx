import { FC, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import commonStyles from '../../../../common/styles';
import { ICategory, ICategoryList } from '../../../../utils';
import ModalTemplate from '../../../Modal';
import EditCategoryModal from './editCategoryModal';

interface Props {
    toggleModal: () => void,
    categories: ICategoryList,
    createCategory: (name: string) => void,
    editCategoryName: (category: ICategory, name: string) => void,
    deleteCategory: (category: ICategory) => void
}

const CategoriesModal: FC<Props> = ({ toggleModal, categories, createCategory, editCategoryName, deleteCategory }) => {

    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const toggleEditModal: () => void = () => setShowEditModal(!showEditModal);

    const [category, setCategory] = useState<ICategory | null>(null);

    const handleCategoryClick: (cat: ICategory) => void = (cat) => {
        setCategory(cat);
        toggleEditModal();
    }

    const handleButtonClick: () => void = () => {
        setCategory(null);
        toggleEditModal();
    }

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable onPress={toggleModal}>
                    <Text style={styles.closeButtonText}>&times;</Text>    
                </Pressable>                
            </View>

            <ScrollView style={styles.body}>
                {categories.categories.map(cat => (
                    <Pressable key={cat.id} onPress={() => handleCategoryClick(cat)} style={{...styles.category, borderLeftColor:cat.color}}>
                        <Text style={commonStyles.text}>{cat.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.modalFooter}>
                <Pressable style={styles.footerButton} onPress={handleButtonClick}>
                    <Text style={styles.footerButtonText}>Nova categoria</Text>
                </Pressable>
            </View>

            <Modal
                visible={showEditModal}
                animationType='fade' 
                transparent={true} 
                onRequestClose={toggleEditModal}
            >
                <ModalTemplate toggleModal={toggleEditModal}>
                    <EditCategoryModal createCategory={createCategory} toggleModal={toggleEditModal} category={category} editCategoryName={editCategoryName} deleteCategory={deleteCategory} />
                </ModalTemplate>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor:'#292f36'
    },
    header: {
        paddingHorizontal:25,
        alignItems:'flex-end'
    },
    closeButtonText: {
        ...commonStyles.text,
        fontSize:32,
        color:'#45c6bd'
    },
    body: {
        paddingHorizontal:25
    },
    category: {
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#3e4853',
        borderLeftWidth:3,
        paddingLeft:10,
        borderRadius:3
    },
    modalFooter: {
        width:'100%',
        height:90,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        paddingHorizontal:20
    },
    footerButton: {
        backgroundColor:'#45c6bd',
        height:'70%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    },
    footerButtonText: {
        color:'#f2f2f2',
        fontSize:24,
        fontWeight:'300'
    }
});

export default CategoriesModal;
