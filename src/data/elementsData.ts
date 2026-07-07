// Comprehensive data for all 118 elements
export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: ElementCategory;
  group: number | null; // 1-18, null for lanth/act
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  config: string; // e.g. "1s2 2s2 2p4"
  shells: number[]; // e.g. [2,6]
  valence: number;
  oxidationStates: string;
  state: 'solid' | 'liquid' | 'gas' | 'unknown';
  density?: number; // g/cm3
  meltingPoint?: number; // K
  boilingPoint?: number; // K
  electronegativity?: number;
  atomicRadius?: number; // pm
  discoveredBy?: string;
  discoveryYear?: string;
  origin: string;
  summary: string;
  uses: string[];
  biological: string;
  facts: string[];
  color?: string; // real appearance color
}

// Category color palette (used for tiles + backgrounds)
export const categoryColors: Record<ElementCategory, { bg: string; border: string; glow: string; label: string }> = {
  'alkali-metal':         { bg: 'hsl(0 75% 60% / 0.22)',   border: 'hsl(0 75% 60%)',   glow: 'hsl(0 85% 65%)',   label: 'Alkali Metal' },
  'alkaline-earth-metal': { bg: 'hsl(25 90% 60% / 0.22)',  border: 'hsl(25 90% 60%)',  glow: 'hsl(30 95% 65%)',  label: 'Alkaline Earth' },
  'transition-metal':     { bg: 'hsl(200 80% 55% / 0.22)', border: 'hsl(200 80% 55%)', glow: 'hsl(200 90% 65%)', label: 'Transition Metal' },
  'post-transition-metal':{ bg: 'hsl(220 30% 60% / 0.22)', border: 'hsl(220 30% 60%)', glow: 'hsl(220 40% 70%)', label: 'Post-Transition' },
  'metalloid':            { bg: 'hsl(160 55% 50% / 0.22)', border: 'hsl(160 55% 50%)', glow: 'hsl(160 65% 60%)', label: 'Metalloid' },
  'nonmetal':             { bg: 'hsl(174 72% 46% / 0.22)', border: 'hsl(174 72% 46%)', glow: 'hsl(174 82% 56%)', label: 'Nonmetal' },
  'halogen':              { bg: 'hsl(45 95% 55% / 0.22)',  border: 'hsl(45 95% 55%)',  glow: 'hsl(48 100% 65%)', label: 'Halogen' },
  'noble-gas':            { bg: 'hsl(280 70% 60% / 0.22)', border: 'hsl(280 70% 60%)', glow: 'hsl(280 80% 70%)', label: 'Noble Gas' },
  'lanthanide':           { bg: 'hsl(330 75% 60% / 0.22)', border: 'hsl(330 75% 60%)', glow: 'hsl(330 85% 70%)', label: 'Lanthanide' },
  'actinide':             { bg: 'hsl(300 70% 55% / 0.22)', border: 'hsl(300 70% 55%)', glow: 'hsl(300 80% 65%)', label: 'Actinide' },
  'unknown':              { bg: 'hsl(220 10% 45% / 0.22)', border: 'hsl(220 10% 45%)', glow: 'hsl(220 15% 55%)', label: 'Unknown' },
};

// Compact source data - full core fields for all 118 elements
// Format: [num, symbol, name, mass, category, group, period, block, config, shells, state, mp, bp, density, en, radius, year, discoverer]
type Row = [number, string, string, number, ElementCategory, number|null, number, 's'|'p'|'d'|'f', string, number[], 'solid'|'liquid'|'gas'|'unknown', number|null, number|null, number|null, number|null, number|null, string, string];

const rows: Row[] = [
  [1,'H','Hydrogen',1.008,'nonmetal',1,1,'s','1s1',[1],'gas',14,20,0.0000899,2.20,53,'1766','Henry Cavendish'],
  [2,'He','Helium',4.0026,'noble-gas',18,1,'s','1s2',[2],'gas',null,4,0.0001785,null,31,'1868','Janssen & Lockyer'],
  [3,'Li','Lithium',6.94,'alkali-metal',1,2,'s','[He] 2s1',[2,1],'solid',454,1615,0.534,0.98,167,'1817','Johan August Arfwedson'],
  [4,'Be','Beryllium',9.0122,'alkaline-earth-metal',2,2,'s','[He] 2s2',[2,2],'solid',1560,2742,1.85,1.57,112,'1798','Louis Nicolas Vauquelin'],
  [5,'B','Boron',10.81,'metalloid',13,2,'p','[He] 2s2 2p1',[2,3],'solid',2349,4200,2.34,2.04,87,'1808','Davy, Gay-Lussac & Thénard'],
  [6,'C','Carbon',12.011,'nonmetal',14,2,'p','[He] 2s2 2p2',[2,4],'solid',3800,4300,2.267,2.55,67,'Ancient','Ancient'],
  [7,'N','Nitrogen',14.007,'nonmetal',15,2,'p','[He] 2s2 2p3',[2,5],'gas',63,77,0.001251,3.04,56,'1772','Daniel Rutherford'],
  [8,'O','Oxygen',15.999,'nonmetal',16,2,'p','[He] 2s2 2p4',[2,6],'gas',54,90,0.001429,3.44,48,'1774','Joseph Priestley & Scheele'],
  [9,'F','Fluorine',18.998,'halogen',17,2,'p','[He] 2s2 2p5',[2,7],'gas',53,85,0.001696,3.98,42,'1886','Henri Moissan'],
  [10,'Ne','Neon',20.180,'noble-gas',18,2,'p','[He] 2s2 2p6',[2,8],'gas',24,27,0.0008999,null,38,'1898','Ramsay & Travers'],
  [11,'Na','Sodium',22.990,'alkali-metal',1,3,'s','[Ne] 3s1',[2,8,1],'solid',371,1156,0.971,0.93,190,'1807','Humphry Davy'],
  [12,'Mg','Magnesium',24.305,'alkaline-earth-metal',2,3,'s','[Ne] 3s2',[2,8,2],'solid',923,1363,1.738,1.31,145,'1808','Humphry Davy'],
  [13,'Al','Aluminium',26.982,'post-transition-metal',13,3,'p','[Ne] 3s2 3p1',[2,8,3],'solid',933,2792,2.70,1.61,118,'1825','Hans Christian Ørsted'],
  [14,'Si','Silicon',28.085,'metalloid',14,3,'p','[Ne] 3s2 3p2',[2,8,4],'solid',1687,3538,2.33,1.90,111,'1824','Jöns Jakob Berzelius'],
  [15,'P','Phosphorus',30.974,'nonmetal',15,3,'p','[Ne] 3s2 3p3',[2,8,5],'solid',317,553,1.82,2.19,98,'1669','Hennig Brand'],
  [16,'S','Sulfur',32.06,'nonmetal',16,3,'p','[Ne] 3s2 3p4',[2,8,6],'solid',388,718,2.067,2.58,88,'Ancient','Ancient'],
  [17,'Cl','Chlorine',35.45,'halogen',17,3,'p','[Ne] 3s2 3p5',[2,8,7],'gas',172,239,0.003214,3.16,79,'1774','Carl Wilhelm Scheele'],
  [18,'Ar','Argon',39.948,'noble-gas',18,3,'p','[Ne] 3s2 3p6',[2,8,8],'gas',84,87,0.0017837,null,71,'1894','Rayleigh & Ramsay'],
  [19,'K','Potassium',39.098,'alkali-metal',1,4,'s','[Ar] 4s1',[2,8,8,1],'solid',337,1032,0.862,0.82,243,'1807','Humphry Davy'],
  [20,'Ca','Calcium',40.078,'alkaline-earth-metal',2,4,'s','[Ar] 4s2',[2,8,8,2],'solid',1115,1757,1.55,1.00,194,'1808','Humphry Davy'],
  [21,'Sc','Scandium',44.956,'transition-metal',3,4,'d','[Ar] 3d1 4s2',[2,8,9,2],'solid',1814,3109,2.989,1.36,184,'1879','Lars Fredrik Nilson'],
  [22,'Ti','Titanium',47.867,'transition-metal',4,4,'d','[Ar] 3d2 4s2',[2,8,10,2],'solid',1941,3560,4.54,1.54,176,'1791','William Gregor'],
  [23,'V','Vanadium',50.942,'transition-metal',5,4,'d','[Ar] 3d3 4s2',[2,8,11,2],'solid',2183,3680,6.11,1.63,171,'1801','Andrés Manuel del Río'],
  [24,'Cr','Chromium',51.996,'transition-metal',6,4,'d','[Ar] 3d5 4s1',[2,8,13,1],'solid',2180,2944,7.15,1.66,166,'1797','Louis Nicolas Vauquelin'],
  [25,'Mn','Manganese',54.938,'transition-metal',7,4,'d','[Ar] 3d5 4s2',[2,8,13,2],'solid',1519,2334,7.44,1.55,161,'1774','Johan Gottlieb Gahn'],
  [26,'Fe','Iron',55.845,'transition-metal',8,4,'d','[Ar] 3d6 4s2',[2,8,14,2],'solid',1811,3134,7.874,1.83,156,'Ancient','Ancient'],
  [27,'Co','Cobalt',58.933,'transition-metal',9,4,'d','[Ar] 3d7 4s2',[2,8,15,2],'solid',1768,3200,8.86,1.88,152,'1735','Georg Brandt'],
  [28,'Ni','Nickel',58.693,'transition-metal',10,4,'d','[Ar] 3d8 4s2',[2,8,16,2],'solid',1728,3186,8.912,1.91,149,'1751','Axel Fredrik Cronstedt'],
  [29,'Cu','Copper',63.546,'transition-metal',11,4,'d','[Ar] 3d10 4s1',[2,8,18,1],'solid',1358,2835,8.96,1.90,145,'Ancient','Ancient'],
  [30,'Zn','Zinc',65.38,'transition-metal',12,4,'d','[Ar] 3d10 4s2',[2,8,18,2],'solid',693,1180,7.134,1.65,142,'Ancient','Andreas Marggraf'],
  [31,'Ga','Gallium',69.723,'post-transition-metal',13,4,'p','[Ar] 3d10 4s2 4p1',[2,8,18,3],'solid',303,2477,5.907,1.81,136,'1875','Paul Émile Lecoq'],
  [32,'Ge','Germanium',72.630,'metalloid',14,4,'p','[Ar] 3d10 4s2 4p2',[2,8,18,4],'solid',1211,3106,5.323,2.01,125,'1886','Clemens Winkler'],
  [33,'As','Arsenic',74.922,'metalloid',15,4,'p','[Ar] 3d10 4s2 4p3',[2,8,18,5],'solid',887,887,5.776,2.18,114,'Ancient','Albertus Magnus'],
  [34,'Se','Selenium',78.971,'nonmetal',16,4,'p','[Ar] 3d10 4s2 4p4',[2,8,18,6],'solid',494,958,4.809,2.55,103,'1817','Berzelius & Gahn'],
  [35,'Br','Bromine',79.904,'halogen',17,4,'p','[Ar] 3d10 4s2 4p5',[2,8,18,7],'liquid',266,332,3.122,2.96,94,'1826','Antoine Jérôme Balard'],
  [36,'Kr','Krypton',83.798,'noble-gas',18,4,'p','[Ar] 3d10 4s2 4p6',[2,8,18,8],'gas',116,120,0.003733,3.00,88,'1898','Ramsay & Travers'],
  [37,'Rb','Rubidium',85.468,'alkali-metal',1,5,'s','[Kr] 5s1',[2,8,18,8,1],'solid',312,961,1.532,0.82,265,'1861','Bunsen & Kirchhoff'],
  [38,'Sr','Strontium',87.62,'alkaline-earth-metal',2,5,'s','[Kr] 5s2',[2,8,18,8,2],'solid',1050,1655,2.64,0.95,219,'1790','William Cruickshank'],
  [39,'Y','Yttrium',88.906,'transition-metal',3,5,'d','[Kr] 4d1 5s2',[2,8,18,9,2],'solid',1799,3609,4.469,1.22,212,'1794','Johan Gadolin'],
  [40,'Zr','Zirconium',91.224,'transition-metal',4,5,'d','[Kr] 4d2 5s2',[2,8,18,10,2],'solid',2128,4682,6.506,1.33,206,'1789','Martin Heinrich Klaproth'],
  [41,'Nb','Niobium',92.906,'transition-metal',5,5,'d','[Kr] 4d4 5s1',[2,8,18,12,1],'solid',2750,5017,8.57,1.6,198,'1801','Charles Hatchett'],
  [42,'Mo','Molybdenum',95.95,'transition-metal',6,5,'d','[Kr] 4d5 5s1',[2,8,18,13,1],'solid',2896,4912,10.22,2.16,190,'1778','Carl Wilhelm Scheele'],
  [43,'Tc','Technetium',98,'transition-metal',7,5,'d','[Kr] 4d5 5s2',[2,8,18,13,2],'solid',2430,4538,11.5,1.9,183,'1937','Perrier & Segrè'],
  [44,'Ru','Ruthenium',101.07,'transition-metal',8,5,'d','[Kr] 4d7 5s1',[2,8,18,15,1],'solid',2607,4423,12.37,2.2,178,'1844','Karl Ernst Claus'],
  [45,'Rh','Rhodium',102.91,'transition-metal',9,5,'d','[Kr] 4d8 5s1',[2,8,18,16,1],'solid',2237,3968,12.41,2.28,173,'1803','William Hyde Wollaston'],
  [46,'Pd','Palladium',106.42,'transition-metal',10,5,'d','[Kr] 4d10',[2,8,18,18],'solid',1828,3236,12.02,2.20,169,'1803','William Hyde Wollaston'],
  [47,'Ag','Silver',107.87,'transition-metal',11,5,'d','[Kr] 4d10 5s1',[2,8,18,18,1],'solid',1235,2435,10.501,1.93,165,'Ancient','Ancient'],
  [48,'Cd','Cadmium',112.41,'transition-metal',12,5,'d','[Kr] 4d10 5s2',[2,8,18,18,2],'solid',594,1040,8.69,1.69,161,'1817','Stromeyer & Hermann'],
  [49,'In','Indium',114.82,'post-transition-metal',13,5,'p','[Kr] 4d10 5s2 5p1',[2,8,18,18,3],'solid',430,2345,7.31,1.78,156,'1863','Reich & Richter'],
  [50,'Sn','Tin',118.71,'post-transition-metal',14,5,'p','[Kr] 4d10 5s2 5p2',[2,8,18,18,4],'solid',505,2875,7.287,1.96,145,'Ancient','Ancient'],
  [51,'Sb','Antimony',121.76,'metalloid',15,5,'p','[Kr] 4d10 5s2 5p3',[2,8,18,18,5],'solid',904,1860,6.685,2.05,133,'Ancient','Ancient'],
  [52,'Te','Tellurium',127.60,'metalloid',16,5,'p','[Kr] 4d10 5s2 5p4',[2,8,18,18,6],'solid',722,1261,6.232,2.1,123,'1782','Franz-Joseph Müller'],
  [53,'I','Iodine',126.90,'halogen',17,5,'p','[Kr] 4d10 5s2 5p5',[2,8,18,18,7],'solid',387,457,4.93,2.66,115,'1811','Bernard Courtois'],
  [54,'Xe','Xenon',131.29,'noble-gas',18,5,'p','[Kr] 4d10 5s2 5p6',[2,8,18,18,8],'gas',161,165,0.005887,2.60,108,'1898','Ramsay & Travers'],
  [55,'Cs','Caesium',132.91,'alkali-metal',1,6,'s','[Xe] 6s1',[2,8,18,18,8,1],'solid',301,944,1.873,0.79,298,'1860','Bunsen & Kirchhoff'],
  [56,'Ba','Barium',137.33,'alkaline-earth-metal',2,6,'s','[Xe] 6s2',[2,8,18,18,8,2],'solid',1000,2170,3.594,0.89,253,'1808','Humphry Davy'],
  [57,'La','Lanthanum',138.91,'lanthanide',null,6,'d','[Xe] 5d1 6s2',[2,8,18,18,9,2],'solid',1193,3737,6.145,1.10,240,'1839','Carl Gustaf Mosander'],
  [58,'Ce','Cerium',140.12,'lanthanide',null,6,'f','[Xe] 4f1 5d1 6s2',[2,8,18,19,9,2],'solid',1068,3716,6.770,1.12,235,'1803','Berzelius, Hisinger & Klaproth'],
  [59,'Pr','Praseodymium',140.91,'lanthanide',null,6,'f','[Xe] 4f3 6s2',[2,8,18,21,8,2],'solid',1208,3793,6.773,1.13,239,'1885','Carl Auer von Welsbach'],
  [60,'Nd','Neodymium',144.24,'lanthanide',null,6,'f','[Xe] 4f4 6s2',[2,8,18,22,8,2],'solid',1297,3347,7.007,1.14,229,'1885','Carl Auer von Welsbach'],
  [61,'Pm','Promethium',145,'lanthanide',null,6,'f','[Xe] 4f5 6s2',[2,8,18,23,8,2],'solid',1315,3273,7.26,1.13,236,'1945','Marinsky, Glendenin & Coryell'],
  [62,'Sm','Samarium',150.36,'lanthanide',null,6,'f','[Xe] 4f6 6s2',[2,8,18,24,8,2],'solid',1345,2067,7.52,1.17,229,'1879','Lecoq de Boisbaudran'],
  [63,'Eu','Europium',151.96,'lanthanide',null,6,'f','[Xe] 4f7 6s2',[2,8,18,25,8,2],'solid',1099,1802,5.243,1.2,233,'1901','Eugène-Anatole Demarçay'],
  [64,'Gd','Gadolinium',157.25,'lanthanide',null,6,'f','[Xe] 4f7 5d1 6s2',[2,8,18,25,9,2],'solid',1585,3546,7.895,1.20,237,'1880','Jean Charles Galissard de Marignac'],
  [65,'Tb','Terbium',158.93,'lanthanide',null,6,'f','[Xe] 4f9 6s2',[2,8,18,27,8,2],'solid',1629,3503,8.229,1.10,221,'1843','Carl Gustaf Mosander'],
  [66,'Dy','Dysprosium',162.50,'lanthanide',null,6,'f','[Xe] 4f10 6s2',[2,8,18,28,8,2],'solid',1680,2840,8.55,1.22,229,'1886','Lecoq de Boisbaudran'],
  [67,'Ho','Holmium',164.93,'lanthanide',null,6,'f','[Xe] 4f11 6s2',[2,8,18,29,8,2],'solid',1734,2993,8.795,1.23,216,'1878','Delafontaine & Soret'],
  [68,'Er','Erbium',167.26,'lanthanide',null,6,'f','[Xe] 4f12 6s2',[2,8,18,30,8,2],'solid',1802,3141,9.066,1.24,235,'1843','Carl Gustaf Mosander'],
  [69,'Tm','Thulium',168.93,'lanthanide',null,6,'f','[Xe] 4f13 6s2',[2,8,18,31,8,2],'solid',1818,2223,9.321,1.25,227,'1879','Per Teodor Cleve'],
  [70,'Yb','Ytterbium',173.05,'lanthanide',null,6,'f','[Xe] 4f14 6s2',[2,8,18,32,8,2],'solid',1097,1469,6.965,1.1,242,'1878','Jean Charles Galissard de Marignac'],
  [71,'Lu','Lutetium',174.97,'lanthanide',null,6,'d','[Xe] 4f14 5d1 6s2',[2,8,18,32,9,2],'solid',1925,3675,9.84,1.27,221,'1907','Georges Urbain'],
  [72,'Hf','Hafnium',178.49,'transition-metal',4,6,'d','[Xe] 4f14 5d2 6s2',[2,8,18,32,10,2],'solid',2506,4876,13.31,1.3,212,'1923','Coster & Hevesy'],
  [73,'Ta','Tantalum',180.95,'transition-metal',5,6,'d','[Xe] 4f14 5d3 6s2',[2,8,18,32,11,2],'solid',3290,5731,16.654,1.5,217,'1802','Anders Gustaf Ekeberg'],
  [74,'W','Tungsten',183.84,'transition-metal',6,6,'d','[Xe] 4f14 5d4 6s2',[2,8,18,32,12,2],'solid',3695,5828,19.25,2.36,210,'1783','Elhuyar brothers'],
  [75,'Re','Rhenium',186.21,'transition-metal',7,6,'d','[Xe] 4f14 5d5 6s2',[2,8,18,32,13,2],'solid',3459,5869,21.02,1.9,217,'1925','Noddack, Tacke & Berg'],
  [76,'Os','Osmium',190.23,'transition-metal',8,6,'d','[Xe] 4f14 5d6 6s2',[2,8,18,32,14,2],'solid',3306,5285,22.61,2.2,216,'1803','Smithson Tennant'],
  [77,'Ir','Iridium',192.22,'transition-metal',9,6,'d','[Xe] 4f14 5d7 6s2',[2,8,18,32,15,2],'solid',2739,4701,22.56,2.20,202,'1803','Smithson Tennant'],
  [78,'Pt','Platinum',195.08,'transition-metal',10,6,'d','[Xe] 4f14 5d9 6s1',[2,8,18,32,17,1],'solid',2041,4098,21.46,2.28,209,'1735','Antonio de Ulloa'],
  [79,'Au','Gold',196.97,'transition-metal',11,6,'d','[Xe] 4f14 5d10 6s1',[2,8,18,32,18,1],'solid',1337,3129,19.282,2.54,166,'Ancient','Ancient'],
  [80,'Hg','Mercury',200.59,'transition-metal',12,6,'d','[Xe] 4f14 5d10 6s2',[2,8,18,32,18,2],'liquid',234,630,13.5336,2.00,171,'Ancient','Ancient'],
  [81,'Tl','Thallium',204.38,'post-transition-metal',13,6,'p','[Xe] 4f14 5d10 6s2 6p1',[2,8,18,32,18,3],'solid',577,1746,11.85,1.62,156,'1861','William Crookes'],
  [82,'Pb','Lead',207.2,'post-transition-metal',14,6,'p','[Xe] 4f14 5d10 6s2 6p2',[2,8,18,32,18,4],'solid',600,2022,11.342,2.33,154,'Ancient','Ancient'],
  [83,'Bi','Bismuth',208.98,'post-transition-metal',15,6,'p','[Xe] 4f14 5d10 6s2 6p3',[2,8,18,32,18,5],'solid',544,1837,9.807,2.02,143,'1753','Claude François Geoffroy'],
  [84,'Po','Polonium',209,'post-transition-metal',16,6,'p','[Xe] 4f14 5d10 6s2 6p4',[2,8,18,32,18,6],'solid',527,1235,9.32,2.0,135,'1898','Curie & Curie'],
  [85,'At','Astatine',210,'halogen',17,6,'p','[Xe] 4f14 5d10 6s2 6p5',[2,8,18,32,18,7],'solid',575,610,7,2.2,127,'1940','Corson, MacKenzie & Segrè'],
  [86,'Rn','Radon',222,'noble-gas',18,6,'p','[Xe] 4f14 5d10 6s2 6p6',[2,8,18,32,18,8],'gas',202,211,0.00973,2.2,120,'1900','Friedrich Ernst Dorn'],
  [87,'Fr','Francium',223,'alkali-metal',1,7,'s','[Rn] 7s1',[2,8,18,32,18,8,1],'solid',300,950,1.87,0.7,348,'1939','Marguerite Perey'],
  [88,'Ra','Radium',226,'alkaline-earth-metal',2,7,'s','[Rn] 7s2',[2,8,18,32,18,8,2],'solid',973,2010,5.5,0.9,283,'1898','Curie & Curie'],
  [89,'Ac','Actinium',227,'actinide',null,7,'d','[Rn] 6d1 7s2',[2,8,18,32,18,9,2],'solid',1323,3471,10.07,1.1,260,'1899','André-Louis Debierne'],
  [90,'Th','Thorium',232.04,'actinide',null,7,'f','[Rn] 6d2 7s2',[2,8,18,32,18,10,2],'solid',2115,5061,11.72,1.3,237,'1829','Jöns Jakob Berzelius'],
  [91,'Pa','Protactinium',231.04,'actinide',null,7,'f','[Rn] 5f2 6d1 7s2',[2,8,18,32,20,9,2],'solid',1841,4300,15.37,1.5,243,'1913','Fajans & Göhring'],
  [92,'U','Uranium',238.03,'actinide',null,7,'f','[Rn] 5f3 6d1 7s2',[2,8,18,32,21,9,2],'solid',1405,4404,18.95,1.38,240,'1789','Martin Heinrich Klaproth'],
  [93,'Np','Neptunium',237,'actinide',null,7,'f','[Rn] 5f4 6d1 7s2',[2,8,18,32,22,9,2],'solid',917,4273,20.45,1.36,221,'1940','McMillan & Abelson'],
  [94,'Pu','Plutonium',244,'actinide',null,7,'f','[Rn] 5f6 7s2',[2,8,18,32,24,8,2],'solid',913,3501,19.84,1.28,243,'1940','Seaborg et al.'],
  [95,'Am','Americium',243,'actinide',null,7,'f','[Rn] 5f7 7s2',[2,8,18,32,25,8,2],'solid',1449,2880,13.69,1.13,244,'1944','Seaborg et al.'],
  [96,'Cm','Curium',247,'actinide',null,7,'f','[Rn] 5f7 6d1 7s2',[2,8,18,32,25,9,2],'solid',1613,3383,13.51,1.28,245,'1944','Seaborg et al.'],
  [97,'Bk','Berkelium',247,'actinide',null,7,'f','[Rn] 5f9 7s2',[2,8,18,32,27,8,2],'solid',1259,2900,14.79,1.3,244,'1949','Thompson, Ghiorso & Seaborg'],
  [98,'Cf','Californium',251,'actinide',null,7,'f','[Rn] 5f10 7s2',[2,8,18,32,28,8,2],'solid',1173,1743,15.1,1.3,245,'1950','Berkeley team'],
  [99,'Es','Einsteinium',252,'actinide',null,7,'f','[Rn] 5f11 7s2',[2,8,18,32,29,8,2],'solid',1133,1269,8.84,1.3,245,'1952','Berkeley/LANL'],
  [100,'Fm','Fermium',257,'actinide',null,7,'f','[Rn] 5f12 7s2',[2,8,18,32,30,8,2],'solid',1800,null,null,1.3,null,'1952','Berkeley team'],
  [101,'Md','Mendelevium',258,'actinide',null,7,'f','[Rn] 5f13 7s2',[2,8,18,32,31,8,2],'solid',1100,null,null,1.3,null,'1955','Berkeley team'],
  [102,'No','Nobelium',259,'actinide',null,7,'f','[Rn] 5f14 7s2',[2,8,18,32,32,8,2],'solid',1100,null,null,1.3,null,'1966','JINR Dubna'],
  [103,'Lr','Lawrencium',266,'actinide',null,7,'d','[Rn] 5f14 7s2 7p1',[2,8,18,32,32,8,3],'solid',1900,null,null,1.3,null,'1961','Berkeley team'],
  [104,'Rf','Rutherfordium',267,'transition-metal',4,7,'d','[Rn] 5f14 6d2 7s2',[2,8,18,32,32,10,2],'solid',2400,5800,17,null,null,'1964','Dubna/Berkeley'],
  [105,'Db','Dubnium',268,'transition-metal',5,7,'d','[Rn] 5f14 6d3 7s2',[2,8,18,32,32,11,2],'solid',null,null,29,null,null,'1968','Dubna/Berkeley'],
  [106,'Sg','Seaborgium',269,'transition-metal',6,7,'d','[Rn] 5f14 6d4 7s2',[2,8,18,32,32,12,2],'solid',null,null,35,null,null,'1974','Berkeley team'],
  [107,'Bh','Bohrium',270,'transition-metal',7,7,'d','[Rn] 5f14 6d5 7s2',[2,8,18,32,32,13,2],'solid',null,null,37,null,null,'1981','GSI Darmstadt'],
  [108,'Hs','Hassium',269,'transition-metal',8,7,'d','[Rn] 5f14 6d6 7s2',[2,8,18,32,32,14,2],'solid',null,null,41,null,null,'1984','GSI Darmstadt'],
  [109,'Mt','Meitnerium',278,'unknown',9,7,'d','[Rn] 5f14 6d7 7s2',[2,8,18,32,32,15,2],'unknown',null,null,37.4,null,null,'1982','GSI Darmstadt'],
  [110,'Ds','Darmstadtium',281,'unknown',10,7,'d','[Rn] 5f14 6d8 7s2',[2,8,18,32,32,16,2],'unknown',null,null,34.8,null,null,'1994','GSI Darmstadt'],
  [111,'Rg','Roentgenium',282,'unknown',11,7,'d','[Rn] 5f14 6d9 7s2',[2,8,18,32,32,17,2],'unknown',null,null,28.7,null,null,'1994','GSI Darmstadt'],
  [112,'Cn','Copernicium',285,'transition-metal',12,7,'d','[Rn] 5f14 6d10 7s2',[2,8,18,32,32,18,2],'unknown',null,null,23.7,null,null,'1996','GSI Darmstadt'],
  [113,'Nh','Nihonium',286,'unknown',13,7,'p','[Rn] 5f14 6d10 7s2 7p1',[2,8,18,32,32,18,3],'unknown',700,1400,16,null,null,'2003','RIKEN Japan'],
  [114,'Fl','Flerovium',289,'unknown',14,7,'p','[Rn] 5f14 6d10 7s2 7p2',[2,8,18,32,32,18,4],'unknown',340,420,14,null,null,'1998','JINR Dubna'],
  [115,'Mc','Moscovium',290,'unknown',15,7,'p','[Rn] 5f14 6d10 7s2 7p3',[2,8,18,32,32,18,5],'unknown',700,1400,13.5,null,null,'2003','Dubna/LLNL'],
  [116,'Lv','Livermorium',293,'unknown',16,7,'p','[Rn] 5f14 6d10 7s2 7p4',[2,8,18,32,32,18,6],'unknown',709,1085,12.9,null,null,'2000','Dubna/LLNL'],
  [117,'Ts','Tennessine',294,'unknown',17,7,'p','[Rn] 5f14 6d10 7s2 7p5',[2,8,18,32,32,18,7],'unknown',700,883,7.2,null,null,'2010','Dubna/ORNL/LLNL'],
  [118,'Og','Oganesson',294,'unknown',18,7,'p','[Rn] 5f14 6d10 7s2 7p6',[2,8,18,32,32,18,8],'unknown',null,450,5,null,null,'2002','Dubna/LLNL'],
];

// Rich content per element - notable ones have specific data, others get intelligent defaults
const richContent: Record<number, { origin?: string; summary?: string; uses?: string[]; biological?: string; facts?: string[]; oxidationStates?: string; color?: string }> = {
  1: { color: 'Colorless', summary: 'The lightest and most abundant element in the universe, powering stars via nuclear fusion.', origin: 'Formed in stellar nucleosynthesis; industrially produced from natural gas via steam-methane reforming and by electrolysis of water.', uses: ['Rocket fuel and clean energy carrier','Ammonia production (Haber process) for fertilizers','Hydrogenation of oils in food industry','Petroleum refining','Fuel cells for electric vehicles'], biological: 'Present in every organic molecule and in water — absolutely essential to life. Not toxic on its own.', facts: ['Makes up ~75% of the mass of the visible universe','Only element with three named isotopes: protium, deuterium, tritium','Hydrogen gas is 14× lighter than air'], oxidationStates: '+1, −1' },
  2: { color: 'Colorless', summary: 'The second-most abundant element in the universe and the lightest noble gas — completely inert and non-flammable.', origin: 'Extracted from natural gas fields where it accumulates from radioactive decay of uranium and thorium underground.', uses: ['Cryogenics and MRI machine cooling','Balloons and airships','Leak detection','Deep-sea breathing mixtures','Semiconductor manufacturing'], biological: 'No biological role, inert and non-toxic; can cause suffocation in high concentrations by displacing oxygen.', facts: ['Discovered in the Sun before Earth — named after Helios','Only element that never solidifies at standard pressure','Makes your voice higher-pitched because sound travels faster through it'], oxidationStates: '0' },
  6: { color: 'Black (graphite), Colorless (diamond)', summary: 'The backbone of all known life and organic chemistry, forming more compounds than any other element except hydrogen.', origin: 'Formed in stars by the triple-alpha process. Found naturally as coal, graphite, diamond, and in every living thing.', uses: ['Steel making','Diamond tools and jewelry','Pencils (graphite) and lubricants','Carbon fiber composites','Activated charcoal in filters and medicine','Batteries and electrodes'], biological: 'Essential — the structural backbone of proteins, DNA, carbohydrates, lipids. Every organic molecule contains carbon.', facts: ['Same element makes both graphite (soft) and diamond (hardest natural material)','Graphene is a one-atom-thick sheet of carbon and the strongest material tested','Carbon-14 dating relies on its radioactive isotope'], oxidationStates: '−4 to +4' },
  7: { color: 'Colorless', summary: 'A colorless, odorless gas that makes up 78% of Earth\'s atmosphere and is essential for proteins and DNA.', origin: 'Fractional distillation of liquid air. Nitrogen cycle in nature converts it between forms usable by living organisms.', uses: ['Ammonia and fertilizer production','Food packaging (inert atmosphere)','Liquid nitrogen for cryogenics','Explosives (TNT, nitroglycerin)','Tire inflation in aircraft and race cars'], biological: 'Essential building block of amino acids, proteins, and DNA. Nitrogen-fixing bacteria make atmospheric N₂ biologically usable.', facts: ['Makes up 78% of Earth\'s atmosphere','Boils at just −196 °C — a common laboratory coolant','Discovered by Daniel Rutherford in 1772'], oxidationStates: '−3, +3, +5' },
  8: { color: 'Colorless (pale blue as liquid)', summary: 'The most abundant element in Earth\'s crust and essential for respiration in nearly all life on Earth.', origin: 'Fractional distillation of liquid air. Produced by photosynthesis in plants and cyanobacteria.', uses: ['Medical breathing therapy','Steel making and cutting/welding torches','Rocket propellant (LOX)','Water treatment and ozone generation','Life support in aviation and space'], biological: 'Essential for cellular respiration — used by mitochondria to release energy from food. About 65% of the human body by mass.', facts: ['Makes up ~21% of Earth\'s atmosphere','Third most abundant element in the universe','Liquid oxygen is pale blue and magnetic'], oxidationStates: '−2, −1, +2' },
  11: { color: 'Silvery white', summary: 'A soft, highly reactive alkali metal essential in cooking salt (NaCl) and vital for nerve signaling in animals.', origin: 'Extracted by electrolysis of molten sodium chloride (Downs process). Found in seawater and rock salt deposits.', uses: ['Table salt (NaCl) and food seasoning','Sodium-vapor street lamps','Coolant in fast breeder nuclear reactors','Manufacture of soap and detergents','Sodium bicarbonate (baking soda)'], biological: 'Essential electrolyte controlling fluid balance, nerve impulse transmission, and muscle contraction.', facts: ['Reacts explosively with water','Soft enough to cut with a knife','Its flame test color is bright yellow-orange'], oxidationStates: '+1' },
  17: { color: 'Yellow-green', summary: 'A yellow-green, poisonous gas widely used to disinfect water and produce PVC plastics.', origin: 'Produced industrially by the chloralkali process — electrolysis of brine (NaCl solution).', uses: ['Water disinfection and swimming pool sanitation','PVC plastic production','Bleach and household disinfectants','Pharmaceuticals and pesticides','Paper and textile bleaching'], biological: 'Chloride ion (Cl⁻) is essential for stomach acid (HCl) and fluid balance; chlorine gas is highly toxic.', facts: ['Used as a chemical weapon in WWI','Kills 99.9% of bacteria in drinking water','Discovered by Carl Wilhelm Scheele in 1774'], oxidationStates: '−1, +1, +3, +5, +7' },
  26: { color: 'Silvery gray, rusts to red-brown', summary: 'The most-used metal on Earth, the core of our planet, and essential for oxygen transport in blood.', origin: 'Extracted from hematite (Fe₂O₃) and magnetite (Fe₃O₄) ores in blast furnaces using coke as a reducing agent.', uses: ['Steel making — 90% of all metal used globally','Construction: buildings, bridges, ships','Vehicles, tools, machinery','Magnets and electrical equipment','Iron supplements in medicine'], biological: 'Central atom in hemoglobin, transporting oxygen through blood. Essential for enzymes and cellular energy production.', facts: ['Earth\'s core is mostly iron and nickel','The most stable nucleus — end product of stellar fusion','Rust (Fe₂O₃) destroys billions of dollars of infrastructure yearly'], oxidationStates: '+2, +3' },
  29: { color: 'Reddish-orange metallic', summary: 'A reddish metal that has been used by humans for over 10,000 years and is the best affordable conductor of electricity.', origin: 'Mined from ores like chalcopyrite and malachite; also found in native form. Chile is the world\'s largest producer.', uses: ['Electrical wiring and motors','Plumbing pipes','Coinage and jewelry','Roofing and architecture','Antimicrobial surfaces in hospitals'], biological: 'Trace nutrient for humans — cofactor in respiratory enzymes. Excess is toxic; some marine animals use copper (not iron) in their blood.', facts: ['Gives the Statue of Liberty its green patina','Second-best electrical conductor after silver','Naturally antimicrobial — kills bacteria on contact'], oxidationStates: '+1, +2' },
  47: { color: 'Lustrous silvery-white', summary: 'The most electrically and thermally conductive metal on Earth, prized since antiquity for coinage and jewelry.', origin: 'Mined as a byproduct of copper, lead, and zinc refining. Also found in native form and in ores like argentite.', uses: ['Jewelry and silverware','Electrical contacts and high-end audio wiring','Photography (silver halides)','Antibacterial coatings and wound dressings','Mirrors and solar panels'], biological: 'No biological role; antimicrobial and used topically for infections. Chronic exposure causes argyria (blue-gray skin).', facts: ['Best electrical and thermal conductor of any metal','Bacteria die on contact with silver ions','Used in currency for over 4,000 years'], oxidationStates: '+1' },
  79: { color: 'Metallic yellow', summary: 'A dense, soft, extremely unreactive precious metal that has symbolized wealth throughout human history.', origin: 'Found as native metal in veins and placer deposits. Produced in supernova explosions and neutron-star collisions.', uses: ['Jewelry and luxury goods','Currency reserves and investment','Electronic contacts and connectors','Dentistry (crowns and fillings)','Medical imaging and rheumatoid arthritis treatment'], biological: 'No biological role; hypoallergenic. Colloidal gold compounds used medically for arthritis.', facts: ['Does not tarnish or corrode','So malleable one gram can be beaten into a sheet 1 m²','Formed in neutron-star collisions detected by gravitational-wave observatories'], oxidationStates: '+1, +3' },
  80: { color: 'Silvery liquid', summary: 'The only metal liquid at room temperature — beautiful, dense, and toxic.', origin: 'Extracted from cinnabar ore (HgS) by heating in air. Spain and China are historical top producers.', uses: ['Thermometers and barometers (being phased out)','Fluorescent lamps','Dental amalgam (declining)','Chlorine and sodium hydroxide production','Gold and silver mining (amalgamation)'], biological: 'Highly toxic — damages nervous system, kidneys, and brain. No biological role. Bioaccumulates in fish.', facts: ['Only metal that is liquid at room temperature','Ancient Chinese emperors drank mercury believing it granted immortality','Mad Hatter\'s Disease came from mercury poisoning in hat makers'], oxidationStates: '+1, +2' },
  92: { color: 'Silvery gray', summary: 'A dense, weakly radioactive metal that powers nuclear reactors and (unfortunately) nuclear weapons.', origin: 'Mined from ores like uraninite (pitchblende). Kazakhstan, Canada, and Australia are the largest producers.', uses: ['Nuclear reactor fuel','Nuclear weapons (⁻²³⁵U)','Depleted uranium armor and ammunition','Radiometric dating of rocks','Coloring glass and ceramics (historically)'], biological: 'Toxic heavy metal and radioactive; no biological role. Kidney damage from chemical toxicity.', facts: ['Only naturally occurring fissile isotope: ²³⁵U','Named after the planet Uranus (1789)','Half-life of ²³⁸U is 4.5 billion years — about the age of Earth'], oxidationStates: '+3, +4, +5, +6' },
  53: { color: 'Purple-black solid, violet vapor', summary: 'A dark solid halogen that sublimes to a striking violet vapor and is essential for thyroid hormones.', origin: 'Extracted from seaweed ash and from brines associated with oil wells.', uses: ['Antiseptic (tincture of iodine)','Table salt fortification','X-ray contrast agents','Photography (silver iodide)','Thyroid medications'], biological: 'Essential trace element — required for thyroxine (T4) and triiodothyronine (T3) hormones. Deficiency causes goiter.', facts: ['Sublimes directly from solid to violet vapor','Discovered accidentally by Bernard Courtois from seaweed','Only halogen that is solid at room temperature'], oxidationStates: '−1, +1, +3, +5, +7' },
};

const stateName = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const elements: ElementData[] = rows.map(r => {
  const rc = richContent[r[0]] || {};
  const shells = r[9];
  const valence = shells[shells.length - 1];
  return {
    number: r[0],
    symbol: r[1],
    name: r[2],
    mass: r[3],
    category: r[4],
    group: r[5],
    period: r[6],
    block: r[7],
    config: r[8],
    shells,
    valence,
    oxidationStates: rc.oxidationStates || (r[4] === 'noble-gas' ? '0' : r[4] === 'alkali-metal' ? '+1' : r[4] === 'alkaline-earth-metal' ? '+2' : r[4] === 'halogen' ? '−1, +1, +3, +5, +7' : 'Variable'),
    state: r[10],
    meltingPoint: r[11] ?? undefined,
    boilingPoint: r[12] ?? undefined,
    density: r[13] ?? undefined,
    electronegativity: r[14] ?? undefined,
    atomicRadius: r[15] ?? undefined,
    discoveryYear: r[16],
    discoveredBy: r[17],
    color: rc.color || (r[4] === 'transition-metal' ? 'Silvery metallic' : r[4] === 'noble-gas' ? 'Colorless' : 'Varies'),
    summary: rc.summary || `${r[2]} (${r[1]}) is a ${categoryColors[r[4]].label.toLowerCase()} in group ${r[5] ?? '—'}, period ${r[6]} of the periodic table. It has atomic number ${r[0]} and atomic mass ${r[3]}.`,
    origin: rc.origin || `${r[2]} is typically obtained from mineral ores or produced synthetically in laboratories. It occurs naturally through geological processes.`,
    uses: rc.uses || [`Research and academic study`, `Industrial applications specific to ${categoryColors[r[4]].label.toLowerCase()}s`, `Alloys and specialty materials`],
    biological: rc.biological || (r[4] === 'actinide' || r[4] === 'unknown' ? 'Radioactive and/or highly unstable — no biological role and generally hazardous.' : 'No essential biological role known for humans.'),
    facts: rc.facts || [`Belongs to the ${categoryColors[r[4]].label.toLowerCase()} category`, `Discovered by ${r[17]} in ${r[16]}`, `Electron configuration: ${r[8]}`],
  };
});

export const getElement = (id: string | number): ElementData | undefined => {
  if (typeof id === 'number') return elements.find(e => e.number === id);
  const asNum = Number(id);
  if (!Number.isNaN(asNum)) return elements.find(e => e.number === asNum);
  const q = String(id).toLowerCase();
  return elements.find(e => e.symbol.toLowerCase() === q || e.name.toLowerCase() === q);
};

// Standard periodic table grid position: [row, col] 1-indexed. Lanth/Act placed below.
export const getGridPosition = (el: ElementData): { row: number; col: number } => {
  // Special cases: H(1,1) and He(1,18) handled by group/period
  if (el.category === 'lanthanide') {
    return { row: 9, col: (el.number - 57) + 3 }; // La(57)->col3 ... Lu(71)->col17
  }
  if (el.category === 'actinide') {
    return { row: 10, col: (el.number - 89) + 3 };
  }
  return { row: el.period, col: el.group || 1 };
};
