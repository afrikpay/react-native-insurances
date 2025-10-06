import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Box } from '../components/ui/Box';
import SouscriptionComponent from '../components/ui/souscription-component';
import { COLORS } from '../constants/Colors';
import { ROUTES } from '../constants/Routes';
import { height, width } from '../constants/size';
import { apiClient } from '../data/axios';
import useProduct from '../hooks/useProduct';
import useSubscription from '../hooks/useSubscription';
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';
import type { ProduitAssurance } from '../types';
import Auth from '../utils/Auth';

export default function Home() {
  const [username, setUsername] = useState("")
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    (async () => {
      const name = await Auth.getUsername();
      setUsername(name!)
    })();
  }, [])


  const onRefresh = () => {
    setRefreshing(true)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: height,
        width: width,
        padding: 20,
        paddingTop: 30,
        paddingBlock: 0,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 20,
      }}>
      {/* Section 1 */}
      <View style={{ 
        backgroundColor: COLORS.white, padding: 0, display: 'flex', 
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', gap: 10 }}>
        <Pressable style={{ flex: 1}}
            onPress={() => Navigation.back()}>
            <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={{ fontWeight: 'bold', flex: 1 }}>{username}</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {i18n('bon_retour')}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '500' }}>{username}</Text>
        </View>
        <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={() => {}}>
          <Feather
            name="bell"
            color={COLORS.light_blue}
            strokeWidth={2}
            width={30}
            height={30}
          />
          <View
            style={{
              backgroundColor: COLORS.danger,
              position: 'absolute',
              top: 0,
              right: 0,
              height: 18,
              width: 18,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 9,
                color: COLORS.white,
                fontWeight: 'bold',
              }}>
              02
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {/** Subscription Card */}
      <HomeCard />

      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/** Product Section */}
        <ProductSection 
          refreshing={refreshing}
          setRefreshing={setRefreshing}
        />

        <View style={{ marginTop: 20 }} />

        {/** Subscriptions section */}
        <RenderSubscriptionSection 
          refreshing={refreshing} 
          setRefreshing={setRefreshing}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export function HomeCard() {
  const defaultProduct: ProduitAssurance = {
    id: 1,
    slug: 'assurance-maladie-1',
    name: 'Assurance Maladie',
    description:
      '<p>L&#39;assurance maladie est un dispositif de la S&eacute;curit&eacute; Sociale qui vise &agrave; prot&eacute;ger financi&egrave;rement les individus et leurs familles contre les risques li&eacute;s &agrave; la maladie, la maternit&eacute;, les accidents, l&#39;invalidit&eacute;, les maladies professionnelles et le d&eacute;c&egrave;s.&nbsp;Elle permet de garantir l&#39;acc&egrave;s aux soins et prend en charge tout ou partie des d&eacute;penses de sant&eacute;</p>',
    image:
      'https://storage.googleapis.com/afrikpay_insurances/media/categories/Assurance_Maladie.jpg',
  };
  const [product, setProduct] = useState<ProduitAssurance>(defaultProduct)
  
  useEffect(() => {
    ( async () => {
      const response: any = await apiClient.post(
        '/secure/mobile/categories/v1',{})
      if (response.code === 200 && response.message === "success" && response.result.length > 0 ){
        setProduct({...response.result[0]})
      }
    })()
  }, [])
  
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: COLORS.primary,
        minHeight: 200
      }}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontWeight: '400', fontSize: 15, color: COLORS.white }}>
            {i18n('favorite_sous_titre')}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.white }}>
            {/* {i18n('favorite_titre')} */}
            {product.name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Pressable
              onPress={() => {
                Navigation.navigate(ROUTES.ASSUREURS, { product });
              }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: COLORS.white,
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                {i18n('souscrire')}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ width: 100 }}>
          <Image
            alt={product.name}
            source={{ uri: product.image }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
    </View>
  );
}

export function ProductSection(
  { refreshing, setRefreshing}: {
    refreshing: boolean, setRefreshing: (val: boolean) => void
  }
) {
  const { products, setProducts, findProducts } = useProduct()
  const [loading, setLoading] = useState(false);

  const findCategories = async () => {
    if (!refreshing) { setLoading(true);}
    setProducts([])
    try {
      await findProducts()
    } catch (error: any) {
      if ( error.status === 502) { findCategories() }
    } finally {
      setLoading(false);
      setRefreshing(false)
    }
  }

  useEffect(() => {
    findCategories()
  }, []);

  useEffect(() => {
    if (refreshing){findCategories()}
  }, [refreshing]);

  return (
    <View style={{ flexDirection: 'column', gap: 10 }}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          {i18n('produits_assurance')}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => {
              Navigation.navigate(ROUTES.PRODUITS);
            }}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: COLORS.primary,
              borderRadius: 100,
            }}>
            <Text
              style={{ color: COLORS.white, fontWeight: '400', fontSize: 10 }}>
              {i18n('voir_plus')}
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 10,
        }}>
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
              color={COLORS.gray}
              style={{ height: 50, width: 50 }}
            />
          </View>
        )}
        {products.slice(0, 4).map((product: any, index: number) => (
          <Box key={index} width={width / 2 - 26} padding={10}>
            <Pressable
              onPress={() => { Navigation.navigate(ROUTES.ASSUREURS, { product }); }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image
                alt={product.name}
                source={{ uri: product.image }}
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                }}
              />
              <Text
                numberOfLines={2}
                lineBreakMode="clip"
                style={{ paddingRight: 35, width: '100%' }}>
                {product.name}
              </Text>
            </Pressable>
          </Box>
        ))}
      </View>
    </View>
  );
}
export function RenderSubscriptionSection(
  { refreshing, setRefreshing }: { refreshing: boolean, setRefreshing: (val: boolean) => void }
) {
  const [loading, setLoading] = useState(false);

  const { souscriptions, setSouscriptions, findSubscriptions} = useSubscription()

  const fetchSouscriptions = async () => {
    if (!refreshing) { setLoading(true);}
    setSouscriptions([])
    try {
      await findSubscriptions({ page: 1, pageSize: 4 })
    } catch (error: any) {
      if ( error.status === 502) {fetchSouscriptions()}
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  
  useEffect(() => {
    fetchSouscriptions();
  }, [])

  useEffect(() => {
    if (refreshing){ fetchSouscriptions(); }
  }, [refreshing])

  return (
    <View style={{ flexDirection: 'column', gap: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          {i18n('dernieres_souscriptions')}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => { Navigation.navigate(ROUTES.SOUSCRIPTIONS) }}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: COLORS.primary,
              borderRadius: 100,
            }}
          >
            <Text
              style={{ color: COLORS.white, fontWeight: '400', fontSize: 10 }}
            >
              {i18n('voir_plus')}
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 10,
        }}>
        {loading && (
          <View
            style={{
              width: '100%',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              color={COLORS.gray}
              style={{ height: 50, width: 50 }}
            />
          </View>
        )}
        {souscriptions.map((souscription: any, index: number) => (
          <SouscriptionComponent key={index} souscription={souscription} />
        ))}
        {!loading && souscriptions.length === 0 && (
          <View
            style={{
              height: 320,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: COLORS.gray }}>
              {i18n('aucune_souscription')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}