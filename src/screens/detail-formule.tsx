import { Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import RenderHtml from 'react-native-render-html'
import { COLORS } from '../constants/Colors'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'

export default function DetailFormule() {
  return (
    <View style={{flex: 1, 
            height: height, width: width,  
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            gap: 20
        }}>
            <StatusBar hidden />
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30, paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray}}>
                {/** Navigation bar  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity onPress={() => { Navigation.back() }}>
                        <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Details Formule</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        alt="Image de l'assurance santé"
                        source={require("../assets/logo.png")}
                        style={{
                            height: 80,
                            width: 80,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' }}>Premium Gold</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: 20,}}>   
                <RenderHtml
                    contentWidth={width}
                    source={{
                        html: `
                        <table>
                            <tr style="width: 100%;display: flex; flex-direction: row;">
                                <td>Térritorialité</td>
                                <td>Taux</td>
                                <td>Base de remboursement</td>
                            </tr>
                            <tr>
                                <td>Cameroun uniquement</td>
                                <td>80%</td>
                                <td>Tarif des hôpitaux publics et confessionnels</td>
                            </tr>
                        </table>
                        `
                    }}
                />
                <Pressable
                    onPress={() => {console.log("Souscrire");}}
                    style= {{ paddingVertical: 12,  paddingHorizontal: 16, marginTop: 40, backgroundColor: COLORS.primary, borderRadius: 100 }}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18, textAlign: 'center'}}>Souscrire</Text>
                </Pressable>
                
            </ScrollView>
        </View>
  )
}
