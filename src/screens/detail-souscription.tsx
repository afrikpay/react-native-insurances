import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Linking, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import RenderHtml from 'react-native-render-html'
import SimpleToast from 'react-native-simple-toast'
import SuccessModal from '../components/modals/success-modal'
import { Box } from '../components/ui/Box'
import { COLORS } from '../constants/Colors'
import { IMAGES } from '../constants/Images'
import { height, width } from '../constants/size'
import { apiClient } from '../data/axios'
import Navigation from '../services/Navigation'
import WebviewScreen from './forms/components/WebviewScreen'

import * as DocumentPicker from 'expo-document-picker'
import { uploadFile } from '../utils/uploadFiles'


const operateursMobile: Record<string, any>[]  = [
    {
        id: 1,
        name: 'MTN Money Cameroun',
        logo: IMAGES['mtnMoney'],
        slug: 'mtn-mobile-money-ecommerce-insurance-payment-service-feature'
    },
    {
        id: 2,
        name: 'Orange Money Cameroun',
        logo: IMAGES['orangeMoney'],
        slug: 'orange-money-ecommerce-insurance-payment-service-feature'
    },
    {
        id: 3,
        name: 'PayPal',
        logo: IMAGES['logoPaypal'],
        slug: 'paypal-ecommerce-insurance-payment-service-feature'
    }
]

export default function DetailSouscription(props:any) {

    const { souscription } = props.route.params
    // console.log(JSON.stringify(souscription, null, 2));
    
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [successPaymentModal, setSuccessPaymentModal] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [text, setText] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [serviceSlug, setServiceSlug] = useState("");
    const [selectedInsurer, setSelectedInsurer] = useState<Record<string, any> | any>(null)
    const [selectedDoc, setSelectedDoc] = useState<Record<string, any>>()

    const [documents, setDocuments] = useState<Record<string, any>[]>([])
    const [file, setFile] = useState<Record<string, any>>()
    
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
            - Souscrit le : ${souscription.subscribed_at.slice(0, 10)}
            - Activé le : ${souscription.start_at ? souscription.start_at.slice(0, 10) : '--'}
            - Validité : ${souscription.end_at ? souscription.end_at.slice(0, 10) : '--'}
            - Prime : ${souscription.plan?.price} XAF
            - Description : ${souscription.plan?.description}
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

    const successPayment = () => {
        setTimeout(() => {
            SimpleToast.show("Payement effectué avec succès!", 5)
            setSuccessPaymentModal(true)
            Navigation.back();
        }, 1000);
    }

    const failedPayment = () => {
        SimpleToast.show("Le payement a échouée !", 5)
        setTimeout(() => {
            setShowPaymentModal(false)
        }, 1500);
    }

    const cancelPayment = () => {
        SimpleToast.show("Le payement a été annuler !", 5)
        setTimeout(() => {
            setShowPaymentModal(false)
        }, 1500);
    }

    const handleFetchPaymentUrl = async ()  => {
        if (loading && !verifyPhoneNumber()) return
        setLoading(true)
        try {
            const data = {
                referenceNumber: `${souscription.reference}`,
                amount: +souscription.amount,
                externalId: `${(new Date()).getTime()}`,
                paymentWallet: `237${phoneNumber}`, // 'patrick1kenne@gmail.com',
                data: { insurerId: souscription.insurer.id }
            }
            // console.log(JSON.stringify(data, null, 2));
            // console.log("Service slug: ", serviceSlug);
            
            const response: any = await apiClient.post(
                '/secure/mobile/subscription/payment/v1',
                { ...data},{ "Service": `${serviceSlug}` }
            )
            if (response.code === 200 && response.result.errorCode == null && response.result.status === 'SUCCESS'){
                setPaymentUrl(response.result.paymentLink)
                setShowPaymentModal(true)
            }else{
                SimpleToast.show(`${response?.result?.errorMessage ?? response?.message }`, 10)
            }
        }
        catch (error: any) {
            SimpleToast.show(`${error.message}`, 10)
        }
        finally{ setLoading(false) }  
    }

    const verifyPhoneNumber = ()  => {
     
        setErrorMessage("")
        if (!phoneNumber && !serviceSlug.includes("paypal")) {
            setErrorMessage("Numéro de téléphone requis")
            return false
        }
        return true
    }

    const handleFileUpload = async ( doc:  Record<string, any>) => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync({});
            const response = result.assets[0];
            if (!result.canceled) {
                setSelectedDoc(doc);
                setFile({ ...file, [doc?.key]: response});
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const getForm = async () => {
        const data = {
            planId: souscription.plan.id,
            insurerId: souscription.insurer.id,
            page: 1
        }
        const response: any = await apiClient.post('/secure/mobile/form/v1', {...data});
        setDocuments(response.result.documents || []);
    }

    useEffect(() => {
        // Fetch the form data when the component mounts
        getForm();

    }, [souscription])

    const sendFile = async (doc:  Record<string, any>) => {
        if (submitting) return;
        setSubmitting(true);
        try {
            // Upload the file to your server or handle it as needed
            const task = await uploadFile(
                `https://insurances.afrikpay.com/api/uploads/document/${souscription.id}/${souscription.reference}/`,
                file![doc.key].uri as string,
                { key: doc.key || ''},
                { "Content-Type": "multipart/form-data"},
                "file",
                file![doc.key].mimeType,
                () => {
                    setSelectedInsurer(null)
                    SimpleToast.show("Fichier envoyé avec succès !", 5);
                    setFile(undefined);
                    setSelectedDoc(undefined);
                }                
            );
            task.uploadAsync();
        } catch (error) {
            console.error('Error sending file:', error);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1, 
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
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: 20, backgroundColor: '#F4F5F6'}}> 

                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.primary }}>{souscription.plan?.name}</Text>
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
                                    alt={`${souscription.insurer?.name} logo`}
                                    source={{ uri: souscription.insurer.logo }}
                                    style={{ height: 40, width: 40, borderRadius: 100  }}
                                />
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                                    <View style={{ height: 10, width: 10, backgroundColor: COLORS.success, borderRadius: 10 }}></View>
                                    <Text style={{ color: souscription.status === "P" ? COLORS.success : COLORS.dark, fontSize: 11 }}>{souscription.display_status}</Text>
                                </View>
                                <Text style={{ fontSize: 12, fontWeight: 'bold'}}>{souscription.plan?.duration_display}</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'column', gap: 8 }}>
                                <View style={{ flexDirection:"row", justifyContent: 'space-between', gap: 4}}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Type:</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>{souscription.product}</Text>
                                </View>
                                <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Souscrit le :</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.subscribed_at.slice(0, 10)}</Text>
                                </View>
                                <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Activé le :</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.startAt ? souscription.start_at.slice(0, 10) : '--'}</Text>
                                </View>
                                <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Validité :</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail'>{souscription.end_at ? souscription.end_at.slice(0, 10) : '--'}</Text>
                                </View>
                                <View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.dark }}>Prime: </Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: 'bold' }}>{souscription.amount} XAF</Text>
                                </View>
                            </View>
                        </View>
                    </Box>
                    <TouchableOpacity onPress={() => { }} style={{ }}>
                        <Text style={{ color: COLORS.primary, fontSize: 12, fontWeight: 'bold' }}>Télécharger le contrat</Text>
                    </TouchableOpacity>

                    <RenderHtml
                        contentWidth={width}
                        source={{ html: `${souscription.plan?.description}` }}
                    />
                    <View style={{flexDirection: "column", marginVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Assurés</Text>
                        {
                            Object.keys(souscription.data).map((key, index) => (
                                <Pressable
                                    onPress={() => setSelectedInsurer(souscription.data[key])}
                                    key={index} style={{ flexDirection: 'row', marginTop: 10, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 0.5, borderColor: COLORS.light_gray, borderRadius: 8 }}>
                                    <Text style={{ fontSize: 14, color: COLORS.dark }}>Assuré N°{index + 1}</Text>
                                </Pressable>
                            ))
                        }
                    </View>
                    {
                        souscription.status === "P" &&
                        <View style={{ marginTop: 20, }}>
                            <View style={{ flexDirection: 'column', gap: 12 }}>
                                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Moyens de paiements</Text>
                                <FlatList
                                    data={operateursMobile}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    extraData={(item: any) => `${item.id}`}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            onPress={() => setServiceSlug(item.slug)}
                                            key={item.id} style={{
                                            width: 80, height: 80, borderWidth: 0.05,
                                            borderRadius: 12,
                                            marginRight: 10,
                                            padding: 5, gap: 15,
                                            backgroundColor: serviceSlug === item.slug ? COLORS.success : COLORS.white, // Ajout d'une couleur de fond pour l'ombre
                                            shadowColor: COLORS.dark, // Couleur de l'ombre
                                            shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
                                            shadowOpacity: 0.2, // Opacité de l'ombre
                                            shadowRadius: 6, // Rayon de flou de l'ombre
                                            elevation: 2, // Ombre pour Android
                                        }}>
                                            <View style={{width: '100%', height: '100%', backgroundColor: COLORS.white, overflow: 'hidden', borderRadius: 10}}>
                                                <Image
                                                    alt="Image de l'assurance santé"
                                                    source={item.logo}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </View>
                                        </Pressable>
                                    )}
                                />
                            </View>

                            {
                                (serviceSlug && serviceSlug.includes("money")) &&
                                <View style={{ marginTop: 30,}}>
                                    <Text style={{  fontWeight: 'bold', marginBottom: 10 }}>Numéro de téléphone *</Text>
                                    <TextInput
                                        style={{ 
                                            borderWidth: 1,
                                            textDecorationColor: COLORS.white, 
                                            backgroundColor: COLORS.white,
                                            borderColor: COLORS.light_gray,
                                            borderRadius: 50,
                                            borderTopStartRadius: 50,
                                            borderTopEndRadius: 50
                                        }}
                                        keyboardType='number-pad'
                                        underlineColor='transparent'
                                        activeUnderlineColor='transparent'
                                        placeholder={'Téléphone...'}
                                        returnKeyType="next"
                                        underlineColorAndroid="transparent"
                                        onChangeText={setPhoneNumber}
                                        value={phoneNumber}
                                        onBlur={verifyPhoneNumber}
                                        placeholderTextColor={'#9D9D9D'}
                                        multiline={false}
                                        numberOfLines={1}
                                    />
                                </View>
                            }

                            { errorMessage &&  <Text style={{ flex: 1, marginTop: 8, fontSize: 12,  color: COLORS.danger }}>{errorMessage}</Text>}
                            <Pressable
                                onPress={handleFetchPaymentUrl}
                                disabled={!phoneNumber && !serviceSlug.includes("paypal")}
                                style= {{ 
                                    paddingVertical: 12, 
                                    paddingHorizontal: 16, 
                                    marginTop: 40, 
                                    backgroundColor: COLORS.primary, 
                                    borderRadius: 100,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 10,
                                    alignItems: 'center'
                                }}>
                                    {
                                        loading &&
                                        <ActivityIndicator color={COLORS.white} style={{ height: 30, width: 30 }} />
                                    }
                                <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18, textAlign: 'center'}}>Payer ma souscription</Text>
                            </Pressable>
                        </View>
                    }
                </View> 
                <View style={{ width: '100%', height: 80 }} />
            </ScrollView>

            {/** Modal du message d'aide à la souscription */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, width: '90%', margin: 'auto', borderRadius: 10}}>
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

            {/** Modal de payement de la souscription */}
            <Portal>
                <Modal visible={showPaymentModal} onDismiss={() => setShowPaymentModal(false)} 
                    contentContainerStyle={{ backgroundColor: 'white', width: width, height: height }}>
                    <WebviewScreen
                        paymentUrl={paymentUrl ?? ''}
                        onPaymentSuccess={successPayment}
                        onPaymentFailed={failedPayment}
                        onPaymentCancel={cancelPayment}
                    />
                </Modal>
            </Portal> 


            {/** Modal de succès */}
            <SuccessModal
                visible={successPaymentModal}
                title='Souscription reussie !'
                message='Votre souscription est en cours de traitement aupres de Willis Towers Watson'
                btnText='Voir mes souscription'
                onPress={() => {
                    console.log("Pressed");
                }}
            /> 


            {/** Modal de détail d'un assuré */}
            <Portal>
                <Modal visible={selectedInsurer} onDismiss={() => setSelectedInsurer(null)}
                    contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: '90%', margin: 'auto', borderRadius: 10}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Détails de l'assuré</Text>
                    <View style={{ borderBottomWidth: 0.6, borderBottomColor: 'gray', opacity: 0.3, marginVertical: 10}}></View>

                    <ScrollView style={{ marginTop: 20, maxHeight: height * 0.7 }}>
                        {
                            selectedInsurer && 
                            Object.keys(selectedInsurer).map((key, index) => (
                                <View key={index} style={{ flexDirection: 'row', marginTop: 10, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 0.5, borderColor: COLORS.light_gray, borderRadius: 8 }}>
                                    <Text style={{ fontSize: 14, color: COLORS.dark }}>{selectedInsurer[key]}</Text>
                                </View>
                            ))
                        }
                        <Text style={{ fontWeight: 'bold', marginTop: 15,  }}>Pièces jointes</Text>
                        {/* 
                            <View style={{ height: 50}}>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginTop: 10, }}>
                                    { documents.map((doc, index) => (
                                        <TouchableOpacity key={index} style={{ marginRight: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: selectedDoc?.key === doc.key ? COLORS.primary : COLORS.light_gray, borderRadius: 100 }} onPress={() => { setSelectedDoc(doc) }}>
                                            <Text style={{ fontSize: 14, color: selectedDoc?.key === doc.key ? COLORS.white : COLORS.dark }}>{doc.key}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={{  height: 200, marginTop: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4',}}>
                                <Text style={{ marginBottom: 20, }}>Choisir un fichier</Text>
                                <TouchableOpacity style={{ borderColor: COLORS.primary, padding: 10, borderRadius: 100, borderWidth: 0.93 }} onPress={handleFileUpload}>
                                    <Text style={{ color: COLORS.primary }}>Selectionner le fichier</Text>
                                </TouchableOpacity>
                                {fileName! && <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>Uploaded: {fileName}</Text>}
                            </View>
                            <Pressable
                                onPress={sendFile}
                                style= {{ paddingVertical: 10, width: '100%', backgroundColor: COLORS.primary, borderRadius: 100,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20
                                }}>
                                {
                                    submitting && 
                                    <ActivityIndicator size={'small'} color={COLORS.white} style={{ height: 20, width: 20 }} />
                                }
                                <Text style={{ color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Envoyer</Text>
                            </Pressable>
                        */}

                        
                        { 
                            documents.map((doc, index) => (
                               <View key={index}>
                                    <TouchableOpacity style={{ marginRight: 10, paddingVertical: 10, }} onPress={() => { handleFileUpload(doc) }}>
                                        <Text style={{ fontSize: 14, color: COLORS.dark }}>{doc.key}</Text>
                                        <View style={{ marginTop: 8, flexDirection: 'row', gap: 5,  }}>
                                            <Icon.Link style={{ height: 18, width: 18, borderColor: COLORS.primary }} />
                                            <Text style={{ fontSize: 12, color: COLORS.primary }}>{ file?.[doc.key]?.name ?? "Aucun fichier choisi"}</Text>
                                        </View>
                                        
                                    </TouchableOpacity>
                                    {
                                        file?.[doc.key] &&     
                                        <Pressable
                                            onPress={() => {sendFile(doc)}}
                                            style= {{ paddingVertical: 6, paddingHorizontal: 20, width: 110, backgroundColor: COLORS.primary, borderRadius: 100,
                                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 20, marginTop: 8 
                                            }}>
                                            {
                                                (submitting && selectedDoc?.key === doc.key) && 
                                                <ActivityIndicator size={'small'} color={COLORS.white} style={{ height: 16, width: 16 }} />
                                            }
                                            <Text style={{ color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Envoyer</Text>
                                        </Pressable>
                                    }
                                </View> 
                            ))
                        }
                        <View style={{ height: 20, width: '100%'}}></View>
                    </ScrollView>
                </Modal>
            </Portal> 
        </SafeAreaView>
    )
}
