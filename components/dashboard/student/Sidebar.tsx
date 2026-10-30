'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import Image from 'next/image';
import SignOutConfirmModal from '@/components/dashboard/student/SignOutConfirmModal';
import ContactRegistryModal from '@/components/dashboard/student/ContactRegistryModal';

interface SidebarProps {
  user: User;
  activeSection: string;
  onNavigate: (section: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  unreadCount?: number;
}

/* ─── FILLED Nav Icons ─── */

function DashboardIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14.9714V9.82857C0 9.26051 0.447715 8.8 1 8.8H4C4.55228 8.8 5 9.26051 5 9.82857V14.9714C5 15.5395 4.55228 16 4 16H1C0.447715 16 0 15.5395 0 14.9714Z" fill={color} />
      <path d="M7 14.9714V9.82857C7 9.26051 7.44772 8.8 8 8.8H15C15.5523 8.8 16 9.26051 16 9.82857V14.9714C16 15.5395 15.5523 16 15 16H8C7.44772 16 7 15.5395 7 14.9714Z" fill={color} />
      <path d="M0 6.17143V1.02857C0 0.460507 0.447715 0 1 0H8C8.55229 0 9 0.460507 9 1.02857V6.17143C9 6.73949 8.55229 7.2 8 7.2H1C0.447715 7.2 0 6.73949 0 6.17143Z" fill={color} />
      <path d="M11 6.17143V1.02857C11 0.460507 11.4477 0 12 0H15C15.5523 0 16 0.460507 16 1.02857V6.17143C16 6.73949 15.5523 7.2 15 7.2H12C11.4477 7.2 11 6.73949 11 6.17143Z" fill={color} />
    </svg>

  );
}

function ClearancesIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M7.93015 0.00164409C8.3534 -0.0288743 8.87978 0.373024 9.26676 0.580222L14.4779 3.42248C14.7694 3.58307 15.0934 3.72557 15.3804 3.88573C15.5403 3.97492 15.9117 4.36748 15.9388 4.54882C16.0232 5.11106 15.9957 5.85161 15.9959 6.43221L15.9965 13.2108C15.9967 13.923 16.0006 14.6354 15.9924 15.3474C15.9871 15.8037 15.8863 15.885 15.5249 16C15.2274 15.9246 15.0648 15.8191 15.0513 15.453C15.0384 15.1017 15.042 14.759 15.042 14.408L15.0425 12.5755C15.0492 10.441 15.0462 8.30654 15.034 6.172C14.8328 6.34559 14.1526 6.65743 13.904 6.73526C13.7229 6.81552 13.5164 6.9623 13.3314 7.05972L11.9236 7.78752C11.5242 7.99681 11.1118 8.1677 10.72 8.39835C10.3644 8.60514 9.99122 8.7692 9.62607 8.95145C9.44028 9.04416 9.26618 9.16597 9.08292 9.25823C8.72342 9.43888 8.35827 9.60886 7.99604 9.78247C7.66169 9.6009 7.23692 9.42956 6.88422 9.24573L2.16494 6.80655C1.57174 6.49402 0.94999 6.24981 0.39495 5.84232C0.17036 5.671 0.0721211 5.5118 0.0222123 5.19755C-0.159487 3.99331 0.813521 3.8366 1.48345 3.43316C1.94177 3.15718 2.37221 2.94952 2.83116 2.70008L6.7846 0.546362C7.20791 0.313644 7.45886 0.0811556 7.93015 0.00164409Z" fill={color} />
      <path d="M12.8713 9.01258L12.9341 9.02394C12.9746 9.0987 12.9536 10.2583 12.9542 10.4492L12.9585 11.6327C12.9596 12.014 12.9982 12.6266 12.7565 12.9313C12.5455 13.1974 12.2802 13.3083 11.9698 13.3108C11.3785 13.3158 10.7841 13.3122 10.1912 13.3122L4.78887 13.3131C4.5629 13.3138 4.32911 13.3163 4.10374 13.3149C2.8492 13.3081 3.02374 12.1578 3.03014 11.1184C3.02959 10.4137 3.0392 9.68862 3.02801 8.98667C3.40543 9.2614 3.82326 9.38639 4.21371 9.60749C4.74109 9.90586 5.27203 10.1463 5.80528 10.4206L7.16728 11.1223C7.28488 11.1818 7.59872 11.3545 7.70088 11.3775C7.86912 11.4056 8.21849 11.4286 8.37367 11.3493C8.79926 11.1039 9.27846 10.9253 9.70152 10.6817C10.1458 10.4256 10.5771 10.2113 11.0358 9.99244C11.2331 9.89836 11.459 9.75861 11.6573 9.65112C12.0279 9.45002 12.5395 9.27527 12.8713 9.01258Z" fill={color} />

    </svg>

  );
}

function TimelineIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M0 3.69231C0 2.60473 0.881655 1.72308 1.96923 1.72308H14.0308C15.1183 1.72308 16 2.60473 16 3.69231V14.0308C16 15.1183 15.1183 16 14.0308 16H1.96923C0.881655 16 0 15.1183 0 14.0308V3.69231Z" fill={color} />
      <path d="M1.72308 3.2H14.2769V6.4H1.72308V3.2Z" fill="white" />
      <path d="M3.69231 0.984615C3.69231 0.440827 4.13313 0 4.67692 0C5.22071 0 5.66154 0.440827 5.66154 0.984615V4.18462C5.66154 4.7284 5.22071 5.16923 4.67692 5.16923C4.13313 5.16923 3.69231 4.7284 3.69231 4.18462V0.984615Z" fill={color} />
      <path d="M10.3385 0.984615C10.3385 0.440827 10.7793 0 11.3231 0C11.8669 0 12.3077 0.440827 12.3077 0.984615V4.18462C12.3077 4.7284 11.8669 5.16923 11.3231 5.16923C10.7793 5.16923 10.3385 4.7284 10.3385 4.18462V0.984615Z" fill={color} />

    </svg>

  );
}

function VaultIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M0.0466609 14.4306C-0.0266099 14.1748 0.00791019 13.0597 0.00950833 12.7342L0.0092505 2.87271C0.00406801 1.86572 -0.104463 0.560008 1.26019 0.179892C1.40419 0.13978 1.5554 0.0778017 1.70589 0.0486332C2.07425 -0.00310078 2.53106 0.00576498 2.90543 0.00490103L4.87721 0.00850087L7.55759 0.00755454C8.02358 0.00689629 9.24409 -0.0345526 9.62731 0.0838493C9.76962 0.221711 9.89205 0.292637 10.0485 0.417559C10.3054 0.625133 10.5583 0.836409 10.8068 1.05126L14.3594 4.12439C14.8233 4.51927 15.5081 5.04669 15.8779 5.47885C15.9947 5.61525 15.9881 6.99249 15.9914 7.23807C15.9999 8.21818 16.0021 9.19835 15.998 10.1785L15.9964 12.6542C15.9955 13.1798 15.9932 13.7112 15.971 14.2296C15.9528 14.6573 15.7062 15.2103 15.3304 15.495C14.5373 16.0958 13.3226 15.9938 12.376 15.9929L9.24682 15.991L2.98056 15.9926C2.41541 15.9927 2.03381 16.0272 1.49413 15.8684C0.7896 15.6611 0.394526 15.3928 0.17098 14.7702C0.139789 14.6834 0.107055 14.5672 0.0653997 14.4813L0.183635 14.5372C0.244692 14.4635 0.217526 14.3609 0.212874 14.2565C0.189927 13.8873 0.214778 13.3579 0.214754 12.9743L0.212464 2.24839C0.229265 1.9819 0.209716 1.84515 0.157506 1.58084C0.124892 1.84128 0.102451 2.80368 0.14056 3.07811L0.139403 14.3039C0.121108 14.3836 0.136125 14.3843 0.0466609 14.4306ZM8.60493 2.50759L8.60192 4.12562C8.60151 4.55782 8.57738 5.08037 8.6766 5.50382C8.70858 5.64033 8.8494 5.75618 8.94729 5.85485C9.08163 5.99022 9.43705 6.16386 9.53556 6.27125C10.3982 6.34331 11.8915 6.31585 12.782 6.29357C13.0775 6.26506 13.0737 6.19975 13.1905 5.98728C13.1213 5.8825 12.9598 5.68445 12.8132 5.55868C11.5462 4.47176 10.28 3.36062 8.98759 2.29732C8.98326 2.29629 8.97892 2.29529 8.97458 2.29426C8.87867 2.47824 8.83492 2.48427 8.60493 2.50759Z" fill={color} />
      <path d="M0.14056 3.07811C0.152347 2.89791 0.132267 1.98599 0.165652 1.89832C0.20176 1.96057 0.206631 2.16613 0.212464 2.24839L0.214754 12.9743C0.214778 13.3579 0.189927 13.8873 0.212874 14.2565C0.17368 14.2949 0.189059 14.2908 0.139403 14.3039L0.14056 3.07811Z" fill={color} />
      <path d="M0.14056 3.07811C0.102451 2.80368 0.124892 1.84128 0.157506 1.58084C0.209716 1.84515 0.229265 1.9819 0.212464 2.24839C0.206631 2.16613 0.20176 1.96057 0.165652 1.89832C0.132267 1.98599 0.152347 2.89791 0.14056 3.07811Z" fill={color} />
      <path d="M0.139403 14.3039C0.189059 14.2908 0.17368 14.2949 0.212874 14.2565C0.217526 14.3609 0.244692 14.4635 0.183635 14.5372L0.0653997 14.4813L0.0466609 14.4306C0.136125 14.3843 0.121108 14.3836 0.139403 14.3039Z" fill={color} />

    </svg>

  );
}

function NotificationsIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M7.88957 0.00261498C8.18529 -0.0220704 9.11653 0.134394 9.40727 0.20362C10.6488 0.49923 11.6424 1.25296 12.4359 2.22772C12.9167 2.81828 13.4209 4.01828 13.4944 4.8049C13.551 5.6792 13.4829 6.59659 13.614 7.46667C13.7595 8.43291 13.9899 9.29197 14.4525 10.1604C14.8032 10.8186 15.4006 10.728 15.9041 11.0668C16.0293 11.4289 16.0215 11.4523 15.9406 11.8317C15.4334 12.0165 14.714 11.9681 14.1699 11.9638L12.6386 11.9603L8.12886 11.9741C6.46064 11.9545 4.79229 11.9473 3.12394 11.9525C2.63798 11.9531 0.378184 12.0324 0.0802608 11.8549C-0.0230525 11.7068 -0.00229857 11.3569 0.0117311 11.1813C0.200343 10.8791 0.444825 10.9137 0.761905 10.8135C1.53051 10.5706 2.02047 9.45799 2.19273 8.73824C2.24117 8.53587 2.26346 8.31568 2.30451 8.10928C2.33773 7.94216 2.43474 7.6908 2.44767 7.53034C2.48824 7.02646 2.52298 6.51363 2.55138 6.00869C2.57462 5.59545 2.51958 5.13996 2.56657 4.72732C2.57877 4.62007 2.65882 4.43063 2.68416 4.31856C2.80049 3.80378 2.95 3.40571 3.19815 2.94169C3.82932 1.76907 4.70439 0.998798 5.90665 0.456706C6.6986 0.0996091 7.15837 0.215938 7.88957 0.00261498Z" fill={color} />
      <path d="M5.81221 13.7435C5.93535 13.7238 6.05605 13.7349 6.18051 13.7374C7.42665 13.7625 8.67433 13.7447 9.92067 13.7441C10.0115 13.744 10.1243 13.7575 10.2103 13.7825C10.3577 13.9396 10.2382 14.2274 10.1924 14.4075C10.0902 14.8101 9.94195 15.107 9.70035 15.4436C9.51749 15.5943 9.2636 15.8607 8.9983 15.9081C8.35348 16.0175 7.30926 16.0748 6.7136 15.812C6.10626 15.5441 5.47208 14.3644 5.81221 13.7435Z" fill={color} />

    </svg>

  );
}

function SettingsIcon({ active }: { active?: boolean }) {
  const color = active ? '#15803D' : '#33463A';
  return (
    <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M7.73398 0.0076803C8.18559 -0.0198007 8.64536 0.0226185 9.06736 0.197674C9.44578 0.354662 9.82193 0.528406 10.1972 0.694004L14.6497 2.66443C15.0062 2.82218 15.3641 2.97782 15.7186 3.13966C15.9848 3.26124 16.0817 3.58075 15.924 3.82626C15.8688 3.9121 15.8182 3.94999 15.738 4.00763C15.7541 5.04593 15.7392 6.12545 15.7392 7.16722L15.7405 8.29217C15.7409 8.4977 15.7462 8.70625 15.7358 8.91134C15.715 9.32594 15.36 9.62933 14.945 9.58899C14.754 9.56979 14.5785 9.476 14.4567 9.32808C14.366 9.21757 14.3211 9.11135 14.3111 8.96949C14.2936 8.71967 14.3001 8.4512 14.3002 8.20055L14.3003 5.3854C14.3001 5.18342 14.2876 4.83391 14.3065 4.64246C14.1207 4.70364 13.775 4.87418 13.5841 4.95558C13.0117 5.1997 12.4405 5.47316 11.8672 5.71441C11.8596 5.87078 11.866 6.08649 11.8646 6.24437C11.8537 7.50339 11.9771 8.24909 11.3336 9.38164C11.1583 9.68064 10.9427 9.95443 10.6929 10.1952C9.95401 10.9091 8.95979 11.3003 7.93039 11.2821C6.89766 11.2637 5.91514 10.8351 5.20127 10.0917C4.60363 9.47182 4.23365 8.66904 4.15125 7.81356C4.12488 7.54266 4.13274 7.15666 4.13254 6.87895C4.13023 6.48902 4.13169 6.09909 4.13692 5.70919C4.04087 5.68137 3.83806 5.58383 3.7404 5.54021L3.01908 5.21988L1.06077 4.35466C0.890754 4.27959 0.71937 4.20502 0.550233 4.12941C0.308293 4.02125 0.0272864 3.94238 0.00235721 3.63071C-0.0185779 3.36888 0.100667 3.21681 0.330874 3.11466C0.700954 2.95045 1.07181 2.78962 1.44173 2.62593L5.85875 0.670772C6.19883 0.519819 6.63698 0.309915 6.97801 0.181131C7.22097 0.0895018 7.4753 0.0311499 7.73398 0.0076803Z" fill={color} />
      <path d="M5.01008 12.3684C5.21597 12.3533 5.41799 12.3852 5.59241 12.5035C5.80537 12.6479 5.99112 12.8631 6.17436 13.0448C6.54569 13.4132 6.90785 13.7914 7.27855 14.1604C7.62482 14.5114 8.12363 14.5838 8.53836 14.3107C8.67214 14.2227 8.90714 13.9704 9.03093 13.8454L9.79594 13.0719C9.95571 12.9102 10.2352 12.6078 10.4173 12.4959C10.5537 12.4101 10.7115 12.3641 10.8728 12.3633C10.9436 12.3629 11.0381 12.3725 11.1065 12.3916C13.25 12.9898 15.6984 14.5874 15.7369 17.0509C15.748 17.7687 15.3542 18.426 14.722 18.7672C14.2064 19.0454 13.6864 18.9973 13.1212 18.9961L3.19247 18.9969C2.92071 18.9969 2.6432 18.9931 2.37182 18.9966C1.89357 19.0027 1.50352 18.9342 1.09698 18.6595C0.679111 18.3762 0.390978 17.9397 0.295687 17.4454C0.141221 16.5986 0.477918 15.6159 0.96957 14.9245C1.72519 13.8619 2.88071 13.1284 4.08452 12.6614C4.34467 12.5605 4.73982 12.4159 5.01008 12.3684Z" fill={color} />

    </svg>

  );
}

function LogOutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H7" stroke="#5F6D64" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 14L17 10L13 6" stroke="#5F6D64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 10H8" stroke="#5F6D64" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#15803D" strokeWidth="1.5" />
      <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.60457 11.7835 9.54012 10.7917 9.86851C10.3452 10.0128 10 10.407 10 10.875V11.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.75" fill="#15803D" />
    </svg>
  );
}

function SidebarCollapseIcon({ collapsed }: { collapsed?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="#AEAEAE" />
      <path d="M9.44444 5H5.55556C5.24873 5 5 5.69645 5 6.55556V17.4444C5 18.3036 5.24873 19 5.55556 19H9.44444C9.75127 19 10 18.3036 10 17.4444V6.55556C10 5.69645 9.75127 5 9.44444 5Z" fill="white" />
      <path
        d="M14 14L16 12L14 10"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="white"
        className={`origin-[15px_12px] transition-transform duration-500 ease-in-out ${collapsed ? "rotate-180" : "rotate-0"}`}
      />
    </svg>
  );
}


function ExternalLinkIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 5.38889V7.61111C8.5 7.84686 8.40635 8.07295 8.23965 8.23965C8.07295 8.40635 7.84686 8.5 7.61111 8.5H1.38889C1.15314 8.5 0.927048 8.40635 0.760349 8.23965C0.59365 8.07295 0.5 7.84686 0.5 7.61111V1.38889C0.5 1.15314 0.59365 0.927048 0.760349 0.760349C0.927048 0.59365 1.15314 0.5 1.38889 0.5H3.61111M8.5 0.5L4.5 4.5M8.5 3.16667V0.5H5.83333" strokeLinecap="round" strokeLinejoin="round" stroke="black" />
    </svg>

  );
}

function ClearUsLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="url(#paint0_linear_205_284)" />
      <path d="M29.15 18.1514V23.6514M14.4834 20.4431V23.6514C14.4834 25.2098 16.9584 26.4014 19.9834 26.4014C23.0084 26.4014 25.4834 25.2098 25.4834 23.6514V20.4431M11.3667 17.3264L19.25 13.7514C19.4813 13.6505 19.731 13.5984 19.9834 13.5984C20.2358 13.5984 20.4854 13.6505 20.7167 13.7514L28.6 17.3264C28.755 17.4015 28.8857 17.5187 28.9772 17.6646C29.0686 17.8105 29.1171 17.9792 29.1171 18.1514C29.1171 18.3236 29.0686 18.4924 28.9772 18.6383C28.8857 18.7842 28.755 18.9014 28.6 18.9764L20.7167 22.5514C20.4854 22.6524 20.2358 22.7045 19.9834 22.7045C19.731 22.7045 19.4813 22.6524 19.25 22.5514L11.3667 18.9764C11.2117 18.9014 11.081 18.7842 10.9896 18.6383C10.8981 18.4924 10.8496 18.3236 10.8496 18.1514C10.8496 17.9792 10.8981 17.8105 10.9896 17.6646C11.081 17.5187 11.2117 17.4015 11.3667 17.3264Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#DCFCE7" />
      <defs>
        <linearGradient id="paint0_linear_205_284" x1="0" y1="0" x2="28.2885" y2="28.2885" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  )
}
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'clearances', label: 'My Clearances', Icon: ClearancesIcon },
  { id: 'timeline', label: 'Timeline', Icon: TimelineIcon },
  { id: 'vault', label: 'Document Vault', Icon: VaultIcon },
  { id: 'notifications', label: 'Notifications', Icon: NotificationsIcon, badge: 2 },
  { id: 'settings', label: 'Profile & Settings', Icon: SettingsIcon },
];

export default function StudentSidebar({
  user,
  activeSection,
  onNavigate,
  collapsed,
  onToggleCollapse,
  unreadCount = 2,
}: SidebarProps) {
  const router = useRouter();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isContactRegistryModalOpen, setIsContactRegistryModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsSignOutModalOpen(false);
    router.push('/auth/signed-out');
  };
  return (
    <aside
      className={`shrink-0 bg-[#F7FBF8] flex flex-col h-screen border-r-[1.2px] relative border-[#E2EBE5] transition-all duration-200 ${collapsed ? 'w-18' : 'w-69.25'
        }`}
    >
      {/* Logo + collapse */}
      <div className={`flex items-center pt-5 pb-3 ${collapsed ? 'flex-col gap-2 px-2' : 'justify-between px-5'}`}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2">
              <ClearUsLogo />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold tracking-tight text-[#13241A] font-jakarta">
                  Clear<span className="text-[#15803D]">Us</span>
                </span>
                <span className="text-[8px] text-[#8A9A90] leading-none font-sans">Academic Network</span>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-[#E8ECEB] transition-colors"
            >
              <SidebarCollapseIcon collapsed={collapsed} />
            </button>

            <div className='border-b-[1.2px] border-[#E2EBE5] absolute top-16 w-full left-0' />
          </>
        ) : (
          <>
            <ClearUsLogo />
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-[#E8ECEB] transition-colors"
            >
              <SidebarCollapseIcon collapsed={collapsed} />
            </button>
          </>
        )}
      </div>

      {/* User profile */}
      {!collapsed ? (
        <div className="px-5 pb-4 border-b border-[#E2EBE5] mt-5">

          <div className='bg-white border border-[#E2EBE5] rounded-2xl p-4'>

            <div className="flex items-start justify-between gap-3">
              <div className="w-13 h-13 rounded-full bg-[#D1D5DB] overflow-hidden shrink-0 flex items-center justify-center">
                {/* <span className="text-[18px] font-semibold text-[#6B7280]">
                  {user.name.charAt(0).toUpperCase()}
                </span> */}
                <Image src="/images/profile.png" width={72} height={72} alt={user.name} sizes="72px" />
              </div>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('settings')}
                  className="flex border border-[#E2EBE5] rounded-xl p-2 items-center gap-1 text-[12px] font-semibold text-[#13241A] transition-colors font-sans cursor-pointer hover:bg-white"
                >
                  Manage Profile
                  <ExternalLinkIcon />
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div>
                <span className="text-[12px] text-[#33463a63] tracking-[-1] block font-sans font-semibold">Name:</span>
                <span className="text-[14px] font-normal text-[#13241A] font-sans mb-1">{user.name}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#33463a63] tracking-[-1] block font-sans font-semibold">Matric No:</span>
                <span className="text-[14px] font-normal text-[#13241A] font-sans mb-1">{user.matricNo ?? user.id}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#33463a63] tracking-[-1] block font-sans font-semibold">Department:</span>
                <span className="text-[14px] font-normal text-[#13241A] font-sans mb-1">{user.department}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pb-4 border-b border-[#E2EBE5]">

          <div className="w-10 h-10 rounded-full bg-[#D1D5DB] overflow-hidden flex items-center justify-center">
            {/* <span className="text-[14px] font-semibold text-[#6B7280]">
              {user.name.charAt(0).toUpperCase()}
            </span> */}
            <Image src="/images/profile.png" width={72} height={72} alt={user.name} sizes="72px" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 pt-3 space-y-0.5 ${collapsed ? 'px-2' : 'px-3'}`}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          const badgeCount = item.id === 'notifications' ? unreadCount : item.badge;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg text-[14px] font-medium transition-colors relative ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'
                } ${isActive
                  ? 'rounded-xl border border-[#E2EBE5] bg-white shadow-md text-[#15803D]'
                  : 'text-[#3D4A40] hover:bg-[#EEF0EF]'
                } cursor-pointer`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-[#15803D] rounded-r" />
              )}
              <span className="relative">
                <item.Icon active={isActive} />
                {collapsed && !!badgeCount && badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#15803D] text-white text-[9px] font-semibold flex items-center justify-center">
                    {badgeCount}
                  </span>
                )}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {!!badgeCount && badgeCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#15803D] text-white text-[11px] font-semibold flex items-center justify-center">
                      {badgeCount}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Need help card */}
      {!collapsed ? (
        <div className="px-4 pb-3">
          <div
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #D1FAE5 0%, #A7F3D0 50%, #6EE7B7 100%)',
            }}
          >
            <div className='bg-[#76DD99] w-[4.6rem] h-[4.6rem] rounded-full blur-lg absolute -top-5 -left-4' />

            <div className='bg-[#76DD99] w-[4.6rem] h-[4.6rem] rounded-full blur-lg absolute -bottom-5 -left-4' />

            <div className='bg-[#76DD99] w-[4.6rem] h-[4.6rem] rounded-full blur-lg absolute -bottom-5 -right-4' />

            <div className='bg-[#76DD99] w-[4.6rem] h-[4.6rem] rounded-full blur-lg absolute -top-5 -right-4' />

            <div className='bg-[#76DD99] w-[4.6rem] h-[4.6rem] rounded-full blur-lg absolute top-5 right-16' />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <HelpIcon />
                <span className="text-[14px] font-semibold text-[#13241A] font-jakarta">Need help?</span>
              </div>
              <p className="text-[12px] text-[#374151] leading-4.25 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Visit the Academic Registry or message the clearance desk.
              </p>
              <button
                type="button"
                onClick={() => setIsContactRegistryModalOpen(true)}
                className="w-full py-2.5 bg-[#13241A] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0D1A12] transition-colors cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Contact Registry
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pb-3">
          <button
            type="button"
            onClick={() => setIsContactRegistryModalOpen(true)}
            className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center hover:bg-[#A7F3D0] transition-colors cursor-pointer"
            title="Need help?"
          >
            <HelpIcon />
          </button>
        </div>
      )}

      {/* Logout */}
      <div className={`pb-5 ${collapsed ? 'flex justify-center' : 'px-4'}`}>
        {collapsed ? (
          <button
            type="button"
            onClick={() => setIsSignOutModalOpen(true)}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#E8ECEB] transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOutIcon />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsSignOutModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 text-[14px] font-medium text-[#5F6D64] hover:text-[#13241A] transition-colors cursor-pointer w-full text-left"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <LogOutIcon />
            <span>Log out</span>
          </button>
        )}
      </div>

      {/* Contact Registry Modal */}
      <ContactRegistryModal
        isOpen={isContactRegistryModalOpen}
        onClose={() => setIsContactRegistryModalOpen(false)}
      />

      {/* Sign Out Confirmation Modal */}
      <SignOutConfirmModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirmSignOut={handleConfirmLogout}
      />
    </aside>
  );
}
