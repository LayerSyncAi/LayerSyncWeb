/**
 * Copy for the Sync Estate page, taken from the SyncEstate product site
 * (LayerSyncAi/syncrm: src/components/landing/content.ts). Keep the two in
 * step: every product claim there is backed by built code, so don't add
 * claims here that aren't on that site.
 *
 * A headline is [plain, accent, after?]: the accent part takes the lime colour.
 */
export type Headline = readonly [string, string, string?];

export const hero = {
    eyebrow: 'SyncEstate · Built in Zimbabwe by LayerSync',
    lines: ['Run your agency', 'from your pocket.'] as const,
    sub: 'Leads, lettings, valuations, trust accounts and developments on one login. SyncEstate puts your whole operation on the phone in your hand, and the desk in your office.',
    micro: 'Works on any phone today · Native iOS & Android apps coming soon',
};

export const tour = {
    eyebrow: 'Watch the tour',
    headline: ['See your whole agency ', 'in two minutes.'] as Headline,
    sub: 'Every module, one login, and how we get your team running on it.',
    src: '/vsl/sync-estate-vsl.mp4',
    poster: '/vsl/sync-estate-vsl-poster.jpg',
};

export const problem = {
    eyebrow: 'The old way',
    headline: ['Five tabs open. ', 'Zero control.'] as Headline,
    body: "WhatsApp for leads. Excel for rent. Gmail for mandates. A notebook for viewings. A calculator for commission. Every tab is a place where a deal slips, a payment hides or a dispute starts.",
    captions: [
        'Lead lost in a WhatsApp thread',
        'Rent roll in Excel_v7_FINAL.xlsx',
        'Signed mandate buried in Gmail',
        'Viewing notes in a notebook',
        'Commission split on a calculator',
    ],
    turn: ["It's not your team. ", "It's the tools."] as Headline,
    turnBody: 'Information scattered across five apps can’t be found, checked or trusted. SyncEstate puts every lead, lease, repair, valuation, payment and stand in one place, on every phone in your agency.',
};

export const hub = {
    eyebrow: 'The Hub',
    headline: ['One login. ', 'Every module you need.', ' Nothing you don’t.'] as Headline,
    tiles: [
        {
            title: 'Everything that needs you, in one list',
            body: 'The Hub pulls what needs attention from every module you use: unworked leads, new repair requests, overdue rent, valuations due, payouts waiting for approval.',
        },
        {
            title: 'Switch on only what you use',
            body: 'Every module is sold and switched on separately, and each one works on its own. Start with SynCRM. Add SyncStay when you’re ready.',
        },
        {
            title: 'The right screen for every role',
            body: 'Directors, sales managers, property managers, accounts, marketing and valuers each see what their job needs, and nothing they shouldn’t.',
        },
        {
            title: 'Alerts that find you',
            body: 'Push notifications, a daily 8am agenda and email alerts for every module, so nothing waits for someone to remember.',
        },
    ],
};

export type Module = {
    name: string;
    eyebrow: string;
    headline: Headline;
    body: string;
    proof: readonly string[];
};

export const modules = {
    eyebrow: 'Every module',
    headline: ['Your whole agency, ', 'one tap away.'] as Headline,
    sub: 'Seven modules, one login. Start with what hurts most.',
    items: [
        {
            name: 'SynCRM',
            eyebrow: 'Leads, listings and deals',
            headline: ['No lead goes ', 'cold again.'],
            body: 'Every enquiry from PropertyBook, Facebook, WhatsApp or a walk-in lands in one pipeline, scored from Cold to On Fire. Your agents always know who to call next.',
            proof: [
                'Lead scoring and a “top unworked leads” list',
                'Duplicates caught by phone or email, merged with an audit trail',
                'Reminders an hour before, when overdue, and a daily 8am agenda',
            ],
        },
        {
            name: 'Viewings',
            eyebrow: 'Part of SynCRM',
            headline: ['Prove the introduction. ', 'Protect the commission.'],
            body: 'Capture the client’s details and signature on the phone, at the viewing. The form locks when it’s done and prints on your letterhead, so “who found this buyer?” is settled before it starts.',
            proof: ['Signatures drawn on screen', 'Locked once completed', 'PDF on your agency letterhead'],
        },
        {
            name: 'SyncStay',
            eyebrow: 'Property management, digitised',
            headline: ['Every property, every repair, ', 'every inspection.'],
            body: 'Each property, unit and lease lives in one digital file. Tenants log repair requests with photos from their portal, your team tracks them to done, and inspections happen room by room on the phone. Rent and arrears look after themselves.',
            proof: [
                'Maintenance requests with photos, an assignee, costs and landlord approval for big repairs',
                'Room-by-room inspections with conditions, photos and meter readings, emailed to the landlord',
                'Rent charged automatically, arrears aged by days overdue, landlord statements built for you',
            ],
        },
        {
            name: 'SyncWorth',
            eyebrow: 'Valuations to signed report',
            headline: ['Valuations out the door ', 'on time, signed and locked.'],
            body: 'From instruction to inspection to signed report, every job has an owner and a due date. Comparables live in your firm’s own database, not in one valuer’s head.',
            proof: ['Inspect on the phone, photos included', 'Signing-valuer review with versioned corrections', 'Optional hold-until-paid on reports'],
        },
        {
            name: 'SyncFinance',
            eyebrow: 'Trust money, payouts and statements',
            headline: ['Trust money ', 'your auditor will thank you for.'],
            body: 'A proper double-entry ledger under a simple screen. Payouts need two people to approve, closed months stay closed, and USD and ZiG never mix.',
            proof: ['Receipts, cash-up and landlord payouts', 'Mistakes reversed, never deleted', 'Trust report, cash book and debtors, ready for audit'],
        },
        {
            name: 'SyncDev',
            eyebrow: 'Developments, stands and sales',
            headline: ['Never ', 'double-sell a stand', ' again.'],
            body: 'Load a development’s stands in one line, reserve on the spot from the field, and let reservations lapse on their own. Buyers get statements showing what’s paid, what’s owed and what’s next.',
            proof: ['Bulk stand entry: “1–40, A1–A12”', 'Instalment plans with reminders', 'Buyer statements emailed as PDFs'],
        },
        {
            name: 'SyncMedia',
            eyebrow: 'Posts and flyers from listings',
            headline: ['From listing to ', 'Instagram Story in a few taps.'],
            body: 'Pick a listing and a template, and SyncMedia builds on-brand posts, stories and A4 flyers in your agency’s colours. No Canva, no waiting for a designer.',
            proof: ['Feed, square, story, link banner and A4 flyer', 'Six templates, five themes', 'Your agency’s own brand kit'],
        },
    ] satisfies Module[],
};

export const beyond = {
    eyebrow: 'Beyond the modules',
    headline: ['SyncEstate meets you ', 'where the work happens.'] as Headline,
    cards: [
        {
            title: ['Your CRM, ', 'inside WhatsApp'] as Headline,
            body: 'Open a chat and see who that number is in SynCRM. Create the lead, save the conversation to their timeline and set the follow-up, without leaving WhatsApp Web.',
        },
        {
            title: ['Ask ', '“Who should I call today?”'] as Headline,
            body: 'The SynCRM Copilot answers questions about your pipeline, finds leads and properties, moves stages and creates tasks, in plain English, on web and phone.',
        },
        {
            title: ['Landlords stop calling. ', 'Tenants stop chasing.'] as Headline,
            body: 'Invite-only portals show tenants their balance, receipts and repair requests, and show landlords rent collected, arrears and statements. Each sees only what’s theirs.',
        },
        {
            title: ['Reach every tenant in arrears ', 'in one send'] as Headline,
            body: 'Send SMS and email to segments (tenants in arrears, instalment clients, unpaid invoices) with personalised placeholders and a delivery log.',
        },
        {
            title: ['Commission splits, ', 'settled before the argument'] as Headline,
            body: 'Set your agency’s split rules once. When a deal is won, the commission record is created automatically and moves from pending to approved to paid.',
        },
    ],
};

export const who = {
    eyebrow: 'Who it’s for',
    headline: ['Built for every corner of ', 'Zimbabwean property.'] as Headline,
    cards: [
        {
            title: 'Sales agencies',
            body: 'From first enquiry to signed viewing form to paid commission.',
            chips: ['SynCRM', 'SyncMedia'],
            image: '/sync-estate/who-sales.jpg',
            alt: 'An estate agent holds out her phone while a smiling young couple sign on it in a sunlit living room',
        },
        {
            title: 'Property managers',
            body: 'Repairs logged and tracked, inspections done on the phone, rent and arrears under control.',
            chips: ['SyncStay', 'SyncFinance'],
            image: '/sync-estate/who-property-managers.jpg',
            alt: 'A property manager photographs a leaking pipe under a kitchen sink while the tenant looks on',
        },
        {
            title: 'Valuation firms',
            body: 'Every job on time, every report signed and locked.',
            chips: ['SyncWorth'],
            image: '/sync-estate/who-valuers.jpg',
            alt: 'A valuer photographs a house with her phone under a jacaranda in bloom at golden hour',
        },
        {
            title: 'Developers',
            body: 'Every stand, reservation and instalment, in real time.',
            chips: ['SyncDev', 'SyncFinance'],
            image: '/sync-estate/who-developers.jpg',
            alt: 'A developer in a hard hat smiles at his phone on a serviced stands site at dusk',
        },
    ],
};

export const zimbabwe = {
    headline: ['Built in Zimbabwe, ', 'for how Zimbabwe does property.'] as Headline,
    body: 'SyncEstate isn’t a foreign CRM bent to fit. It was designed here, around the way local agencies actually work.',
    chips: [
        'USD, ZiG and ZWL, never mixed',
        '+263 numbers ready to call and SMS',
        'PropertyBook and Property.co.zw lead sources',
        'Stands, reservations and instalment plans',
        'WhatsApp-first workflows',
        'Branded PDFs on your letterhead',
    ],
};

export const how = {
    eyebrow: 'How it works',
    headline: ['We don’t just sell software. ', 'We transform agencies.'] as Headline,
    body: 'SyncEstate is built by LayerSync, end-to-end digital transformation specialists. We set it up with you, bring your data across and get your team working in it.',
    steps: [
        { title: 'Chat to us.', body: 'Tell us how your agency works, on WhatsApp.' },
        { title: 'Pick your modules.', body: 'Start with what hurts most. Add the rest later.' },
        { title: 'Bring your data.', body: 'Leads by CSV, your rental portfolio from Excel, opening balances into Finance.' },
        { title: 'Go live.', body: 'On every desk and every phone in your agency.' },
    ],
};

export const faq = {
    headline: ['Questions, ', 'answered.'] as Headline,
    items: [
        { q: 'Do I have to buy every module?', a: 'No. Each module is switched on separately and works on its own. Most agencies start with SynCRM and add more as they grow.' },
        { q: 'Does it work on my phone?', a: 'Yes. SyncEstate runs in any modern phone browser and can be installed to your home screen. Native iOS and Android apps are coming soon.' },
        { q: 'Can I bring my existing data?', a: 'Yes. Import leads from CSV, your rental portfolio from Excel, and opening balances into SyncFinance.' },
        { q: 'Does it handle USD and ZiG?', a: 'Yes. Every amount carries its currency, and SyncFinance never mixes or converts them.' },
        { q: 'Can my landlords and tenants log in?', a: 'Yes, through invite-only portals. Tenants see their own lease, payments and repair requests; landlords see their own properties and statements.' },
        { q: 'Who can see our data?', a: 'Only your agency. Inside it, roles decide who sees what. For example, accounts staff never see valuation figures in SyncWorth.' },
        { q: 'What does it cost?', a: 'It depends on the modules you choose and the size of your team. Get in touch and we’ll put together a quote for your agency.' },
    ],
};

export const finalCta = {
    headline: ['Your competitors are still in five tabs. ', 'You don’t have to be.'] as Headline,
    body: 'Get your agency running on SyncEstate. One chat is all it takes to start.',
};
