import { AntDesign, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Modal, Portal, RadioButton } from 'react-native-paper';
import DropdownComponent from '../components/ui/DropdownComponent';
import SouscriptionComponent from '../components/ui/souscription-component';
import { COLORS } from '../constants/Colors';
import { height, width } from '../constants/size';
import { apiClient } from '../data/axios';
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';
import type { Souscription } from '../types';

const pattern = 'YYYY/MM/DD'; //  HH:mm:ss'


const status = [
  {
    label: "En attente",
    value: "P"
  },
  {
    label: "Verifiée",
    value: "V"
  },
  {
    label: "Payé",
    value: "M"
  },
  {
    label: "Acceptée",
    value: "A"
  },
  {
    label: "Rejetée",
    value: "U"
  },
  {
    label: "Suspendue",
    value: "S"
  },
  {
    label: "Completée",
    value: "C"
  },
  {
    label: "Prết",
    value: "R"
  },
  {
    label: "Passée",
    value: "D"
  },
]

export default function Souscriptions() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date  | null>(new Date());

  const [mode, setMode] = useState<'date' | 'countdown' | 'time' | 'datetime'>(
    'date'
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(moment(startDate).format(pattern));
  const [selectedEndDate, setSelectedEndDate] = useState(moment(endDate).format(pattern));

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
  const [souscriptionsCopy, setSouscriptionsCopy] = useState<Souscription[]>([]);

  const [selectedStatus, setSelectedStatus] = useState("")

  const fetchSubscription = async (currentPage?: number) => {
    setLoading(true);
    try {
      let body: any = {
        page: currentPage ?? page,
        pageSize: 10,
      }
      if ( selectedStatus){
        body = { ...body, requestStatus: selectedStatus }
      }
      if (currentPage && startDate){
        body = { ...body, startAtGte: startDate.toISOString() }
      }
      if (currentPage && endDate){
        body = { ...body, endAtGte: endDate.toISOString() }
      }
      // console.log(JSON.stringify(body, null, 2))

      const response: any = await apiClient.post('/secure/mobile/insurance/subscription-list/v1', body );
      
      setNextPage(response.result.next)

      if (response.result.subscriptions){
        setSouscriptions((prev) =>
          prev.concat(response.result.subscriptions ?? ([] as Souscription[]))
        );
        setSouscriptionsCopy((prev) =>
          prev.concat(response.result.subscriptions ?? ([] as Souscription[]))
        );
      }

      setStartDate(null)
      setEndDate(null)
      setSelectedStatus('')

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const onChangeStart = (event: any, seletedDate: any) => {
    // console.log('onChangeStart', event, seletedDate)
    if (event.type === 'dismissed') {
      setShowStartDatePicker(false);
      return;
    }
    const currentDate = seletedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    setSelectedStartDate(moment(currentDate).format(pattern));
  };
  const onChangeEnd = (event: any, seletedDate: any) => {
    if (event.type === 'dismissed') {
      setShowStartDatePicker(false);
      return;
    }
    const currentDate = seletedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
    setSelectedEndDate(moment(currentDate).format(pattern));
  };

  // Filter souscriptions by name
  const searchSouscriptions = (searchTerm: string) => {
    setSearch(searchTerm);
    if (!searchTerm) {
      setSouscriptions(souscriptionsCopy);
      return;
    }
    const filtered = souscriptionsCopy.filter(
      (souscription) =>
        souscription.plan.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        souscription.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        souscription.insurer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setSouscriptions(filtered);
  };

  const onEndReached = async () => {
    if (nextPage === null) return
    const currentPage = page + 1
    setPage(currentPage)
    await fetchSubscription(currentPage);
  }

  const onRefresh = async () => {
    setRefreshing(true)
    const currentPage = 1
    setPage(currentPage)
    await fetchSubscription(currentPage)
    setRefreshing(false)
  }

  const onChangeValue = (item: Record<string, string>) => {
    setSelectedStatus(item!.id!)
  }

  const handleApplyFilters = async () => {
    const currentPage = 1
    setPage(currentPage)
    setSouscriptions([])
    setSouscriptionsCopy([])
    hideModal()
    await fetchSubscription(currentPage)
  }


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
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              flex: 1,
              fontWeight: 'bold',
            }}
          >
            {i18n('mes_souscriptions')}
          </Text>
          <TouchableOpacity onPress={showModal}>
            {/* 
              <Feather
                name="filter"
                color={COLORS.primary}
                strokeWidth={1.5}
                width={25}
                height={25}
              />
            */}
            <AntDesign name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 45 }}>
          {/** Search input */}
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              borderWidth: 0.6,
              borderColor: COLORS.primary,
              paddingHorizontal: 15,
              borderRadius: 100,
              height: 50,
            }}
            placeholder={i18n('rechercher_souscription')}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={searchSouscriptions}
            // onFocus={onFocus}
            value={search}
            placeholderTextColor={'#9D9D9D'}
            secureTextEntry={false}
            keyboardType={'default'}
            multiline={false}
            editable={true}
          />
          <TouchableOpacity
            style={{ marginRight: 4, position: 'absolute', top: 12, right: 10 }}
            onPress={() => {
              console.log(search);
            }}
          >
            {/*
              <Feather
                name="search"
                color={COLORS.light_blue}
                strokeWidth={2}
                width={25}
                height={25}
              />
            */}
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {loading && souscriptions.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.gray} />
        </View>
      )}
      {souscriptions.length > 0 && (
        <View style={{flex:1, paddingHorizontal: 20 }}>
          <FlatList
            data={souscriptions}
            extraData={(item: any) => `${item.id}`}
            keyExtractor={(item: Souscription) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: Souscription }) => (
              <View style={{ marginBottom: 15 }} key={item.id}>
                <SouscriptionComponent souscription={item} />
              </View>
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListFooterComponent={ () => {
              if (souscriptions.length > 0 && loading){
                return (<View
                  style={{
                    paddingVertical: 15,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                <ActivityIndicator size="small" color={COLORS.gray} />
              </View>)
              }
              return <View></View>
            }}
          />
        </View>
      )}
      {!loading && souscriptions.length === 0 && (
        <View
          style={{
            height: 320,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: COLORS.gray }}>
            {i18n('aucune_souscription')}
          </Text>
        </View>
      )}
      {/** Modal de filtre des souscriptions */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: COLORS.white,
            padding: 20,
            width: '90%',
            marginLeft: '5%',
            borderRadius: 10,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {i18n('filtre_titre')}
            </Text>
            <View
              style={{
                borderBottomWidth: 0.6,
                borderBottomColor: 'gray',
                opacity: 0.3,
                marginVertical: 10,
              }}
            />
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                {i18n('filtre_statut')}
              </Text>
              <View style={{ marginBottom: 40 }}>
                <DropdownComponent
                  label="Sélectionner un statut"
                  placeholder="Sélectionner une statut"
                  data={status}
                  onChangeValue={onChangeValue}
                />
              </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
                {i18n('filtre_periode')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 12, marginTop: 25 }}>Entre: </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowStartDatePicker(true);
                  setMode('date');
                }}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  width: 'auto',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Feather name="calendar" color={COLORS.dark} />
                <Text style={{ color: COLORS.dark }}>{selectedStartDate}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 12, marginTop: 25 }}>Et: </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowEndDatePicker(true);
                  setMode('date');
                }}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  width: 'auto',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Feather name="calendar" color={COLORS.dark} />
                <Text style={{ color: COLORS.dark }}>{selectedEndDate} </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              {showStartDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate!}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeStart}
                />
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate!}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeEnd}
                />
              )}
            </View>
            <View style={{ marginTop: 40 }}>
              <Button
                style={{ backgroundColor: COLORS.primary  }}
                mode="contained"
                onPress={handleApplyFilters}>
                <Text style={{ color: COLORS.white }}>{i18n('btn_appliquer')}</Text>
              </Button>
            </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
