import { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { ROUTES } from '../constants/Routes'
import { width } from '../constants/size'
import Navigation from '../services/Navigation'
import { apiClient } from '../data/axios'
import { ActivityIndicator } from 'react-native-paper'

export default function Products() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([])
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response: any = await apiClient.post('/secure/mobile/categories/v1', {});       
                setProducts(response.result)
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
        <SafeAreaView style={{flex: 1, width: width,  
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            gap: 20
        }}>
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30}}>
                {/** Navigation bar  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity onPress={() => { Navigation.back()}}>
                        <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Produits d’assurance</Text>
                </View>
                <View style={{ height: 45 }}>
                    {/** Search input */}
                    <TextInput
                        style={{ 
                            flex: 1,
                            fontSize: 16,
                            borderWidth: 0.6,
                            borderColor: COLORS.primary,
                            paddingHorizontal: 15,
                            borderRadius: 100,
                            height: 50
                        }}
                        placeholder={'Rechercher un produit d’assurance'}
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        onChangeText={setSearch}
                        // onFocus={onFocus}
                        value={search}
                        placeholderTextColor={'#9D9D9D'}
                        secureTextEntry={false}
                        keyboardType={'default'}
                        multiline={false}
                        editable={true}
                    />
                    <TouchableOpacity style={{ marginRight: 4, position: 'absolute', top: 12, right: 10}} onPress={() => { console.log(search); }}>
                        <Icon.Search color={COLORS.primary} strokeWidth={2} width={25} height={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: 20, backgroundColor: '#F4F5F6'}}>   
                {   
                    loading && (
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color={COLORS.gray} style={{ height: 60, width: 60 }} />
                        </View>
                    )
                }
                <View style={{display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: 10}}>
                    {
                        products.map((product: any, index: number) => (
                            <View
                                key={index} style={{ 
                                width: width / 2-25,
                                borderWidth: 0.05,
                                borderRadius: 8, 
                                height: 235,
                                paddingVertical: 15,
                                backgroundColor: COLORS.white, // Ajout d'une couleur de fond pour l'ombre
                                shadowColor: COLORS.dark, // Couleur de l'ombre
                                shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
                                shadowOpacity: 0.2, // Opacité de l'ombre
                                shadowRadius: 6, // Rayon de flou de l'ombre
                                elevation: 2, // Ombre pour Android
                                flexDirection: 'column',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                overflow: 'hidden' 
                            }}>
                                <Image
                                    alt={product.name}
                                    source={{ uri: product.image || ImageSante }}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        borderRadius: 100,
                                    }}
                                />
                                <View style={{ width: '100%', borderBottomWidth: 0.2001, borderBottomColor: COLORS.primary, marginVertical: 10 }} />
                                <View style={{ gap: 8, paddingHorizontal: 15 }}>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontWeight: '500' }}>{product.name}</Text>
                                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ color: COLORS.gray }}>Essentielle pour couvrir les frais médicaux en cas de maladie ou d'accident.</Text>
                                    <Pressable
                                        onPress={() => { Navigation.navigate(ROUTES.ASSUREURS, { product }) }}
                                        style= {{ paddingVertical: 8, paddingHorizontal: 10, 
                                        borderColor: COLORS.primary, borderWidth: 0.3, 
                                        marginTop: 10,
                                        backgroundColor: COLORS.white, borderRadius: 100 }}>
                                        <Text style={{ color: COLORS.primary, fontWeight: "bold", textAlign: "center", fontSize: 12,}}>Voir les formules</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
  )
}