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
(4,'Wira wira','A esta plantita conocida como remedio para la tos, en todas partes se le da el nombre de Wira Wira o Vira Vira. Esta hierba tiene actividad comprobada como antibiótico contra bacterias y virus.',4,'wirawira.jpg');`,
]