import { Image, Pressable, Text, View } from "react-native"
import type { Souscription } from "../../types"
import { Box } from "./Box"
import Navigation from '../../services/Navigation'
import { ROUTES } from "../../constants/Routes"
import { COLORS } from "../../constants/Colors"

export default function SouscriptionComponent({souscription}: {souscription: Souscription}) {
    return (
      <Box width={'100%'} padding={18}>
          <Pressable onPress={() => { Navigation.navigate(ROUTES.DETAIL_SOUSCRIPTIONS, { souscription }) }}>
              <View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                            <View style={{
                                height: 40,
                                width: 40,
                                borderRadius: 100,
                                overflow: 'hidden'
                            }}>
                                <Image
                                    alt={`${souscription.insurer.name} logo`}
                                    source={{ uri: souscription.insurer.logo }}
                                    style={{ height: '100%', width: '100%'}}
                                />
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <View style={{ height: 10, width: 10, backgroundColor: souscription.status === "P" ? COLORS.success : COLORS.dark, borderRadius: 10 }}></View>
                              <Text style={{ color: souscription.status === "P" ? COLORS.success : COLORS.dark, fontSize: 16 }}>{souscription.display_status}</Text>
                          </View>
                      </View>
                      
                      <View style={{ flexDirection: 'column' }}>
                          <Text style={{ fontSize: 22, fontWeight: 'bold' }} lineBreakMode='tail'>{souscription.plan.name}</Text>
                          <Text numberOfLines={2} lineBreakMode='clip'>{souscription.product}</Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: 'center', gap: 20, marginTop: 10}}>
                      <Text style={{ fontSize: 12, marginVertical: 10 }}>{souscription.insurer.shortDescription}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                          <Text style={{ fontWeight: 'bold'}}>{souscription.amount}</Text>
                          <Text style={{ fontSize: 10, opacity: 0.7}}>XAF/mois</Text>
                      </View>
                  </View>
                  <Text style={{ opacity: 0.7, marginTop: 5}}>Validité: {souscription.subscribed_at?.slice(0, 10)}</Text>
              </View>
          </Pressable>
      </Box>
    )
}