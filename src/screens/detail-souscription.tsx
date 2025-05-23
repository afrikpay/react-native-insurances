import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import RenderHtml from 'react-native-render-html'
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'


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
            
        </ScrollView>
    </View>
  )
}