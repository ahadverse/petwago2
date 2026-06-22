export const businessInfo = {
  legalName: process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME ?? 'PetWago.com',
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'PetWago',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@petwago.com',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '+13074459058',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? '30 N Gould St Ste R Sheridan, WY 82801',
  governingLaw: process.env.NEXT_PUBLIC_GOVERNING_LAW ?? 'the State of New York, United States',
  socials: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? '#',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? '#',
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? '#',
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? '#',
  },
}
