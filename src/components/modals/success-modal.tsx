import { Image, Pressable, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { width } from "../../constants/size";
import { IMAGES } from "../../constants/Images";
import { COLORS } from "../../constants/Colors";

export default function SuccessModal({ title, message, btnText,visible, onPress }: {
    title: string,
    message: string,
    btnText: string,
    visible: boolean,
    onPress:  () => void
}) {
  return (
    <Portal>
        <Modal visible={visible} 
            contentContainerStyle={{ 
                backgroundColor: 'white', width: width * 0.8, 
                padding: 30, margin: 'auto', borderRadius: 18
            }}>
            <View style={{ flexDirection: "column", gap: 20 }}>
                <View style={{ justifyContent: 'center', width: '100%' }}>
                    <Image
                        alt=""
                        source={IMAGES['logoSuccess']!}
                        style={{
                            height: 120,
                            width: 120,
                            borderRadius: 100,
                            marginHorizontal: 'auto'
                        }}
                    />
                </View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 22 }}>{title}</Text>
                <Text style={{ textAlign: "center" }}>{message}</Text>
                <Pressable
                    onPress={onPress}
                    style= {{ paddingVertical: 10, width: '100%', backgroundColor: COLORS.primary, borderRadius: 100,
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8
                    }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold", textAlign: "center", paddingHorizontal: 10}}>{btnText}</Text>
                </Pressable>
            </View>
        </Modal>
    </Portal>
  )
}