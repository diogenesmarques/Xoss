import { FC } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import commonStyles from '../../../../common/styles';
import { ICategoryList } from '../../../../utils';

interface Props {
    toggleModal: () => void,
    categories: ICategoryList
}

const CategoriesModal: FC<Props> = ({ toggleModal, categories }) => {
    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable onPress={toggleModal}>
                    <Text style={styles.closeButtonText}>&times;</Text>    
                </Pressable>                
            </View>

            <ScrollView style={styles.body}>
                {categories.categories.map(cat => (
                    <Pressable style={{...styles.category, borderLeftColor:cat.color}}>
                        <Text style={commonStyles.text}>{cat.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={styles.modalFooter}>
                <Pressable style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Nova categoria</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%'
    },
    header: {
        paddingHorizontal:25,
        alignItems:'flex-end'
    },
    closeButtonText: {
        ...commonStyles.text,
        fontSize:32,
        color:'purple'
    },
    body: {
        paddingHorizontal:25
    },
    category: {
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
        borderLeftWidth:3,
        paddingLeft:10,
        borderRadius:5
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
        backgroundColor:'purple',
        height:'70%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    footerButtonText: {
        color:'#f2f2f2',
        fontSize:24,
        fontWeight:'300'
    }
});

export default CategoriesModal;