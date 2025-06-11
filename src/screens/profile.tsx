import { Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { height, width } from '../constants/size'
import { COLORS } from '../constants/Colors'
import * as Icon from 'react-native-feather'
import Navigation from '../services/Navigation'
import { ROUTES } from '../constants/Routes'

export default function Profile() {
  return (
    <View style={{flex: 1, 
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
                <Text style={{ fontSize: 18, flex: 1, fontWeight: 'bold' }}>Profil</Text>
            </View>
        </View>

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingHorizontal: 20, marginTop: 15 }}>

            <View style={{ width: '100%', borderRadius: 12, backgroundColor: COLORS.primary, padding: 15}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 22}}>
                    <View style={{ height: 80, width: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                        backgroundColor: COLORS.white, borderRadius: '100%', overflow: 'hidden' }}>
                        <Text style={{ fontSize: 45, color: COLORS.primary, textAlign: 'center', fontWeight: 'bold' }}>D</Text>
                    </View>
                    <View style={{ flex: 1}}>
                        <Text style={{ fontSize: 24, color: COLORS.white, fontWeight: 'bold' }}>Manu Decca</Text>
                        <Text style={{ fontSize: 14, color: COLORS.white }}>manudecca@wtower.cm</Text>
                        <Text style={{ fontSize: 14, color: COLORS.white }}>+237 677 33 20 62</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10}}>
                            <Pressable
                                onPress={() => {Navigation.navigate(ROUTES.SOUSCRIPTIONS)}}
                                style= {{ paddingVertical: 10,  paddingHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 100 }}>
                                <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 12,}}>Mes souscriptions</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 30}} />

            <View style={{ flexDirection: 'column', gap: 30 }}>
                <TouchableOpacity style={{flexDirection: "row", gap: 30, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray}}>
                    <View>
                        <Icon.Globe color={COLORS.primary} strokeWidth={2} width={35} height={35} />
                    </View>
                    <View>
                        <Text style={{ color: COLORS.dark, fontWeight: "bold", fontSize: 16,}}>Langue de l’application</Text>
                        <Text style={{ color: COLORS.gray,}}>Francais (Langue de l’appareil)</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", gap: 30, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray, overflow: 'hidden'}}>
                    <View>
                        <Icon.Bell color={COLORS.primary} strokeWidth={2} width={35} height={35} />
                    </View>
                    <View>
                        <Text style={{ color: COLORS.dark, fontWeight: "bold", fontSize: 16,}}>Notifications</Text>
                        <Text style={{ color: COLORS.gray, }}>Configurer mes notifications par e-mail, SMS et dans l’application</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", gap: 30, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray, overflow: 'hidden'}}>
                    <View>
                        <Icon.FileText color={COLORS.primary} strokeWidth={2} width={35} height={35} />
                    </View>
                    <View>
                        <Text style={{ color: COLORS.dark, fontWeight: "bold", fontSize: 16,}}>Conditions et confidentialité</Text>
                        <Text style={{ color: COLORS.gray, }}>Tout savoir sur notre politique de confidentialité</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", gap: 30, alignItems: 'center', paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray, overflow: 'hidden'}}>
                    <View>
                        <Icon.Info color={COLORS.primary} strokeWidth={2} width={35} height={35} />
                    </View>
                    <View >
                        <Text style={{ color: COLORS.dark, fontWeight: "bold", fontSize: 16,}}>Infos de l’application</Text>
                        <Text style={{ color: COLORS.gray, }}>Tout savoir sur la version de l’application, les mises a jour</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </View>
  )
}