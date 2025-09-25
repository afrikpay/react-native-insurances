import { AntDesign } from '@expo/vector-icons';
import {
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
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';

export default function DetailFormule(props: any) {
  const { plan, insurer } = props.route.params;

  return (
    <SafeAreaView
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
            {i18n('detail_formule')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            alt={`Logo de l'assureur ${insurer.name}`}
            source={{ uri: insurer.logo }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 200,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.primary,
            textAlign: 'center',
          }}
        >
          {plan.name}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}
      >
        <RenderHtml
          contentWidth={width}
          source={{ html: `${plan.description}` }}
        />
        <Pressable
          onPress={() => {
            Navigation.navigate(ROUTES.SOUSCRIPTION_FORM, {
              planId: plan.id,
              insurerId: insurer.id,
            });
          }}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginTop: 40,
            backgroundColor: COLORS.primary,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {i18n('souscrire')}
          </Text>
        </Pressable>

        <View style={{ height: 80, width: '100%' }} />
      </ScrollView>
    </SafeAreaView>
  );
}
