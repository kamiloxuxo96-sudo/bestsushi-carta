/* =====================================================================
   CARTA BESTSUSHI — aquí se edita TODO el contenido de la página.
   - Precios: número sin puntos ni signo (6500, no "$6.500").
   - Fotos: nombre del archivo en /fotos SIN ".jpg". img:'luco-roll'  o varias: imgs:['luco-roll','luco-roll-2']
   - Para ocultar un producto sin borrarlo: agrega  oculto:true
   - Opciones "a elección": o:'clasico' usa la lista OPTS de abajo.
   Lee CLAUDE.md antes de cambiar algo.
   ===================================================================== */
const WA_NUMBER = '56937415423';
const HOURS = {days:[2,3,4,5,6,0], open:'17:00', close:'22:30'}; // martes(2) a domingo(0)
// Destacados de arriba: [id del producto, foto, etiqueta]. El primero es el Roll del mes.
const FEATURED = [['e3','destacado-luco-roll','Roll del mes'],['e5','destacado-tropical-roll','Especial'],['sb1','destacado-sushi-burger','Sushi burger'],['e10','destacado-flamed-salmon','Flambeado']];
const IMG = 'fotos/';   // carpeta de fotos (no cambiar)

const OPTS = {
  clasico:[{k:'Proteína',c:['Pollo','Camarón','Kanikama']},{k:'Vegetal',c:['Palta','Palmito','Choclillo','Ciboulette']}],
  tiger:[{k:'Proteína',c:['Salmón','Carne vacuno']}],
  crocante:[{k:'Envuelto en',c:['Queso','Palta']},{k:'Proteína',c:['Pollo apanado','Camarón apanado']}],
  flamed:[{k:'Proteína',c:['Camarón','Pollo','Kani furay']}],
  sinarroz:[{k:'Envoltura',c:['Frito en panko','Envuelto en palta','Envuelto en queso']}],
  burger:[{k:'Proteínas',n:2,c:['Pollo','Camarón apanado','Kanikama','Carne vacuno','Salmón']},{k:'Vegetales',n:2,c:['Palta','Cebollín','Pimentón']}],
  bebida1:[{k:'Sabor',c:['Coca-Cola','Sprite']}],
  bebida2:[{k:'Sabor',c:['Kem','Limón soda','Pepsi']}],
};

const MENU = [
 {id:'promos', name:['Promo','ciones'], note:'Para compartir. Los rellenos se pueden cambiar con costo adicional.', promo:true, items:[
  {id:'p1',n:'25 piezas mixtas',big:'25',p:12000,d:'10 fritas (pollo, ciboulette, queso) · 10 sésamo (kani, choclillo, queso) · 5 ciboulette (camarón, palta, queso) · 2 arrollados primavera · 2 empanadas de queso',img:'promo-25-piezas'},
  {id:'p2',n:'50 piezas mix',big:'50',p:19500,d:'30 fritas variadas · 10 ciboulette (camarón, palta, queso) · 10 sésamo (kani, palmito, queso)',img:'envuelto-en-palta-4'},
  {id:'p3',n:'50 piezas mix premium',big:'50',p:29500,d:'10 envuelto en palta · 10 envuelto en queso · 10 Luco Roll · 10 Tiger Roll · 10 roll sin arroz',img:'tiger-roll'},
  {id:'p4',n:'80 piezas mix',big:'80',p:30000,d:'40 fritas variadas · 10 ciboulette · 5 ciboulette camarón · 10 sésamo kani · 5 sésamo camarón · 10 nori camarón',img:'frito-en-panko'},
  {id:'p5',n:'100 piezas mix',big:'100',p:36000,d:'50 fritas variadas · 20 ciboulette variadas · 20 sésamo variadas · 10 nori (camarón, ciboulette, queso)',img:'envuelto-en-ciboulette'},
 ]},
 {id:'especiales', name:['Rolls ','especiales'], note:'10 piezas.', items:[
  {id:'e1',n:'Tiger Roll',p:6500,o:'tiger',d:'Frito en panko. Queso crema, palta, ciboulette y salmón o carne vacuno.',img:'tiger-roll'},
  {id:'e2',n:'Acevichado Roll',p:7500,d:'Envuelto en ciboulette con topping de ceviche: salmón, palta, cebolla morada y pimentón.'},
  {id:'e3',n:'Luco Roll',p:6500,d:'Frito en panko. Queso crema, carne vacuno y queso gauda.',imgs:['luco-roll','luco-roll-2']},
  {id:'e4',n:'Crocante Roll',p:7000,o:'crocante',d:'Pollo o camarón apanado, palta y cebollín. Bañado en salsa acevichada con papas hilo.',img:'crocante-roll'},
  {id:'e5',n:'Tropical Roll',p:8700,d:'Envuelto en queso. Camarón furay y palta, con topping de ceviche de salmón, mango, palta, cebolla morada y pimentón.',img:'tropical-roll'},
  {id:'e6',n:'Roll sin arroz · Salmón',p:10000,o:'sinarroz',d:'Queso crema, salmón y camarón apanado, palta y/o cebollín.'},
  {id:'e7',n:'Roll sin arroz · Pollo',p:10000,o:'sinarroz',d:'Queso crema, pollo y camarón apanado, palta y/o cebollín.',imgs:['roll-sin-arroz','roll-sin-arroz-2','roll-sin-arroz-3']},
  {id:'e8',n:'Saltado Roll',p:11500,d:'Queso crema y palta, con topping de lomo saltado (120 g), cebolla morada, pimentón y papas hilo.'},
  {id:'e9',n:'Flamed Cheese Roll',p:7500,o:'flamed',d:'Envuelto en queso crema flambeado. Topping de papas hilo.'},
  {id:'e10',n:'Flamed Salmon Roll',p:7800,d:'Envuelto en salmón flambeado. Queso crema, palta y camarón furay, bañado en salsa acevichada.',imgs:['flamed-salmon-roll','flamed-salmon-roll-2']},
  {id:'e11',n:'Brasileño Roll',p:8000,d:'Envuelto en queso gauda flambeado con merkén. Queso crema, palta y carne vacuno. Incluye salsa spicy.'},
 ]},
 {id:'clasicos', name:['Rolls ','clásicos'], note:'10 piezas. Queso crema + 1 proteína + 1 vegetal a elección.', items:[
  {id:'c1',n:'Frito en panko',p:4800,o:'clasico',imgs:['frito-en-panko','frito-en-panko-2']},
  {id:'c2',n:'Envuelto en queso',p:6000,o:'clasico'},
  {id:'c3',n:'Envuelto en sésamo',p:4500,o:'clasico'},
  {id:'c4',n:'Envuelto en nori',p:4300,o:'clasico'},
  {id:'c5',n:'Envuelto en palta',p:5500,o:'clasico',imgs:['envuelto-en-palta','envuelto-en-palta-2','envuelto-en-palta-3','envuelto-en-palta-4']},
  {id:'c6',n:'Envuelto en ciboulette',p:4500,o:'clasico',img:'envuelto-en-ciboulette'},
  {id:'c7',n:'Envuelto en salmón',p:6500,o:'clasico'},
 ]},
 {id:'burger', name:['Sushi ','burger'], note:'', items:[
  {id:'sb1',n:'Sushi Burger',p:10000,o:'burger',d:'Base de queso crema, 2 proteínas y 2 vegetales a elección.',imgs:['sushi-burger','sushi-burger-2']},
 ]},
 {id:'handrolls', name:['Hand','rolls'], note:'', compact:true, items:[
  {id:'h1',n:'Handroll pollo y queso',p:3500},{id:'h2',n:'Handroll camarón y queso',p:3500},{id:'h3',n:'Handroll kanikama y queso',p:3500},
 ]},
 {id:'gohan', name:['Go','han'], note:'Base de arroz, palta, queso y cebollín.', compact:true, items:[
  {id:'g1',n:'Gohan pollo furay',p:7000,img:'gohan'},{id:'g2',n:'Gohan camarón furay',p:7000,img:'gohan'},{id:'g3',n:'Gohan mixto pollo y camarón',p:7500,img:'gohan'},{id:'g4',n:'Gohan mixto salmón y camarón',p:8000,img:'gohan'},
 ]},
 {id:'aperitivos', name:['Aperi','tivos'], note:'', compact:true, items:[
  {id:'a1',n:'10 gyozas pollo/cerdo',p:3700},{id:'a2',n:'10 gyozas pasta de camarón',p:3800},{id:'a3',n:'5 arrollados primavera',p:3200},{id:'a4',n:'5 arrollados jamón queso',p:3200},{id:'a5',n:'5 arrollados camarón queso',p:3500},{id:'a6',n:'5 empanadas pollo mandarín',p:3800},{id:'a7',n:'5 empanadas camarón mandarín',p:4000},{id:'a8',n:'5 empanadas de queso',p:3200},{id:'a9',n:'5 camarones furay',p:4000},
 ]},
 {id:'bebidas', name:['Bebi','das'], note:'En lata.', compact:true, items:[
  {id:'b1',n:'Coca-Cola o Sprite',p:1400,o:'bebida1'},{id:'b2',n:'Kem, Limón soda o Pepsi',p:1300,o:'bebida2'},
 ]},
];
