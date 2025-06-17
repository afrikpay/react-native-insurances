import { SafeAreaView, ScrollView, View } from "react-native";
import StepFormBuilder from "./components/form/StepFormBuilder";
import { width } from "./constants/size";
import { COLORS } from "./constants/Colors";

export default function InsurancesGateway() {
  return (
    <SafeAreaView style={{
      flex: 1, width: width,  
      backgroundColor: COLORS.white,
      flexDirection: 'column',
      gap: 20
    }} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20, backgroundColor: COLORS.white}}>  

        <StepFormBuilder
          onSubmit={console.log}
          onError={console.error}
          steps={[
            {
              fields: [
                {
                  label: 'Nom',
                  name: 'name',
                  type: 'text',
                },
              ],
              title: 'Information',
            },
          ]}
          defaultValues={[]}
          externalValues={{}}
          onExternalValueChange={console.warn}
        />
        <View style={{ height: 80, width: '100%' }}/>
      </ScrollView>   
    </SafeAreaView>
  );
}
