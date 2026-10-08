// keywords.js
export const REGIONAL_FILTERS = {
  // ----------------------------------------------------
  // 1. UNITED STATES (US)
  // ----------------------------------------------------
  US: {
    controversy: new Set([
      'lawsuit', 'sued', 'suing', 'army',  'investigation', 'sec', 'ftc', 'doj',
      'antitrust', 'monopoly', 'subpoena', 'scandal', 'banned', 'protest',
      'union', 'strike', 'fraud', 'allegation', 'whistleblower', 'indictment',
      'class action', 'regulatory probe', 'ethics violation'
    ]),
    walletImpact: new Set([
      'inflation', 'fed rate', 'interest rate', 'layoffs', 'job cuts',
      'price hike', 'mortgage', 'tax', 'gas prices', 'war', 'rent', 'credit card debt',
      '401k', 'wages', 'cost of living', 'student loan', 'healthcare cost',
      'tariffs', 'hiring freeze','Profit','social security'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'Revenue', 'record high', 'all-time high', 'crash', 'plunged',
      'skyrocketed', 'bankrupt', 'bankruptcy', 'wall street', 'dow jones',
      'nasdaq', 's&p 500', 'massive', 'collapse', 'wiped out', 'default',
      'market panic', 'downfall', 'unprecedented'
    ])
  },

  // ----------------------------------------------------
  // 2. UNITED KINGDOM (UK)
  // ----------------------------------------------------
  UK: {
    controversy: new Set([
      'lawsuit', 'investigation', 'fca', 'scandal', 'probe', 'banned',
      'penalty', 'fine', 'ofgem', 'ofcom', 'strike', 'union walkout',
      'fraud', 'hmrc raid', 'regulatory action', 'breach', 'parliament inquiry'
    ]),
    walletImpact: new Set([
      'cost of living', 'inflation', 'bank of england', 'interest rates',
      'energy bill', 'council tax', 'mortgage rate', 'layoffs', 'job cuts',
      'pound sterling', 'gbp', 'national insurance', 'pension', 'wages',
      'rail fare hike', 'rent prices'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'bankrupt', 'administration', 'liquidation', 'ftse 100',
      'recession', 'collapse', 'massive', 'unprecedented'
    ])
  },

  // ----------------------------------------------------
  // 3. EUROPE (EU / CONTINENTAL)
  // ----------------------------------------------------
  EUROPE: {
    controversy: new Set([
      'lawsuit', 'investigation', 'eu commission', 'antitrust fine',
      'gdpr fine', 'regulatory action', 'scandal', 'probe', 'banned',
      'monopoly', 'ecb warning', 'sanctions', 'court ruling', 'strike action'
    ]),
    walletImpact: new Set([
      'inflation', 'ecb rate', 'interest rates', 'euro', 'energy crisis',
      'gas bill', 'layoffs', 'job cuts', 'taxes', 'wages', 'cost of living',
      'carbon tax', 'housing costs', 'subsidies'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'bankrupt', 'insolvency', 'stoxx 600', 'dax', 'cac 40',
      'recession', 'collapse', 'massive'
    ])
  },

  // ----------------------------------------------------
  // 4. AUSTRALIA (AUS)
  // ----------------------------------------------------
  AUS: {
    controversy: new Set([
      'lawsuit', 'investigation', 'accc', 'asic', 'scandal', 'probe',
      'banned', 'fine', 'penalty', 'royalty dispute', 'union action',
      'regulatory breach', 'court battle', 'class action'
    ]),
    walletImpact: new Set([
      'inflation', 'rba rate', 'interest rates', 'aud', 'australian dollar',
      'layoffs', 'job cuts', 'stage 3 tax cuts', 'hecs debt', 'rent crisis',
      'mortgage stress', 'superannuation', 'electricity bills', 'fuel prices'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'asx 200', 'crash', 'plunged',
      'skyrocketed', 'bankrupt', 'voluntary administration', 'collapse',
      'massive', 'recession warning'
    ])
  },

  // ----------------------------------------------------
  // 5. GCC - UNITED ARAB EMIRATES (UAE)
  // ----------------------------------------------------
  UAE: {
    controversy: new Set([
      'lawsuit', 'investigation', 'scandal', 'banned', 'fine', 'penalty',
      'dispute', 'deportation', 'cbuae', 'central bank fine', 'fraud',
      'ftc', 'money laundering', 'regulatory breach', 'blacklisted'
    ]),
    walletImpact: new Set([
      'vat', 'corporate tax', 'dirham', 'aed', 'rent hike', 'housing cost',
      'fuel prices', 'salik', 'toll', 'layoffs', 'visa fees', 'salary',
      'school fees', 'emiratisation fine', 'deva bills', 'sewerage fee'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'crash', 'surged', 'plunged',
      'bankrupt', 'burj', 'mega project', 'massive', 'collapse',
      'dfm surge', 'adx record', 'giga project'
    ])
  },

  // ----------------------------------------------------
  // 6. GCC - SAUDI ARABIA (KSA)
  // ----------------------------------------------------
  KSA: {
    controversy: new Set([
      'investigation', 'scandal', 'banned', 'fine', 'penalty', 'sama penalty',
      'dispute', 'fraud', 'anti-corruption', 'cma probe', 'labor violation',
      'compliance breach'
    ]),
    walletImpact: new Set([
      'vat 15%', 'saudi riyal', 'sar', 'saudization', 'nitaqat fine',
      'fuel prices', 'iqama fee', 'layoffs', 'job cuts', 'housing cost',
      'electricity tariff', 'salary cuts', 'tax increase'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'pif', 'vision 2030', 'neom', 'tasi',
      'record high', 'crash', 'surged', 'plunged', 'aramco market cap',
      'mega project', 'giga project', 'massive collapse'
    ])
  },

  // ----------------------------------------------------
  // 7. GCC - QATAR (QATAR)
  // ----------------------------------------------------
  QATAR: {
    controversy: new Set([
      'investigation', 'banned', 'fine', 'qcb warning', 'penalty',
      'dispute', 'fraud', 'regulatory action', 'breach of contract'
    ]),
    walletImpact: new Set([
      'qatari riyal', 'qar', 'layoffs', 'job cuts', 'rent hike',
      'cost of living', 'salary', 'kahramaa bill', 'school fees',
      'corporate tax', 'work visa fees'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'qatar airways', 'lng expansion',
      'record high', 'crash', 'surged', 'plunged', 'qse index',
      'massive contract', 'giga project'
    ])
  },

  // ----------------------------------------------------
  // 8. GCC - KUWAIT (KUWAIT)
  // ----------------------------------------------------
  KUWAIT: {
    controversy: new Set([
      'investigation', 'cbk probe', 'banned', 'fine', 'penalty',
      'corruption', 'parliament clash', 'fraud', 'regulatory breach'
    ]),
    walletImpact: new Set([
      'kuwaiti dinar', 'kwd', 'kuwaitization', 'layoffs', 'job cuts',
      'subsidies cut', 'rent prices', 'wages', 'allowances cut'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'boursa kuwait', 'crash',
      'surged', 'plunged', 'sovereign wealth', 'oil reserve surge', 'massive'
    ])
  },

  // ----------------------------------------------------
  // 9. GCC - BAHRAIN (BAHRAIN)
  // ----------------------------------------------------
  BAHRAIN: {
    controversy: new Set([
      'investigation', 'cbb fine', 'banned', 'penalty', 'dispute',
      'fraud', 'regulatory sanction'
    ]),
    walletImpact: new Set([
      'vat 10%', 'bahraini dinar', 'bhd', 'bahrainisation', 'layoffs',
      'job cuts', 'fuel price', 'rent', 'electricity subsidy'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'bhb index', 'crash',
      'surged', 'plunged', 'bankrupt', 'massive deal'
    ])
  },

  // ----------------------------------------------------
  // 10. GCC - OMAN (OMAN)
  // ----------------------------------------------------
  OMAN: {
    controversy: new Set([
      'investigation', 'cbom warning', 'banned', 'fine', 'penalty',
      'dispute', 'labor breach', 'fraud'
    ]),
    walletImpact: new Set([
      'vat 5%', 'omani rial', 'omr', 'omanisation', 'layoffs',
      'job cuts', 'subsidy reform', 'water bill', 'fuel cap'
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'msx index', 'crash',
      'surged', 'plunged', 'green hydrogen deal', 'massive project'
    ])
  }
};

