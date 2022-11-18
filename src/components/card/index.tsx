import { FC } from 'react';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
    children: React.ReactNode
}

const Card: FC<Props> = ({children}) => {
    return(
        <View style={styles.main}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor:'#E0E2DB',
        width:'90%',
        padding:'3%',
        borderRadius:5
    }
});

export default Card;