import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Box } from '../components/ui/Box';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import { height, width } from '../constants/size';
import { apiClient } from '../data/axios';
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';
import type { Insurer } from '../types';

export default function Assureurs(props: any) {
  // Get params from navigation
  const product = props.route.params.product;

  const [loading, setLoading] = useState(false);
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response: any = await apiClient.post(
          '/secure/mobile/insurers/v1',
          { categoryId: product.id }
        );
        setInsurers(response.result ?? ([] as Insurer[]));
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [product]);

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
      <StatusBar hidden />

      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingTop: 25,
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
            {i18n('assureurs')}
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
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 10,
          }}
        >
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
          {insurers.map((insurer, index) => (
            <Box key={index} width={'100%'} padding={18}>
              <Pressable
                onPress={() => {
                  Navigation.navigate(ROUTES.DETAIL_ASSURANCE, {
                    product,
                    insurer,
                  });
                }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                  <View
                    style={{ flexDirection: 'row', width: '100%', gap: 20 }}
                  >
                    <Image
                      alt={insurer.name}
                      source={{ uri: insurer.logo }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100,
                      }}
                    />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          gap: 20,
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                          {insurer.name}
                        </Text>
                      </View>
                      <Text>03 Formules</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12 }}>
                    {insurer.shortDescription}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate(ROUTES.DETAIL_ASSURANCE, {
                      product,
                      insurer,
                    });
                  }}
                >
                  {/* 
                    <Feather
                      name="chevron-right"
                      color={COLORS.primary}
                      strokeWidth={1.5}
                      width={30}
                      height={30}
                    />
                  */}
                  <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
              </Pressable>
            </Box>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
