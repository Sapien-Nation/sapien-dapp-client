// enums
import { MyBadgesSteps, StoreSteps } from 'components/wallet/WalletEnums';

enum WalletTab {
  MyBadges = 0,
  Spn,
  Store,
}

const initialState = {
  currentTab: WalletTab.MyBadges,
  showTabsMenu: true,
  showAuthorToBadge: true,
  transition: 'forward',
  myBadgesStep: MyBadgesSteps.Badges,
  storeStep: StoreSteps.Badges,
  myBadgesTransition: 'forward',
  myBadgesCurrentReceiver: null,
  myBadgesCurrentBadge: null,
  spnCurrentReceiver: null,
  spnCurrentbadge: null,
  storeCurrentBadge: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload,
      };
    case 'currentTab':
      return {
        ...state,
        currentTab: action.payload,
      };
    case 'showTabsMenu':
      return {
        ...state,
        showTabsMenu: action.payload,
      };
    case 'showAuthorToBadge':
      return {
        ...state,
        showAuthorToBadge: action.payload,
      };
    case 'transition':
      return {
        ...state,
        transition: action.payload,
      };
    case 'myBadgesStep':
      return {
        ...state,
        myBadgesStep: action.payload,
      };
    case 'storeStep':
      return {
        ...state,
        storeStep: action.payload,
      };
    case 'myBadgesTransition':
      return {
        ...state,
        myBadgesTransition: action.payload,
      };
    case 'spnCurrentReceiver':
      return {
        ...state,
        spnCurrentReceiver: action.payload,
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
