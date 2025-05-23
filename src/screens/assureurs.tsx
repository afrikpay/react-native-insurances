import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { height, width } from '../constants/size'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '../services/Navigation'
import { Pressable } from 'react-native-gesture-handler'
import { ROUTES } from '../constants/Routes'

export default function Assureurs(props: any) {
    // Get params from navigation
    const data = props.route.params
    console.log({data});
    
    return (
        <SafeAreaView style={{flex: 1, 
            height: height, width: width,  
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            gap: 20 }}>
            <StatusBar hidden />

            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 25, gap: 30}}>
                {/** Navigation bar  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity onPress={() => { Navigation.back() }}>
                        <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Assureurs</Text>
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
                <View style={{display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: 10}}>
                    {
                        [0,1,2,3,4,5,6,7,8,9].map((item) => (
                            <Box key={item} width={'100%'} padding={18}>
                                <Pressable 
                                    onPress={() => { Navigation.navigate(ROUTES.DETAIL_ASSURANCE) }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex:1, flexDirection: 'column', gap: 10}}>
                                        <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                                            <Image
                                                alt="Image de l'assurance santé"
                                                source={require("../assets/logo.png")}
                                                style={{
                                                    height: 50,
                                                    width: 50
                                                }}
                                            />
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Willis Tower Watson</Text>
                                                </View>
                                                <Text>03 Formules</Text>
                                            </View>
                                        </View>
                                        <Text style={{ fontSize: 12}}>A partir de 74 000 XAF/an TTC</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { Navigation.navigate(ROUTES.DETAIL_ASSURANCE) }}>
                                        <Icon.ChevronRight color={COLORS.primary} strokeWidth={1.5} width={30} height={30} />
                                    </TouchableOpacity>
                                </Pressable>
                            </Box>
                        ))
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
  )
}