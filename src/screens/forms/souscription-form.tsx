import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import SimpleToast from 'react-native-simple-toast'
import StepFormBuilder from '../../components/form/StepFormBuilder'
import type { FormStep } from '../../components/form/types/types'
import { COLORS } from '../../constants/Colors'
import { ROUTES } from '../../constants/Routes'
import { height, width } from '../../constants/size'
import { apiClient } from '../../data/axios'
import Navigation from '../../services/Navigation'

export default function SouscriptionForm(props: any) {

    const { planId, insurerId } = props.route.params;

    // const [visible, setVisible] = useState(false);

    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);

    const [loading, setLoading] = useState(false)
    const [savingData, setSavingData] = useState(false)

    const [formResult, setFormResult] = useState<Record<string, any>>()

    const [formStep, setFormStep] = useState<FormStep[]>([])
    const [formStepCopy, setFormStepCopy] = useState<FormStep[]>([])
    const [assures, setAssures] = useState<Record<string, any>[]>([])
    const [defaultValues, setDefaultValues] = useState<any>(null)
    const [subscriber, setSubscriber] = useState<any>(null)
    
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
                setFormResult(response.result)
                response.result.fields.map((f: any) => {
                    const item: FormStep = {
                        description: f.section,
                        header: () => {
                            return ( <Text style={{ fontWeight: 'bold', marginBottom: 20 }}> {f.section} </Text>)
                        },
                        title: f.section,
                        fields: [
                            ...f.fields.map((d: any) =>({
                                name: `${d.id}`,
                                label: `${d.readable_label}`,
                                type: d.field_type,
                                validation: {
                                    required: { message: 'This field is required', value: d.is_required },
                                },
                            })),
                        ],
                        onStepComplete(data: any) {
                            return Promise.resolve(data);
                        },
                    }
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

    const addInsurer = (formData: Record<string, any>) => {
        if (savingData) return
        // Ajouter l'utilisateur à la liste des assurés
        setAssures(prev => ([formData, ...prev,]))
        setFormStep([])
        setDefaultValues(null)
    }

    const handleSubmitForm =  async() => {
        if (savingData) return
        setSavingData(true)
        
        try {
            const data = {
                formId: formResult?.formId,
                planId: planId,
                insurerId: insurerId,
                ...subscriber,
                formData: getCorrectFormOfData()
            }
            const response: any = await apiClient.post('/secure/mobile/subscription/v1', {...data})
            setFormResult(response.result)
            SimpleToast.show(response.result.message, 15)
            setTimeout(() => {
                let souscription = {
                    reference: response.result.referenceNumber,
                    owners: [],
                    customer: response.result.customerName,
                    amount: response.result.amount,
                    data: response.result.formData,
                    plan: response.result.plan,
                    product: response.result.product,
                    insurer: response.result.insurer,
                    subscribed_at: response.result.subscribeAt,
                    status: response.result.providerStatus,
                    duration_display: response.result.plan.duration_display,
                    display_status: response.result.providerStatus === 'P' ? 'En cours' : 'Terminé',
                }
                Navigation.navigate(ROUTES.DETAIL_SOUSCRIPTIONS, { souscription })
            }, 2000)
        }
        catch (error: any) {
            console.error('Error saving data:', error);
            SimpleToast.show(`Error saving data: ${error.message}`, 5)
        }
        finally{
            setSavingData(false);
        }
    }

    const getCorrectFormOfData = ()  =>  {
        let data = {}
        for (let index = 0; index < assures.length; index++) {
            data = {
                ...data,
                [`owner${index+1}`]: assures[index], // ownerData
            }
        }
        return data
    }

    const deleteInsurer = (insurer: Record<string, any>) => {
        if (savingData) return
        const firstKey = Object.keys(insurer)[0] as any        
        setAssures(prev => (prev.filter(p => p[firstKey] !== insurer[firstKey])))
    }

    const editInsurer = (insurer: Record<string, any>) => {
        if (savingData) return
        setFormStep(formStepCopy)
        setDefaultValues(insurer)
        deleteInsurer(insurer)
    }

    const goBack = () => {
        setFormStep([])
        setDefaultValues(null)
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
                    (!subscriber && !loading) && 
                    <View>
                        <Text style={{ paddingHorizontal: 20, fontWeight: 'bold' }}>Infos du souscripteur</Text>
                        <StepFormBuilder
                            onSubmit={setSubscriber}
                            steps={[
                                {
                                    title: "Informations du souscripteur",
                                    description: "",
                                    fields: [
                                        {
                                            name: "customerName",
                                            label: "Nom du souscripteur",
                                            type: "text",
                                            validation: {
                                                required: { message: 'This field is required', value: true },
                                            },
                                        },
                                        {
                                            name: "phone",
                                            label: "Téléphone",
                                            type: "text",
                                            validation: {
                                                required: { message: 'This field is required', value: true },
                                            },
                                        },
                                        {
                                            name: "email",
                                            label: "Email",
                                            type: "email",
                                            validation: {
                                                required: { message: 'This field is required', value: true },
                                            },
                                        }
                                    ]
                                }
                            ]}
                            defaultValues={{}}
                            externalValues={{}}
                            onError={console.error}
                            onExternalValueChange={console.warn}
                        />   
                    </View>
                }
                {
                    ((formStep.length > 0 || defaultValues) && subscriber) &&
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Ajouter un assuré</Text>
                            <Pressable
                                onPress={goBack}
                                style= {{ paddingVertical: 10, width: 80, backgroundColor: COLORS.white, borderRadius: 100 }}>
                                <Text style={{color: COLORS.dark, textAlign: "center"}}>Retour</Text>
                            </Pressable>
                        </View>
                        <StepFormBuilder
                            onSubmit={addInsurer}
                            steps={formStep}
                            defaultValues={{...defaultValues}}
                            externalValues={{}}
                            onError={console.error}
                            onExternalValueChange={console.warn}
                        />   
                    </View>
                } 
                { 
                    (formStep.length === 0 && !loading) &&
                    <View>
                        <View style={{ borderRadius: 8, borderWidth: 0.3, padding: 20, flexDirection: "column", gap: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>Souscripteur</Text>
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                                <Text>Nom: { subscriber?.customerName } </Text>
                                <Text>Téléphone: { subscriber?.phone } </Text>
                                <Text>Email: { subscriber?.email } </Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 15 }}>
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
                                    <Text style={{ color: COLORS.primary}}>Asuré N°{index+1}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                                        <Icon.Edit2 onPress={() => editInsurer(insurer)} style={{ width: 7, height: 7, borderColor: COLORS.gray }} />
                                        <Icon.Trash2 onPress={() => deleteInsurer(insurer)} style={{ width: 7, height: 7, borderColor: COLORS.danger }} />
                                    </View>
                                </View>
                               )) 
                            }
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                            <Pressable
                                onPress={() => { if (!savingData) {setFormStep(formStepCopy)}}}
                                style= {{ paddingVertical: 10, width: 150, backgroundColor: COLORS.gray, borderRadius: 100 }}>
                                <Text style={{color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Ajouter un assuré</Text>
                            </Pressable>
                            <Pressable
                                onPress={handleSubmitForm}
                                disabled={savingData || assures.length === 0} 
                                style= {{ paddingVertical: 10, width: 150, backgroundColor: COLORS.primary, borderRadius: 100,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8
                                }}>
                                {
                                    savingData && 
                                    <ActivityIndicator size={'small'} color={COLORS.white} style={{ height: 20, width: 20 }} />
                                }
                                <Text style={{ color: COLORS.white, fontWeight: "bold", textAlign: "center"}}>Souscrire</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                <View style={{ height: 80, width: '100%'}} />
            </ScrollView>
        </View>
    )
}