import { useState } from 'react'
import { Image, Linking, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import RenderHtml from 'react-native-render-html'
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { height, width } from '../constants/size'
import Navigation from '../services/Navigation'


export default function DetailSouscription(props:any) {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [text, setText] = useState("");

    const {souscription } = props.route.params; 
    
    // Share data to whatsapp with phone number and message   
    const shareWhatsapp = () => {
        if (!text) {
        console.error('Message is required to share on WhatsApp');
        return;
        }
        const message = `
            Bonjour, je suis intéressé par le plan ${souscription.plan.name} de l'assurance ${souscription.insurer.name} et souhaite de avoir de l'aide.
            Message: ${text}
            Voici les détails de ma souscription :
            - Type d'assurance : ${souscription.product}
            - Souscrit le : ${souscription.subscribeAt.slice(0, 10)}
            - Activé le : ${souscription.startAt ? souscription.startAt.slice(0, 10) : '--'}
            - Validité : ${souscription.endAt ? souscription.endAt.slice(0, 10) : '--'}
            - Prime : ${souscription.plan.price} XAF
            - Description : ${souscription.plan.description}
            Merci de me contacter pour plus d'informations.
        `
        try {
            const phoneNumber = '237658880708'; // Replace with your desired phone number
            const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
            Linking.openURL(url);
            setText(""); // Clear the text input after sharing
            hideModal();
            
        } catch (error) {}
    };
    
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
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Détails souscription</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>{souscription.plan.name}</Text>
                    <TouchableOpacity onPress={() => { showModal() }} style={{
                        width: 40, height: 40,
                        borderRadius: 20, backgroundColor: COLORS.primary,
                        justifyContent: 'center', alignItems: 'center'}}>
                        <Icon.MessageSquare color={COLORS.white} strokeWidth={2} width={20} height={20} />
                    </TouchableOpacity>
                </View>
                <Box width={'100%'} padding={18}>
                    <View style={{ flexDirection: 'row', gap: 3 }}>
                        <View style={{ flex: 1, gap: 16}}>
                            <Image
                                alt={`${souscription.insurer.name} logo`}
                                source={{ uri: souscription.insurer.logo }}
                                style={{ height: 40, width: 40, borderRadius: 100  }}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={{ height: 10, width: 10, backgroundColor: COLORS.success, borderRadius: 10 }}></View>
                                <Text style={{ color: COLORS.success, fontSize: 16 }}>Actif</Text>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{souscription.plan.duration} {souscription.plan.unit}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column', gap: 8 }}>
                            <View style={{ flexDirection:"row", justifyContent: 'space-between', gap: 4}}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Type:</Text>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>{souscription.product}</Text>
                            </View>
                            <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Souscrit le :</Text>
                                <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.subscribeAt.slice(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Activé le :</Text>
                                <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.startAt ? souscription.startAt.slice(0, 10) : '--'}</Text>
                            </View>
                            <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Validité :</Text>
                                <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.endAt ? souscription.endAt.slice(0, 10) : '--'}</Text>
                            </View>
                            <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Prime: </Text>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold' }}>{souscription.plan.price} XAF</Text>
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
                    source={{ html: `${souscription.plan.description}` }}
                />
            </ScrollView>

            {/** Modal du message d'aide à la souscription */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, width: '90%', marginLeft: '5%', borderRadius: 10}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Aide souscription</Text>
                    <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'gray', opacity: 0.3, marginVertical: 10}}></View>
                    <Text style={{ lineHeight: 20 }} >Veuillez nous decrire votre préoccupation. Un de nos assistants vous prendra en charge dans de brefs délais.</Text>
                    {/**    
                        <View style={{ flexDirection: 'column', marginVertical: 20 }}>
                            <Text style={{ fontWeight: 'bold' }} >Type assurance</Text>
                            <DropdownComponent
                                label="Sélectionner un type "
                                placeholder="Sélectionner un type"
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
                    */}  
                    {/** 
                        <View style={{ flexDirection: 'column', marginBottom: 20, marginTop: 10 }}>
                            <Text style={{  fontWeight: 'bold', marginTop: 25 }}>Formule</Text>
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
                     */}   
                    <View style={{ marginTop: 30, height: 140}}>
                        <Text style={{  fontWeight: 'bold', marginBottom: 10 }}>Votre message *</Text>
                        <TextInput
                            style={{ flex: 1, 
                                borderWidth: 1,
                                textDecorationColor: COLORS.white, 
                                backgroundColor: COLORS.white,
                                borderColor: COLORS.light_gray,
                                borderRadius: 4,
                            }}
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            placeholder={'Saisir le message ici...'}
                            returnKeyType="next"
                            underlineColorAndroid="transparent"
                            onChangeText={setText}
                            value={text}
                            placeholderTextColor={'#9D9D9D'}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                    
                    <View style={{ marginTop: 40 }}>
                        <Button style={{  backgroundColor: COLORS.primary }} mode="contained" onPress={shareWhatsapp}>
                            Soumettre
                        </Button>
                    </View>
                </Modal>
            </Portal> 
        </SafeAreaView>
  )
}