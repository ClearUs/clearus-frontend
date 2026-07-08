import { Institution } from '../types/index';

export const INSTITUTIONS: Institution[] = [
  {
    code: 'FUTO',
    name: 'Federal University of Technology, Owerri',
    shortName: 'FUTO',
    motto: 'Technology for Service',
    primaryColor: 'green',
    accentColor: 'green',
    colorTheme: {
      primaryBg: 'bg-green-600',
      primaryText: 'text-green-400',
      primaryBorder: 'border-green-500/20',
      accentBg: 'bg-green-500',
      accentText: 'text-green-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-green-950',
      lightAccentBg: 'bg-green-950/20 text-green-400 border-green-500/20',
    },
    allowedDomains: ['futo.edu.ng', 'student.futo.edu.ng'],
    departments: [
      'Computer Science',
      'Electrical & Electronic Engineering',
      'Mechanical Engineering',
      'Information Technology',
      'Biotechnology',
      'Cyber Security'
    ],
    stats: {
      totalStudents: 18450,
      pendingClearances: 1240,
      clearedThisMonth: 3450
    }
  },
  {
    code: 'UNILAG',
    name: 'University of Lagos',
    shortName: 'UNILAG',
    motto: 'In Deed and in Truth',
    primaryColor: 'red',
    accentColor: 'amber',
    colorTheme: {
      primaryBg: 'bg-red-950',
      primaryText: 'text-red-950',
      primaryBorder: 'border-red-950',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-500',
      bannerGradient: 'from-red-950 via-red-900 to-amber-950',
      lightAccentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    allowedDomains: ['unilag.edu.ng', 'live.unilag.edu.ng'],
    departments: [
      'Law',
      'Systems Engineering',
      'Accounting',
      'Medicine & Surgery',
      'Mass Communication',
      'Economics'
    ],
    stats: {
      totalStudents: 24500,
      pendingClearances: 2100,
      clearedThisMonth: 5120
    }
  },
  {
    code: 'UI',
    name: 'University of Ibadan',
    shortName: 'UI',
    motto: 'Recte Sapere Fons',
    primaryColor: 'green',
    accentColor: 'yellow',
    colorTheme: {
      primaryBg: 'bg-green-950',
      primaryText: 'text-green-950',
      primaryBorder: 'border-green-950',
      accentBg: 'bg-yellow-500',
      accentText: 'text-yellow-500',
      bannerGradient: 'from-green-950 via-green-900 to-yellow-950',
      lightAccentBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    },
    allowedDomains: ['ui.edu.ng', 'stu.ui.edu.ng'],
    departments: [
      'Medicine',
      'Computer Science',
      'Political Science',
      'Theatre Arts',
      'Agronomy',
      'Civil Engineering'
    ],
    stats: {
      totalStudents: 15600,
      pendingClearances: 840,
      clearedThisMonth: 2980
    }
  },
  {
    code: 'ABU',
    name: 'Ahmadu Bello University',
    shortName: 'ABU',
    motto: 'Discipline, Self-Reliance and Excellence',
    primaryColor: 'green',
    accentColor: 'green',
    colorTheme: {
      primaryBg: 'bg-green-800',
      primaryText: 'text-green-800',
      primaryBorder: 'border-green-800',
      accentBg: 'bg-green-600',
      accentText: 'text-green-600',
      bannerGradient: 'from-green-950 via-green-900 to-green-950',
      lightAccentBg: 'bg-green-50 text-green-800 border-green-200',
    },
    allowedDomains: ['abu.edu.ng', 'student.abu.edu.ng'],
    departments: [
      'Architecture',
      'Pharmacy',
      'Chemical Engineering',
      'Business Administration',
      'Veterinary Medicine',
      'Geology'
    ],
    stats: {
      totalStudents: 21200,
      pendingClearances: 1730,
      clearedThisMonth: 4120
    }
  }
];

export const getInstitutionByCode = (code: string): Institution | undefined => {
  return INSTITUTIONS.find(inst => inst.code.toUpperCase() === code.toUpperCase());
};
