import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import StepFormBuilder from '../../components/form/StepFormBuilder';
import type { FormStep } from '../../components/form/types/types';
import { COLORS } from '../../constants/Colors';
import { ROUTES } from '../../constants/Routes';
import { height, width } from '../../constants/size';
import { apiClient } from '../../data/axios';
import Navigation from '../../services/Navigation';
import i18n from '../../translations/i18n';
import type { User } from '../../types';
import Auth from '../../utils/Auth';

export default function SouscriptionForm(props: any) {
  const { planId, insurerId } = props.route.params;

  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [_, setUser] = useState<User>();

  const [formResult, setFormResult] = useState<Record<string, any>>();

  const [formStep, setFormStep] = useState<FormStep[]>([]);
  const [formStepCopy, setFormStepCopy] = useState<FormStep[]>([]);
  const [assures, setAssures] = useState<Record<string, any>[]>([]);
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const [defaultSubscriberValues, setDefaultSubscriberValues] = useState<any>(null);
  const [subscriber, setSubscriber] = useState<any>(null);
  // const [subscribeFor, setSubscribeFor] = useState<'myself' | 'other'>('myself');
  // const [insurer, setInsurer] = useState<'myself' | 'other'>('other');


  console.log(JSON.stringify({},));
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userData = await Auth.getUser()
        setUser(userData)
        setDefaultSubscriberValues({})
        /* setDefaultSubscriberValues({
          customerName: userData?.name,
          phone: userData?.phone,
          email: userData?.email
        }) */

        const data = {
          planId: planId,
          insurerId: insurerId,
          page: 1,
        };

        const response: any = await apiClient.post('/secure/mobile/form/v1', { ...data });
        setFormResult(response.result);
        response.result.fields.map((f: any) => {
          const item: FormStep = {
            description: f.section,
            header: () => {
              return (
                <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>
                  {' '}
                  {f.section}{' '}
                </Text>
              );
            },
            title: f.section,
            fields: [
              ...f.fields.map((d: any) => ({
                name: `${d.id}`,
                label: `${d.readable_label}`,
                type: d.field_type,
                validation: {
                  required: {
                    message: 'This field is required',
                    value: d.is_required,
                  },
                },
              })),
            ],
            onStepComplete(data: any) {
              return Promise.resolve(data);
            },
          };
          setFormStep((prev) => [...prev, item]);
          setFormStepCopy((prev) => [...prev, item]);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addInsurer = (formData: Record<string, any>) => {
    if (savingData) return;
    // Ajouter l'utilisateur à la liste des assurés
    setAssures((prev) => [ ...prev, formData ]);
    setFormStep([]);
    setDefaultValues(null);
  };

  const handleSubmitForm = async () => {
    if (savingData) return;
    if (assures.length === 0){ SimpleToast.show(`Veuillez ajouter au-moins un assuré !`, 5) }
    setSavingData(true);

    try {
      const data = {
        formId: formResult?.formId,
        planId: planId,
        insurerId: insurerId,
        ...subscriber,
        formData: getCorrectFormOfData(),
      };
      const response: any = await apiClient.post('/secure/mobile/subscription/v1', { ...data });
      
      setFormResult(response.result);
      SimpleToast.show(response.result.message, 15);
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
          display_status:
            response.result.providerStatus === 'P' ? 'En cours' : 'Terminé',
        };
        Navigation.replace(ROUTES.DETAIL_SOUSCRIPTIONS, { souscription });
      }, 2000);
    } catch (error: any) {
      console.error('Error saving data:', error);
      SimpleToast.show(`Error saving data: ${error.message}`, 5);
    } finally {
      setSavingData(false);
    }
  };

  const getCorrectFormOfData = () => {
    let data = {};
    for (let index = 0; index < assures.length; index++) {
      data = {
        ...data,
        [`owner${index + 1}`]: assures[index], // ownerData
      };
    }
    return data;
  };

  const deleteInsurer = (insurer: Record<string, any>) => {
    if (savingData) return;
    const firstKey = Object.keys(insurer)[0] as any;
    setAssures((prev) => prev.filter((p) => p[firstKey] !== insurer[firstKey]));
  };

  const editInsurer = (insurer: Record<string, any>) => {
    if (savingData) return;
    setFormStep(formStepCopy);
    setDefaultValues(insurer);
    deleteInsurer(insurer);
  };

  const goBack = () => {
    if (defaultValues != null){addInsurer(defaultValues)}
    else {
      setFormStep([])
      setDefaultValues(null)
    }
  }

  /* const handleUpdateSubcriber =  async (subscribeTo: "myself" | "other") => {
    setSubscribeFor(subscribeTo)
    if (subscribeTo === "myself"){
      setDefaultSubscriberValues({
        customerName: user?.name,
        phone: user?.phone,
        email: user?.email
      })
    }
    else{
      setDefaultSubscriberValues({})
    }
  } */

  return (
    <View
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20,
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingTop: 35,
          gap: 30,
          paddingBottom: 20,
          borderBottomWidth: 0.305,
          borderBottomColor: COLORS.light_gray,
        }}>
        {/** Navigation bar  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              if (!savingData){
                Navigation.back();
              }
            }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {i18n('souscription')}
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}>
        {loading && (
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              size={'large'}
              color={COLORS.gray}
              style={{ height: 50, width: 50 }}
            />
          </View>
        )}
        { (!loading &&!subscriber) && (
          <View>
            <View style={{ paddingHorizontal: 20, gap: 10 }}>
              {/* <Text style={{ fontSize: 12 }}>Souscripteur:</Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Pressable
                  onPress={() => handleUpdateSubcriber("myself")}
                  style={{
                    paddingVertical: 8,
                    flexDirection: "row",
                    justifyContent: 'center', alignItems: 'center',
                    gap: 5,
                    paddingHorizontal: 14,
                    borderColor: subscribeFor === "myself" ? COLORS.primary: COLORS.gray,
                    borderWidth: 1,
                    borderRadius: 100,
                  }}>
                  <View style={{ height: 16, width: 16, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: subscribeFor === "myself" ? COLORS.primary : COLORS.gray, 
                    borderRadius: 100, padding: 2 }}>
                    <View style={{ height: 10, width: 10, backgroundColor: COLORS.white, borderRadius: 100 }}></View>
                  </View>
                  <Text
                    style={{
                      color: subscribeFor === "myself" ? COLORS.primary : COLORS.gray,
                      fontWeight: 'bold',
                      textAlign: 'center' }}>
                    Moi
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleUpdateSubcriber("other")}
                  style={{
                    paddingVertical: 8,
                    flexDirection: "row",
                    justifyContent: 'center', alignItems: 'center',
                    gap: 5,
                    paddingHorizontal: 10,
                    borderColor: subscribeFor === "other" ? COLORS.primary: COLORS.gray,
                    borderWidth: 1,
                    borderRadius: 100,
                  }}>
                  <View style={{ height: 16, width: 16, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: subscribeFor === "other" ? COLORS.primary : COLORS.gray, 
                    borderRadius: 100, padding: 2 }}>
                    <View style={{ height: 10, width: 10, backgroundColor: COLORS.white, borderRadius: 100 }}></View>
                  </View>
                  <Text
                    style={{
                      color: subscribeFor === "other" ? COLORS.primary : COLORS.gray,
                      fontWeight: 'bold',
                      textAlign: 'center' }}>
                    Autre
                  </Text>
                </Pressable>
              </View> */}
              <Text style={{ fontWeight: 'bold' }}>
                {i18n('infos_souscripteur')}
              </Text>
            </View>
            <StepFormBuilder
              onSubmit={setSubscriber}
              steps={[
                {
                  title: 'Informations du souscripteur',
                  description: '',
                  fields: [
                    {
                      name: 'customerName',
                      label: i18n('nom_souscripteur'),
                      type: 'text',
                      validation: {
                        required: {
                          message: 'This field is required',
                          value: true,
                        },
                      },
                    },
                    {
                      name: 'phone',
                      label: i18n('tel_souscripteur'),
                      type: 'number',
                      validation: {
                        required: {
                          message: 'This field is required',
                          value: true,
                        },
                      },
                    },
                    {
                      name: 'email',
                      label: 'Email',
                      type: 'email',
                      validation: {
                        required: {
                          message: 'This field is required',
                          value: true,
                        },
                      },
                    },
                  ],
                },
              ]}
              defaultValues={{ ...defaultSubscriberValues }}
              externalValues={{}}
              onError={console.error}
              onExternalValueChange={console.warn}
            />
          </View>
        )}
        {(formStep.length > 0 || defaultValues) && subscriber && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {i18n('ajouter_assure')}
              </Text>
              <Pressable
                onPress={goBack}
                style={{
                  paddingVertical: 10,
                  width: 80,
                  backgroundColor: COLORS.white,
                  borderRadius: 100,
                }}>
                <Text style={{ color: COLORS.dark, textAlign: 'center' }}>
                  {i18n('retour')}
                </Text>
              </Pressable>
            </View>
            {/* <View style={{ paddingHorizontal: 20, gap: 10 }}>
              <Text style={{ fontSize: 12 }}>Je souscris pour:</Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Pressable
                  onPress={() => setInsurer("myself")}
                  style={{
                    paddingVertical: 8,
                    flexDirection: "row",
                    justifyContent: 'center', alignItems: 'center',
                    gap: 5,
                    paddingHorizontal: 14,
                    borderColor: insurer === "myself" ? COLORS.primary: COLORS.gray,
                    borderWidth: 1,
                    borderRadius: 100,
                  }}>
                  <View style={{ height: 16, width: 16, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: insurer === "myself" ? COLORS.primary : COLORS.gray, 
                    borderRadius: 100, padding: 2 }}>
                    <View style={{ height: 10, width: 10, backgroundColor: COLORS.white, borderRadius: 100 }}></View>
                  </View>
                  <Text
                    style={{
                      color: insurer === "myself" ? COLORS.primary : COLORS.gray,
                      fontWeight: 'bold',
                      textAlign: 'center' }}>
                    Moi
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setInsurer("other")}
                  style={{
                    paddingVertical: 8,
                    flexDirection: "row",
                    justifyContent: 'center', alignItems: 'center',
                    gap: 5,
                    paddingHorizontal: 10,
                    borderColor: insurer === "other" ? COLORS.primary: COLORS.gray,
                    borderWidth: 1,
                    borderRadius: 100,
                  }}>
                  <View style={{ height: 16, width: 16, 
                    justifyContent: 'center', alignItems: 'center', 
                    backgroundColor: insurer === "other" ? COLORS.primary : COLORS.gray, 
                    borderRadius: 100, padding: 2 }}>
                    <View style={{ height: 10, width: 10, backgroundColor: COLORS.white, borderRadius: 100 }}></View>
                  </View>
                  <Text
                    style={{
                      color: insurer === "other" ? COLORS.primary : COLORS.gray,
                      fontWeight: 'bold',
                      textAlign: 'center' }}>
                    Un proche
                  </Text>
                </Pressable>
              </View>
            </View> */}
            <StepFormBuilder
              onSubmit={addInsurer}
              steps={formStep}
              defaultValues={{ ...defaultValues }}
              externalValues={{}}
              onError={console.error}
              onExternalValueChange={console.warn}
            />
          </View>
        )}
        {formStep.length === 0 && !loading && (
          <View>
            <View
              style={{
                borderRadius: 8,
                borderWidth: 0.3,
                padding: 20,
                flexDirection: 'column',
                gap: 8,
              }}>
              <Text style={{ fontWeight: 'bold' }}>{i18n('souscripteur')}</Text>
              <View style={{ flexDirection: 'column', gap: 4 }}>
                <Text>
                  {i18n('nom')}: {subscriber?.customerName}{' '}
                </Text>
                <Text>
                  {i18n('tel_souscripteur')}: {subscriber?.phone}{' '}
                </Text>
                <Text>Email: {subscriber?.email} </Text>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              {assures.map((insurer, index) => (
                <View
                  key={index}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 7,
                    borderWidth: 0.3,
                    borderColor: COLORS.primary,
                    borderRadius: 8,
                    width: '100%',
                    marginVertical: 6,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: COLORS.primary }}>
                    {i18n('assure')} N°{index + 1}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 18,
                    }}>
                    <AntDesign onPress={() => editInsurer(insurer)} name="edit" size={24} color="black" />
                    <AntDesign onPress={() => deleteInsurer(insurer)} name="delete" size={24} color="red" />
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 8,
              }}>
              <Pressable
                onPress={() => {
                  if (!savingData) {
                    setFormStep(formStepCopy);
                  }
                }}
                style={{
                  paddingVertical: 10,
                  width: 150,
                  backgroundColor: COLORS.gray,
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {i18n('ajouter_assure')}
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSubmitForm}
                disabled={savingData || assures.length === 0}
                style={{
                  paddingVertical: 10,
                  width: 150,
                  backgroundColor: COLORS.primary,
                  borderRadius: 100,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {savingData && (
                  <ActivityIndicator
                    size={'small'}
                    color={COLORS.white}
                    style={{ height: 20, width: 20 }}
                  />
                )}
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {i18n('souscrire')}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        <View style={{ height: 80, width: '100%' }} />
      </ScrollView>
    </View>
  );
}
