import { CSSTransition } from 'react-transition-group';

// context
import { useWallet } from 'context/wallet';

// mui
import {
  Avatar,
  Box,
  Tabs,
  Tab,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

// styles
import { neutral, primary } from 'styles/colors';

// assets
import {
  Spn as SpnIcon,
  Tokens as TokensIcon,
  Store as StoreIcon,
} from 'assets';

// components
import { MyBadges, Spn, Store } from './';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
    minHeight: 0,
    opacity: '0.5',
    filter: 'grayscale(1)',
    '&.Mui-selected': {
      filter: 'none',
    },
  },
  wrapper: {
    flexDirection: 'row',
  },
}));

enum WalletTab {
  MyBadges = 0,
  Spn,
  Store,
}

const WalletTabs = () => {
  const classes = useStyles();
  const { walletOpen, setWalletOpen, globalWalletState, dispatchWalletState } =
    useWallet();
  const { currentTab, transition, showTabsMenu, showAuthorToBadge } =
    globalWalletState;
  const handleChange = (_, tab) => {
    // @ts-ignore
    if (walletOpen?.userName) {
      dispatchWalletState({
        type: 'showAuthorToBadge',
        payload: true,
      });
    }
    if (currentTab > tab) {
      dispatchWalletState({
        type: 'update',
        payload: {
          transition: 'back',
          currentTab: tab,
        },
      });
    } else if (currentTab < tab) {
      dispatchWalletState({
        type: 'update',
        payload: {
          transition: 'forward',
          currentTab: tab,
        },
      });
    } else {
      dispatchWalletState({
        type: 'currentTab',
        payload: tab,
      });
    }
  };

  const renderCurrentTab = () => {
    return (
      <>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={currentTab === WalletTab.MyBadges}
          timeout={250}
        >
          <MyBadges />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={currentTab === WalletTab.Spn}
          timeout={250}
        >
          <Spn />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={currentTab === WalletTab.Store}
          timeout={250}
        >
          <Store />
        </CSSTransition>
      </>
    );
  };

  return (
    <>
      {/* @ts-ignore */}
      {walletOpen && walletOpen.userName && showAuthorToBadge && (
        <Box
          alignItems="center"
          bgcolor={neutral[50]}
          borderRadius={10}
          display="flex"
          marginTop={2}
          marginX={2.4}
          padding={1.8}
          style={{
            cursor: 'pointer',
          }}
        >
          <Avatar
            alt=""
            src="/fixtures/normal/slowpoke.jpg"
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={1}>
            {/* @ts-ignore */}
            <Typography variant="button">{walletOpen.displayName}</Typography>
            {/* @ts-ignore */}
            <Typography variant="overline">@{walletOpen.userName}</Typography>
          </Box>
          <IconButton
            aria-label="close"
            style={{
              padding: 0,
              marginLeft: 'auto',
            }}
            type="submit"
            onClick={() => setWalletOpen(true)}
          >
            <CloseIcon fontSize="small" style={{ color: neutral[700] }} />
          </IconButton>
        </Box>
      )}
      {showTabsMenu && (
        <Tabs
          aria-label="simple tabs example"
          style={{
            minHeight: 0,
            padding: '1.2rem',
          }}
          value={currentTab}
          onChange={handleChange}
        >
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={<TokensIcon style={{ marginBottom: 0, marginRight: 5 }} />}
            label="My Badges"
          />
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={<SpnIcon style={{ marginBottom: 0, marginRight: 5 }} />}
            label="SPN"
          />
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={
              <StoreIcon
                style={{ fill: primary[700], marginBottom: 0, marginRight: 5 }}
              />
            }
            label="Store"
          />
        </Tabs>
      )}
      {renderCurrentTab()}
    </>
  );
};

export default WalletTabs;
