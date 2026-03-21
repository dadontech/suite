// Shared niche pools reused across funnel types
const NICHE_POOLS: Record<string, Record<string, string[]>> = {
  health: {
    health: [
      'photo-1559056199-641a0ac8b55e','photo-1571019614242-c5c5dee9f50b',
      'photo-1490645935967-10de6ba17061','photo-1498837167922-ddd27525d352',
      'photo-1544367567-0f2fcb009e0b','photo-1438761681033-6461ffad8d80',
      'photo-1532938911079-1b06ac7ceec7','photo-1505576399279-565b52d4ac71',
    ],
    finance: [
      'photo-1611974789855-9c2a0a7236a3','photo-1551288049-bebda4e38f71',
      'photo-1579532537598-459ecdaf39cc','photo-1565514158740-064f34bd6cfd',
      'photo-1633158829875-e5316a358c6f','photo-1444653614773-995cb1ef9efa',
      'photo-1554224155-8d04cb21cd6c','photo-1468254095679-bbcba94a7066',
    ],
    tech: [
      'photo-1518770660439-4636190af475','photo-1461749280684-dccba630e2f6',
      'photo-1498050108023-c5249f4df085','photo-1555066931-4365d14bab8c',
      'photo-1587620962725-abab7fe55159','photo-1484417894907-623942c8ee29',
      'photo-1605379399642-870262d3d051','photo-1516321318423-f06f85e504b3',
    ],
    business: [
      'photo-1552664730-d307ca884978','photo-1454165804606-c3d57bc86b40',
      'photo-1664575602554-2087b04935a5','photo-1553877522-43269d4ea984',
      'photo-1497366216548-37526070297c','photo-1600880292203-757bb62b4baf',
      'photo-1573496359142-b8d87734a5a2','photo-1504384308090-c894fdcc538d',
    ],
    education: [
      'photo-1522202176988-66273c2fd55f','photo-1434030216411-0b793f4b4173',
      'photo-1456513080510-7bf3a84b82f8','photo-1571260899304-425eee4c7efc',
      'photo-1488190211105-8b0e65b80b4e','photo-1509062522246-3755977927d7',
      'photo-1434626881859-194d67b2b86f','photo-1513258496099-48168024aec0',
    ],
    generic: [
      'photo-1497366216548-37526070297c','photo-1497366754035-f200968a6e72',
      'photo-1542744173-8e7e53415bb0','photo-1519389950473-47ba0277781c',
      'photo-1560472354-b33ff0c44a43','photo-1504384308090-c894fdcc538d',
      'photo-1521737711867-e3b97375f902','photo-1486312338219-ce68d2c6f44d',
    ],
  },
};

function getNichePool(funnelKey: string, niche: string): string[] {
  const base = NICHE_POOLS[funnelKey] ?? NICHE_POOLS['health'];
  return base[niche] ?? base['generic'] ?? NICHE_POOLS['health']['generic'];
}

export const IMAGES: Record<string, Record<string, string[]>> = {
  Review: {
    health: NICHE_POOLS.health.health,
    finance: NICHE_POOLS.health.finance,
    tech: NICHE_POOLS.health.tech,
    business: NICHE_POOLS.health.business,
    education: NICHE_POOLS.health.education,
    generic: NICHE_POOLS.health.generic,
  },
  'Comparison Funnel': {
    health: [
      'photo-1571019614242-c5c5dee9f50b','photo-1490645935967-10de6ba17061',
      'photo-1583454110551-21f2fa2afe61','photo-1544367567-0f2fcb009e0b',
      'photo-1512621776951-a57141f2eefd','photo-1517836357463-d25dfeac3438',
      'photo-1473968512647-3e447244af8f','photo-1476480862126-209bfaa8edc8',
    ],
    finance: [
      'photo-1611974789855-9c2a0a7236a3','photo-1524178232363-1fb2b075b655',
      'photo-1565514158740-064f34bd6cfd','photo-1553729459-efe14ef6055d',
      'photo-1579532537598-459ecdaf39cc','photo-1588776814546-1ffbb3cd01b5',
      'photo-1526304640581-d334cdbbf45e','photo-1579621970795-87facc2f976d',
    ],
    tech: [
      'photo-1509718443690-d8e2fb3474b7','photo-1531297484001-80022131f5a1',
      'photo-1518770660439-4636190af475','photo-1461749280684-dccba630e2f6',
      'photo-1496181133206-80ce9b88a853','photo-1488590528505-98d2b5aba04b',
      'photo-1550439062-609e1531270e','photo-1516321318423-f06f85e504b3',
    ],
    business: [
      'photo-1552664730-d307ca884978','photo-1507679799987-c73779587ccf',
      'photo-1453738773917-9c3eff1db985','photo-1512758017271-d7b84c2113f1',
      'photo-1454165804606-c3d57bc86b40','photo-1560472354-b33ff0c44a43',
      'photo-1542744094-3a31f272c490','photo-1521737711867-e3b97375f902',
    ],
    education: [
      'photo-1434030216411-0b793f4b4173','photo-1522202176988-66273c2fd55f',
      'photo-1571260899304-425eee4c7efc','photo-1456513080510-7bf3a84b82f8',
      'photo-1509062522246-3755977927d7','photo-1434626881859-194d67b2b86f',
      'photo-1513258496099-48168024aec0','photo-1488190211105-8b0e65b80b4e',
    ],
    generic: [
      'photo-1453738773917-9c3eff1db985','photo-1507679799987-c73779587ccf',
      'photo-1542744173-8e7e53415bb0','photo-1560472354-b33ff0c44a43',
      'photo-1553877522-43269d4ea984','photo-1512758017271-d7b84c2113f1',
      'photo-1450101499163-c8848c66ca85','photo-1486312338219-ce68d2c6f44d',
    ],
  },
  Discount: {
    health: [
      'photo-1517836357463-d25dfeac3438','photo-1571019614242-c5c5dee9f50b',
      'photo-1583454110551-21f2fa2afe61','photo-1490645935967-10de6ba17061',
      'photo-1476480862126-209bfaa8edc8','photo-1512621776951-a57141f2eefd',
      'photo-1552196563-55cd4e45efb3','photo-1544367567-0f2fcb009e0b',
    ],
    finance: [
      'photo-1579621970795-87facc2f976d','photo-1611974789855-9c2a0a7236a3',
      'photo-1565514158740-064f34bd6cfd','photo-1553729459-efe14ef6055d',
      'photo-1551135049-8a33b5883817','photo-1524178232363-1fb2b075b655',
      'photo-1579532537598-459ecdaf39cc','photo-1588776814546-1ffbb3cd01b5',
    ],
    tech: [
      'photo-1484417894907-623942c8ee29','photo-1605379399642-870262d3d051',
      'photo-1518770660439-4636190af475','photo-1555066931-4365d14bab8c',
      'photo-1550439062-609e1531270e','photo-1496181133206-80ce9b88a853',
      'photo-1461749280684-dccba630e2f6','photo-1587620962725-abab7fe55159',
    ],
    business: [
      'photo-1507679799987-c73779587ccf','photo-1553877522-43269d4ea984',
      'photo-1542744094-3a31f272c490','photo-1454165804606-c3d57bc86b40',
      'photo-1600880292203-757bb62b4baf','photo-1521737711867-e3b97375f902',
      'photo-1573496359142-b8d87734a5a2','photo-1512758017271-d7b84c2113f1',
    ],
    education: [
      'photo-1522202176988-66273c2fd55f','photo-1434030216411-0b793f4b4173',
      'photo-1571260899304-425eee4c7efc','photo-1509062522246-3755977927d7',
      'photo-1434626881859-194d67b2b86f','photo-1456513080510-7bf3a84b82f8',
      'photo-1488190211105-8b0e65b80b4e','photo-1513258496099-48168024aec0',
    ],
    generic: [
      'photo-1495020689067-958852a7765e','photo-1528360983277-13d401cdc186',
      'photo-1483058712412-4245e9b90334','photo-1557804506-669a67965ba0',
      'photo-1509228468518-180dd4864904','photo-1519389950473-47ba0277781c',
      'photo-1453738773917-9c3eff1db985','photo-1486312338219-ce68d2c6f44d',
    ],
  },
  bridge: {
    health: NICHE_POOLS.health.health,
    finance: NICHE_POOLS.health.finance,
    tech: NICHE_POOLS.health.tech,
    business: NICHE_POOLS.health.business,
    education: NICHE_POOLS.health.education,
    generic: [
      'photo-1557804506-669a67965ba0','photo-1542744173-8e7e53415bb0',
      'photo-1519389950473-47ba0277781c','photo-1453738773917-9c3eff1db985',
      'photo-1560472354-b33ff0c44a43','photo-1497366216548-37526070297c',
      'photo-1504384308090-c894fdcc538d','photo-1486312338219-ce68d2c6f44d',
    ],
  },
  vsl: {
    health: [
      'photo-1571019614242-c5c5dee9f50b','photo-1517836357463-d25dfeac3438',
      'photo-1476480862126-209bfaa8edc8','photo-1544367567-0f2fcb009e0b',
      'photo-1490645935967-10de6ba17061','photo-1512621776951-a57141f2eefd',
      'photo-1552196563-55cd4e45efb3','photo-1559056199-641a0ac8b55e',
    ],
    finance: [
      'photo-1611974789855-9c2a0a7236a3','photo-1565514158740-064f34bd6cfd',
      'photo-1553729459-efe14ef6055d','photo-1579532537598-459ecdaf39cc',
      'photo-1579621970795-87facc2f976d','photo-1551288049-bebda4e38f71',
      'photo-1588776814546-1ffbb3cd01b5','photo-1524178232363-1fb2b075b655',
    ],
    tech: [
      'photo-1555066931-4365d14bab8c','photo-1518770660439-4636190af475',
      'photo-1605379399642-870262d3d051','photo-1484417894907-623942c8ee29',
      'photo-1461749280684-dccba630e2f6','photo-1496181133206-80ce9b88a853',
      'photo-1531297484001-80022131f5a1','photo-1516321318423-f06f85e504b3',
    ],
    business: NICHE_POOLS.health.business,
    education: NICHE_POOLS.health.education,
    generic: [
      'photo-1551135049-8a33b5883817','photo-1519389950473-47ba0277781c',
      'photo-1528360983277-13d401cdc186','photo-1495020689067-958852a7765e',
      'photo-1557804506-669a67965ba0','photo-1509228468518-180dd4864904',
      'photo-1453738773917-9c3eff1db985','photo-1486312338219-ce68d2c6f44d',
    ],
  },
  review_bonus: {
    health: NICHE_POOLS.health.health,
    finance: NICHE_POOLS.health.finance,
    tech: NICHE_POOLS.health.tech,
    business: NICHE_POOLS.health.business,
    education: NICHE_POOLS.health.education,
    generic: NICHE_POOLS.health.generic,
  },
  quiz: {
    health: [
      'photo-1476480862126-209bfaa8edc8','photo-1490645935967-10de6ba17061',
      'photo-1512621776951-a57141f2eefd','photo-1571019614242-c5c5dee9f50b',
      'photo-1559056199-641a0ac8b55e','photo-1438761681033-6461ffad8d80',
      'photo-1505576399279-565b52d4ac71','photo-1532938911079-1b06ac7ceec7',
    ],
    finance: NICHE_POOLS.health.finance,
    tech: NICHE_POOLS.health.tech,
    business: [
      'photo-1664575602554-2087b04935a5','photo-1507679799987-c73779587ccf',
      'photo-1512758017271-d7b84c2113f1','photo-1553877522-43269d4ea984',
      'photo-1552664730-d307ca884978','photo-1454165804606-c3d57bc86b40',
      'photo-1542744094-3a31f272c490','photo-1521737711867-e3b97375f902',
    ],
    education: NICHE_POOLS.health.education,
    generic: NICHE_POOLS.health.generic,
  },
  webinar: {
    health: NICHE_POOLS.health.health,
    finance: [
      'photo-1524178232363-1fb2b075b655','photo-1611974789855-9c2a0a7236a3',
      'photo-1553729459-efe14ef6055d','photo-1565514158740-064f34bd6cfd',
      'photo-1444653614773-995cb1ef9efa','photo-1579621970795-87facc2f976d',
      'photo-1526304640581-d334cdbbf45e','photo-1468254095679-bbcba94a7066',
    ],
    tech: NICHE_POOLS.health.tech,
    business: NICHE_POOLS.health.business,
    education: [
      'photo-1434030216411-0b793f4b4173','photo-1522202176988-66273c2fd55f',
      'photo-1509062522246-3755977927d7','photo-1456513080510-7bf3a84b82f8',
      'photo-1434626881859-194d67b2b86f','photo-1513258496099-48168024aec0',
      'photo-1571260899304-425eee4c7efc','photo-1488190211105-8b0e65b80b4e',
    ],
    generic: NICHE_POOLS.health.generic,
  },
  flash: {
    health: NICHE_POOLS.health.health,
    finance: NICHE_POOLS.health.finance,
    tech: NICHE_POOLS.health.tech,
    business: [
      'photo-1495020689067-958852a7765e','photo-1528360983277-13d401cdc186',
      'photo-1557804506-669a67965ba0','photo-1509228468518-180dd4864904',
      'photo-1483058712412-4245e9b90334','photo-1519389950473-47ba0277781c',
      'photo-1453738773917-9c3eff1db985','photo-1486312338219-ce68d2c6f44d',
    ],
    education: NICHE_POOLS.health.education,
    generic: [
      'photo-1528360983277-13d401cdc186','photo-1495020689067-958852a7765e',
      'photo-1557804506-669a67965ba0','photo-1509228468518-180dd4864904',
      'photo-1483058712412-4245e9b90334','photo-1519389950473-47ba0277781c',
      'photo-1542744173-8e7e53415bb0','photo-1486312338219-ce68d2c6f44d',
    ],
  },
};

export const CHECKOUT_IMAGES = [
  'photo-1556742049-0cfed4f6a45d','photo-1573497491765-dccce02b29df',
  'photo-1450101499163-c8848c66ca85','photo-1553484771-371a605b060b',
  'photo-1600880292203-757bb62b4baf','photo-1521791136064-7986c2920216',
  'photo-1454923634634-bd1614719a7b','photo-1560250097-0b93528c311a',
];

export function pickImage(pageId: string, funnelType: string, niche: string, seed: number): string {
  if (pageId === 'checkout') {
    return `https://images.unsplash.com/${CHECKOUT_IMAGES[seed % CHECKOUT_IMAGES.length]}?w=1600&h=900&fit=crop&auto=format&q=85`;
  }
  const funnelPool = IMAGES[funnelType] ?? IMAGES['Comparison Funnel'];
  const pool = funnelPool[niche] ?? funnelPool['generic'] ?? IMAGES['Review']['generic'];
  return `https://images.unsplash.com/${pool[seed % pool.length]}?w=1600&h=900&fit=crop&auto=format&q=85`;
}