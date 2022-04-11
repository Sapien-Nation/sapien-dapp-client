import { Connector } from '@web3-react/types';
import { initializeConnector } from '@web3-react/core';
import DirectWebSdk from '@toruslabs/customauth';
import * as Sentry from '@sentry/nextjs';

// api
import { refresh as refreshAPI } from 'api/authentication';

// types
import type { Actions } from '@web3-react/types';
import type { TorusKey } from '@toruslabs/customauth';

type TORUS_NETWORK_TYPE = typeof TORUS_NETWORK[keyof typeof TORUS_NETWORK];
const TORUS_NETWORK = {
  TESTNET: 'testnet',
  MAINNET: 'mainnet',
} as const;

type UX_MODE_TYPE = typeof UX_MODE[keyof typeof UX_MODE];
const UX_MODE = {
  POPUP: 'popup',
  REDIRECT: 'redirect',
} as const;

type REDIRECT_PARAMS_STORAGE_METHOD_TYPE =
  typeof REDIRECT_PARAMS_STORAGE_METHOD[keyof typeof REDIRECT_PARAMS_STORAGE_METHOD];

const REDIRECT_PARAMS_STORAGE_METHOD = {
  LOCAL_STORAGE: 'localStorage',
  SESSION_STORAGE: 'sessionStorage',
};

interface InitParams {
  skipSw?: boolean;
  skipInit?: boolean;
  skipPrefetch?: boolean;
}

interface TorusKeyOptions {
  walletVerifier: string;
  walletSubVerifier: string;
}

interface DirectWebSDKArgs {
  baseUrl: string;
  network?: TORUS_NETWORK_TYPE;
  proxyContractAddress?: string;
  enableLogging?: boolean;
  redirectToOpener?: boolean;
  redirectPathName?: string;
  apiKey?: string;
  uxMode?: UX_MODE_TYPE;
  redirectParamsStorageMethod?: REDIRECT_PARAMS_STORAGE_METHOD_TYPE;
  locationReplaceOnRedirect?: boolean;
  popupFeatures?: string;
}

class TorusConnector extends Connector {
  private options: DirectWebSDKArgs;
  private initOptions: InitParams;
  private torusKeyOptions: TorusKeyOptions;
  public torusSDK: DirectWebSdk | null;
  public torusKeys: TorusKey | null;

  constructor(
    actions: Actions,
    options: DirectWebSDKArgs,
    initOptions: InitParams,
    torusKeyOptions: TorusKeyOptions
  ) {
    super(actions);

    this.torusSDK = null;
    this.torusKeys = null;
    this.options = options;
    this.initOptions = initOptions;
    this.torusKeyOptions = torusKeyOptions;
  }

  public async activate(
    torusToken: string,
    userID: string,
    torusRefresh: string
  ): Promise<void> {
    if (this.torusSDK === null) this.actions.startActivation();

    if (this.torusSDK === null) {
      try {
        this.torusSDK = new DirectWebSdk(this.options);

        await this.torusSDK.init(this.initOptions);

        const torusKeys = await this.torusSDK.getAggregateTorusKey(
          this.torusKeyOptions.walletVerifier,
          userID,
          [
            {
              verifier: this.torusKeyOptions.walletSubVerifier,
              idToken: torusToken,
            },
          ]
        );

        this.actions.update({
          accounts: [torusKeys.publicAddress, torusKeys.privateKey],
        });
      } catch (err) {
        try {
          const data = await refreshAPI(torusRefresh, 'torus');
          await this.torusSDK.init({ skipSw: true });

          const torusKeys = await this.torusSDK.getAggregateTorusKey(
            walletVerifier,
            userID,
            [{ verifier: walletSubVerifier, idToken: data.token }]
          );

          this.actions.update({
            accounts: [torusKeys.publicAddress, torusKeys.privateKey],
          });
        } catch (err) {
          Sentry.captureException('Torus Init fail [Refresh]', err);
          this.actions.reportError(err);
        }
      }
    }
  }

  /** {@inheritdoc Connector.deactivate} */
  public deactivate(): void {
    this.torusKeys = null;
    this.torusSDK = null;
  }
}

const _DEBUG = process.env.NEXT_PUBLIC_WALLET_DEBUG;
const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;

export const [torus, hooks] = initializeConnector<TorusConnector>(
  (actions) =>
    new TorusConnector(
      actions,
      {
        baseUrl:
          typeof window === 'undefined'
            ? ''
            : `${window.location.origin}/api/serviceworker`,
        enableLogging: Boolean(_DEBUG),
        network: walletIsMainnet === 'true' ? 'mainnet' : 'testnet',
      },
      { skipSw: true },
      {
        walletVerifier,
        walletSubVerifier,
      }
    )
);
