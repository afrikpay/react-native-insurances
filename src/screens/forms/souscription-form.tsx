import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { Modal, Portal } from 'react-native-paper'
import StepFormBuilder from '../../components/form/StepFormBuilder'
import type { FormStep } from '../../components/form/types/types'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { height, width } from '../../constants/size'
import { apiClient } from '../../data/axios'
import Navigation from '../../services/Navigation'
import WebviewScreen from './components/WebviewScreen'

const operateursMobile: Record<string, any>[]  = [
    {
        id: 1,
        name: 'MTN Money Cameroun',
        logo: IMAGES['mtnMoney'],
        slug: 'mtn_mobile_money'
    },
    {
        id: 2,
        name: 'Orange Money Cameroun',
        logo: IMAGES['orangeMoney'],
        slug: 'orange_money'
    }
]


export default function SouscriptionForm(props: any) {

    const { planId, insurerId } = props.route.params;

    const [visible, setVisible] = useState(false);
    const [showPaiementMothod, setShowPaiementMothod] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [loading, setLoading] = useState(false)
    const [formResult, setFormResult] = useState<Record<string, any>>()
    const [sectionFields, setSectionFields] = useState<Record<string, any>[]>([])

    const [formStep, setFormStep] = useState<FormStep[]>([])
    const [formStepCopy, setFormStepCopy] = useState<FormStep[]>([])
    const [assures, setAssures] = useState<Record<string, any>[]>([])

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = {
                    planId: planId,
                    insurerId: insurerId,
                    page: 1
                }
                const response: any = await apiClient.post('/secure/mobile/form/v1', {...data});       
                // console.log(JSON.stringify(response, null, 2));
                setFormResult(response.result)
                setSectionFields(response.result.fields)

                response.result.fields.map((f: any) => {
                    const item: FormStep = {
                        description: f.section,
                        header: () => {
                            return ( <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>#123 {f.section} </Text>)
                        },
                        title: f.section,
                        fields: [
                            ...f.fields.map((d: any) =>({
                                name: d.readable_label,
                                label: d.label,
                                type: d.field_type,
                                validation: {
                                    required: { message: 'This field is required', value: d.is_required },
                                },
                            })),
                        ],
                        onStepComplete(data: any) {
                            console.log('data', data);
                            return Promise.resolve(data);
                        },
                    };
                    setFormStep(prev => ([...prev, item ]))
                    setFormStepCopy(prev => ([...prev, item ]))
                })
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally{
                setLoading(false);
            }
        })()
    }, []);

    const paymentUrl = ''

    const successPayment = () => {

    }
    const failedPayment = () => {
        
    }
    const cancelPayment = () => {
        
    }

    const addInsurer = (formData: Record<string, any>) => {
        // Ajouter l'utilisateur à la liste des assurés
        setAssures(prev => ([...prev, formData]))
        setFormStep([])
    }

    const handleFetchPaymentUrl = async () => {
        try {
            const data = {
                referenceNumber: "willistowerwatson:0c972b67-d852-4b55-8d70-056b7fcfaf50",
                amount: 20000,
                externalId: "184595625878",
                paymentWallet: "237652310829",
                data: {
                  insurerId: 1,
                  paymentService: "mtn-money-ecommerce-payment-service-feature"
                }
            }
            const response: any = await apiClient.post('/secure/mobile/subscription/v1', {...data},
                { "Service": "mtn-money-ecommerce-payment-service-feature" })

            console.log(JSON.stringify(response, null, 2))
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
        finally{
            // setLoading(false);
        }  
    }

    const handleSubmitForm =  async() => {
        if (loading) return
        setLoading(true);
        
        try {
            const data = {
                formId: formResult?.formId,
                planId: planId,
                insurerId: insurerId,
                formData: getCorrectFormOfData()
            }
            const response: any = await apiClient.post('/secure/mobile/subscription/v1', {...data})
            setFormResult(response.result)
            setShowPaiementMothod(true)
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
        finally{
            setLoading(false);
        }
    }

    const getCorrectFormOfData = ()  =>  {
        let data = {}
        for (let index = 0; index < assures.length; index++) {
            const element = assures[index] as any
            let ownerData = {}
            Object.keys(element).forEach((key, i)  => {
                ownerData = { ...ownerData, [i+1]: element[key]}
            });
            data = {
                ...data,
                [`owner${index+1}`]: ownerData
            }
        }
        return data
    }

    return (
        <View style={{flex: 1, 
            height: height, width: width,  
            backgroundColor: COLORS.white,
            flexDirection: 'column',
            gap: 20 }}>
            <StatusBar hidden />
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingTop: 35, gap: 30, paddingBottom: 20, borderBottomWidth: 0.305, borderBottomColor: COLORS.light_gray}}>
                {/** Navigation bar  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity onPress={() => { Navigation.back() }}>
                        <Icon.ChevronLeft color={COLORS.dark} strokeWidth={1.5} width={30} height={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Souscription</Text>
                </View>            
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: 20,}}>
                {   
                    loading && (
                        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} color={COLORS.gray} style={{ height: 50, width: 50 }} />
                        </View>
                    )
                }
                { 
                    formStep.length > 0  &&
                    <View>
                        <StepFormBuilder
                            onSubmit={addInsurer}
                            steps={formStep}
                            defaultValues={{}}
                            externalValues={{}}
                            onError={console.error}
                            onExternalValueChange={console.warn}
                        />   
                    </View>
                } 
                { 
                    (formStep.length === 0 && !loading)  &&
                    <View>
                        <View style={{ marginBottom: 15 }}>
                            {
                               assures.map((insurer, index) => (
                                <View key={index} style={{ 
                                    paddingVertical: 10,
                                    paddingHorizontal: 7,
                                    borderWidth: 0.3,
                                    borderColor: COLORS.primary,
                                    borderRadius: 8,
                                    width: '100%',
                                    marginVertical: 6,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: COLORS.primary}}>#{index+1} {insurer.nom}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                                        <Icon.Edit2 style={{ width: 7, height: 7, borderColor: COLORS.gray }} />
                                        <Icon.Trash2 style={{ width: 7, height: 7, borderColor: COLORS.danger }} />
                                    </View>
                                </View>
                               )) 
                            }
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                            <Pressable
                                onPress={() => setFormStep(formStepCopy)}
                                style= {{ paddingVertical: 10, width: 150, backgroundColor: COLORS.gray, borderRadius: 100 }}>
                                <Text style={{color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Ajouter un assuré</Text>
                            </Pressable>
                            <Pressable
                                onPress={handleSubmitForm}
                                style= {{ paddingVertical: 10, width: 150, backgroundColor: COLORS.primary, borderRadius: 100 }}>
                                <Text style={{ color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Souscrire</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                {
                    showPaiementMothod &&
                    <View style={{ flexDirection: 'column', gap: 12, marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>Payer ma souscription avec:</Text>
                        <FlatList
                            data={operateursMobile}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            extraData={(item: any) => `${item.id}`}
                            renderItem={({ item }) => (
                                <Pressable
                                        onPress={showModal}
                                        key={item.id} style={{
                                        width: 80, height: 80, borderWidth: 0.05,
                                        borderRadius: 12,
                                        marginRight: 15,
                                        padding: 5, gap: 15,
                                        backgroundColor: COLORS.white, // Ajout d'une couleur de fond pour l'ombre
                                        shadowColor: COLORS.dark, // Couleur de l'ombre
                                        shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
                                        shadowOpacity: 0.2, // Opacité de l'ombre
                                        shadowRadius: 6, // Rayon de flou de l'ombre
                                        elevation: 2, // Ombre pour Android
                                    }}>
                                        <View style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: 10}}>
                                            <Image
                                                alt="Image de l'assurance santé"
                                                source={item.logo}
                                                style={{ 
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            />
                                        </View>
                                </Pressable>
                            )}
                        />
                    </View>
                }  

                <View style={{ height: 80, width: '100%'}} />
            </ScrollView>

             {/** Modal de payement de la souscription */}
             <Portal>
                <Modal visible={visible} onDismiss={hideModal} 
                    contentContainerStyle={{backgroundColor: 'white', padding: 20, width: '90%', marginLeft: '5%', borderRadius: 10}}>
                    <WebviewScreen
                        paymentUrl={paymentUrl ?? ''}
                        onPaymentSuccess={successPayment}
                        onPaymentFailed={failedPayment}
                        onPaymentCancel={cancelPayment}
                    />
                </Modal>
            </Portal> 
        </View>
    )
}