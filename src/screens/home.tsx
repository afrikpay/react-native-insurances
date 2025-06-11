import { Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { height, width } from '../constants/size'
import { ROUTES } from '../constants/Routes'
import Navigation from '../services/Navigation'
import { useEffect, useState } from 'react'
import { apiClient } from '../data/axios'
import { ActivityIndicator } from 'react-native-paper'
import type { ProduitAssurance, Souscription } from '../types'
import SouscriptionComponent from '../components/ui/souscription-component'

export default function Home() {
    
    return (
        <View style={{flex: 1, 
        height: height, width: width, 
        padding: 20, 
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20
        }}>
        <StatusBar hidden />
        <View style={{}}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ flexDirection: 'column'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>Bon retour</Text>
                <Text style={{ fontSize: 14, fontWeight: '500' }}>Manu Decca</Text>
                </View>
                <View>
                <TouchableOpacity style={{ position: 'relative'}} onPress={() => { }}>
                    <Icon.Bell color={COLORS.light_blue} strokeWidth={2} width={30} height={30} />
                    <View style={{ backgroundColor: COLORS.danger, 
                        position: 'absolute', top: 0, right: 0,
                        height: 18, width: 18, borderRadius: 100, 
                        justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 9, color: COLORS.white, fontWeight: 'bold'}}>02</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        
        {/** Subscription Card */}
        <HomeCard />

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1}}>
            {/** Product Section */}
            <ProductSection />

            <View style={{ marginTop: 20}} />

            { /** Subscriptions section */}
            <RenderSubscriptionSection />

        </ScrollView>
        </View>
    )
}

export function HomeCard() {
  return (
    <View style={{
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20, 
        paddingTop: 20,
        backgroundColor: COLORS.primary,
        height: 200
    }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10}}>
            <View style={{ flex: 1, flexDirection: 'column', gap: 10}}>
                <Text style={{fontWeight: '400', fontSize: 15, color: COLORS.white }}>Facilitez-vous la vie</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.white }}>Obtenez votre assurance santé</Text>
                <View style={{ flexDirection: 'row', marginTop: 10}}>
                    <Pressable
                        onPress={() => {Navigation.navigate(ROUTES.ASSUREURS)}}
                        style= {{ paddingVertical: 10,  paddingHorizontal: 30, backgroundColor: COLORS.white, borderRadius: 100 }}
                    >
                        <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 12,}}>Souscrire</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{width: 110}}>
                <Image
                    alt="Image de l'assurance santé"
                    source={ImageSante}
                    style={{
                        objectFit: 'fill'
                    }}
                />
            </View>
        </View>
    </View>
  )
}

export function ProductSection() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProduitAssurance[]>([])
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response: any = await apiClient.post('/secure/mobile/categories/v1', {});
                setProducts(response.result?? [] as ProduitAssurance[])
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
        <View style={{ flexDirection: 'column', gap: 10}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Les produits d’assurance</Text>
                <View style={{ flexDirection: 'row'}}>
                    <Pressable
                        onPress={() => { Navigation.navigate(ROUTES.PRODUITS) }}
                        style= {{ paddingVertical: 8,  paddingHorizontal: 16, backgroundColor: COLORS.primary, borderRadius: 100 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "400", fontSize: 10,}}>Voir plus</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10
            }}>
                {   
                    loading && (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color={COLORS.gray} style={{ height: 50, width: 50 }} />
                        </View>
                    )
                }
                {
                    products.map((product: any, index: number) => (
                        <Box key={index} width={width / 2 - 26} padding={10}>
                            <Pressable onPress={() => {Navigation.navigate(ROUTES.ASSUREURS, { product })}} style={{ flexDirection: "row", alignItems: 'center', gap: 8 }}>
                                <Image
                                    alt={product.name}
                                    source={{uri: product.image}}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        borderRadius: 100,
                                    }}
                                />
                                <Text>{product.name}</Text>
                            </Pressable>
                        </Box>
                    ))
                }
            </View>
        </View>
    )
}

export function RenderSubscriptionSection() {
    const [loading, setLoading] = useState(false);
    const [souscriptions, setSouscriptions] = useState<Souscription[]>([])
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response: any = await apiClient.post('/secure/mobile/insurance/subscription-list/v1', {});       
                setSouscriptions(response.result?? [] as Souscription[])                
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
        <View style={{ flexDirection: 'column', gap: 10}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Mes dernières souscriptions</Text>
                <View style={{ flexDirection: 'row'}}>
                    <Pressable
                        onPress={() => {Navigation.navigate(ROUTES.SOUSCRIPTIONS)}}
                        style= {{ paddingVertical: 8,  paddingHorizontal: 16, backgroundColor: COLORS.primary, borderRadius: 100 }}>
                        <Text style={{ color: COLORS.white, fontWeight: "400", fontSize: 10,}}>Voir plus</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10
                }}>
                {   
                    loading && (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color={COLORS.gray} style={{ height: 50, width: 50 }} />
                        </View>
                    )
                }
                {
                    souscriptions.map((souscription: any, index: number) => (
                        <SouscriptionComponent key={index} souscription={souscription}/>
                    ))
                }
            </View>
        </View>
    )
}
{/**
    <Box key={index} width={'100%'} padding={18}>
        <Pressable onPress={() => {Navigation.navigate(ROUTES.DETAIL_SOUSCRIPTIONS, { souscription})}}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 10 }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{souscription.planName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ height: 10, width: 10, backgroundColor: COLORS.success, borderRadius: 10 }}></View>
                            <Text style={{ color: COLORS.success, fontSize: 16 }}>Actif</Text>
                        </View>
                    </View>
                    <Text>{souscription.product}</Text>
                </View>
                <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                        overflow: 'hidden',
                        borderColor: COLORS.danger,
                    }}>

                    <Image
                        alt="Image de l'assurance santé"
                        source={{ uri: souscription.insurer.logo }}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 12}}>{souscription.insurer.short_description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                    <Text style={{ fontWeight: 'bold'}}>{souscription.plan.price}</Text>
                    <Text style={{ fontSize: 10, opacity: 0.7}}>XAF/mois</Text>
                </View>
            </View>
            <Text style={{ fontSize: 10, opacity: 0.7, marginTop: 5}}>Validité: 15/05/2025</Text>
        </Pressable>
    </Box>
*/}