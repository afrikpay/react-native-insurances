import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import { height, width } from '../constants/size';
import { apiClient } from '../data/axios';
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';
import type { Plan } from '../types';

export default function DetailAssurance(props: any) {
  const [loading, setLoading] = useState(false);

  // Get params from navigation
  const { product, insurer } = props.route.params;
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response: any = await apiClient.post(
          '/secure/mobile/products/v1',
          {
            categoryId: product.id,
            tenantId: insurer.id,
          }
        );
        const data = response.result.plans;
        if (data && Object.keys(data).length > 0) {
          setPlans(Object.keys(data).map((key: string) => data[key] as Plan));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [insurer, product]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingTop: 35,
          gap: 30,
        }}
      >
        {/** Navigation bar  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              Navigation.back();
            }}
          >
            {/*
              <Feather
                name="chevron-left"
                color={COLORS.dark}
                strokeWidth={1.5}
                width={30}
                height={30}
              />
            */}
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {i18n('desc_assurance')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>
            {product.name}
          </Text>
          <Image
            alt={product.name}
            source={{ uri: product.image }}
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20, backgroundColor: '#F4F5F6' }}
      >
        <RenderHtml
          contentWidth={width}
          source={{ html: product.description }}
        />
        <View style={{ flexDirection: 'column', gap: 12, marginTop: 20 }}>
          <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>
            {i18n('formule_offertes')}
          </Text>
          {loading && (
            <View
              style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator
                size={`large`}
                color={COLORS.gray}
                style={{ height: 50, width: 50 }}
              />
            </View>
          )}
          <FlatList
            data={plans}
            showsHorizontalScrollIndicator={false}
            horizontal
            extraData={(item: Plan) => `${item.id}`}
            renderItem={({ item }: { item: Plan }) => (
              <Pressable
                onPress={() => {
                  Navigation.navigate(ROUTES.DETAIL_FORMULE, {
                    plan: item,
                    insurer,
                  });
                }}
                key={item.id}
                style={{
                  width: 250,
                  height: 'auto',
                  borderWidth: 0.05,
                  borderRadius: 12,
                  marginRight: 15,
                  padding: 15,
                  gap: 15,
                  backgroundColor: COLORS.white, // Ajout d'une couleur de fond pour l'ombre
                  shadowColor: COLORS.dark, // Couleur de l'ombre
                  shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
                  shadowOpacity: 0.2, // Opacité de l'ombre
                  shadowRadius: 6, // Rayon de flou de l'ombre
                  elevation: 2, // Ombre pour Android
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Navigation.navigate(ROUTES.DETAIL_FORMULE, {
                        plan: item,
                        insurer,
                      });
                    }}>
                    {/*
                      <Feather
                        name="chevron-right"
                        color={COLORS.primary}
                        strokeWidth={2}
                        width={25}
                        height={25}
                      />
                    */}
                    <AntDesign name="right" size={16} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text>{i18n('prime_ttc')}</Text>
                  <View>
                    {/**
                      <Text style={{ fontWeight: 'bold'}}>{item.price} XAF - Enfant</Text>
                      <Text style={{ fontWeight: 'bold'}}>74 000 XAF - Adulte</Text>
                    */}
                    <Text style={{ fontWeight: 'bold' }}>{item.price} XAF</Text>
                  </View>
                </View>
                {/** <Text>Couverture jusqu’a 500 000 XAF</Text> */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{i18n('duree')}</Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.duration_display}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
        <View style={{ height: 80, width: '100%' }} />
      </ScrollView>
    </SafeAreaView>
  );
}
