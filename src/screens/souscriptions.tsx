import { useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { ROUTES } from '../constants/Routes'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'

export default function Souscriptions() {
    const [search, setSearch] = useState('')
        return (
            <SafeAreaView style={{flex: 1, 
                height: height, width: width,  
                backgroundColor: COLORS.white,
                flexDirection: 'column',
                gap: 20
            }}>
                <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30}}>
                    {/** Navigation bar  */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <TouchableOpacity onPress={() => { Navigation.back() }}>
                            <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18,textAlign: 'center', flex: 1, fontWeight: 'bold' }}>Mes souscriptions</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon.Filter color={COLORS.primary} strokeWidth={1.5} width={25} height={25} />
                        </TouchableOpacity>
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
                            placeholder={'Rechercher une souscription'}
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
                            <Icon.Search color={COLORS.light_blue} strokeWidth={2} width={25} height={25} />
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
                                <Box key={item} width={'100%'} padding={18}>
                                    <Pressable onPress={() => { Navigation.navigate(ROUTES.DETAIL_SOUSCRIPTIONS) }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 10 }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                                                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Premium Gold</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                                            <View style={{ height: 10, width: 10, backgroundColor: COLORS.success, borderRadius: 10 }}></View>
                                                            <Text style={{ color: COLORS.success, fontSize: 16 }}>Actif</Text>
                                                        </View>
                                                    </View>
                                                    <Text>Assurance santé classique</Text>
                                                </View>
                                                <Image
                                                    alt="Image de l'assurance santé"
                                                    source={require("../assets/logo.png")}
                                                    style={{
                                                        height: 50,
                                                        width: 50
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                                                <Text style={{ fontSize: 12}}>Couverture jusqu’a 1 500 000 XAF</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                                    <Text style={{ fontWeight: 'bold'}}>107 250 </Text>
                                                    <Text style={{ fontSize: 10, opacity: 0.7}}>XAF/mois</Text>
                                                </View>
                                            </View>
                                            <Text style={{ fontSize: 10, opacity: 0.7, marginTop: 5}}>Validité: 15/05/2025</Text>
                                        </View>
                                    </Pressable>
                                </Box>
                            ))
                        }
                    </View>
                    <View style={{ height: 40}}/>
                    
                </ScrollView>
          </SafeAreaView>
    )
}