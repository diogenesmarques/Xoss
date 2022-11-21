import { FC, useEffect, useState, useRef } from 'react';
import { SafeAreaView, Pressable, StyleSheet, View, GestureResponderEvent, Animated, Modal, ScrollView, Text } from 'react-native'
import { ICategory, ICategoryList, IMenuOption } from '../../../utils';
import ModalTemplate from '../../Modal';
import MenuOption from './menuOption';
import NewShippingModal from './newShippingModal';
import CategoriesModal from './categoriesModal'

interface Props {
    toggleMenu: () => void,
    newShipping: (value: number) => void,
    categories: ICategoryList,
    createCategory: (name: string) => void,
    editCategoryName: (category: ICategory, name: string) => void,
    deleteCategory: (category: ICategory) => void
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

const Menu: FC<Props> = ({toggleMenu, newShipping, categories, createCategory, editCategoryName, deleteCategory}) => {

    const slideAnim = useRef(new Animated.Value(500)).current;
    const slideInAnim = Animated.timing(slideAnim, { toValue:0, duration:300, useNativeDriver: true });
    const slideOutAnim = Animated.timing(slideAnim, { toValue:500, duration:300, useNativeDriver: true });
    useEffect(() => {
        slideInAnim.start();
    }, []);    
    const handleBgPress: (event: GestureResponderEvent) => void = (event) => { // @ts-ignore
        if (!(event.target.viewConfig.uiViewClassName === 'RCTView')) return;
        slideOutAnim.start();
        setTimeout(toggleMenu, 300);
    }
    const [menuStyle, setMenuStyle] = useState({...styles.menu, transform:[{ translateX:slideAnim }]});

    const options: IMenuOption[] = [
        {
            id:1,
            label:'Novo frete',
            action:() => toggleShippingModal()
        },
        {
            id:2,
            label:'Gerenciar categorias',
            action:() => toggleCategoriesModal()
        }
    ];

    const [showNewShippingModal, setShowNewShippingModal] = useState<boolean>(false);
    const toggleShippingModal: () => void = () => setShowNewShippingModal(!showNewShippingModal);
    const handleCreateNewShipping: (value: number) => void = (value) => {
        if (value <= 0 || !value) return;

        newShipping(value);

        toggleShippingModal();
        slideOutAnim.start();
        setTimeout(toggleMenu, 300);
    }

    const [showCategoriesModal, setShowCategoriesModal] = useState<boolean>(false);
    const toggleCategoriesModal: () => void = () => setShowCategoriesModal(!showCategoriesModal);

    return(
        <>
            <Pressable style={styles.menuBg} onPress={e => handleBgPress(e)}>
                <AnimatedSafeAreaView style={menuStyle}>
                    <ScrollView>
                        <View style={styles.menuContainer}>
                            {options.map(opt => <MenuOption key={opt.id} option={opt} />)}
                        </View>
                    </ScrollView>
                </AnimatedSafeAreaView>
            </Pressable>

            <Modal 
                visible={showNewShippingModal}
                animationType='fade'
                transparent={true} 
                onRequestClose={toggleShippingModal}
            >
                <ModalTemplate toggleModal={toggleShippingModal}>
                    <NewShippingModal createShipping={handleCreateNewShipping}/>
                </ModalTemplate>
            </Modal>

            <Modal
                visible={showCategoriesModal}
                animationType='slide'
                transparent={false} 
                onRequestClose={toggleShippingModal}
            >
                <CategoriesModal categories={categories} toggleModal={toggleCategoriesModal} createCategory={createCategory} editCategoryName={editCategoryName} deleteCategory={deleteCategory} />
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    menuBg: {
        backgroundColor:'#00000083',
        height:'100%',
        width:'100%'
    },
    menu: {
        marginLeft:50,
        backgroundColor:'white',
        height:'100%'
    },
    menuContainer: {
        paddingHorizontal:20
    }
});

export default Menu;