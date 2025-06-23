import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { COLORS } from '../../constants/Colors'
import { height, width } from '../../constants/size'
import Navigation from '../../services/Navigation'
import { useEffect, useState } from 'react'
import { apiClient } from '../../data/axios'
import StepFormBuilder from '../../components/form/StepFormBuilder'
import type { Field } from '../../types'
import type { FormStep } from '../../components/form/types/types'
import WebviewScreen from './components/WebviewScreen'
import { Modal, Portal } from 'react-native-paper'
import { ROUTES } from '../../constants/Routes'
import { IMAGES } from '../../constants/Images'

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
    const [fields, setFields] = useState<Field[]>([])
    const [formStep, setFormStep] = useState<FormStep[]>([])

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

    const handleFetchPaymentUrl = async ()  => {
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

    const handleSubmitForm =  async( formData: Record<string, any> ) => {
        console.log("formData", formData);
        // if (loading) return
        // setLoading(true);
        try {
            const data = {
                formId: formResult?.formId,
                planId: planId,
                insurerId: insurerId,
                formData: formData
            }
            const response: any = await apiClient.post('/secure/mobile/subscription/v1', {...data})
            // setFormResult(response.result)
            setShowPaiementMothod(true)       
            // console.log(JSON.stringify(response, null, 2))
            const res = {
                "code": 200,
                "message": "success",
                "result": {
                  "errorCode": null,
                  "errorMessage": null,
                  "errorType": null,
                  "status": "SUCCESS",
                  "callbackUrl": null,
                  "voucher": null,
                  "id": 1835363078805442,
                  "referenceNumber": "willistowerwatson:0c972b67-d852-4b55-8d70-056b7fcfaf50",
                  "product": "Willis Tower Watson-Assurance Maladie",
                  "formId": 1,
                  "planId": 6,
                  "insurerName": "Willis Tower Watson",
                  "planName": "Premium",
                  "insurerId": "1",
                  "amount": 20000,
                  "plan": null,
                  "providerStatus": "P",
                  "insurer": null,
                  "subscribeAt": "2025-06-19T13:10:31.005372Z",
                  "endAt": null,
                  "startAt": null,
                  "customerId": "3865687338067599",
                  "customerName": "Super KJ7",
                  "formData": {
                    "name": "patson",
                    "nom": "Jordan",
                    "email": "jordan@gmail.com",
                    "phonenumber": "874543456"
                  }
                }
            }
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
        finally{
            // setLoading(false);
        }
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
                            <ActivityIndicator color={COLORS.gray} style={{ height: 50, width: 50 }} />
                        </View>
                    )
                }
                { 
                    formStep.length > 0  &&
                    <View>
                        <StepFormBuilder
                            onSubmit={handleSubmitForm}
                            steps={formStep}
                            defaultValues={{}}
                            externalValues={{}}
                            onError={console.error}
                            onExternalValueChange={console.warn}
                        />   
                    </View>
                } 
                {
                    showPaiementMothod &&
                    <View style={{ flexDirection: 'column', gap: 12, marginTop: 20, paddingHorizontal: 20,  }}>
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