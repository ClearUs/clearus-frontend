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
    allowedDomains: ['futo.edu.ng', 'gmail.com'],
    departments: [
      'Computer Engineering',
      'Civil Engineering',
      'Electrical & Electronic Engineering',
      'Mechanical Engineering',
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
      primaryBg: 'bg-red-600',
      primaryText: 'text-red-400',
      primaryBorder: 'border-red-500/20',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-red-950',
      lightAccentBg: 'bg-red-950/20 text-red-400 border-red-500/20',
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
    code: 'UNN',
    name: 'University of Nigeria',
    shortName: 'UNN',
    motto: 'To Restore the Dignity of Man',
    primaryColor: 'emerald',
    accentColor: 'emerald',
    colorTheme: {
      primaryBg: 'bg-emerald-600',
      primaryText: 'text-emerald-400',
      primaryBorder: 'border-emerald-500/20',
      accentBg: 'bg-emerald-500',
      accentText: 'text-emerald-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-emerald-950',
      lightAccentBg: 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20',
    },
    allowedDomains: ['unn.edu.ng', 'student.unn.edu.ng'],
    departments: [
      'Electronic Engineering',
      'Computer Science',
      'Pharmacy',
      'Microbiology',
      'Accountancy',
      'Mass Communication'
    ],
    stats: {
      totalStudents: 22800,
      pendingClearances: 1650,
      clearedThisMonth: 4210
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
      primaryBg: 'bg-green-600',
      primaryText: 'text-green-400',
      primaryBorder: 'border-green-500/20',
      accentBg: 'bg-yellow-500',
      accentText: 'text-yellow-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-green-950',
      lightAccentBg: 'bg-green-950/20 text-green-400 border-green-500/20',
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
    code: 'CU',
    name: 'Covenant University',
    shortName: 'CU',
    motto: 'Raising a New Generation of Leaders',
    primaryColor: 'purple',
    accentColor: 'amber',
    colorTheme: {
      primaryBg: 'bg-purple-600',
      primaryText: 'text-purple-400',
      primaryBorder: 'border-purple-500/20',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-purple-950',
      lightAccentBg: 'bg-purple-950/20 text-purple-400 border-purple-500/20',
    },
    allowedDomains: ['covenantuniversity.edu.ng', 'student.covenantuniversity.edu.ng'],
    departments: [
      'Computer Science',
      'Electrical & Information Engineering',
      'Economics',
      'Architecture',
      'Accounting',
      'International Relations'
    ],
    stats: {
      totalStudents: 9200,
      pendingClearances: 340,
      clearedThisMonth: 1890
    }
  },
  {
    code: 'BU',
    name: 'Babcock University',
    shortName: 'Babcock',
    motto: 'Knowledge, Truth, Service',
    primaryColor: 'blue',
    accentColor: 'amber',
    colorTheme: {
      primaryBg: 'bg-blue-600',
      primaryText: 'text-blue-400',
      primaryBorder: 'border-blue-500/20',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-400',
      bannerGradient: 'from-slate-950 via-neutral-950 to-blue-950',
      lightAccentBg: 'bg-blue-950/20 text-blue-400 border-blue-500/20',
    },
    allowedDomains: ['babcock.edu.ng', 'student.babcock.edu.ng'],
    departments: [
      'Software Engineering',
      'Public Health',
      'Nursing Science',
      'Business Administration',
      'Mass Communication',
      'Information Resources Management'
    ],
    stats: {
      totalStudents: 11400,
      pendingClearances: 520,
      clearedThisMonth: 2150
    }
  }
];


export const getInstitutionByCode = (code: string): Institution | undefined => {
  return INSTITUTIONS.find(inst => inst.code.toUpperCase() === code.toUpperCase());
};
