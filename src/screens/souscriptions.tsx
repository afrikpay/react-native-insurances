import { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { ROUTES } from '../constants/Routes'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'
import { Button, Modal, Portal } from 'react-native-paper'
import { RadioButton } from 'react-native-paper';
import DropdownComponent from '../components/ui/DropdownComponent'
import moment from 'moment'
import { apiClient } from '../data/axios';
import type { Souscription } from '../types';

const pattern = 'YYYY/MM/DD'//  HH:mm:ss'

export default function Souscriptions() {
    const [search, setSearch] = useState('')
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('actif');

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [mode, setMode] = useState<"date" | "countdown" | "time" | "datetime">("date")
    const [showStartDatePicker, setShowStartDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState(moment(startDate).format(pattern))
    const [selectedEndDate, setSelectedEndDate] = useState(moment(endDate).format(pattern))

    const [loading, setLoading] = useState<boolean>(false);
    const [souscriptions, setSouscriptions] = useState<Souscription[]>([])
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response: any = await apiClient.post('/secure/mobile/insurance/subscription-list/v1', {});       
                setSouscriptions(response.result as Souscription[])               
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally{
                setLoading(false);
            }
        })()

    }, []);

    const onChangeStart = (event: any, seletedDate: any) => {
        const currentDate = seletedDate || startDate
        setShowStartDatePicker(Platform.OS === 'ios')
        setStartDate(currentDate)
        setSelectedStartDate(moment(currentDate).format(pattern))
    }
    const onChangeEnd = (event: any, seletedDate: any) => {
        const currentDate = seletedDate || endDate
        setShowEndDatePicker(Platform.OS === 'ios')
        setEndDate(currentDate)
        setSelectedEndDate(moment(currentDate).format(pattern))
    }
    
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
                    <TouchableOpacity onPress={showModal}>
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
                        loading && (
                            <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator color={COLORS.gray} style={{ height: 80, width: 80 }} />
                            </View>
                        )
                    }
                    {
                        souscriptions.map((souscription, index) => (
                            <Box key={index} width={'100%'} padding={18}>
                                <Pressable onPress={() => { Navigation.navigate(ROUTES.DETAIL_SOUSCRIPTIONS, { souscription }) }}>
                                    <View>
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
                                                    alt={`${souscription.insurer.name} logo`}
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
                                    </View>
                                </Pressable>
                            </Box>
                        ))
                    }
                </View>
                <View style={{ height: 40}}/>
                
            </ScrollView>

            {/** Modal de filtre des souscriptions */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, width: '90%', marginLeft: '5%', borderRadius: 10}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Définissez vos options de filtre</Text>
                    <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'gray', opacity: 0.3, marginVertical: 10}}></View>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }} >Statut</Text>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 5}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <RadioButton value="actif" />
                                <Text>Actif</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <RadioButton value="inactif" />
                                <Text>Inactif</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <RadioButton value="attente" />
                                <Text>En attente</Text>
                            </View>
                        </View>
                    </RadioButton.Group>        
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', marginTop: 25 }} >Produit</Text>
                        <View style={{ flex: 1 }}>
                            <DropdownComponent
                                label="Sélectionner un produit"
                                placeholder="Sélectionner un produit"
                                data={
                                    [
                                        { label: 'Assurance santé', value: 'assurance_sante' },
                                        { label: 'Assurance auto', value: 'assurance_auto' },
                                        { label: 'Assurance habitation', value: 'assurance_habitation' },
                                        { label: 'Assurance voyage', value: 'assurance_voyage' },
                                        { label: 'Assurance vie', value: 'assurance_vie' },
                                        { label: 'Assurance responsabilité civile', value: 'assurance_responsabilite_civile' },
                                        { label: 'Assurance scolaire', value: 'assurance_scolaire' },
                                        { label: 'Assurance animaux de compagnie', value: 'assurance_animaux_de_compagnie' },
                                        { label: 'Assurance professionnelle', value: 'assurance_professionnelle' },
                                    ]
                                }
                                onChangeValue={(item) => console.log(item)}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 20, }}>
                        <Text style={{  fontWeight: 'bold', marginTop: 25 }}>Formule</Text>
                        <View style={{ flex: 1 }}>
                            <DropdownComponent
                                label="Sélectionner une formule"
                                placeholder="Sélectionner une formule"
                                data={
                                    [
                                        { label: 'Formule de base', value: 'formule_de_base' },
                                        { label: 'Formule standard', value: 'formule_standard' },
                                        { label: 'Formule premium', value: 'formule_premium' },
                                        { label: 'Formule gold', value: 'formule_gold' },
                                        { label: 'Formule platinum', value: 'formule_platinum' },
                                        { label: 'Formule silver', value: 'formule_silver' },
                                        { label: 'Formule bronze', value: 'formule_bronze' },
                                        { label: 'Formule familiale', value: 'formule_familiale' },
                                        { label: 'Formule individuelle', value: 'formule_individuelle' },
                                        { label: 'Formule entreprise', value: 'formule_entreprise' },
                                    ]
                                }
                                onChangeValue={(item) => console.log(item)}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10}}>
                        <Text style={{ fontWeight: 'bold', marginTop: 25 }}>Période</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ fontSize: 12, marginTop: 25 }}>Entre: </Text>
                        <TouchableOpacity onPress={() => { setShowStartDatePicker(true); setMode('date'); }} style={{ 
                            paddingHorizontal: 15, 
                            paddingVertical: 10, 
                            marginTop: 10,
                            flexDirection: 'row',
                            width: 'auto',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Icon.Calendar style={{ width: 20, height: 20, color: COLORS.gray }} />
                            <Text style={{ color: COLORS.dark }}>{selectedStartDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ fontSize: 12, marginTop: 25 }}>Et: </Text>
                        <TouchableOpacity onPress={() => { setShowEndDatePicker(true); setMode('date'); }} style={{ 
                            paddingHorizontal: 15, 
                            paddingVertical: 10, 
                            marginTop: 10,
                            flexDirection: 'row',
                            width: 'auto',
                            alignItems: 'center',
                            gap: 10
                        }}>
                            <Icon.Calendar style={{ width: 20, height: 20, color: COLORS.gray }} />
                            <Text style={{ color: COLORS.dark }}>{selectedEndDate} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        {
                            showStartDatePicker &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={startDate}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeStart}
                            />
                        }
                        {
                            showEndDatePicker &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={endDate}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeEnd}
                            />
                        }

                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Button style={{  backgroundColor: COLORS.primary }} mode="contained" onPress={() => console.log('Pressed')}>
                            Appliquer
                        </Button>
                    </View>
                </Modal>
            </Portal> 
        </SafeAreaView>
    )
}