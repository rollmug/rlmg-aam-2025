export default function manifest() {
  return {
    name: 'Richard Lewis Media Group',
    short_name: 'RLMG',
    description: 'We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. Provoke joy, wonder, debate.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}