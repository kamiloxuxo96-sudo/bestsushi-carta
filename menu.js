/* =====================================================================
   CARTA BESTSUSHI — aquí se edita TODO el contenido de la página.
   - Precios: número sin puntos ni signo (6500, no "$6.500").
   - Fotos: nombre del archivo en /fotos SIN ".jpg". img:'luco-roll'  o varias: imgs:['luco-roll','luco-roll-2']
   - Para ocultar un producto sin borrarlo: agrega  oculto:true
   - Si se acabó por hoy: agrega  agotado:true  (se ve en gris con "Agotado hoy" y no se puede pedir)
   - Opciones "a elección": o:'clasico' usa la lista OPTS de abajo.
     En OPTS: n = máximo a elegir · min = mínimo (0 = opcional) · extra = valor que suma cada opción elegida
     · solo = máximo si el cliente no eligió nada en los otros grupos (ej. roll vegetariano con 2 vegetales).
   - Promociones: tipo:'especial' las destaca. rolls:[['cantidad','roll','relleno'], ...] arma la lista.
   Lee CLAUDE.md antes de cambiar algo.
   ===================================================================== */
const WA_NUMBER = '56937415423';
const HOURS = {days:[2,3,4,5,6,0], open:'17:00', close:'22:30'}; // martes(2) a domingo(0)
// Destacados de arriba: [id del producto, foto, etiqueta, título opcional 'negrita|delgada']. El primero es el Roll del mes.
const FEATURED = [['sd1','destacado-sushidog','Roll del mes','Sushi|dog'],['e5','destacado-tropical-roll','Especial'],['sb1','destacado-sushi-burger','Sushi burger'],['e10','destacado-flamed-salmon','Flambeado']];
const IMG = 'fotos/';   // carpeta de fotos (no cambiar)
// "¿Le sumas algo?" en el carrito: [id del producto, opción (si tiene), nombre corto, estilo sin foto]
const SUGERIDOS = [['a1','','10 gyozas'],['b1','Coca-Cola','Coca-Cola lata','can'],['b1','Sprite','Sprite lata','can sp'],['x1','Soya','Soya extra','sauce'],['x1','Teriyaki','Teriyaki extra','sauce ter'],['a8','','5 empanadas de queso'],['a3','','5 arrollados primavera']];

const OPTS = {
  // clásicos: proteína y vegetal opcionales (al menos uno). Sin proteína se pueden elegir 2 vegetales (vegetariano).
  clasico:[{k:'Proteína',min:0,c:['Pollo','Camarón','Kanikama']},{k:'Vegetal',min:0,solo:2,c:['Palta','Palmito','Choclillo','Ciboulette']}],
  tiger:[{k:'Proteína',c:['Salmón','Carne vacuno']}],
  crocante:[{k:'Envuelto en',c:['Queso','Palta']},{k:'Proteína',c:['Pollo apanado','Camarón apanado']}],
  flamed:[{k:'Proteína',c:['Camarón','Pollo','Kani furay']}],
  sinarroz:[{k:'Envoltura',c:['Frito en panko','Envuelto en palta','Envuelto en queso']}],
  burger:[{k:'Proteínas',n:2,min:1,c:['Pollo','Camarón apanado','Kanikama','Carne vacuno','Salmón']},{k:'Vegetales',n:2,min:0,c:['Palta','Cebollín','Pimentón']}],
  handroll:[{k:'Agregar vegetal',n:2,min:0,extra:500,c:['Palta','Cebollín']}],
  sushidog:[{k:'Versión',c:['Acevichado de camarón','Pollo teriyaki']}],
  salsa:[{k:'Salsa',c:['Soya','Teriyaki']}],
  bebida1:[{k:'Sabor',c:['Coca-Cola','Sprite']}],
  bebida2:[{k:'Sabor',c:['Kem','Limón soda','Pepsi']}],
};

const MENU = [
 {id:'promos', name:['Promo','ciones'], note:'Para compartir. Los rellenos se pueden cambiar con costo adicional:',
  extras:[['Envoltura en palta','+$2.000'],['Envoltura en queso','+$2.500'],['Promo solo fritas','+$1.000'],['Proteína a carne o salmón','+$2.500'],['Proteína a pollo o camarón','+$1.000'],['Soya o teriyaki extra','+$500']],
  promo:true, items:[
  {id:'p1',n:'Promo 25 mixtas',tag:'Mix',big:'25',p:12000,img:'promo-25-piezas',rolls:[['10','Frito en panko','pollo, ciboulette y queso'],['10','Envuelto en sésamo','kanikama, choclillo y queso'],['5','Envuelto en ciboulette','camarón, palta y queso'],['2','Arrollados primavera',''],['2','Empanadas de queso','']]},
  {id:'p2',n:'Promo 50 mix',tag:'Mix',big:'50',p:19500,img:'envuelto-en-palta-4',rolls:[['30','Frito en panko','variados'],['10','Envuelto en ciboulette','camarón, palta y queso'],['10','Envuelto en sésamo','kanikama, palmito y queso']]},
  {id:'p3',n:'Promo 50 mix premium',tag:'Premium',tipo:'especial',big:'50',p:29500,img:'tiger-roll',rolls:[['10','Envuelto en palta',''],['10','Envuelto en queso',''],['10','Luco Roll','carne vacuno y queso gauda'],['10','Tiger Roll',''],['10','Roll sin arroz','']]},
  {id:'p4',n:'Promo 80 mix',tag:'Mix',big:'80',p:30000,img:'frito-en-panko',rolls:[['40','Frito en panko','variados'],['10','Envuelto en ciboulette',''],['5','Envuelto en ciboulette','camarón'],['10','Envuelto en sésamo','kanikama'],['5','Envuelto en sésamo','camarón'],['10','Envuelto en nori','camarón']]},
  {id:'p5',n:'Promo 100 mix',tag:'Mix',big:'100',p:36000,img:'envuelto-en-ciboulette',rolls:[['50','Frito en panko','variados'],['20','Envuelto en ciboulette','variados'],['20','Envuelto en sésamo','variados'],['10','Envuelto en nori','camarón, ciboulette y queso']]},
 ]},
 {id:'especiales', name:['Rolls ','especiales'], note:'10 piezas.', items:[
  {id:'e1',n:'Tiger Roll',p:6500,o:'tiger',d:'Frito en panko. Queso crema, palta, ciboulette y salmón o carne vacuno.',img:'tiger-roll'},
  {id:'e2',n:'Acevichado Roll',p:7500,d:'Envuelto en ciboulette con topping de ceviche: salmón, palta, cebolla morada y pimentón.'},
  {id:'e3',n:'Luco Roll',p:6500,d:'Frito en panko. Queso crema, carne vacuno y queso gauda.',imgs:['luco-roll','luco-roll-2']},
  {id:'e4',n:'Crocante Roll',p:7000,o:'crocante',d:'Pollo o camarón apanado, palta y cebollín. Bañado en salsa acevichada con papas hilo.',img:'crocante-roll'},
  {id:'e5',n:'Tropical Roll',p:8700,d:'Envuelto en queso. Camarón furay y palta, con topping de ceviche de salmón, mango, palta, cebolla morada y pimentón.',img:'tropical-roll'},
  {id:'e6',n:'Roll sin arroz · Salmón',p:10000,o:'sinarroz',d:'Queso crema, salmón y camarón apanado, palta y/o cebollín.'},
  {id:'e7',n:'Roll sin arroz · Pollo',p:10000,o:'sinarroz',d:'Queso crema, pollo y camarón apanado, palta y/o cebollín.',imgs:['roll-sin-arroz','roll-sin-arroz-2','roll-sin-arroz-3']},
  {id:'e8',oculto:true,n:'Saltado Roll',p:11500,d:'Queso crema y palta, con topping de lomo saltado (120 g), cebolla morada, pimentón y papas hilo.'},
  {id:'e9',n:'Flamed Cheese Roll',p:7500,o:'flamed',d:'Envuelto en queso crema flambeado. Topping de papas hilo.'},
  {id:'e10',n:'Flamed Salmon Roll',p:7800,d:'Envuelto en salmón flambeado. Queso crema, palta y camarón furay, bañado en salsa acevichada.',imgs:['flamed-salmon-roll','flamed-salmon-roll-2']},
  {id:'e11',oculto:true,n:'Brasileño Roll',p:8000,d:'Envuelto en queso gauda flambeado con merkén. Queso crema, palta y carne vacuno. Incluye salsa spicy.'},
 ]},
 {id:'clasicos', name:['Rolls ','clásicos'], note:'10 piezas. Queso crema + 1 proteína + 1 vegetal a elección.', items:[
  {id:'c1',n:'Frito en panko',p:4800,o:'clasico',imgs:['frito-en-panko','frito-en-panko-2']},
  {id:'c2',n:'Envuelto en queso',p:6000,o:'clasico'},
  {id:'c3',n:'Envuelto en sésamo',p:4500,o:'clasico'},
  {id:'c4',n:'Envuelto en nori',p:4300,o:'clasico'},
  {id:'c5',n:'Envuelto en palta',p:5500,o:'clasico',imgs:['envuelto-en-palta','envuelto-en-palta-2','envuelto-en-palta-3','envuelto-en-palta-4']},
  {id:'c6',n:'Envuelto en ciboulette',p:4500,o:'clasico',img:'envuelto-en-ciboulette'},
  {id:'c7',n:'Envuelto en salmón',p:6500,o:'clasico'},
  {id:'c8',n:'Roll solo arroz',p:2500,d:'Solo arroz, sin relleno.'},
 ]},
 {id:'burger', name:['Sushi ','burger'], note:'', items:[
  {id:'sb1',n:'Sushi Burger',p:10000,o:'burger',d:'Base de queso crema, 2 proteínas y 2 vegetales a elección.',imgs:['sushi-burger','sushi-burger-2']},
 ]},
 {id:'sushidog', name:['Sushi ','dog'], note:'', items:[
  {id:'sd1',n:'Sushi dog',p:6500,o:'sushidog',d:'Queso, palta y ciboulette. Elige tu versión: acevichado de camarón con topping de salsa acevichada, o pollo teriyaki.',img:'sushidog-acevichado'},
 ]},
 {id:'handrolls', name:['Hand','rolls'], note:'Agrega palta o cebollín: 1 por $500, 2 por $1.000.', compact:true, items:[
  {id:'h1',n:'Handroll pollo y queso',p:3500,o:'handroll'},{id:'h2',n:'Handroll camarón y queso',p:3500,o:'handroll'},{id:'h3',n:'Handroll kanikama y queso',p:3500,o:'handroll'},
 ]},
 {id:'gohan', name:['Go','han'], note:'Base de arroz, palta, queso y cebollín.', compact:true, items:[
  {id:'g1',n:'Gohan pollo furay',p:7000,img:'gohan'},{id:'g2',n:'Gohan camarón furay',p:7000,img:'gohan'},{id:'g3',n:'Gohan mixto pollo y camarón',p:7500,img:'gohan'},{id:'g4',n:'Gohan mixto salmón y camarón',p:8000,img:'gohan'},
 ]},
 {id:'aperitivos', name:['Aperi','tivos'], note:'', compact:true, items:[
  {id:'a1',n:'10 gyozas pollo/cerdo',p:3700},{id:'a2',n:'10 gyozas pasta de camarón',p:3800},{id:'a3',n:'5 arrollados primavera',p:3200},{id:'a4',n:'5 arrollados jamón queso',p:3200},{id:'a5',n:'5 arrollados camarón queso',p:3500},{id:'a6',n:'5 empanadas pollo mandarín',p:3800},{id:'a7',n:'5 empanadas camarón mandarín',p:4000},{id:'a8',n:'5 empanadas de queso',p:3200},{id:'a9',n:'5 camarones furay',p:4000},
 ]},
 {id:'extras', name:['Ex','tras'], note:'', compact:true, items:[
  {id:'x1',n:'Salsa extra',p:500,o:'salsa'},
 ]},
 {id:'bebidas', name:['Bebi','das'], note:'En lata.', compact:true, items:[
  {id:'b1',n:'Coca-Cola o Sprite',p:1400,o:'bebida1'},{id:'b2',n:'Kem, Limón soda o Pepsi',p:1300,o:'bebida2'},
 ]},
];
