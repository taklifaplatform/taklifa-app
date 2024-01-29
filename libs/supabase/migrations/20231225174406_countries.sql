-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by zixdev at 27-12-2023 23:02.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.
-- BEGIN TABLE public.countries
-- Inserting 239 rows into public.countries
-- Insert batch #1
create table
  public.countries (
    id bigint not null,
    name json not null,
    code character varying(5) not null,
    wikidata_id character varying(255) null,
    languages json null,
    flag character varying(255) null,
    created_at timestamp without time zone null,
    updated_at timestamp without time zone null,
    order bigint not null default '100'::bigint,
    constraint countries_pkey primary key (id)
  ) tablespace pg_default;

INSERT INTO
  public.countries (
    id,
    name,
    code,
    wikidata_id,
    languages,
    flag,
    created_at,
    updated_at
  )
VALUES
  (
    1,
    '{"ar": "أروبا", "en": "Aruba", "fr": "Aruba"}',
    'ABW',
    'Q21203',
    '{"nld": "Dutch", "pap": "Papiamento"}',
    '🇦🇼',
    '2023-06-23 15:30:59',
    '2023-06-23 15:30:59'
  ),
  (
    2,
    '{"ar": "أفغانستان", "en": "Afghanistan", "fr": "Afghanistan"}',
    'AFG',
    'Q889',
    '{"prs": "Dari", "pus": "Pashto", "tuk": "Turkmen"}',
    '🇦🇫',
    '2023-06-23 15:30:59',
    '2023-06-23 15:30:59'
  ),
  (
    3,
    '{"ar": "أنغولا", "en": "Angola", "fr": "Angola"}',
    'AGO',
    'Q916',
    '{"por": "Portuguese"}',
    '🇦🇴',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    4,
    '{"ar": "أنغويلا", "en": "Anguilla", "fr": "Anguilla"}',
    'AIA',
    'Q25228',
    '{"eng": "English"}',
    '🇦🇮',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    5,
    '{"ar": "جزر أولاند", "en": "Åland", "fr": "Åland"}',
    'ALA',
    'Q5689',
    '{"swe": "Swedish"}',
    '🇦🇽',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    6,
    '{"ar": "ألبانيا", "en": "Albania", "fr": "Albanie"}',
    'ALB',
    'Q222',
    '{"sqi": "Albanian"}',
    '🇦🇱',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    7,
    '{"ar": "أندورا", "en": "Andorra", "fr": "Andorre"}',
    'AND',
    'Q228',
    '{"cat": "Catalan"}',
    '🇦🇩',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    8,
    '{"ar": "الإمارات العربية المتحدة", "en": "United Arab Emirates", "fr": "Émirats arabes unis"}',
    'ARE',
    'Q878',
    '{"ara": "Arabic"}',
    '🇦🇪',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    9,
    '{"ar": "الأرجنتين", "en": "Argentina", "fr": "Argentine"}',
    'ARG',
    'Q414',
    '{"grn": "Guaraní", "spa": "Spanish"}',
    '🇦🇷',
    '2023-06-23 15:31:00',
    '2023-06-23 15:31:00'
  ),
  (
    10,
    '{"ar": "أرمينيا", "en": "Armenia", "fr": "Arménie"}',
    'ARM',
    'Q399',
    '{"hye": "Armenian", "rus": "Russian"}',
    '🇦🇲',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    11,
    '{"ar": "ساموا الأمريكية", "en": "American Samoa", "fr": "Samoa américaines"}',
    'ASM',
    'Q16641',
    '{"eng": "English", "smo": "Samoan"}',
    '🇦🇸',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    12,
    '{"ar": "القارة القطبية الجنوبية", "en": "Antarctica", "fr": "Antarctique"}',
    'ATA',
    'Q51',
    '[]',
    '🇦🇶',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    13,
    '{"ar": "أراض فرنسية جنوبية وأنتارتيكية", "en": "French Southern and Antarctic Lands", "fr": "Terres australes et antarctiques françaises"}',
    'ATF',
    'Q129003',
    '{"fra": "French"}',
    '🇹🇫',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    14,
    '{"ar": "أنتيغوا وباربودا", "en": "Antigua and Barbuda", "fr": "Antigua-et-Barbuda"}',
    'ATG',
    'Q781',
    '{"eng": "English"}',
    '🇦🇬',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    15,
    '{"ar": "أستراليا", "en": "Australia", "fr": "Australie"}',
    'AUS',
    'Q408',
    '{"eng": "English"}',
    '🇦🇺',
    '2023-06-23 15:31:01',
    '2023-06-23 15:31:01'
  ),
  (
    16,
    '{"ar": "النمسا", "en": "Austria", "fr": "Autriche"}',
    'AUT',
    'Q40',
    '{"bar": "Austro-Bavarian German"}',
    '🇦🇹',
    '2023-06-23 15:31:02',
    '2023-06-23 15:31:02'
  ),
  (
    17,
    '{"ar": "أذربيجان", "en": "Azerbaijan", "fr": "Azerbaïdjan"}',
    'AZE',
    'Q227',
    '{"aze": "Azerbaijani", "rus": "Russian"}',
    '🇦🇿',
    '2023-06-23 15:31:02',
    '2023-06-23 15:31:02'
  ),
  (
    18,
    '{"ar": "بوروندي", "en": "Burundi", "fr": "Burundi"}',
    'BDI',
    'Q967',
    '{"fra": "French", "run": "Kirundi"}',
    '🇧🇮',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    19,
    '{"ar": "بلجيكا", "en": "Belgium", "fr": "Belgique"}',
    'BEL',
    'Q31',
    '{"deu": "German", "fra": "French", "nld": "Dutch"}',
    '🇧🇪',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    20,
    '{"ar": "بنين", "en": "Benin", "fr": "Bénin"}',
    'BEN',
    'Q962',
    '{"fra": "French"}',
    '🇧🇯',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    21,
    '{"ar": "بوركينا فاسو", "en": "Burkina Faso", "fr": "Burkina Faso"}',
    'BFA',
    'Q965',
    '{"fra": "French"}',
    '🇧🇫',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    22,
    '{"ar": "بنغلاديش", "en": "Bangladesh", "fr": "Bangladesh"}',
    'BGD',
    'Q902',
    '{"ben": "Bengali"}',
    '🇧🇩',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    23,
    '{"ar": "بلغاريا", "en": "Bulgaria", "fr": "Bulgarie"}',
    'BGR',
    'Q219',
    '{"bul": "Bulgarian"}',
    '🇧🇬',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    24,
    '{"ar": "البحرين", "en": "Bahrain", "fr": "Bahreïn"}',
    'BHR',
    'Q398',
    '{"ara": "Arabic"}',
    '🇧🇭',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    25,
    '{"ar": "باهاماس", "en": "The Bahamas", "fr": "Bahamas"}',
    'BHS',
    'Q778',
    '{"eng": "English"}',
    '🇧🇸',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    26,
    '{"ar": "البوسنة والهرسك", "en": "Bosnia and Herzegovina", "fr": "Bosnie-Herzégovine"}',
    'BIH',
    'Q225',
    '{"bos": "Bosnian", "hrv": "Croatian", "srp": "Serbian"}',
    '🇧🇦',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    27,
    '{"ar": "سان بارتيلمي", "en": "Saint Barthélemy", "fr": "Saint-Barthélemy"}',
    'BLM',
    'Q25362',
    '{"fra": "French"}',
    '🇧🇱',
    '2023-06-23 15:31:03',
    '2023-06-23 15:31:03'
  ),
  (
    28,
    '{"ar": "سانت هيلانة وأسينشين وتريستان دا كونا", "en": "Saint Helena, Ascension and Tristan da Cunha", "fr": "Sainte-Hélène, Ascension et Tristan da Cunha"}',
    'SHN',
    'Q192184',
    '{"eng": "English"}',
    '🇸🇭',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    29,
    '{"ar": "بيلاروسيا", "en": "Belarus", "fr": "Biélorussie"}',
    'BLR',
    'Q184',
    '{"bel": "Belarusian", "rus": "Russian"}',
    '🇧🇾',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    30,
    '{"ar": "بليز", "en": "Belize", "fr": "Belize"}',
    'BLZ',
    'Q242',
    '{"bjz": "Belizean Creole", "eng": "English", "spa": "Spanish"}',
    '🇧🇿',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    31,
    '{"ar": "برمودا", "en": "Bermuda", "fr": "Bermudes"}',
    'BMU',
    'Q23635',
    '{"eng": "English"}',
    '🇧🇲',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    32,
    '{"ar": "بوليفيا", "en": "Bolivia", "fr": "Bolivie"}',
    'BOL',
    'Q750',
    '{"aym": "Aymara", "grn": "Guaraní", "que": "Quechua", "spa": "Spanish"}',
    '🇧🇴',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    33,
    '{"ar": "البرازيل", "en": "Brazil", "fr": "Brésil"}',
    'BRA',
    'Q155',
    '{"por": "Portuguese"}',
    '🇧🇷',
    '2023-06-23 15:31:04',
    '2023-06-23 15:31:04'
  ),
  (
    34,
    '{"ar": "باربادوس", "en": "Barbados", "fr": "Barbade"}',
    'BRB',
    'Q244',
    '{"eng": "English"}',
    '🇧🇧',
    '2023-06-23 15:31:06',
    '2023-06-23 15:31:06'
  ),
  (
    35,
    '{"ar": "بروناي", "en": "Brunei", "fr": "Brunei"}',
    'BRN',
    'Q921',
    '{"msa": "Malay"}',
    '🇧🇳',
    '2023-06-23 15:31:06',
    '2023-06-23 15:31:06'
  ),
  (
    36,
    '{"ar": "بوتان", "en": "Bhutan", "fr": "Bhoutan"}',
    'BTN',
    'Q917',
    '{"dzo": "Dzongkha"}',
    '🇧🇹',
    '2023-06-23 15:31:06',
    '2023-06-23 15:31:06'
  ),
  (
    37,
    '{"ar": "بوتسوانا", "en": "Botswana", "fr": "Botswana"}',
    'BWA',
    'Q963',
    '{"eng": "English", "tsn": "Tswana"}',
    '🇧🇼',
    '2023-06-23 15:31:06',
    '2023-06-23 15:31:06'
  ),
  (
    38,
    '{"ar": "جمهورية أفريقيا الوسطى", "en": "Central African Republic", "fr": "République centrafricaine"}',
    'CAF',
    'Q929',
    '{"fra": "French", "sag": "Sango"}',
    '🇨🇫',
    '2023-06-23 15:31:06',
    '2023-06-23 15:31:06'
  ),
  (
    39,
    '{"ar": "كندا", "en": "Canada", "fr": "Canada"}',
    'CAN',
    'Q16',
    '{"eng": "English", "fra": "French"}',
    '🇨🇦',
    '2023-06-23 15:31:07',
    '2023-06-23 15:31:07'
  ),
  (
    40,
    '{"ar": "سويسرا", "en": "Switzerland", "fr": "Suisse"}',
    'CHE',
    'Q39',
    '{"fra": "French", "gsw": "Swiss German", "ita": "Italian", "roh": "Romansh"}',
    '🇨🇭',
    '2023-06-23 15:31:08',
    '2023-06-23 15:31:08'
  ),
  (
    41,
    '{"ar": "تشيلي", "en": "Chile", "fr": "Chili"}',
    'CHL',
    'Q298',
    '{"spa": "Spanish"}',
    '🇨🇱',
    '2023-06-23 15:31:08',
    '2023-06-23 15:31:08'
  ),
  (
    42,
    '{"ar": "الصين", "en": "People''s Republic of China", "fr": "République populaire de Chine"}',
    'CHN',
    'Q148',
    '{"cmn": "Mandarin"}',
    '🇨🇳',
    '2023-06-23 15:31:08',
    '2023-06-23 15:31:08'
  ),
  (
    43,
    '{"ar": "ساحل العاج", "en": "Ivory Coast", "fr": "Côte d''Ivoire"}',
    'CIV',
    'Q1008',
    '{"fra": "French"}',
    '🇨🇮',
    '2023-06-23 15:31:11',
    '2023-06-23 15:31:11'
  ),
  (
    44,
    '{"ar": "الكاميرون", "en": "Cameroon", "fr": "Cameroun"}',
    'CMR',
    'Q1009',
    '{"eng": "English", "fra": "French"}',
    '🇨🇲',
    '2023-06-23 15:31:11',
    '2023-06-23 15:31:11'
  ),
  (
    45,
    '{"ar": "جمهورية الكونغو الديمقراطية", "en": "Democratic Republic of the Congo", "fr": "République démocratique du Congo"}',
    'COD',
    'Q974',
    '{"fra": "French", "kon": "Kikongo", "lin": "Lingala", "lua": "Tshiluba", "swa": "Swahili"}',
    '🇨🇩',
    '2023-06-23 15:31:11',
    '2023-06-23 15:31:11'
  ),
  (
    46,
    '{"ar": "جمهورية الكونغو", "en": "Republic of the Congo", "fr": "République du Congo"}',
    'COG',
    'Q971',
    '{"fra": "French", "kon": "Kikongo", "lin": "Lingala"}',
    '🇨🇬',
    '2023-06-23 15:31:11',
    '2023-06-23 15:31:11'
  ),
  (
    47,
    '{"ar": "جزر كوك", "en": "Cook Islands", "fr": "Îles Cook"}',
    'COK',
    'Q26988',
    '{"eng": "English", "rar": "Cook Islands Māori"}',
    '🇨🇰',
    '2023-06-23 15:31:11',
    '2023-06-23 15:31:11'
  ),
  (
    48,
    '{"ar": "كولومبيا", "en": "Colombia", "fr": "Colombie"}',
    'COL',
    'Q739',
    '{"spa": "Spanish"}',
    '🇨🇴',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    49,
    '{"ar": "جزر القمر", "en": "Comoros", "fr": "Comores"}',
    'COM',
    'Q970',
    '{"ara": "Arabic", "fra": "French", "zdj": "Comorian"}',
    '🇰🇲',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    50,
    '{"ar": "الرأس الأخضر", "en": "Cape Verde", "fr": "Cap-Vert"}',
    'CPV',
    'Q1011',
    '{"por": "Portuguese"}',
    '🇨🇻',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    51,
    '{"ar": "كوستاريكا", "en": "Costa Rica", "fr": "Costa Rica"}',
    'CRI',
    'Q800',
    '{"spa": "Spanish"}',
    '🇨🇷',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    52,
    '{"ar": "كوبا", "en": "Cuba", "fr": "Cuba"}',
    'CUB',
    'Q241',
    '{"spa": "Spanish"}',
    '🇨🇺',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    53,
    '{"ar": "كوراساو", "en": "Curaçao", "fr": "Curaçao"}',
    'CUW',
    'Q25279',
    '{"eng": "English", "nld": "Dutch", "pap": "Papiamento"}',
    '🇨🇼',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    54,
    '{"ar": "جزر كايمان", "en": "Cayman Islands", "fr": "îles Caïmans"}',
    'CYM',
    'Q5785',
    '{"eng": "English"}',
    '🇰🇾',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    55,
    '{"ar": "قبرص", "en": "Cyprus", "fr": "Chypre"}',
    'CYP',
    'Q229',
    '{"ell": "Greek", "tur": "Turkish"}',
    '🇨🇾',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    56,
    '{"ar": "التشيك", "en": "Czech Republic", "fr": "Tchéquie"}',
    'CZE',
    'Q213',
    '{"ces": "Czech", "slk": "Slovak"}',
    '🇨🇿',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    57,
    '{"ar": "ألمانيا", "en": "Germany", "fr": "Allemagne"}',
    'DEU',
    'Q183',
    '{"deu": "German"}',
    '🇩🇪',
    '2023-06-23 15:31:12',
    '2023-06-23 15:31:12'
  ),
  (
    58,
    '{"ar": "جيبوتي", "en": "Djibouti", "fr": "Djibouti"}',
    'DJI',
    'Q977',
    '{"ara": "Arabic", "fra": "French"}',
    '🇩🇯',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    59,
    '{"ar": "دومينيكا", "en": "Dominica", "fr": "Dominique"}',
    'DMA',
    'Q784',
    '{"eng": "English"}',
    '🇩🇲',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    60,
    '{"ar": "الدنمارك", "en": "Denmark", "fr": "Danemark"}',
    'DNK',
    'Q35',
    '{"dan": "Danish"}',
    '🇩🇰',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    61,
    '{"ar": "جمهورية الدومينيكان", "en": "Dominican Republic", "fr": "République dominicaine"}',
    'DOM',
    'Q786',
    '{"spa": "Spanish"}',
    '🇩🇴',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    62,
    '{"ar": "الجزائر", "en": "Algeria", "fr": "Algérie"}',
    'DZA',
    'Q262',
    '{"ara": "Arabic"}',
    '🇩🇿',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    63,
    '{"ar": "الإكوادور", "en": "Ecuador", "fr": "Équateur"}',
    'ECU',
    'Q736',
    '{"spa": "Spanish"}',
    '🇪🇨',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    64,
    '{"ar": "مصر", "en": "Egypt", "fr": "Égypte"}',
    'EGY',
    'Q79',
    '{"ara": "Arabic"}',
    '🇪🇬',
    '2023-06-23 15:31:13',
    '2023-06-23 15:31:13'
  ),
  (
    65,
    '{"ar": "إريتريا", "en": "Eritrea", "fr": "Érythrée"}',
    'ERI',
    'Q986',
    '{"ara": "Arabic", "eng": "English", "tir": "Tigrinya"}',
    '🇪🇷',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    66,
    '{"ar": "الصحراء الغربية", "en": "Western Sahara", "fr": "Sahara occidental"}',
    'ESH',
    'Q6250',
    '{"ber": "Berber", "mey": "Hassaniya", "spa": "Spanish"}',
    '🇪🇭',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    67,
    '{"ar": "إسبانيا", "en": "Spain", "fr": "Espagne"}',
    'ESP',
    'Q29',
    '{"cat": "Catalan", "eus": "Basque", "glg": "Galician", "oci": "Occitan", "spa": "Spanish"}',
    '🇪🇸',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    68,
    '{"ar": "إستونيا", "en": "Estonia", "fr": "Estonie"}',
    'EST',
    'Q191',
    '{"est": "Estonian"}',
    '🇪🇪',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    69,
    '{"ar": "إثيوبيا", "en": "Ethiopia", "fr": "Éthiopie"}',
    'ETH',
    'Q115',
    '{"amh": "Amharic"}',
    '🇪🇹',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    70,
    '{"ar": "فنلندا", "en": "Finland", "fr": "Finlande"}',
    'FIN',
    'Q33',
    '{"fin": "Finnish", "swe": "Swedish"}',
    '🇫🇮',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    71,
    '{"ar": "فيجي", "en": "Fiji", "fr": "Fidji"}',
    'FJI',
    'Q712',
    '{"eng": "English", "fij": "Fijian", "hif": "Fiji Hindi"}',
    '🇫🇯',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    72,
    '{"ar": "جزر فوكلاند", "en": "Falkland Islands", "fr": "îles Malouines"}',
    'FLK',
    'Q9648',
    '{"eng": "English"}',
    '🇫🇰',
    '2023-06-23 15:31:14',
    '2023-06-23 15:31:14'
  ),
  (
    73,
    '{"ar": "فرنسا", "en": "France", "fr": "France"}',
    'FRA',
    'Q142',
    '{"fra": "French"}',
    '🇫🇷',
    '2023-06-23 15:31:15',
    '2023-06-23 15:31:15'
  ),
  (
    74,
    '{"ar": "جزر فارو", "en": "Faroe Islands", "fr": "îles Féroé"}',
    'FRO',
    'Q4628',
    '{"dan": "Danish", "fao": "Faroese"}',
    '🇫🇴',
    '2023-06-23 15:31:15',
    '2023-06-23 15:31:15'
  ),
  (
    75,
    '{"ar": "ولايات ميكرونيسيا المتحدة", "en": "Federated States of Micronesia", "fr": "États fédérés de Micronésie"}',
    'FSM',
    'Q702',
    '{"eng": "English"}',
    '🇫🇲',
    '2023-06-23 15:31:15',
    '2023-06-23 15:31:15'
  ),
  (
    76,
    '{"ar": "الغابون", "en": "Gabon", "fr": "Gabon"}',
    'GAB',
    'Q1000',
    '{"fra": "French"}',
    '🇬🇦',
    '2023-06-23 15:31:15',
    '2023-06-23 15:31:15'
  ),
  (
    77,
    '{"ar": "المملكة المتحدة", "en": "United Kingdom", "fr": "Royaume-Uni"}',
    'GBR',
    'Q145',
    '{"eng": "English"}',
    '🇬🇧',
    '2023-06-23 15:31:15',
    '2023-06-23 15:31:15'
  ),
  (
    78,
    '{"ar": "جورجيا", "en": "Georgia", "fr": "Géorgie"}',
    'GEO',
    'Q230',
    '{"kat": "Georgian"}',
    '🇬🇪',
    '2023-06-23 15:31:16',
    '2023-06-23 15:31:16'
  ),
  (
    79,
    '{"ar": "غيرنزي", "en": "Guernsey", "fr": "Guernesey"}',
    'GGY',
    'Q25230',
    '{"eng": "English", "fra": "French", "nfr": "Guernésiais"}',
    '🇬🇬',
    '2023-06-23 15:31:16',
    '2023-06-23 15:31:16'
  ),
  (
    80,
    '{"ar": "غانا", "en": "Ghana", "fr": "Ghana"}',
    'GHA',
    'Q117',
    '{"eng": "English"}',
    '🇬🇭',
    '2023-06-23 15:31:16',
    '2023-06-23 15:31:16'
  ),
  (
    81,
    '{"ar": "جبل طارق", "en": "Gibraltar", "fr": "Gibraltar"}',
    'GIB',
    'Q1410',
    '{"eng": "English"}',
    '🇬🇮',
    '2023-06-23 15:31:16',
    '2023-06-23 15:31:16'
  ),
  (
    82,
    '{"ar": "غينيا", "en": "Guinea", "fr": "Guinée"}',
    'GIN',
    'Q1006',
    '{"fra": "French"}',
    '🇬🇳',
    '2023-06-23 15:31:16',
    '2023-06-23 15:31:16'
  ),
  (
    83,
    '{"ar": "غامبيا", "en": "The Gambia", "fr": "Gambie"}',
    'GMB',
    'Q1005',
    '{"eng": "English"}',
    '🇬🇲',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    84,
    '{"ar": "غينيا بيساو", "en": "Guinea-Bissau", "fr": "Guinée-Bissau"}',
    'GNB',
    'Q1007',
    '{"por": "Portuguese"}',
    '🇬🇼',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    85,
    '{"ar": "غينيا الاستوائية", "en": "Equatorial Guinea", "fr": "Guinée équatoriale"}',
    'GNQ',
    'Q983',
    '{"fra": "French", "por": "Portuguese", "spa": "Spanish"}',
    '🇬🇶',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    86,
    '{"ar": "اليونان", "en": "Greece", "fr": "Grèce"}',
    'GRC',
    'Q41',
    '{"ell": "Greek"}',
    '🇬🇷',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    87,
    '{"ar": "غرينادا", "en": "Grenada", "fr": "Grenade"}',
    'GRD',
    'Q769',
    '{"eng": "English"}',
    '🇬🇩',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    88,
    '{"ar": "جرينلاند", "en": "Greenland", "fr": "Groenland"}',
    'GRL',
    'Q223',
    '{"kal": "Greenlandic"}',
    '🇬🇱',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    89,
    '{"ar": "غواتيمالا", "en": "Guatemala", "fr": "Guatemala"}',
    'GTM',
    'Q774',
    '{"spa": "Spanish"}',
    '🇬🇹',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    90,
    '{"ar": "غوام", "en": "Guam", "fr": "Guam"}',
    'GUM',
    'Q16635',
    '{"cha": "Chamorro", "eng": "English", "spa": "Spanish"}',
    '🇬🇺',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    91,
    '{"ar": "غيانا", "en": "Guyana", "fr": "Guyana"}',
    'GUY',
    'Q734',
    '{"eng": "English"}',
    '🇬🇾',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    92,
    '{"ar": "هونغ كونغ", "en": "Hong Kong", "fr": "Hong Kong"}',
    'HKG',
    'Q8646',
    '{"eng": "English", "zho": "Chinese"}',
    '🇭🇰',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    93,
    '{"ar": "جزيرة هيرد وجزر ماكدونالد", "en": "Heard Island and McDonald Islands", "fr": "îles Heard-et-MacDonald"}',
    'HMD',
    'Q131198',
    '{"eng": "English"}',
    '🇭🇲',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    94,
    '{"ar": "هندوراس", "en": "Honduras", "fr": "Honduras"}',
    'HND',
    'Q783',
    '{"spa": "Spanish"}',
    '🇭🇳',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    95,
    '{"ar": "كرواتيا", "en": "Croatia", "fr": "Croatie"}',
    'HRV',
    'Q224',
    '{"hrv": "Croatian"}',
    '🇭🇷',
    '2023-06-23 15:31:17',
    '2023-06-23 15:31:17'
  ),
  (
    96,
    '{"ar": "هايتي", "en": "Haiti", "fr": "Haïti"}',
    'HTI',
    'Q790',
    '{"fra": "French", "hat": "Haitian Creole"}',
    '🇭🇹',
    '2023-06-23 15:31:18',
    '2023-06-23 15:31:18'
  ),
  (
    97,
    '{"ar": "المجر", "en": "Hungary", "fr": "Hongrie"}',
    'HUN',
    'Q28',
    '{"hun": "Hungarian"}',
    '🇭🇺',
    '2023-06-23 15:31:18',
    '2023-06-23 15:31:18'
  ),
  (
    98,
    '{"ar": "إندونيسيا", "en": "Indonesia", "fr": "Indonésie"}',
    'IDN',
    'Q252',
    '{"ind": "Indonesian"}',
    '🇮🇩',
    '2023-06-23 15:31:18',
    '2023-06-23 15:31:18'
  ),
  (
    99,
    '{"ar": "جزيرة مان", "en": "Isle of Man", "fr": "île de Man"}',
    'IMN',
    'Q9676',
    '{"eng": "English", "glv": "Manx"}',
    '🇮🇲',
    '2023-06-23 15:31:18',
    '2023-06-23 15:31:18'
  ),
  (
    100,
    '{"ar": "الهند", "en": "India", "fr": "Inde"}',
    'IND',
    'Q668',
    '{"eng": "English", "hin": "Hindi", "tam": "Tamil"}',
    '🇮🇳',
    '2023-06-23 15:31:18',
    '2023-06-23 15:31:18'
  ),
  (
    101,
    '{"ar": "إقليم المحيط الهندي البريطاني", "en": "British Indian Ocean Territory", "fr": "Territoire britannique de l’océan Indien"}',
    'IOT',
    'Q43448',
    '{"eng": "English"}',
    '🇮🇴',
    '2023-06-23 15:31:19',
    '2023-06-23 15:31:19'
  ),
  (
    102,
    '{"ar": "جمهورية أيرلندا", "en": "Ireland", "fr": "Irlande"}',
    'IRL',
    'Q27',
    '{"eng": "English", "gle": "Irish"}',
    '🇮🇪',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    103,
    '{"ar": "إيران", "en": "Iran", "fr": "Iran"}',
    'IRN',
    'Q794',
    '{"fas": "Persian"}',
    '🇮🇷',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    104,
    '{"ar": "العراق", "en": "Iraq", "fr": "Irak"}',
    'IRQ',
    'Q796',
    '{"ara": "Arabic", "arc": "Aramaic", "ckb": "Sorani"}',
    '🇮🇶',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    105,
    '{"ar": "آيسلندا", "en": "Iceland", "fr": "Islande"}',
    'ISL',
    'Q189',
    '{"isl": "Icelandic"}',
    '🇮🇸',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    106,
    '{"ar": "إسرائيل", "en": "Israel", "fr": "Israël"}',
    'ISR',
    'Q801',
    '{"ara": "Arabic", "heb": "Hebrew"}',
    '🇮🇱',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    107,
    '{"ar": "إيطاليا", "en": "Italy", "fr": "Italie"}',
    'ITA',
    'Q38',
    '{"bar": "Austro-Bavarian German", "ita": "Italian", "srd": "Sardinian"}',
    '🇮🇹',
    '2023-06-23 15:31:20',
    '2023-06-23 15:31:20'
  ),
  (
    108,
    '{"ar": "جامايكا", "en": "Jamaica", "fr": "Jamaïque"}',
    'JAM',
    'Q766',
    '{"eng": "English", "jam": "Jamaican Patois"}',
    '🇯🇲',
    '2023-06-23 15:31:21',
    '2023-06-23 15:31:21'
  ),
  (
    109,
    '{"ar": "جيرزي", "en": "Jersey", "fr": "Jersey"}',
    'JEY',
    'Q785',
    '{"eng": "English", "fra": "French", "nrf": "Jèrriais"}',
    '🇯🇪',
    '2023-06-23 15:31:21',
    '2023-06-23 15:31:21'
  ),
  (
    110,
    '{"ar": "الأردن", "en": "Jordan", "fr": "Jordanie"}',
    'JOR',
    'Q810',
    '{"ara": "Arabic"}',
    '🇯🇴',
    '2023-06-23 15:31:21',
    '2023-06-23 15:31:21'
  ),
  (
    111,
    '{"ar": "اليابان", "en": "Japan", "fr": "Japon"}',
    'JPN',
    'Q17',
    '{"jpn": "Japanese"}',
    '🇯🇵',
    '2023-06-23 15:31:21',
    '2023-06-23 15:31:21'
  ),
  (
    112,
    '{"ar": "كازاخستان", "en": "Kazakhstan", "fr": "Kazakhstan"}',
    'KAZ',
    'Q232',
    '{"kaz": "Kazakh", "rus": "Russian"}',
    '🇰🇿',
    '2023-06-23 15:31:22',
    '2023-06-23 15:31:22'
  ),
  (
    113,
    '{"ar": "كينيا", "en": "Kenya", "fr": "Kenya"}',
    'KEN',
    'Q114',
    '{"eng": "English", "swa": "Swahili"}',
    '🇰🇪',
    '2023-06-23 15:31:22',
    '2023-06-23 15:31:22'
  ),
  (
    114,
    '{"ar": "قيرغيزستان", "en": "Kyrgyzstan", "fr": "Kirghizistan"}',
    'KGZ',
    'Q813',
    '{"kir": "Kyrgyz", "rus": "Russian"}',
    '🇰🇬',
    '2023-06-23 15:31:23',
    '2023-06-23 15:31:23'
  ),
  (
    115,
    '{"ar": "كمبوديا", "en": "Cambodia", "fr": "Cambodge"}',
    'KHM',
    'Q424',
    '{"khm": "Khmer"}',
    '🇰🇭',
    '2023-06-23 15:31:23',
    '2023-06-23 15:31:23'
  ),
  (
    116,
    '{"ar": "كيريباتي", "en": "Kiribati", "fr": "Kiribati"}',
    'KIR',
    'Q710',
    '{"eng": "English", "gil": "Gilbertese"}',
    '🇰🇮',
    '2023-06-23 15:31:23',
    '2023-06-23 15:31:23'
  ),
  (
    117,
    '{"ar": "سانت كيتس ونيفيس", "en": "Saint Kitts and Nevis", "fr": "Saint-Christophe-et-Niévès"}',
    'KNA',
    'Q763',
    '{"eng": "English"}',
    '🇰🇳',
    '2023-06-23 15:31:23',
    '2023-06-23 15:31:23'
  ),
  (
    118,
    '{"ar": "كوريا الجنوبية", "en": "South Korea", "fr": "Corée du Sud"}',
    'KOR',
    'Q884',
    '{"kor": "Korean"}',
    '🇰🇷',
    '2023-06-23 15:31:23',
    '2023-06-23 15:31:23'
  ),
  (
    119,
    '{"ar": "كوسوفو", "en": "Kosovo", "fr": "Kosovo"}',
    'KSV',
    'Q1246',
    '{"sqi": "Albanian", "srp": "Serbian"}',
    '🇽🇰',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    120,
    '{"ar": "الكويت", "en": "Kuwait", "fr": "Koweït"}',
    'KWT',
    'Q817',
    '{"ara": "Arabic"}',
    '🇰🇼',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    121,
    '{"ar": "لاوس", "en": "Laos", "fr": "Laos"}',
    'LAO',
    'Q819',
    '{"lao": "Lao"}',
    '🇱🇦',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    122,
    '{"ar": "لبنان", "en": "Lebanon", "fr": "Liban"}',
    'LBN',
    'Q822',
    '{"ara": "Arabic", "fra": "French"}',
    '🇱🇧',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    123,
    '{"ar": "ليبيريا", "en": "Liberia", "fr": "Liberia"}',
    'LBR',
    'Q1014',
    '{"eng": "English"}',
    '🇱🇷',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    124,
    '{"ar": "ليبيا", "en": "Libya", "fr": "Libye"}',
    'LBY',
    'Q1016',
    '{"ara": "Arabic"}',
    '🇱🇾',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    125,
    '{"ar": "سانت لوسيا", "en": "Saint Lucia", "fr": "Sainte-Lucie"}',
    'LCA',
    'Q760',
    '{"eng": "English"}',
    '🇱🇨',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    126,
    '{"ar": "ليختنشتاين", "en": "Liechtenstein", "fr": "Liechtenstein"}',
    'LIE',
    'Q347',
    '{"deu": "German"}',
    '🇱🇮',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    127,
    '{"ar": "سريلانكا", "en": "Sri Lanka", "fr": "Sri Lanka"}',
    'LKA',
    'Q854',
    '{"sin": "Sinhala", "tam": "Tamil"}',
    '🇱🇰',
    '2023-06-23 15:31:24',
    '2023-06-23 15:31:24'
  ),
  (
    128,
    '{"ar": "ليسوتو", "en": "Lesotho", "fr": "Lesotho"}',
    'LSO',
    'Q1013',
    '{"eng": "English", "sot": "Sotho"}',
    '🇱🇸',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    129,
    '{"ar": "ليتوانيا", "en": "Lithuania", "fr": "Lituanie"}',
    'LTU',
    'Q37',
    '{"lit": "Lithuanian"}',
    '🇱🇹',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    130,
    '{"ar": "لوكسمبورغ", "en": "Luxembourg", "fr": "Luxembourg"}',
    'LUX',
    'Q32',
    '{"deu": "German", "fra": "French", "ltz": "Luxembourgish"}',
    '🇱🇺',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    131,
    '{"ar": "لاتفيا", "en": "Latvia", "fr": "Lettonie"}',
    'LVA',
    'Q211',
    '{"lav": "Latvian"}',
    '🇱🇻',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    132,
    '{"ar": "ماكاو", "en": "Macau", "fr": "Macao"}',
    'MAC',
    'Q14773',
    '{"por": "Portuguese", "zho": "Chinese"}',
    '🇲🇴',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    133,
    '{"ar": "تجمع سان مارتين", "en": "Saint Martin", "fr": "Saint-Martin"}',
    'MAF',
    'Q126125',
    '{"fra": "French"}',
    '🇲🇫',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    134,
    '{"ar": "المغرب", "en": "Morocco", "fr": "Maroc"}',
    'MAR',
    'Q1028',
    '{"ara": "Arabic", "ber": "Berber"}',
    '🇲🇦',
    '2023-06-23 15:31:25',
    '2023-06-23 15:31:25'
  ),
  (
    135,
    '{"ar": "موناكو", "en": "Monaco", "fr": "Monaco"}',
    'MCO',
    'Q235',
    '{"fra": "French"}',
    '🇲🇨',
    '2023-06-23 15:31:26',
    '2023-06-23 15:31:26'
  ),
  (
    136,
    '{"ar": "مولدوفا", "en": "Moldova", "fr": "Moldavie"}',
    'MDA',
    'Q217',
    '{"ron": "Moldavian"}',
    '🇲🇩',
    '2023-06-23 15:31:26',
    '2023-06-23 15:31:26'
  ),
  (
    137,
    '{"ar": "مدغشقر", "en": "Madagascar", "fr": "Madagascar"}',
    'MDG',
    'Q1019',
    '{"fra": "French", "mlg": "Malagasy"}',
    '🇲🇬',
    '2023-06-23 15:31:26',
    '2023-06-23 15:31:26'
  ),
  (
    138,
    '{"ar": "المالديف", "en": "Maldives", "fr": "Maldives"}',
    'MDV',
    'Q826',
    '{"div": "Maldivian"}',
    '🇲🇻',
    '2023-06-23 15:31:26',
    '2023-06-23 15:31:26'
  ),
  (
    139,
    '{"ar": "المكسيك", "en": "Mexico", "fr": "Mexique"}',
    'MEX',
    'Q96',
    '{"spa": "Spanish"}',
    '🇲🇽',
    '2023-06-23 15:31:26',
    '2023-06-23 15:31:26'
  ),
  (
    140,
    '{"ar": "جزر مارشال", "en": "Marshall Islands", "fr": "Îles Marshall"}',
    'MHL',
    'Q709',
    '{"eng": "English", "mah": "Marshallese"}',
    '🇲🇭',
    '2023-06-23 15:31:28',
    '2023-06-23 15:31:28'
  ),
  (
    141,
    '{"ar": "مقدونيا الشمالية", "en": "North Macedonia", "fr": "Macédoine du Nord"}',
    'MKD',
    'Q221',
    '{"mkd": "Macedonian"}',
    '🇲🇰',
    '2023-06-23 15:31:28',
    '2023-06-23 15:31:28'
  ),
  (
    142,
    '{"ar": "مالي", "en": "Mali", "fr": "Mali"}',
    'MLI',
    'Q912',
    '{"fra": "French"}',
    '🇲🇱',
    '2023-06-23 15:31:28',
    '2023-06-23 15:31:28'
  ),
  (
    143,
    '{"ar": "مالطا", "en": "Malta", "fr": "Malte"}',
    'MLT',
    'Q233',
    '{"eng": "English", "mlt": "Maltese"}',
    '🇲🇹',
    '2023-06-23 15:31:28',
    '2023-06-23 15:31:28'
  ),
  (
    144,
    '{"ar": "ميانمار", "en": "Myanmar", "fr": "Birmanie"}',
    'MMR',
    'Q836',
    '{"mya": "Burmese"}',
    '🇲🇲',
    '2023-06-23 15:31:28',
    '2023-06-23 15:31:28'
  ),
  (
    145,
    '{"ar": "الجبل الأسود", "en": "Montenegro", "fr": "Monténégro"}',
    'MNE',
    'Q236',
    '{"srp": "Montenegrin"}',
    '🇲🇪',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    146,
    '{"ar": "منغوليا", "en": "Mongolia", "fr": "Mongolie"}',
    'MNG',
    'Q711',
    '{"mon": "Mongolian"}',
    '🇲🇳',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    147,
    '{"ar": "جزر ماريانا الشمالية", "en": "Northern Mariana Islands", "fr": "îles Mariannes du Nord"}',
    'MNP',
    'Q16644',
    '{"cal": "Carolinian", "cha": "Chamorro", "eng": "English"}',
    '🇲🇵',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    148,
    '{"ar": "موزمبيق", "en": "Mozambique", "fr": "Mozambique"}',
    'MOZ',
    'Q1029',
    '{"por": "Portuguese"}',
    '🇲🇿',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    149,
    '{"ar": "موريتانيا", "en": "Mauritania", "fr": "Mauritanie"}',
    'MRT',
    'Q1025',
    '{"ara": "Arabic"}',
    '🇲🇷',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    150,
    '{"ar": "مونتسرات", "en": "Montserrat", "fr": "Montserrat"}',
    'MSR',
    'Q13353',
    '{"eng": "English"}',
    '🇲🇸',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    151,
    '{"ar": "موريشيوس", "en": "Mauritius", "fr": "Maurice"}',
    'MUS',
    'Q1027',
    '{"eng": "English", "fra": "French", "mfe": "Mauritian Creole"}',
    '🇲🇺',
    '2023-06-23 15:31:29',
    '2023-06-23 15:31:29'
  ),
  (
    152,
    '{"ar": "مالاوي", "en": "Malawi", "fr": "Malawi"}',
    'MWI',
    'Q1020',
    '{"eng": "English", "nya": "Chewa"}',
    '🇲🇼',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    153,
    '{"ar": "ماليزيا", "en": "Malaysia", "fr": "Malaisie"}',
    'MYS',
    'Q833',
    '{"eng": "English", "msa": "Malay"}',
    '🇲🇾',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    154,
    '{"ar": "ناميبيا", "en": "Namibia", "fr": "Namibie"}',
    'NAM',
    'Q1030',
    '{"afr": "Afrikaans", "deu": "German", "eng": "English", "her": "Herero", "hgm": "Khoekhoe", "kwn": "Kwangali", "loz": "Lozi", "ndo": "Ndonga", "tsn": "Tswana"}',
    '🇳🇦',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    155,
    '{"ar": "كاليدونيا الجديدة", "en": "New Caledonia", "fr": "Nouvelle-Calédonie"}',
    'NCL',
    'Q33788',
    '{"fra": "French"}',
    '🇳🇨',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    156,
    '{"ar": "النيجر", "en": "Niger", "fr": "Niger"}',
    'NER',
    'Q1032',
    '{"fra": "French"}',
    '🇳🇪',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    157,
    '{"ar": "جزيرة نورفولك", "en": "Norfolk Island", "fr": "Île Norfolk"}',
    'NFK',
    'Q31057',
    '{"eng": "English", "pih": "Norfuk"}',
    '🇳🇫',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    158,
    '{"ar": "نيجيريا", "en": "Nigeria", "fr": "Nigeria"}',
    'NGA',
    'Q1033',
    '{"eng": "English"}',
    '🇳🇬',
    '2023-06-23 15:31:30',
    '2023-06-23 15:31:30'
  ),
  (
    159,
    '{"ar": "نيكاراغوا", "en": "Nicaragua", "fr": "Nicaragua"}',
    'NIC',
    'Q811',
    '{"spa": "Spanish"}',
    '🇳🇮',
    '2023-06-23 15:31:31',
    '2023-06-23 15:31:31'
  ),
  (
    160,
    '{"ar": "نييوي", "en": "Niue", "fr": "Niue"}',
    'NIU',
    'Q34020',
    '{"eng": "English", "niu": "Niuean"}',
    '🇳🇺',
    '2023-06-23 15:31:31',
    '2023-06-23 15:31:31'
  ),
  (
    161,
    '{"ar": "هولندا", "en": "Netherlands", "fr": "Pays-Bas"}',
    'NLD',
    'Q55',
    '{"nld": "Dutch"}',
    '🇳🇱',
    '2023-06-23 15:31:31',
    '2023-06-23 15:31:31'
  ),
  (
    162,
    '{"ar": "سكاربورو شول", "en": "Scarborough Shoal", "fr": "Récif de Scarborough"}',
    '-99',
    'Q628716',
    '[]',
    NULL,
    '2023-06-23 15:31:31',
    '2023-06-23 15:31:57'
  ),
  (
    163,
    '{"ar": "نيبال", "en": "Nepal", "fr": "Népal"}',
    'NPL',
    'Q837',
    '{"nep": "Nepali"}',
    '🇳🇵',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    164,
    '{"ar": "ناورو", "en": "Nauru", "fr": "Nauru"}',
    'NRU',
    'Q697',
    '{"eng": "English", "nau": "Nauru"}',
    '🇳🇷',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    165,
    '{"ar": "نيوزيلندا", "en": "New Zealand", "fr": "Nouvelle-Zélande"}',
    'NZL',
    'Q664',
    '{"eng": "English", "mri": "Māori", "nzs": "New Zealand Sign Language"}',
    '🇳🇿',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    166,
    '{"ar": "سلطنة عمان", "en": "Oman", "fr": "Oman"}',
    'OMN',
    'Q842',
    '{"ara": "Arabic"}',
    '🇴🇲',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    167,
    '{"ar": "باكستان", "en": "Pakistan", "fr": "Pakistan"}',
    'PAK',
    'Q843',
    '{"eng": "English", "urd": "Urdu"}',
    '🇵🇰',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    168,
    '{"ar": "بنما", "en": "Panama", "fr": "Panama"}',
    'PAN',
    'Q804',
    '{"spa": "Spanish"}',
    '🇵🇦',
    '2023-06-23 15:31:32',
    '2023-06-23 15:31:32'
  ),
  (
    169,
    '{"ar": "جزر بيتكيرن", "en": "Pitcairn Islands", "fr": "Iles Pitcairn"}',
    'PCN',
    'Q35672',
    '{"eng": "English"}',
    '🇵🇳',
    '2023-06-23 15:31:33',
    '2023-06-23 15:31:33'
  ),
  (
    170,
    '{"ar": "بيرو", "en": "Peru", "fr": "Pérou"}',
    'PER',
    'Q419',
    '{"aym": "Aymara", "que": "Quechua", "spa": "Spanish"}',
    '🇵🇪',
    '2023-06-23 15:31:33',
    '2023-06-23 15:31:33'
  ),
  (
    171,
    '{"ar": "الفلبين", "en": "Philippines", "fr": "Philippines"}',
    'PHL',
    'Q928',
    '{"eng": "English", "fil": "Filipino"}',
    '🇵🇭',
    '2023-06-23 15:31:33',
    '2023-06-23 15:31:33'
  ),
  (
    172,
    '{"ar": "بالاو", "en": "Palau", "fr": "Palaos"}',
    'PLW',
    'Q695',
    '{"eng": "English", "pau": "Palauan"}',
    '🇵🇼',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    173,
    '{"ar": "بابوا غينيا الجديدة", "en": "Papua New Guinea", "fr": "Papouasie-Nouvelle-Guinée"}',
    'PNG',
    'Q691',
    '{"eng": "English", "hmo": "Hiri Motu", "tpi": "Tok Pisin"}',
    '🇵🇬',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    174,
    '{"ar": "بولندا", "en": "Poland", "fr": "Pologne"}',
    'POL',
    'Q36',
    '{"pol": "Polish"}',
    '🇵🇱',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    175,
    '{"ar": "بورتوريكو", "en": "Puerto Rico", "fr": "Porto Rico"}',
    'PRI',
    'Q1183',
    '{"eng": "English", "spa": "Spanish"}',
    '🇵🇷',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    176,
    '{"ar": "كوريا الشمالية", "en": "North Korea", "fr": "Corée du Nord"}',
    'PRK',
    'Q423',
    '{"kor": "Korean"}',
    '🇰🇵',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    177,
    '{"ar": "البرتغال", "en": "Portugal", "fr": "Portugal"}',
    'PRT',
    'Q45',
    '{"por": "Portuguese"}',
    '🇵🇹',
    '2023-06-23 15:31:34',
    '2023-06-23 15:31:34'
  ),
  (
    178,
    '{"ar": "باراغواي", "en": "Paraguay", "fr": "Paraguay"}',
    'PRY',
    'Q733',
    '{"grn": "Guaraní", "spa": "Spanish"}',
    '🇵🇾',
    '2023-06-23 15:31:35',
    '2023-06-23 15:31:35'
  ),
  (
    179,
    '{"ar": "فلسطين", "en": "Palestine", "fr": "Palestine"}',
    'PSE',
    'Q23792',
    '{"ara": "Arabic"}',
    '🇵🇸',
    '2023-06-23 15:31:35',
    '2023-06-23 15:31:35'
  ),
  (
    180,
    '{"ar": "بولينزيا الفرنسية", "en": "French Polynesia", "fr": "Polynésie française"}',
    'PYF',
    'Q30971',
    '{"fra": "French"}',
    '🇵🇫',
    '2023-06-23 15:31:35',
    '2023-06-23 15:31:35'
  ),
  (
    181,
    '{"ar": "قطر", "en": "Qatar", "fr": "Qatar"}',
    'QAT',
    'Q846',
    '{"ara": "Arabic"}',
    '🇶🇦',
    '2023-06-23 15:31:35',
    '2023-06-23 15:31:35'
  ),
  (
    182,
    '{"ar": "رومانيا", "en": "Romania", "fr": "Roumanie"}',
    'ROU',
    'Q218',
    '{"ron": "Romanian"}',
    '🇷🇴',
    '2023-06-23 15:31:35',
    '2023-06-23 15:31:35'
  ),
  (
    183,
    '{"ar": "روسيا", "en": "Russia", "fr": "Russie"}',
    'RUS',
    'Q159',
    '{"rus": "Russian"}',
    '🇷🇺',
    '2023-06-23 15:31:36',
    '2023-06-23 15:31:36'
  ),
  (
    184,
    '{"ar": "رواندا", "en": "Rwanda", "fr": "Rwanda"}',
    'RWA',
    'Q1037',
    '{"eng": "English", "fra": "French", "kin": "Kinyarwanda"}',
    '🇷🇼',
    '2023-06-23 15:31:41',
    '2023-06-23 15:31:41'
  ),
  (
    185,
    '{"ar": "السعودية", "en": "Saudi Arabia", "fr": "Arabie saoudite"}',
    'SAU',
    'Q851',
    '{"ara": "Arabic"}',
    '🇸🇦',
    '2023-06-23 15:31:41',
    '2023-06-23 15:31:41'
  ),
  (
    186,
    '{"ar": "السودان", "en": "Sudan", "fr": "Soudan"}',
    'SDN',
    'Q1049',
    '{"ara": "Arabic", "eng": "English"}',
    '🇸🇩',
    '2023-06-23 15:31:41',
    '2023-06-23 15:31:41'
  ),
  (
    187,
    '{"ar": "السنغال", "en": "Senegal", "fr": "Sénégal"}',
    'SEN',
    'Q1041',
    '{"fra": "French"}',
    '🇸🇳',
    '2023-06-23 15:31:41',
    '2023-06-23 15:31:41'
  ),
  (
    188,
    '{"ar": "سنغافورة", "en": "Singapore", "fr": "Singapour"}',
    'SGP',
    'Q334',
    '{"cmn": "Mandarin", "eng": "English", "msa": "Malay", "tam": "Tamil"}',
    '🇸🇬',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    189,
    '{"ar": "جورجيا الجنوبية وجزر ساندويتش الجنوبية", "en": "South Georgia and the South Sandwich Islands", "fr": "Géorgie du Sud-et-les Îles Sandwich du Sud"}',
    'SGS',
    'Q35086',
    '{"eng": "English"}',
    '🇬🇸',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    190,
    '{"ar": "جزر سليمان", "en": "Solomon Islands", "fr": "Îles Salomon"}',
    'SLB',
    'Q685',
    '{"eng": "English"}',
    '🇸🇧',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    191,
    '{"ar": "سيراليون", "en": "Sierra Leone", "fr": "Sierra Leone"}',
    'SLE',
    'Q1044',
    '{"eng": "English"}',
    '🇸🇱',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    192,
    '{"ar": "السلفادور", "en": "El Salvador", "fr": "Salvador"}',
    'SLV',
    'Q792',
    '{"spa": "Spanish"}',
    '🇸🇻',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    193,
    '{"ar": "سان مارينو", "en": "San Marino", "fr": "Saint-Marin"}',
    'SMR',
    'Q238',
    '{"ita": "Italian"}',
    '🇸🇲',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    194,
    '{"ar": "الصومال", "en": "Somalia", "fr": "Somalie"}',
    'SOM',
    'Q1045',
    '{"ara": "Arabic", "som": "Somali"}',
    '🇸🇴',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    195,
    '{"ar": "سان بيير وميكلون", "en": "Saint Pierre and Miquelon", "fr": "Saint-Pierre-et-Miquelon"}',
    'SPM',
    'Q34617',
    '{"fra": "French"}',
    '🇵🇲',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    196,
    '{"ar": "صربيا", "en": "Serbia", "fr": "Serbie"}',
    'SRB',
    'Q403',
    '{"srp": "Serbian"}',
    '🇷🇸',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    197,
    '{"ar": "جنوب السودان", "en": "South Sudan", "fr": "Soudan du Sud"}',
    'SSD',
    'Q958',
    '{"eng": "English"}',
    '🇸🇸',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    198,
    '{"ar": "ساو تومي وبرينسيب", "en": "São Tomé and Príncipe", "fr": "Sao Tomé-et-Principe"}',
    'STP',
    'Q1039',
    '{"por": "Portuguese"}',
    '🇸🇹',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    199,
    '{"ar": "سورينام", "en": "Suriname", "fr": "Suriname"}',
    'SUR',
    'Q730',
    '{"nld": "Dutch"}',
    '🇸🇷',
    '2023-06-23 15:31:42',
    '2023-06-23 15:31:42'
  ),
  (
    200,
    '{"ar": "سلوفاكيا", "en": "Slovakia", "fr": "Slovaquie"}',
    'SVK',
    'Q214',
    '{"slk": "Slovak"}',
    '🇸🇰',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    201,
    '{"ar": "سلوفينيا", "en": "Slovenia", "fr": "Slovénie"}',
    'SVN',
    'Q215',
    '{"slv": "Slovene"}',
    '🇸🇮',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    202,
    '{"ar": "السويد", "en": "Sweden", "fr": "Suède"}',
    'SWE',
    'Q34',
    '{"swe": "Swedish"}',
    '🇸🇪',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    203,
    '{"ar": "إسواتيني", "en": "Eswatini", "fr": "Eswatini"}',
    'SWZ',
    'Q1050',
    '{"eng": "English", "ssw": "Swazi"}',
    '🇸🇿',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    204,
    '{"ar": "سينت مارتن", "en": "Sint Maarten", "fr": "Saint-Martin"}',
    'SXM',
    'Q26273',
    '{"eng": "English", "fra": "French", "nld": "Dutch"}',
    '🇸🇽',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    205,
    '{"ar": "سيشل", "en": "Seychelles", "fr": "Seychelles"}',
    'SYC',
    'Q1042',
    '{"crs": "Seychellois Creole", "eng": "English", "fra": "French"}',
    '🇸🇨',
    '2023-06-23 15:31:43',
    '2023-06-23 15:31:43'
  ),
  (
    206,
    '{"ar": "سوريا", "en": "Syria", "fr": "Syrie"}',
    'SYR',
    'Q858',
    '{"ara": "Arabic"}',
    '🇸🇾',
    '2023-06-23 15:31:44',
    '2023-06-23 15:31:44'
  ),
  (
    207,
    '{"ar": "جزر توركس وكايكوس", "en": "Turks and Caicos Islands", "fr": "îles Turques-et-Caïques"}',
    'TCA',
    'Q18221',
    '{"eng": "English"}',
    '🇹🇨',
    '2023-06-23 15:31:44',
    '2023-06-23 15:31:44'
  ),
  (
    208,
    '{"ar": "تشاد", "en": "Chad", "fr": "Tchad"}',
    'TCD',
    'Q657',
    '{"ara": "Arabic", "fra": "French"}',
    '🇹🇩',
    '2023-06-23 15:31:44',
    '2023-06-23 15:31:44'
  ),
  (
    209,
    '{"ar": "توغو", "en": "Togo", "fr": "Togo"}',
    'TGO',
    'Q945',
    '{"fra": "French"}',
    '🇹🇬',
    '2023-06-23 15:31:44',
    '2023-06-23 15:31:44'
  ),
  (
    210,
    '{"ar": "تايلاند", "en": "Thailand", "fr": "Thaïlande"}',
    'THA',
    'Q869',
    '{"tha": "Thai"}',
    '🇹🇭',
    '2023-06-23 15:31:44',
    '2023-06-23 15:31:44'
  ),
  (
    211,
    '{"ar": "طاجيكستان", "en": "Tajikistan", "fr": "Tadjikistan"}',
    'TJK',
    'Q863',
    '{"rus": "Russian", "tgk": "Tajik"}',
    '🇹🇯',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    212,
    '{"ar": "تركمانستان", "en": "Turkmenistan", "fr": "Turkménistan"}',
    'TKM',
    'Q874',
    '{"rus": "Russian", "tuk": "Turkmen"}',
    '🇹🇲',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    213,
    '{"ar": "تيمور الشرقية", "en": "East Timor", "fr": "Timor oriental"}',
    'TLS',
    'Q574',
    '{"por": "Portuguese", "tet": "Tetum"}',
    '🇹🇱',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    214,
    '{"ar": "تونغا", "en": "Tonga", "fr": "Tonga"}',
    'TON',
    'Q678',
    '{"eng": "English", "ton": "Tongan"}',
    '🇹🇴',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    215,
    '{"ar": "ترينيداد وتوباغو", "en": "Trinidad and Tobago", "fr": "Trinité-et-Tobago"}',
    'TTO',
    'Q754',
    '{"eng": "English"}',
    '🇹🇹',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    216,
    '{"ar": "تونس", "en": "Tunisia", "fr": "Tunisie"}',
    'TUN',
    'Q948',
    '{"ara": "Arabic"}',
    '🇹🇳',
    '2023-06-23 15:31:45',
    '2023-06-23 15:31:45'
  ),
  (
    217,
    '{"ar": "تركيا", "en": "Turkey", "fr": "Turquie"}',
    'TUR',
    'Q43',
    '{"tur": "Turkish"}',
    '🇹🇷',
    '2023-06-23 15:31:46',
    '2023-06-23 15:31:46'
  ),
  (
    218,
    '{"ar": "توفالو", "en": "Tuvalu", "fr": "Tuvalu"}',
    'TUV',
    'Q672',
    '{"eng": "English", "tvl": "Tuvaluan"}',
    '🇹🇻',
    '2023-06-23 15:31:46',
    '2023-06-23 15:31:46'
  ),
  (
    219,
    '{"ar": "تايوان", "en": "Taiwan", "fr": "Taïwan"}',
    'TWN',
    'Q865',
    '{"cmn": "Mandarin"}',
    '🇹🇼',
    '2023-06-23 15:31:46',
    '2023-06-23 15:31:46'
  ),
  (
    220,
    '{"ar": "تنزانيا", "en": "Tanzania", "fr": "Tanzanie"}',
    'TZA',
    'Q924',
    '{"eng": "English", "swa": "Swahili"}',
    '🇹🇿',
    '2023-06-23 15:31:47',
    '2023-06-23 15:31:47'
  ),
  (
    221,
    '{"ar": "أوغندا", "en": "Uganda", "fr": "Ouganda"}',
    'UGA',
    'Q1036',
    '{"eng": "English", "swa": "Swahili"}',
    '🇺🇬',
    '2023-06-23 15:31:47',
    '2023-06-23 15:31:47'
  ),
  (
    222,
    '{"ar": "أوكرانيا", "en": "Ukraine", "fr": "Ukraine"}',
    'UKR',
    'Q212',
    '{"ukr": "Ukrainian"}',
    '🇺🇦',
    '2023-06-23 15:31:48',
    '2023-06-23 15:31:48'
  ),
  (
    223,
    '{"ar": "جزر الولايات المتحدة الصغيرة النائية", "en": "United States Minor Outlying Islands", "fr": "Îles mineures éloignées des États-Unis"}',
    'UMI',
    'Q16645',
    '{"eng": "English"}',
    '🇺🇲',
    '2023-06-23 15:31:48',
    '2023-06-23 15:31:48'
  ),
  (
    224,
    '{"ar": "الأوروغواي", "en": "Uruguay", "fr": "Uruguay"}',
    'URY',
    'Q77',
    '{"spa": "Spanish"}',
    '🇺🇾',
    '2023-06-23 15:31:48',
    '2023-06-23 15:31:48'
  ),
  (
    225,
    '{"ar": "الولايات المتحدة", "en": "United States of America", "fr": "États-Unis"}',
    'USA',
    'Q30',
    '{"eng": "English"}',
    '🇺🇸',
    '2023-06-23 15:31:48',
    '2023-06-23 15:31:48'
  ),
  (
    226,
    '{"ar": "أوزبكستان", "en": "Uzbekistan", "fr": "Ouzbékistan"}',
    'UZB',
    'Q265',
    '{"rus": "Russian", "uzb": "Uzbek"}',
    '🇺🇿',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    227,
    '{"ar": "الفاتيكان", "en": "Vatican City", "fr": "Cité du Vatican"}',
    'VAT',
    'Q237',
    '{"ita": "Italian", "lat": "Latin"}',
    '🇻🇦',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    228,
    '{"ar": "سانت فينسنت والغرينادين", "en": "Saint Vincent and the Grenadines", "fr": "Saint-Vincent-et-les-Grenadines"}',
    'VCT',
    'Q757',
    '{"eng": "English"}',
    '🇻🇨',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    229,
    '{"ar": "فنزويلا", "en": "Venezuela", "fr": "Venezuela"}',
    'VEN',
    'Q717',
    '{"spa": "Spanish"}',
    '🇻🇪',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    230,
    '{"ar": "جزر العذراء البريطانية", "en": "British Virgin Islands", "fr": "îles Vierges britanniques"}',
    'VGB',
    'Q25305',
    '{"eng": "English"}',
    '🇻🇬',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    231,
    '{"ar": "جزر العذراء الأمريكية", "en": "United States Virgin Islands", "fr": "îles Vierges des États-Unis"}',
    'VIR',
    'Q11703',
    '{"eng": "English"}',
    '🇻🇮',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    232,
    '{"ar": "فيتنام", "en": "Vietnam", "fr": "Viêt Nam"}',
    'VNM',
    'Q881',
    '{"vie": "Vietnamese"}',
    '🇻🇳',
    '2023-06-23 15:31:55',
    '2023-06-23 15:31:55'
  ),
  (
    233,
    '{"ar": "فانواتو", "en": "Vanuatu", "fr": "Vanuatu"}',
    'VUT',
    'Q686',
    '{"bis": "Bislama", "eng": "English", "fra": "French"}',
    '🇻🇺',
    '2023-06-23 15:31:56',
    '2023-06-23 15:31:56'
  ),
  (
    234,
    '{"ar": "واليس وفوتونا", "en": "Wallis and Futuna", "fr": "Wallis-et-Futuna"}',
    'WLF',
    'Q35555',
    '{"fra": "French"}',
    '🇼🇫',
    '2023-06-23 15:31:56',
    '2023-06-23 15:31:56'
  ),
  (
    235,
    '{"ar": "ساموا", "en": "Samoa", "fr": "Samoa"}',
    'WSM',
    'Q683',
    '{"eng": "English", "smo": "Samoan"}',
    '🇼🇸',
    '2023-06-23 15:31:56',
    '2023-06-23 15:31:56'
  ),
  (
    236,
    '{"ar": "اليمن", "en": "Yemen", "fr": "Yémen"}',
    'YEM',
    'Q805',
    '{"ara": "Arabic"}',
    '🇾🇪',
    '2023-06-23 15:31:56',
    '2023-06-23 15:31:56'
  ),
  (
    237,
    '{"ar": "جنوب أفريقيا", "en": "South Africa", "fr": "Afrique du Sud"}',
    'ZAF',
    'Q258',
    '{"afr": "Afrikaans", "eng": "English", "nbl": "Southern Ndebele", "nso": "Northern Sotho", "sot": "Southern Sotho", "ssw": "Swazi", "tsn": "Tswana", "tso": "Tsonga", "ven": "Venda", "xho": "Xhosa", "zul": "Zulu"}',
    '🇿🇦',
    '2023-06-23 15:31:56',
    '2023-06-23 15:31:56'
  ),
  (
    238,
    '{"ar": "زامبيا", "en": "Zambia", "fr": "Zambie"}',
    'ZMB',
    'Q953',
    '{"eng": "English"}',
    '🇿🇲',
    '2023-06-23 15:31:57',
    '2023-06-23 15:31:57'
  ),
  (
    239,
    '{"ar": "زيمبابوي", "en": "Zimbabwe", "fr": "Zimbabwe"}',
    'ZWE',
    'Q954',
    '{"bwg": "Chibarwe", "eng": "English", "kck": "Kalanga", "khi": "Khoisan", "ndc": "Ndau", "nde": "Northern Ndebele", "nya": "Chewa", "sna": "Shona", "sot": "Sotho", "toi": "Tonga", "tsn": "Tswana", "tso": "Tsonga", "ven": "Venda", "xho": "Xhosa", "zib": "Zimbabwean Sign Language"}',
    '🇿🇼',
    '2023-06-23 15:31:57',
    '2023-06-23 15:31:57'
  );

-- END TABLE public.countries
