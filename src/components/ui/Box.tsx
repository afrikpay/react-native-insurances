import { View } from "react-native";
import { COLORS } from "../../constants/Colors";

export function Box({ children, width, height, padding }: any) {
    return (
        <View style={{ 
            height: height ?? 'auto', 
            width: width,
            padding: padding ?? 10, 
            borderColor: COLORS.primary,
            borderWidth: 0.6, 
            borderRadius: 8, 
            backgroundColor: COLORS.white, // Ajout d'une couleur de fond pour l'ombre
            shadowColor: COLORS.dark, // Couleur de l'ombre
            shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
            shadowOpacity: 0.2, // Opacité de l'ombre
            shadowRadius: 6, // Rayon de flou de l'ombre
            elevation: 5, // Ombre pour Android
            flexDirection: 'column',
            flexWrap: 'wrap',
            overflow: 'hidden' 
        }}>
            { children }
        </View>
    )
}