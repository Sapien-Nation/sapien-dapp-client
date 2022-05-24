import { useState } from 'react';
import Lottie from 'react-lottie-player';
import { useSWRConfig } from 'swr';

// api
import { signPassport } from 'wallet/api';

// context
import { useAuth } from 'context/user';

// constants
import { PassportStatus } from 'tools/constants/user';

// components
import { Dialog, DialogProps } from 'components/common';

// types
import type { Token } from 'wallet/types';

// assets
import UpgradeSuccessJSONLottie from './lottie/UpgradeSuccess.json';

interface Props {
  onClose: () => void;
  token: Token;
}

enum View {
  Home,
  Confirm,
  Success,
}

const DeclarationOfSovereigntyDialog = ({ onClose, token }: Props) => {
  const [view, setView] = useState(View.Home);
  const [signError, setSignError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const apiKey = `/core-api/passport/${token.id}/signed`;

  const handleSignToken = async () => {
    setIsFetching(true);
    setSignError(null);

    try {
      await signPassport(token.id);

      mutate(apiKey, () => ({ canSign: false, signed: true }), false);
      mutate(
        '/user-api/me',
        (me) => ({
          ...me,
          passport: {
            ...me.passport,
            status: PassportStatus.S,
          },
        }),
        false
      );

      setView(View.Success);
    } catch (err) {
      setSignError(err);
    }
    setIsFetching(false);
  };

  const renderView = () => {
    switch (view) {
      case View.Success:
        return (
          <div className="flex flex-col gap-5">
            <p className="pt-3">
              You are now a <b>Founding Member of the Sapien Nation</b>!
            </p>
            <p>You can now upgrade your tribe and create your own badges.</p>
            <div className="flex flex-col items-center">
              <Lottie
                animationData={UpgradeSuccessJSONLottie}
                play
                className="w-52 h-52"
              />
            </div>
          </div>
        );
      case View.Confirm:
        return (
          <>
            <div className="flex flex-col gap-5 pt-5">
              <span>
                <p>
                  Please confirm the signing of your Sapien Nation Passport.
                  This will make your passport untradeable and unlock a host of
                  benefits on the Sapien Platform.
                </p>
                <br />
                <p>
                  <b className="text-rose-500">
                    This action is irreversible. Once a passport is signed it
                    can not leave your Sapien wallet.{' '}
                  </b>
                </p>
              </span>
            </div>
            {signError && (
              <span className="text-xs text-red-400 flex justify-center items-center">
                {signError}
              </span>
            )}
          </>
        );
      case View.Home:
        return (
          <div className="max-h-96 overflow-auto mt-5 text-left px-8 leading-6">
            The world is at a turning point and we are faced with tremendous
            uncertainty in all directions. As the threats we face grow to
            existential proportions, the things we might turn to for support —
            our communities, our shared purpose and even a shared reality have
            eroded from under us. If we are to have any hope of conquering the
            challenges ahead of us, we must first understand the problems that
            we face and how they are connected. These problems go to the very
            roots of society and its institutions, affecting every aspect of how
            we make decisions and live our lives; from the information we
            consume to the communities that give us meaning; from the careers to
            which we dedicate ourselves to the causes we invest in. At the first
            glance these problems may seem unconnected but as we delve deeper it
            becomes clear that they share a common thread — a fundamental
            disconnect in how we engage in these systems and one of the deepest
            roots of human nature — the <b> Tribe </b>.
            <br />
            <br />
            For tens of thousands of years the Tribe was the driving force
            behind human existence, dictating every aspect of how we lived our
            lives. As our Tribes wandered across every corner of the globe we
            found balance with nature and each other. We evolved alongside our
            Tribes and many of the unique things that would come to define our
            species — Homo Sapiens — such as language and our ability to solve
            problems collaboratively emerged from this inseparable
            interdependence between each of us and our Tribes.
            <br />
            <br />
            As civilization emerged the rules and incentives that drove our
            lives began to diverge from Nature. As we gained the ability to move
            rivers and shape the world around us the entire world became our
            domain at the expense of the ecosystems that had to contend with us.
            As society became larger and more complex, Nature&lsquo;s grasp —
            that bond that had shackled us for so long but had also held us in
            balance with the Earth and all its diversity — further loosened. The
            industrial age and the discovery of fossil fuels severed once and
            for all any control that Nature had over us — no climate too harsh,
            no sea too vast, no mountain too great to stop the relentless titan
            of industry whose sword now rests at the throat of the earth who
            gave us life.
            <br />
            <br />
            Just as technology has collectively liberated us from nature&lsquo;s
            grasp so too has it liberated each of us from our dependence on one
            another. The relentless progress of technology has lifted countless
            people out of poverty and given each of us great control and freedom
            over how we live our lives. It has enabled us to fulfill our desires
            with the click of a button and at a moment&lsquo;s notice. It has
            given us the ability to travel the world, to have any experience we
            can imagine. It has put the sum of human knowledge in the palm of
            our hand and given us the power to share it across the world. With
            such incredible freedoms at our disposal we no longer depend on
            those around us — for basic necessities, for information or
            entertainment, for meaning — and so the bonds of trust that forged
            our Tribes and held them together have all but vanished before our
            eyes.
            <br />
            <br />
            At this pivotal moment in history we are left with but a single
            choice. We can continue on our current trajectory and hand our fate
            to the titan of industry — or we can choose to claim our own fate.
            This is not a choice we can make alone — if we are to claim our fate
            we must do it together, as
            <b> Sovereign Tribes </b> — equipped with the tools to shape our own
            destiny.
            <br />
            <br />
            And so it is that We the Sapiens, in order that we may secure the
            future of Earth and her children declare our <b>Sovereignty</b>, and
            the <b>Sovereignty of our Tribes.</b>
            <br />
            <br />
            In order to secure and maintain the Sovereignty and flourishing of
            our Tribes we present the following
            <b> Rights, Responsibilities, and Principles </b> that they may
            serve as a guiding light for all committed to the advancement of
            Sapiens and their Tribes.
            <br />
            <br />
            1. <b className="ml-[0.4rem]">The Right to Sovereignty:</b>
            <div className="ml-[1.4rem]">
              {' '}
              Sovereignty is the manifestation of the will of a Tribe. The
              Tribe, as a group of people, has the right to personhood including
              the right to autonomy, existence and self-determination. The
              Sovereignty of the Tribe derives from the Sovereignty of its
              members and each individual has the right to choose the Tribes
              among which their Sovereignty is divided. No Tribe, individual or
              entity may interfere, restrict or impose costs on the Sovereignty
              of another Tribe or individual.{' '}
            </div>
            <br />
            <br />
            2.{' '}
            <b className="ml-[0.4rem]">The Right to Freedom of Information:</b>
            <div className="ml-[1.4rem]">
              Information is power. The ability to freely share information,
              whether through speech or expression in any medium, is vital to
              our ability to understand and engage with the world and each
              other. Each individual has the right to freely share information
              with others or choose not to share any information. No Tribe,
              individual or entity may compel anyone to share any information
              against their will.{' '}
            </div>
            <br />
            <br />
            3. <b className="ml-[0.4rem]">The Right to Economic Autonomy:</b>
            <div className="ml-[1.4rem]">
              Currency is the tool that directs our energy. Every Tribe and
              individual has the right to choose how they direct their energy
              and resources including the right to not expend energy or
              resources. Every Tribe and individual has the right to issue and
              govern their own currency so they may direct their energy and
              resources to the best of their ability. No Tribe, individual or
              entity may compel anyone to expend energy or resources against
              their will.{' '}
            </div>
          </div>
        );
    }
  };

  const getDialogProps = (): Partial<DialogProps> => {
    switch (view) {
      case View.Home:
        return {
          title: 'Declaration of Sovereignty of The Sapiens',
          bgColor: 'bg-black',
          bgOpacity: 'bg-opacity-80',
          confirmLabel: 'Sign',
          cancelLabel: 'Cancel',
          onCancel: onClose,
          onClose: onClose,
          onConfirm: () => setView(View.Confirm),
        };
      case View.Confirm:
        return {
          title: 'Confirm Sign',
          bgColor: 'bg-black',
          bgOpacity: 'bg-opacity-80',
          confirmLabel: 'Confirm',
          cancelLabel: 'Back',
          onClose: onClose,
          onCancel: () => setView(View.Home),
          onConfirm: handleSignToken,
        };
      case View.Success:
        return {
          title: 'Congrats! Passport Signed!',
          bgColor: 'bg-black',
          bgOpacity: 'bg-opacity-80',
          confirmLabel: 'View Passport',
          onClose: onClose,
          showCancel: false,
          onConfirm: onClose,
        };
    }
  };
  return (
    <Dialog
      show
      onClose={onClose}
      isFetching={isFetching}
      {...getDialogProps()}
    >
      {renderView()}
    </Dialog>
  );
};
export default DeclarationOfSovereigntyDialog;
