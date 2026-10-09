import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { COLORS } from '../constants/Colors';
import { height, width } from '../constants/size';
import { useFetchClient } from '../context/FetchClientProvider';
import useDate from '../hooks/useDate';
import useSeparator from '../hooks/useSeparator';
import Navigation from '../services/Navigation';
import i18n from '../translations/i18n';

const NA = '—';

const findValue = (
  source: Record<string, any> | null | undefined,
  keys: string[]
): string => {
  if (!source) return NA;
  const entries = Object.entries(source);
  for (const k of keys) {
    const lowered = k.toLowerCase();
    for (const [key, value] of entries) {
      if (
        typeof value === 'string' &&
        value.trim().length > 0 &&
        (key.toLowerCase() === lowered ||
          key.toLowerCase().includes(lowered) ||
          lowered.includes(key.toLowerCase()))
      ) {
        return value;
      }
    }
  }
  return NA;
};

const formatAmount = (
  value: any,
  numberWithCommas: (n: number) => string | number
): string => {
  if (value === null || value === undefined || value === '') return NA;
  const num = Number(value);
  if (Number.isNaN(num)) return NA;
  const formatted = numberWithCommas(num);
  return `${formatted} XAF`;
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  const display = value && value.trim().length > 0 ? value : NA;
  const isEmpty = display === NA;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.light_gray,
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 'bold',
          color: COLORS.dark,
        }}
      >
        {label}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: '600',
          color: isEmpty ? COLORS.gray : COLORS.dark,
          fontStyle: isEmpty ? 'italic' : 'normal',
          textAlign: 'right',
        }}
      >
        {display}
      </Text>
    </View>
  );
};

const SectionCard = ({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) => (
  <View
    style={{
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: 16,
      borderColor: COLORS.light_gray,
      borderWidth: 0.5,
      shadowColor: COLORS.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
      }}
    >
      <View
        style={{
          height: 32,
          width: 32,
          borderRadius: 8,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Feather name={icon as any} size={18} color={COLORS.white} />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: COLORS.primary,
          flex: 1,
        }}
      >
        {title}
      </Text>
    </View>
    <View
      style={{
        height: 0.5,
        backgroundColor: COLORS.light_gray,
        marginBottom: 8,
      }}
    />
    {children}
  </View>
);

const QuestionRow = ({
  question,
  value,
}: {
  question: string;
  value?: string;
}) => {
  const display =
    value && value.trim().length > 0 ? value : i18n('non_renseigne');
  const isEmpty = display === i18n('non_renseigne');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 8,
        gap: 10,
      }}
    >
      <Feather
        name={isEmpty ? 'minus-circle' : 'check-circle'}
        size={16}
        color={isEmpty ? COLORS.gray : COLORS.success}
        style={{ marginTop: 2 }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: COLORS.dark,
          }}
        >
          {question}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: isEmpty ? COLORS.gray : COLORS.dark,
            fontStyle: isEmpty ? 'italic' : 'normal',
            marginTop: 2,
          }}
        >
          {display}
        </Text>
      </View>
    </View>
  );
};

export default function BulletinSouscription(props: any) {
  const { souscription } = props.route.params;
  const client = useFetchClient();
  const { formatDate } = useDate();
  const { numberWithCommas } = useSeparator();

  const [sending, setSending] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(1);

  const ownerKey =
    souscription?.owners?.[0] ?? Object.keys(souscription?.data ?? {})[0];
  const insuredData = ownerKey ? souscription.data?.[ownerKey] : null;

  useEffect(() => {
    setSelectedOption(1);
  }, [souscription?.reference]);

  const subscriberName = souscription?.customer ?? NA;

  const insuredFullName = insuredData
    ? `${findValue(insuredData, ['nom', 'prénom', 'prenom', 'name']) ?? ''}`.trim() ||
      NA
    : NA;

  const dateLieuNaissance = findValue(insuredData, [
    'date_naissance',
    'date_de_naissance',
    'naissance',
    'lieu_naissance',
  ]);

  const telephone = findValue(insuredData, ['telephone', 'téléphone', 'phone']);

  const email = findValue(insuredData, ['email', 'mail']);

  const profession = findValue(insuredData, ['profession']);

  const beneficiaireNom = findValue(insuredData, [
    'beneficiaire',
    'beneficiaire_nom',
    'nom_beneficiaire',
  ]);

  const beneficiaireDateNaissance = findValue(insuredData, [
    'beneficiaire_date_naissance',
    'beneficiaire_naissance',
    'date_naissance_beneficiaire',
  ]);

  const qInfirmite = findValue(insuredData, [
    'infirmite',
    'maladie_chronique',
    'maladie',
  ]);

  const qSport = findValue(insuredData, ['sport', 'sport_competition']);

  const qVehicule = findValue(insuredData, ['vehicule', 'conduisez']);

  const qTitre = findValue(insuredData, ['titre', 'personnel_professionnel']);

  const qPlateformes = findValue(insuredData, ['plateforme', 'maritime']);

  const cniNumero = findValue(insuredData, [
    'cni',
    'numero_cni',
    'numero cni',
    'identite',
  ]);
  const cniDate = findValue(insuredData, ['cni_date', 'date_cni', 'delivre']);
  const cniLieu = findValue(insuredData, [
    'cni_lieu',
    'lieu_cni',
    'lieu_delivrance',
  ]);

  const sendContract = async () => {
    if (sending) return;
    setSending(true);
    try {
      await client.fetch(
        'secure/mobile/document/contract/v1',
        {},
        {
          referenceNumber: souscription.reference,
          insurerId: souscription.insurer.id,
        }
      );
      SimpleToast.show(i18n('contrat_envoye_toast'), 5);
    } catch (error: any) {
      SimpleToast.show(`Erreur: ${error.message}`, 5);
    } finally {
      setSending(false);
    }
  };

  const plan = souscription?.plan ?? {};
  const planPrice = formatAmount(plan?.price, numberWithCommas);
  const validityEnd = souscription?.start_at
    ? formatDate(plan?.unit, souscription.start_at, plan?.duration)
    : '--';

  const capitalRows = [
    {
      label: i18n('deces_accident'),
      amount: formatAmount(plan?.price, numberWithCommas),
    },
    {
      label: i18n('invalidite'),
      amount: formatAmount(plan?.price, numberWithCommas),
    },
    {
      label: i18n('soins_medicaux'),
      amount: formatAmount(
        Math.round(Number(plan?.price ?? 0) * 0.15),
        numberWithCommas
      ),
    },
    { label: i18n('prime_ttc_an'), amount: planPrice, highlight: true },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: height,
        width: width,
        backgroundColor: '#F4F5F6',
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingTop: 35,
          paddingBottom: 18,
          borderBottomWidth: 0.3,
          borderBottomColor: COLORS.light_gray,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <TouchableOpacity onPress={() => Navigation.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            {i18n('bulletin_titre')}
          </Text>
          {souscription?.insurer?.logo ? (
            <Image
              source={{ uri: souscription.insurer.logo }}
              style={{ height: 32, width: 32, borderRadius: 100 }}
            />
          ) : null}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 16 }}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Feather name="file-text" size={28} color={COLORS.white} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 11,
                color: COLORS.white,
                opacity: 0.85,
                fontWeight: '600',
              }}
            >
              {i18n('reference')}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.white,
                marginTop: 2,
              }}
            >
              {souscription?.reference ?? NA}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}
            >
              {souscription?.display_status ?? NA}
            </Text>
          </View>
        </View>

        <SectionCard icon="user" title={i18n('section_identification')}>
          <InfoRow
            label={i18n('nom_souscripteur_bulletin')}
            value={subscriberName}
          />
          <InfoRow
            label={i18n('date_lieu_naissance')}
            value={dateLieuNaissance}
          />
          <InfoRow label={i18n('tel_souscripteur')} value={telephone} />
          <InfoRow label={i18n('adresse_email')} value={email} />
          <InfoRow label={i18n('personne_a_assurer')} value={insuredFullName} />
          <InfoRow label={i18n('profession_exacte')} value={profession} />
          <InfoRow label={i18n('tel_souscripteur')} value={telephone} />
        </SectionCard>

        <SectionCard icon="shield" title={i18n('section_capitaux')}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.primary,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 8,
            }}
          >
            <Text
              style={{
                flex: 2,
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.white,
              }}
            >
              {i18n('garantis')}
            </Text>
            {[1, 2, 3].map((idx) => (
              <Text
                key={idx}
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  textAlign: 'center',
                }}
              >
                {i18n('option')} {idx}
              </Text>
            ))}
          </View>
          {capitalRows.map((row, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 8,
                borderBottomWidth: 0.4,
                borderColor: COLORS.light_gray,
                backgroundColor:
                  idx === capitalRows.length - 1
                    ? '#F0F4FF'
                    : idx % 2 === 0
                      ? COLORS.white
                      : '#FAFBFC',
              }}
            >
              <Text
                style={{
                  flex: 2,
                  fontSize: 12,
                  fontWeight: row.highlight ? 'bold' : '600',
                  color: COLORS.dark,
                }}
              >
                {row.label}
              </Text>
              {[1, 2, 3].map((optIdx) => {
                const isSelected = optIdx === selectedOption;
                return (
                  <View
                    key={optIdx}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected ? (
                      <View
                        style={{
                          backgroundColor: row.highlight
                            ? COLORS.primary
                            : COLORS.primary,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 6,
                          minWidth: 60,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: 'bold',
                            color: COLORS.white,
                            textAlign: 'center',
                          }}
                        >
                          {row.amount}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontSize: 11,
                          color: COLORS.gray,
                          textAlign: 'center',
                        }}
                      >
                        —
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
              marginTop: 4,
              borderTopWidth: 0.4,
              borderColor: COLORS.light_gray,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: COLORS.gray,
                fontStyle: 'italic',
              }}
            >
              {i18n('selectionner_option')}:
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {[1, 2, 3].map((idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedOption(idx)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor:
                      selectedOption === idx
                        ? COLORS.primary
                        : COLORS.light_gray,
                    backgroundColor:
                      selectedOption === idx ? COLORS.primary : COLORS.white,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color:
                        selectedOption === idx ? COLORS.white : COLORS.dark,
                    }}
                  >
                    {i18n('option')} {idx}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SectionCard>

        <SectionCard icon="heart" title={i18n('section_beneficiaire')}>
          <InfoRow label={i18n('nom_beneficiaire')} value={beneficiaireNom} />
          <InfoRow
            label={i18n('date_naissance_beneficiaire')}
            value={beneficiaireDateNaissance}
          />
        </SectionCard>

        <SectionCard icon="help-circle" title={i18n('section_questionnaire')}>
          <QuestionRow question={i18n('q_infirmite')} value={qInfirmite} />
          <QuestionRow question={i18n('q_sport')} value={qSport} />
          <QuestionRow question={i18n('q_vehicule')} value={qVehicule} />
          <QuestionRow question={i18n('q_titre')} value={qTitre} />
          <QuestionRow question={i18n('q_plateformes')} value={qPlateformes} />
        </SectionCard>

        <SectionCard icon="credit-card" title={i18n('section_cni')}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: COLORS.dark,
              }}
            >
              {i18n('numero')}{' '}
              <Text style={{ fontWeight: 'bold' }}>{cniNumero}</Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.dark,
              }}
            >
              {i18n('du_label')} {cniDate}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.dark,
              }}
            >
              {i18n('delivre_a')} {cniLieu}
            </Text>
          </View>
          <View
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#F0F4FF',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Feather name="info" size={14} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 11,
                color: COLORS.primary,
                flex: 1,
                fontStyle: 'italic',
              }}
            >
              {i18n('cni_note_signature')}
            </Text>
          </View>
        </SectionCard>

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderWidth: 0.5,
            borderColor: COLORS.light_gray,
          }}
        >
          <Feather name="calendar" size={18} color={COLORS.primary} />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 11, color: COLORS.gray, fontWeight: '600' }}
            >
              {i18n('validite')}
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.dark }}
            >
              {validityEnd}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 11, color: COLORS.gray, fontWeight: '600' }}
            >
              {i18n('capital')}
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.dark }}
            >
              {planPrice}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          paddingBottom: 24,
          backgroundColor: COLORS.white,
          borderTopWidth: 0.3,
          borderTopColor: COLORS.light_gray,
          shadowColor: COLORS.dark,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <TouchableOpacity
          onPress={sendContract}
          disabled={sending}
          style={{
            backgroundColor: sending ? COLORS.gray : COLORS.primary,
            paddingVertical: 14,
            borderRadius: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {sending ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Feather name="download" size={18} color={COLORS.white} />
          )}
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            {sending ? i18n('en_cours') : i18n('telecharger_mon_contrat')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
