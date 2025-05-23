import { useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native'
import * as Icon from "react-native-feather"
import { COLORS } from '../constants/Colors'
import { ImageSante } from '../constants/Images'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'
import { ROUTES } from '../constants/Routes'

export default function Products() {
    const [search, setSearch] = useState('')
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
                <View style={{display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: 10}}>
                    {
                        [0,1,2,3,4,5,6,7,8,9,].map((item) => (
                            <View
                                key={item} style={{ 
                                width: width / 2-25,
                                borderWidth: 0.05,
                                borderRadius: 8, 
                                height: 220,
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
                                    alt="Image de l'assurance santé"
                                    source={ImageSante}
                                    style={{
                                        height: 35,
                                        width: 35,
                                    }}
                                />
                                <View style={{ width: '100%', borderBottomWidth: 0.2001, borderBottomColor: COLORS.primary, marginVertical: 10 }} />
                                <View style={{ gap: 8, paddingHorizontal: 15 }}>
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontWeight: '400', fontSize: 14, }}>Assurance santé classique</Text>
                                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 12, color: COLORS.gray }}>Essentielle pour couvrir les frais médicaux en cas de maladie ou d'accident.</Text>
                                    <Pressable
                                        onPress={() => { Navigation.navigate(ROUTES.ASSUREURS, { id: item }) }}
                                        style= {{ paddingVertical: 5, paddingHorizontal: 10, 
                                        borderColor: COLORS.primary, borderWidth: 0.3, 
                                        marginTop: 10,
                                        backgroundColor: COLORS.white, borderRadius: 100 }}>
                                        <Text style={{ color: COLORS.primary, fontWeight: "bold", textAlign: "center", fontSize: 10,}}>Voir les formules</Text>
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