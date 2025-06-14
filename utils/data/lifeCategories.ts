// Mapping of common life situations to relevant Bible books
export const LIFE_CATEGORIES: Record<string, number[]> = {
  // Love & Relationships
  "Love & Relationships": [
    22, // Song of Solomon - Romantic love
    8, // Ruth - Loyalty and love
    28, // Hosea - Faithful love
    62, // 1 John - God's love
    46, // 1 Corinthians - Love chapter (13)
    57, // Philemon - Forgiveness in relationships
  ],

  // Work & Purpose
  "Work & Purpose": [
    21, // Ecclesiastes - Finding meaning
    20, // Proverbs - Wisdom for work
    59, // James - Faith in action
    50, // Philippians - Contentment in work
    16, // Nehemiah - Leadership and work
    18, // Job - Integrity in work
  ],

  // Growth & Wisdom
  "Growth & Wisdom": [
    20, // Proverbs - Practical wisdom
    21, // Ecclesiastes - Life wisdom
    59, // James - Practical faith
    61, // 2 Peter - Spiritual growth
    45, // Romans - Deep theological understanding
    51, // Colossians - Spiritual maturity
  ],

  // Struggle & Suffering
  "Struggle & Suffering": [
    18, // Job - Dealing with suffering
    25, // Lamentations - Grief and loss
    60, // 1 Peter - Suffering for Christ
    35, // Habakkuk - Wrestling with God
    58, // Hebrews - Perseverance
    65, // Jude - Contending for faith
  ],

  // Leadership & Influence
  "Leadership & Influence": [
    9, // 1 Samuel - Leadership lessons
    10, // 2 Samuel - Leadership challenges
    16, // Nehemiah - Leading change
    54, // 1 Timothy - Church leadership
    55, // 2 Timothy - Leadership legacy
    56, // Titus - Leading with integrity
  ],

  // Faith & Trust
  "Faith & Trust": [
    27, // Daniel - Faith under pressure
    58, // Hebrews - Faith foundation
    45, // Romans - Faith and grace
    48, // Galatians - Freedom in faith
    35, // Habakkuk - Trusting God
    43, // John - Eternal life through faith
  ],

  // Hope & Encouragement
  "Hope & Encouragement": [
    23, // Isaiah - Messianic hope
    52, // 1 Thessalonians - Hope in Christ
    53, // 2 Thessalonians - Future hope
    60, // 1 Peter - Living hope
    66, // Revelation - Ultimate hope
    19, // Psalms - Encouragement in worship
  ],

  // Family & Parenting
  "Family & Parenting": [
    20, // Proverbs - Parenting wisdom
    1, // Genesis - Family foundations
    5, // Deuteronomy - Family instructions
    46, // 1 Corinthians - Family relationships
    49, // Ephesians - Family roles
    54, // 1 Timothy - Family leadership
  ],

  // Prayer & Worship
  "Prayer & Worship": [
    19, // Psalms - Prayer and worship
    3, // Leviticus - Worship guidelines
    37, // Haggai - Worship priorities
    13, // 1 Chronicles - Worship history
    14, // 2 Chronicles - Worship restoration
    62, // 1 John - Worship in truth
  ],

  // Justice & Righteousness
  "Justice & Righteousness": [
    30, // Amos - Social justice
    33, // Micah - Justice and mercy
    24, // Jeremiah - Righteous living
    26, // Ezekiel - God's justice
    31, // Obadiah - Judgment
    34, // Nahum - Divine justice
  ],

  // Forgiveness & Reconciliation
  "Forgiveness & Reconciliation": [
    57, // Philemon - Personal forgiveness
    47, // 2 Corinthians - Ministry of reconciliation
    43, // John - God's forgiveness
    45, // Romans - Justification
    48, // Galatians - Freedom from sin
    62, // 1 John - Confession and forgiveness
  ],

  // Courage & Strength
  "Courage & Strength": [
    27, // Daniel - Courage under pressure
    17, // Esther - Courage to act
    6, // Joshua - Courage to lead
    7, // Judges - Courage in battle
    55, // 2 Timothy - Courage in ministry
    58, // Hebrews - Strength in faith
  ],

  // Money & Finances
  "Money & Finances": [
    20, // Proverbs - Financial wisdom
    21, // Ecclesiastes - Wealth and meaning
    42, // Luke - Money and generosity
    54, // 1 Timothy - Love of money
    59, // James - Rich and poor
    47, // 2 Corinthians - Generous giving
  ],

  // Anxiety & Fear
  "Anxiety & Fear": [
    19, // Psalms - Comfort and peace
    50, // Philippians - Peace of God
    60, // 1 Peter - Casting anxiety
    40, // Matthew - Do not worry
    23, // Isaiah - Fear not
    6, // Joshua - Be strong and courageous
  ],

  // Healing & Health
  "Healing & Health": [
    59, // James - Prayer for healing
    19, // Psalms - Healing prayers
    40, // Matthew - Jesus' healing ministry
    41, // Mark - Healing miracles
    42, // Luke - Great physician
    43, // John - Spiritual healing
  ],

  // Decision Making
  "Decision Making": [
    20, // Proverbs - Wisdom for choices
    59, // James - Asking for wisdom
    19, // Psalms - Seeking guidance
    45, // Romans - God's will
    49, // Ephesians - Walking wisely
    51, // Colossians - Spiritual discernment
  ],

  // Temptation & Sin
  "Temptation & Sin": [
    45, // Romans - Sin and grace
    46, // 1 Corinthians - Fleeing temptation
    48, // Galatians - Freedom from sin
    58, // Hebrews - Jesus' temptation
    62, // 1 John - Overcoming sin
    65, // Jude - Kept from falling
  ],

  // Peace & Rest
  "Peace & Rest": [
    19, // Psalms - Rest in God
    40, // Matthew - Come unto me
    50, // Philippians - Peace of God
    43, // John - Peace I give you
    58, // Hebrews - Sabbath rest
    23, // Isaiah - Perfect peace
  ],

  // Loneliness & Community
  "Loneliness & Community": [
    44, // Acts - Christian community
    46, // 1 Corinthians - Body of Christ
    49, // Ephesians - Unity in Christ
    58, // Hebrews - Not forsaking assembly
    62, // 1 John - Fellowship
    19, // Psalms - God's presence
  ],

  // Anger & Conflict
  "Anger & Conflict": [
    20, // Proverbs - Controlling anger
    40, // Matthew - Conflict resolution
    45, // Romans - Living in harmony
    49, // Ephesians - Put away anger
    59, // James - Slow to anger
    46, // 1 Corinthians - Love and patience
  ],

  // Gratitude & Contentment
  "Gratitude & Contentment": [
    50, // Philippians - Contentment
    52, // 1 Thessalonians - Give thanks
    19, // Psalms - Thanksgiving
    54, // 1 Timothy - Godliness with contentment
    58, // Hebrews - Be content
    21, // Ecclesiastes - Enjoying life's gifts
  ],

  // Spiritual Warfare
  "Spiritual Warfare": [
    49, // Ephesians - Armor of God
    61, // 2 Peter - False teachers
    65, // Jude - Contending for faith
    66, // Revelation - Spiritual battle
    27, // Daniel - Spiritual warfare
    44, // Acts - Power over evil
  ],

  // Doubt & Questions
  "Doubt & Questions": [
    35, // Habakkuk - Questioning God
    18, // Job - Wrestling with faith
    19, // Psalms - Honest prayers
    43, // John - Doubting Thomas
    65, // Jude - Mercy on doubters
    41, // Mark - Help my unbelief
  ],

  // Success & Achievement
  "Success & Achievement": [
    6, // Joshua - Success in leadership
    16, // Nehemiah - Successful projects
    27, // Daniel - Excellence in work
    1, // Genesis - God's blessing
    20, // Proverbs - Diligence and success
    50, // Philippians - Pressing toward goal
  ],

  // Grief & Loss
  "Grief & Loss": [
    25, // Lamentations - Deep grief
    18, // Job - Loss and mourning
    19, // Psalms - Comfort in sorrow
    43, // John - Jesus wept
    52, // 1 Thessalonians - Grief with hope
    66, // Revelation - No more tears
  ],

  // Identity & Self-Worth
  "Identity & Self-Worth": [
    1, // Genesis - Made in God's image
    19, // Psalms - Fearfully and wonderfully made
    49, // Ephesians - Identity in Christ
    45, // Romans - Who we are in Christ
    62, // 1 John - Children of God
    48, // Galatians - Sons and daughters
  ],

  // Addiction & Freedom
  "Addiction & Freedom": [
    45, // Romans - Freedom from bondage
    48, // Galatians - Freedom in Christ
    43, // John - Truth sets free
    46, // 1 Corinthians - Body as temple
    61, // 2 Peter - Slaves to corruption
    58, // Hebrews - Help in temptation
  ],
};
