import SafetyPaymentsIcon from '../../icons/SafetyPaymentsIcon';
import SafetyPersonalIcon from '../../icons/SafetyPersonalIcon';
import SafetySavingIcon from '../../icons/SafetySavingIcon';
import { DesiredIconDimensions } from '../../icons/types';

export type Card = {
  Icon: React.ComponentType<DesiredIconDimensions>;
  title: string;
  description: string;
};

export const CARDS: Card[] = [
  {
    Icon: SafetyPaymentsIcon,
    title: 'Safe',
    description:
      "Now it's easier than ever before to send money, but that doesn't mean it shouldn't be safe. Dot utilizes a myriad of safety features to process transactions.",
  },
  {
    Icon: SafetyPersonalIcon,
    title: 'Secure',
    description:
      'PCI-DSS certified means that we protect all of your data. Dot allows you to move money around with confidence.',
  },
  {
    Icon: SafetySavingIcon,
    title: 'Robust',
    description:
      'Security is our top priority and we invest a lot of resources ensuring that Dot protects its customers.',
  },
];
