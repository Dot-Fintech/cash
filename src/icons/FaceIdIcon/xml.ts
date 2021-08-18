import { Color } from '../../theme';

export const buildXml = (
  color: Color,
): string => `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M149.333 64H106.667C83.1025 64 64 83.1025 64 106.667V149.333" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M362.667 64H405.333C428.898 64 448 83.1025 448 106.667V149.333" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M341.333 170.667V213.333" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M170.667 170.667V213.333" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M192 341.333C192 341.333 213.333 362.667 256 362.667C298.667 362.667 320 341.333 320 341.333" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M256 170.667V277.333H234.667" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M149.333 448H106.667C83.1025 448 64 428.898 64 405.333V362.667" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M362.667 448H405.333C428.898 448 448 428.898 448 405.333V362.667" stroke="${color.toString()}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
