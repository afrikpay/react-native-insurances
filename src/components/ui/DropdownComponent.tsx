import { useState, type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { COLORS } from '../../constants/Colors';
import type { DropdownItemType, Model } from '../../types';

type PropsType = {
  data: DropdownItemType[];
  label: string;
  onChangeValue: (value: any) => void;
  placeholder: string;
};

const DropdownComponent: FC<PropsType> = ({
  data,
  label,
  onChangeValue,
  placeholder,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={{
            color: isFocus ? COLORS.primary : COLORS.dark,
            fontSize: 12,
            position: 'absolute',
            left: 8,
            top: 4,
            zIndex: 999,
            paddingHorizontal: 7,
            backgroundColor: 'white',
          }}
        >
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View
      style={{ backgroundColor: COLORS.white, paddingVertical: 8, flex: 1 }}
    >
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={`${value}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onChangeValue({ id: item.value, libelle: item.label } as Model);
        }}
        // renderLeftIcon={() => (
        //   <View className="h-5 mr-2">
        //     {
        //       value ?
        //         <Icon.Check color={COLORS.primary} strokeWidth={3} width={20} height={20} /> :
        //         <Icon.XCircle color='gray' strokeWidth={3} width={20} height={20} />
        //     }
        //   </View>
        // )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 14,
    color: COLORS.dark,
    opacity: 0.5,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
