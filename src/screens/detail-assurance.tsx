import { FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import RenderHtml from 'react-native-render-html'
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'
import { ROUTES } from '../constants/Routes'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function DetailAssurance() {
  return (
    <SafeAreaView style={{flex: 1, 
        height: height, width: width,  
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20 }}>
        <StatusBar hidden />
        <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30}}>
            {/** Navigation bar  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <TouchableOpacity onPress={() => { Navigation.back() }}>
                    <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Description assurance</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>Assurance santé classique</Text>
                <Image
                    alt="Image de l'assurance santé"
                    source={ImageSante}
                    style={{
                        height: 45,
                        width: 45,
                    }}
                />
            </View>
        </View>
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, padding: 20, backgroundColor: '#F4F5F6'}}>   
            <RenderHtml
                contentWidth={width}
                source={{
                    html: `
                    <section>
                        <h1>Description</h1>
                        <p>L’assurance sante classique couvre tous les services médicaux dans des établissements hospitaliers agréés, sur toute l’etendue du territoire national.</p>
                        <h1>Garanties</h1>
                        <ul>
                            <li>Hospitalisation médicale et chirurgicale</li>
                            <li>Consultations</li>
                            <li>Pharmacie</li>
                            <li>Analyses médicales/Radiologie</li>
                            <li>Pathologies particulières</li>
                        </ul>
                    </section>
                    `
                }}
            />
            <View style={{ flexDirection: 'column', gap: 12, marginTop: 20 }}>
                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Formules offertes</Text>
                <FlatList
                        data={[0,1,2,3,4,5,6,7,8,9]}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        extraData={(item: any) => `${item.id}`}
                        renderItem={({ item }) =>
                        (
                            <Pressable
                                onPress={() => { Navigation.navigate(ROUTES.DETAIL_FORMULE) }}
                                key={item} style={{
                                width: 250, height: 'auto', borderWidth: 0.05,
                                borderRadius: 12,
                                marginRight: 15,
                                padding: 15, gap: 15,
                                backgroundColor: COLORS.white, // Ajout d'une couleur de fond pour l'ombre
                                shadowColor: COLORS.dark, // Couleur de l'ombre
                                shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
                                shadowOpacity: 0.2, // Opacité de l'ombre
                                shadowRadius: 6, // Rayon de flou de l'ombre
                                elevation: 2, // Ombre pour Android
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>Standard</Text>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Icon.ChevronRight color={COLORS.primary} strokeWidth={2} width={25} height={25} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Text>Prime TTC</Text>
                                    <View>
                                        <Text style={{ fontWeight: 'bold'}}>59 500 XAF - Enfant</Text>
                                        <Text style={{ fontWeight: 'bold'}}>74 000 XAF - Adulte</Text>
                                    </View>
                                </View>
                                <Text>Couverture jusqu’a 500 000 XAF</Text>
                                <View style={{ flexDirection: 'row', gap: 10}}>
                                    <Text style={{ fontWeight: 'bold'}}>Durée</Text>
                                    <Text style={{ fontWeight: 'bold'}}>01 an</Text>
                                </View>
                            </Pressable>
                        )
                } />
            </View>
            <View style={{ height: 40 }}/>
        </ScrollView>
    </SafeAreaView>
  )
}