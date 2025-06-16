import StepFormBuilder from "./components/form/StepFormBuilder";

export default function InsurancesGateway() {
  return (
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
  );
}
