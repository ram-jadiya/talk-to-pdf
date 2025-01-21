type Plan = {
  id: number;
  title: string;
  desc: string;
  price: number;
  validity: number;
  validityDesc: string;
  features: Array<{
    title: string;
    desc: string;
    isAvailable: boolean;
  }>;
};

export const plans: Plan[] = [
  {
    id: 0,
    title: 'Free',
    desc: 'For small side projects.',
    price: 0,
    validity: 0, // 0 month
    validityDesc: 'per month',
    features: [
      {
        title: '5 pages per PDF',
        desc: 'The maximum amount of pages per PDF-file.',
        isAvailable: true,
      },
      {
        title: '4MB file size limit',
        desc: 'The maximum file size of a single PDF file.',
        isAvailable: true,
      },
      {
        title: 'Mobile-friendly interface',
        desc: '',
        isAvailable: true,
      },
      {
        title: 'Higher-quality responses',
        desc: 'Better algorithmic responses for enhanced content quality',
        isAvailable: false,
      },
      {
        title: 'Priority support',
        desc: '',
        isAvailable: false,
      },
    ],
  },
  {
    id: 1,
    title: 'Pro',
    desc: 'For larger projects with higher needs.',
    price: 9,
    validity: 1, // 1 month
    validityDesc: 'per month',
    features: [
      {
        title: '5 pages per PDF',
        desc: 'The maximum amount of pages per PDF-file.',
        isAvailable: true,
      },
      {
        title: '4MB file size limit',
        desc: 'The maximum file size of a single PDF file.',
        isAvailable: true,
      },
      {
        title: 'Mobile-friendly interface',
        desc: '',
        isAvailable: true,
      },
      {
        title: 'Higher-quality responses',
        desc: 'Better algorithmic responses for enhanced content quality',
        isAvailable: true,
      },
      {
        title: 'Priority support',
        desc: '',
        isAvailable: true,
      },
    ],
  },
];
