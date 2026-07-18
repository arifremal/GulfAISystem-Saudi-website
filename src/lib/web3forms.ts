/** Web3Forms access key — public client-side key; override via VITE_WEB3FORMS_ACCESS_KEY if needed. */
export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
  '1d64bca9-751c-4c83-b142-978db27a80b3'

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
