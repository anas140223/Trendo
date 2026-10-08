// keywords.js
export const REGIONAL_FILTERS = {
  // ----------------------------------------------------
  // 1. UNITED STATES (US)
  // ----------------------------------------------------
  US: {
    controversy: new Set([
      'lawsuit', 'sued', 'suing', 'investigation', 'sec', 'ftc', 'doj',
      'antitrust', 'monopoly', 'subpoena', 'scandal', 'banned', 'protest',
      'union', 'strike', 'fraud', 'allegation', 'whistleblower', 'indictment',
      'class action', 'regulatory probe', 'ethics violation', 'bribery',
      'corruption', 'cover-up', 'resignation', 'ousted', 'harassment',
      'insider trading', 'settlement', 'guilty', 'accused', 'boycott',
    ]),
    walletImpact: new Set([
      'inflation', 'fed rate', 'interest rate', 'layoffs', 'job cuts',
      'price hike', 'mortgage', 'tax', 'gas prices', 'war', 'rent',
      'credit card debt', '401k', 'wages', 'cost of living', 'student loan',
      'healthcare cost', 'tariffs', 'hiring freeze', 'profit',
      'social security', 'unemployment', 'minimum wage', 'stimulus',
      'pension', 'savings rate', 'bank fees', 'consumer spending',
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'revenue', 'record high', 'all-time high',
      'crash', 'plunged', 'skyrocketed', 'bankrupt', 'bankruptcy',
      'wall street', 'dow jones', 'nasdaq', 's&p 500', 'massive',
      'collapse', 'wiped out', 'default', 'market panic', 'downfall',
      'unprecedented', 'meltdown', 'freefall', 'sell-off', 'volatile',
    ]),
  },

  // ----------------------------------------------------
  // 2. UNITED KINGDOM (UK)
  // ----------------------------------------------------
  UK: {
    controversy: new Set([
      'lawsuit', 'investigation', 'fca', 'scandal', 'probe', 'banned',
      'penalty', 'fine', 'ofgem', 'ofcom', 'strike', 'union walkout',
      'fraud', 'hmrc raid', 'regulatory action', 'breach',
      'parliament inquiry', 'sfo', 'ico fine', 'mp scandal',
      'westminster row', 'cma investigation', 'public inquiry',
    ]),
    walletImpact: new Set([
      'cost of living', 'inflation', 'bank of england', 'interest rates',
      'energy bill', 'council tax', 'mortgage rate', 'layoffs', 'job cuts',
      'pound sterling', 'gbp', 'national insurance', 'pension', 'wages',
      'rent prices', 'isa', 'stamp duty', 'universal credit',
      'fuel duty', 'vat', 'business rates', 'rail fare',
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'bankrupt', 'administration', 'liquidation', 'ftse 100',
      'recession', 'collapse', 'massive', 'unprecedented', 'turmoil',
      'sterling crash', 'gilt market',
    ]),
  },

  // ----------------------------------------------------
  // 3. EUROPE (EU / CONTINENTAL)
  // ----------------------------------------------------
  EUROPE: {
    controversy: new Set([
      'lawsuit', 'investigation', 'eu commission', 'antitrust fine',
      'gdpr fine', 'regulatory action', 'scandal', 'probe', 'banned',
      'monopoly', 'ecb warning', 'sanctions', 'court ruling',
      'strike action', 'cartel fine', 'corruption', 'state aid probe',
    ]),
    walletImpact: new Set([
      'inflation', 'ecb rate', 'interest rates', 'euro', 'energy crisis',
      'gas bill', 'layoffs', 'job cuts', 'taxes', 'wages',
      'cost of living', 'carbon tax', 'housing costs', 'subsidies',
      'vat', 'eurozone unemployment', 'pension reform',
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'bankrupt', 'insolvency', 'stoxx 600', 'dax', 'cac 40',
      'recession', 'collapse', 'massive', 'euro plunges', 'bond selloff',
    ]),
  },

  // ----------------------------------------------------
  // 4. GULF COOPERATION COUNCIL (GCC)
  // ----------------------------------------------------
  GCC: {
    controversy: new Set([
      'lawsuit', 'investigation', 'sama fine', 'dfsa probe',
      'adgm investigation', 'scandal', 'banned', 'regulatory crackdown',
      'corruption probe', 'bribery case', 'labour rights violation',
      'migrant worker scandal', 'construction safety violation',
      'royal decree controversy', 'court ruling',
    ]),
    walletImpact: new Set([
      'inflation', 'subsidy cut', 'fuel subsidy', 'expat fee', 'vat',
      'corporate tax', 'oil revenue', 'sovereign wealth fund',
      'vision 2030', 'riyal', 'dirham', 'remittance fee', 'labour reform',
      'housing subsidy', 'electricity subsidy', 'cost of living',
      'wage freeze', 'pension reform',
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'oil price crash', 'opec cut', 'tadawul', 'dfm', 'adx',
      'devaluation fears', 'real estate bubble', 'massive', 'collapse',
      'unprecedented',
    ]),
  },

  // ----------------------------------------------------
  // 5. AUSTRALIA (AUS)
  // ----------------------------------------------------
  AUS: {
    controversy: new Set([
      'lawsuit', 'investigation', 'asic', 'accc probe', 'austrac fine',
      'royal commission', 'scandal', 'banned', 'corruption watchdog',
      'nacc investigation', 'regulatory crackdown', 'insider trading',
      'class action', 'data breach fine',
    ]),
    walletImpact: new Set([
      'inflation', 'rba rate', 'interest rates', 'cash rate',
      'superannuation', 'negative gearing', 'gst', 'tax cuts',
      'medicare levy', 'centrelink', 'jobseeker', 'mortgage stress',
      'energy bill', 'cost of living', 'rent crisis', 'wage growth',
      'aussie dollar',
    ]),
    shockValue: new Set([
      'billion', 'trillion', 'record high', 'market crash', 'plunged',
      'surged', 'asx 200', 'iron ore price', 'housing market crash',
      'recession fears', 'massive', 'collapse', 'unprecedented',
      'mining stocks tumble',
    ]),
  },
};
