import { StackActions, CommonActions } from '@react-navigation/routers';

let _navigator: any = null;

export function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: Record<string, any>) {
  if (_navigator) {
    _navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      })
    );
  }
}

function replace(routeName: string, params?: Record<string, any>) {
  if (_navigator) {
    _navigator.dispatch(StackActions.replace(routeName, params));
  }
}

function back() {
  if (_navigator) {
    _navigator.dispatch(CommonActions.goBack());
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  back,
  replace,
};
