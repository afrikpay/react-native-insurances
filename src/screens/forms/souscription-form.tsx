import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as Icon from "react-native-feather"
import { COLORS } from '../../constants/Colors'
import { height, width } from '../../constants/size'
import Navigation from '../../services/Navigation'
import { useEffect, useState } from 'react'
import { apiClient } from '../../data/axios'

// import {  } from 'rn-step-form';


export default function SouscriptionForm(props: any) {

    const { planId, insurerId } = props.route.params;

    const [loading, setLoading] = useState(false)

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
                console.log(JSON.stringify(response, null, 2));
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
                {/**
                 <StepFormBuilder
                    onSubmit={console.log}
                    steps={[
                        {
                            title: 'Step 1',
                            fields: [
                                {
                                    name: 'field1',
                                    label: 'Field label',
                                    type: 'text',
                                    validation: {
                                        required: { message: 'This field is required', value: true },
                                    },
                                },
                                {
                                    name: 'field2',
                                    label: 'field label',
                                    type: 'number',
                                },
                            ],
                            onStepComplete(data: any) {
                                console.log('data', data);
                                return Promise.resolve(data);
                            },
                        },
                        {
                            title: 'Step 2',
                            fields: [
                                {
                                    name: 'field1',
                                    label: 'Field label',
                                    type: 'text',
                                    validation: {
                                        required: { message: 'This field is required', value: true },
                                    },
                                },
                            ],
                        },
                    ]}
                    defaultValues={{}}
                    externalValues={{}}
                    onError={console.error}
                    onExternalValueChange={console.warn}
                />
                */}         
            </ScrollView>
        </View>
    )
}