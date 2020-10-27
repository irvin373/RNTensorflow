export const dropTables = [`DROP TABLE IF EXISTS MedicalGroup;`,
`DROP TABLE IF EXISTS Recipe;`,
`DROP TABLE IF EXISTS Plant_to_Recipe;`,
`DROP TABLE IF EXISTS Plant;`];

export const createTables = [`CREATE TABLE IF NOT EXISTS MedicalGroup (
	id	INTEGER NOT NULL UNIQUE,
	name	TEXT NOT NULL UNIQUE,
	PRIMARY KEY(id AUTOINCREMENT)
);`,
`CREATE TABLE IF NOT EXISTS Recipe (
	id	INTEGER NOT NULL UNIQUE,
	name	TEXT NOT NULL,
	imageName	TEXT,
	preparation	TEXT NOT NULL,
	PRIMARY KEY(id AUTOINCREMENT)
);`,
`CREATE TABLE IF NOT EXISTS Plant_to_Recipe (
	id	INTEGER NOT NULL UNIQUE,
	plantId	INTEGER NOT NULL,
	recipeId	INTEGER NOT NULL,
	FOREIGN KEY(plantId) REFERENCES Plant(id),
	FOREIGN KEY(recipeId) REFERENCES Recipe(id),
	PRIMARY KEY(id AUTOINCREMENT)
);`,
`CREATE TABLE IF NOT EXISTS Plant (
	id	INTEGER NOT NULL UNIQUE,
	name	TEXT NOT NULL UNIQUE,
	description	TEXT NOT NULL,
	MedicalGroupId	INTEGER,
	imageName	TEXT,
	FOREIGN KEY(MedicalGroupId) REFERENCES MedicalGroup(id),
	PRIMARY KEY(id AUTOINCREMENT)
);`]

export const inserts = [`INSERT INTO "MedicalGroup" ("id","name")
VALUES (1,'Aparato respiratorio'), (2,'digestion'), (3,'limpiza de sangre'), (4,'elevan defensas');`,
`INSERT INTO "Plant" ("id","name","description","MedicalGroupId","imageName")
VALUES (1,'La Muña Andina','La Muña Andina es un planta que crece en los valles interandinos del Perú, su uso se remonta a épocas pre – hispánicas, convirtiéndose en un remedio natural de invaluable valor cultural. El consumo tradicional de la muña para remediar estas afecciones se da a través de la infusión o mate,  ya que de esta forma se logra extraer sus propiedades carminativas y estomacales con una mayor eficacia.  No obstante su suave sabor a menta ha sido dedicado también a la condimentación y aromatización de los platos culinarios de la serranía suramericana desde hace siglos.',2,'munaandina.jpg'),
(2,'Toronjil','El menta, limoncillo, la melisa u hoja de limón​ (Melissa officinalis) es una hierba perenne de la familia de las lamiáceas, nativa del sur de Europa y de la región mediterránea. Apreciada por su fuerte aroma a limón, se utiliza en infusión como tranquilizante natural, y su aceite esencial se aprovecha en perfumería.',1,'toronjil.jpg'),
(3,'Lluvia de oro','Es un arbusto de corteza lisa, con ramas colgantes y ramitas pubescentes. Las hojas tienen un largo pedúnculo, son lisas en el haz y vellosas por el envés . Las flores son de color amarillo dorado y dulce aroma, que se agrupan en racimos colgantes de 25 cm de largo, y normalmente florecen en mayo. Los frutos son legumbres con un gran número de semillas de color negro que contienen citisina, un alcaloide extremadamente tóxico no solo para los seres humanos sino también para los caballos, sobre todo cuando no están maduras. Sin embargo, algunos animales salvajes como liebres y ciervos puede alimentar en ellos sin ningún problema. La madera es dura y pesada , de un color amarillo- marrón, ideal para el torneado de madera y como combustible. En el pasado (y hoy en la recreación histórica), fue utilizado para hacer arcos.',3,'lluviadeoro.jpg'),
(4,'Wira wira','A esta plantita conocida como remedio para la tos, en todas partes se le da el nombre de Wira Wira o Vira Vira. Esta hierba tiene actividad comprobada como antibiótico contra bacterias y virus.',4,'wirawira.jpg'),
(5,'Manzanilla','Para la planta de manzanilla las flores como atributo clasificador, las cuales tienen una forma peculiar entre las demás plantas medicinales.',4,'manzanilla.jpg'),
(6,'hierba buena','Para la planta de hierba buena un rasgo visual es la forma de sus hojas mediante los bordes horizontales se notan más fuertes y su forma puntiaguda de las hojas será unos de los atributos para su clasificación.',4,'hierbabuena.jpg'),
(7,'planta de palta','Para la planta de palta los atributos clasificadores serán la forma de la fruta y las hojas ya que en ambos casos se usan para las recetas del sistema tuquypaq.',4,'palta.jpg'),
(8,'lavanda','lavanda la la la.',4,'lavanda.jpg'),
(9,'mandarina','Para la planta de mandarina, un atributo clasificador es la forma de sus hojas resaltando en un filtro horizontal, igual que se usará igual la forma y color de la fruta para agregar peso a la función de activación. Sin llegar a ser un factor determinante en la clasificación.',4,'mandarina.jpg'),
(10,'diente de leon','Para la planta de diente de león, un atributo clasificador son las flores y el villano donde se encuentran sus semillas son resultantes al aplicar filtros.',4,'dienteleon.jpg'),
(11,'ortiga','Para la planta de ortiga la forma punteada de sus hojas son el el filtro que más resalta al momento de clasificar.',4,'ortiga.jpg'),
(12,'Jengibre','Jengibre Jengibre Jengibre Jengibre ',4,'jengibre.jpeg');`,
`INSERT INTO "Recipe" ("id","name", "imageName", "preparation")
VALUES (1, 'Mate Manzanilla', 'mate.jpg', 'Hervir una taza de agua a fuego medio por unos 4 minutos;\n bajar del fuego. Poner el agua en una taza y añadir las hojas de nilla al agua hirviendo. Tapar la infusión y dejar reposar durante 3 o 4 minutos. Colar y beber.'),
(2, 'Receta 2', 'mate.jpg', 'Caliente el agua en una cacerola pequeña hasta que hierva. Apague el fuego y añada flores de manzanilla. Empapado durante 5 minutos. Colar las flores de manzanilla con un colador de malla fina y verter la infusión caliente en la taza con miel y alcohol.');`,
`INSERT INTO "Plant_to_Recipe" ("id", "plantId", "recipeId")
VALUES (1, 3, 1), (2, 2, 1), (3, 1, 2)`,
]