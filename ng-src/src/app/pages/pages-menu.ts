import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/lab/dashboard',
    home: true,
  },
  {
    title: 'What You Know',
    group: true,
  },
  {
    title: 'Subjects',
    icon: 'nb-keypad',
    link: '/lab/subjects',
    children: [
      {
        title: 'Reading',
        link: '/lab/subjects/science',
      },
      {
        title: 'Maths',
        link: '/lab/subjects/maths/counting',
      },
      {
        title: 'Writing',
        link: '/lab/subjects/writing',
      },
    ],
  },
  {
    title: 'Leaderboards',
    icon: 'nb-compose',
    children: [
      {
        title: 'This Week',
        link: '/lab/forms/inputs',
      },
      {
        title: 'All Time',
        link: '/lab/forms/layouts',
      },
    ],
  },
  {
    title: 'Tests',
    icon: 'nb-gear',
    children: [
      {
        title: 'Puzzle',
        link: '/lab/components/tree',
      }, {
        title: 'Exam',
        link: '/lab/exam````````',
      },
    ],
  },
];
