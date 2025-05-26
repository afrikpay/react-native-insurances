import { ScrollView, StatusBar, Image, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import RenderHtml from 'react-native-render-html'
import { COLORS } from '../constants/Colors'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'
import { Box } from '../components/ui/Box'


export default function DetailSouscription() {
  return (
    <View style={{flex: 1, 
        height: height, width: width,  
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20
    }}>
        <StatusBar hidden />
        <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30}}>
            {/** Navigation bar  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <TouchableOpacity onPress={() => { Navigation.back() }}>
                    <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Détails souscription</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>Premium Gold</Text>
                <TouchableOpacity onPress={() => { }} style={{
                    width: 40, height: 40,
                    borderRadius: 20, backgroundColor: COLORS.primary,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Icon.MessageSquare color={COLORS.white} strokeWidth={2} width={20} height={20} />
                </TouchableOpacity>
            </View>
            <Box width={'100%'} padding={18}>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <View style={{ flex: 1, gap: 16}}>
                        <Image
                            alt="Image de l'assurance santé"
                            source={require("../assets/logo.png")}
                            style={{ height: 40, width: 40 }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ height: 10, width: 10, backgroundColor: COLORS.success, borderRadius: 10 }}></View>
                            <Text style={{ color: COLORS.success, fontSize: 16 }}>Actif</Text>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>01 an</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column', gap: 8 }}>
                        <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Type:</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>Assurance santé classique</Text>
                        </View>
                        <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Souscrit le :</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail'>25/04/2025</Text>
                        </View>
                        <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Activé le :</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail'>27/04/2025</Text>
                        </View>
                        <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Validité :</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail'>26/04/2026</Text>
                        </View>
                        <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Prime: </Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold' }}>74 000 XAF</Text>
                        </View>
                    </View>
                </View>
            </Box>
            <TouchableOpacity onPress={() => { }} style={{ }}>
                <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: 'bold' }}>Télécharger le contrat</Text>
            </TouchableOpacity>
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
            
        </ScrollView>
    </View>
  )
}