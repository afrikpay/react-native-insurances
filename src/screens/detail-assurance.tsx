import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import RenderHtml from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/Colors'
import { ROUTES } from '../constants/Routes'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'
import type { Plan } from '../types'
import { useEffect, useState } from 'react'
import { apiClient } from '../data/axios'


export default function DetailAssurance(props: any) {

    const [loading, setLoading] = useState(false);

    // Get params from navigation
    const {product, insurer} = props.route.params
    const [plans, setPlans] = useState<Plan[]>([])    

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response: any = await apiClient.post('/secure/mobile/products/v1', {
                    categoryId: product.id,
                    tenantId: insurer.id
                });
                const data = response.result.plans;
                if (data && Object.keys(data).length > 0) {
                    setPlans(Object.keys(data).map((key: string) => (data[key] as Plan)));
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally{
                setLoading(false);
            }
        })()
    }, []);
    
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
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>{product.name}</Text>
                    <Image
                        alt={product.name}
                        source={{ uri: product.image }}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 100,
                        }}
                    />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: 20, backgroundColor: '#F4F5F6'}}>   
                <RenderHtml
                    contentWidth={width}
                    source={{ html: product.description }}
                />
                <View style={{ flexDirection: 'column', gap: 12, marginTop: 20 }}>
                    <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Formules offertes</Text>
                    {   
                        loading && (
                            <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={`large`} color={COLORS.gray} style={{ height: 50, width: 50 }} />
                            </View>
                        )
                    }
                    <FlatList
                            data={plans}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            extraData={(item: Plan) => `${item.id}`}
                            renderItem={({ item }) =>
                            (
                                <Pressable
                                    onPress={() => { Navigation.navigate(ROUTES.DETAIL_FORMULE, {plan: item, insurer}) }}
                                    key={item.id} style={{
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
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => { Navigation.navigate(ROUTES.DETAIL_FORMULE, {plan: item, insurer}) }}>
                                            <Icon.ChevronRight color={COLORS.primary} strokeWidth={2} width={25} height={25} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text>Prime TTC</Text>
                                        <View>
                                            {/**
                                                <Text style={{ fontWeight: 'bold'}}>{item.price} XAF - Enfant</Text>
                                                <Text style={{ fontWeight: 'bold'}}>74 000 XAF - Adulte</Text>
                                            */}
                                            <Text style={{ fontWeight: 'bold'}}>{item.price} XAF</Text>
                                        </View>
                                    </View>
                                    <Text>Couverture jusqu’a 500 000 XAF</Text>
                                    <View style={{ flexDirection: 'row', gap: 10}}>
                                        <Text style={{ fontWeight: 'bold'}}>Durée</Text>
                                        <Text style={{ fontWeight: 'bold'}}>{item.duration_display}</Text>
                                    </View>
                                </Pressable>
                            )
                    } />
                </View>
                <View style={{ height: 80, width: '100%' }}/>
            </ScrollView>
        </SafeAreaView>
    )
}