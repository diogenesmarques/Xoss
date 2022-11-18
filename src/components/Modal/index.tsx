import { FC } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import commonStyles from '../../common/styles';

interface Props {
    toggleModal: () => void,
    children: React.ReactNode,
    showHeader?: boolean
}

const ModalTemplate: FC<Props> = ({toggleModal, children, showHeader}) => {
    return(
        <SafeAreaView style={styles.modalBackground}>
            <View style={styles.modal}>
                {showHeader === false ? 
                    <></> : 
                    <View style={styles.modalHeader}>
                        <Pressable style={styles.closeButton} onPress={toggleModal}>
                            <Text style={{...styles.modalText, ...commonStyles.text}}>&times;</Text>
                        </Pressable> 
                    </View>
                }

                <View>{children}</View>

            </View>
           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor:'#00000083',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%'
    },
    modal: {
        width:'80%',
        backgroundColor:'white',
        borderRadius:10
    },
    modalHeader: {
        paddingTop:5,
        paddingHorizontal:8,
        alignItems:'flex-end'
    },
    closeButton: {
        width:25,
        justifyContent:'center',
        alignItems:'center'
    },
    modalText: {
        fontSize:24
    }    
});

export default ModalTemplate;