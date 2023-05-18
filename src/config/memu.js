const menuList = (t)=>[
  {
    label: t('首页'),
    href:'/home'
  },
  {
    label: 'Loadsh',
    href:'/lodash',
    children:[
      {
        label: '测试框',
        href:'/lodash',
      }
    ]
  },
  {
    label: 'TrainingGround',
    href:'/training',
    children:[
      {
        label: 'hook-form',
        href:'/training/hook-form',
      }
    ]
  },
]
export default menuList